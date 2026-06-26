// Centralised text-to-speech helper.
//
// The default browser Tamil voice often sounds monotone and rushed. Two things
// help most:
//   1. Pick the best available voice (prefer Google/Apple "natural" or
//      "premium" voices over the basic eSpeak / espeak-ng fallback).
//   2. Chunk on punctuation and speak one chunk at a time. The browser inserts
//      a small natural pause between utterances, which mimics human cadence
//      much better than a single long utterance.
//
// We also nudge rate slightly slower for Tamil (compound words read clearer
// at ~0.85) and lift pitch a touch to escape the deep robotic register.

export type Locale = 'en' | 'ta';

interface SpeakOptions {
  text: string;
  locale: Locale;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

interface VoiceTuning {
  rate: number;
  pitch: number;
  langPrefs: string[]; // BCP-47 codes to match against, in priority order
}

const TUNING: Record<Locale, VoiceTuning> = {
  ta: {
    rate: 0.88,
    pitch: 1.05,
    // Some browsers ship 'ta-IN' (India variant) but no 'ta-LK'. Some ship
    // bare 'ta'. Try them in order; fall back to anything starting with 'ta'.
    langPrefs: ['ta-LK', 'ta-IN', 'ta'],
  },
  en: {
    rate: 1.0,
    pitch: 1.0,
    langPrefs: ['en-US', 'en-GB', 'en'],
  },
};

// Voices marked as "Premium", "Enhanced", or "Natural" sound noticeably better
// than the platform default. iOS/macOS labels them with these tokens; Android
// (Chrome) labels Google's high-quality voices with "Google ..." or "Local".
// We rank in this order.
function scoreVoice(voice: SpeechSynthesisVoice, langPrefs: string[]): number {
  let score = 0;

  // Hard requirement: lang must match one of our prefs.
  const langIndex = langPrefs.findIndex(p => voice.lang.startsWith(p));
  if (langIndex === -1) return -1;
  score += (langPrefs.length - langIndex) * 100; // ta-LK > ta-IN > ta

  const name = voice.name.toLowerCase();
  if (/premium|enhanced|natural|neural/.test(name)) score += 50;
  if (/google/.test(name)) score += 30;
  if (/microsoft/.test(name) && /online/.test(name)) score += 25;
  if (/^com\.apple/.test(name)) score += 20;
  if (voice.localService) score += 10; // local voices avoid network glitches
  if (voice.default) score += 5;
  // Penalise the open-source eSpeak fallback, which is the worst-sounding.
  if (/espeak/.test(name)) score -= 40;

  return score;
}

function pickBestVoice(langPrefs: string[]): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -Infinity;
  for (const v of voices) {
    const s = scoreVoice(v, langPrefs);
    if (s > bestScore) {
      bestScore = s;
      best = v;
    }
  }
  return bestScore > 0 ? best : null;
}

// Chunk on sentence-ending punctuation. Both English and Tamil use Latin
// punctuation in modern writing — Tamil traditionally has no full stop, but
// modern Tamil text uses . ? ! and the script-aware delimiters work for both.
// Keep chunks short (≤140 chars) so the browser doesn't get stuck mid-sentence
// on a long utterance.
function chunkText(text: string): string[] {
  if (!text.trim()) return [];

  // First split on hard stops, then merge short chunks back so we don't
  // overspeak single words. Limit chunk length so the engine breathes.
  const hardSplit = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?।])\s+/)
    .filter(Boolean);

  const out: string[] = [];
  let buf = '';
  const MAX = 140;
  for (const piece of hardSplit) {
    if (!buf) {
      buf = piece;
    } else if ((buf + ' ' + piece).length <= MAX) {
      buf = buf + ' ' + piece;
    } else {
      out.push(buf);
      buf = piece;
    }
  }
  if (buf) out.push(buf);

  // Further split overly long chunks at comma boundaries.
  const final: string[] = [];
  for (const c of out) {
    if (c.length <= MAX) {
      final.push(c);
    } else {
      const parts = c.split(/(?<=,)\s+/);
      let sub = '';
      for (const p of parts) {
        if (!sub) sub = p;
        else if ((sub + ' ' + p).length <= MAX) sub = sub + ' ' + p;
        else {
          final.push(sub);
          sub = p;
        }
      }
      if (sub) final.push(sub);
    }
  }
  return final;
}

// Some browsers (Chrome) load voices async. Wait for them if they're not
// available yet — but only briefly, to avoid hanging if no voices ever load.
function awaitVoices(timeoutMs = 400): Promise<void> {
  return new Promise(resolve => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }
    if (window.speechSynthesis.getVoices().length > 0) {
      resolve();
      return;
    }
    let resolved = false;
    const onVoices = () => {
      if (resolved) return;
      resolved = true;
      window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
      resolve();
    };
    window.speechSynthesis.addEventListener('voiceschanged', onVoices);
    setTimeout(() => {
      if (resolved) return;
      resolved = true;
      window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
      resolve();
    }, timeoutMs);
  });
}

export interface ActiveSpeech {
  stop: () => void;
}

export async function speak({
  text,
  locale,
  onStart,
  onEnd,
  onError,
}: SpeakOptions): Promise<ActiveSpeech | null> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.();
    return null;
  }

  // Cancel anything already speaking — single global utterance queue.
  window.speechSynthesis.cancel();

  await awaitVoices();

  const tuning = TUNING[locale];
  const voice = pickBestVoice(tuning.langPrefs);
  const chunks = chunkText(text);
  if (chunks.length === 0) {
    onError?.();
    return null;
  }

  let cancelled = false;
  let startedFired = false;
  let currentIndex = 0;

  const queueNext = () => {
    if (cancelled) return;
    if (currentIndex >= chunks.length) {
      onEnd?.();
      return;
    }
    const chunk = chunks[currentIndex++];
    const utter = new SpeechSynthesisUtterance(chunk);
    utter.lang = voice?.lang ?? tuning.langPrefs[0];
    if (voice) utter.voice = voice;
    utter.rate = tuning.rate;
    utter.pitch = tuning.pitch;
    utter.volume = 1;

    utter.onstart = () => {
      if (!startedFired) {
        startedFired = true;
        onStart?.();
      }
    };
    utter.onend = () => {
      if (cancelled) return;
      // Small delay between chunks (browsers vary; ~80ms feels natural)
      setTimeout(queueNext, 80);
    };
    utter.onerror = (e) => {
      // 'canceled' / 'interrupted' aren't real failures — they just mean stop()
      // was called. Anything else is a real error.
      if (cancelled) return;
      const errorType = (e as SpeechSynthesisErrorEvent).error;
      if (errorType === 'canceled' || errorType === 'interrupted') return;
      onError?.();
    };

    window.speechSynthesis.speak(utter);
  };

  queueNext();

  return {
    stop: () => {
      cancelled = true;
      window.speechSynthesis.cancel();
      onEnd?.();
    },
  };
}

// Quick check used by components to decide whether to render the audio button.
export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
