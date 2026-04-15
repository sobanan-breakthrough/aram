'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';

// Minimal Web Speech API types (browsers expose SpeechRecognition but TS DOM
// types don't include it by default in some configs)
type SpeechRecognitionEventLike = {
  results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean; length: number }>;
  resultIndex: number;
};

type SpeechRecognitionErrorEventLike = {
  error: string;
  message?: string;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getSpeechRecognition(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

interface VoiceButtonProps {
  onTranscript: (text: string, isFinal: boolean) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
}

export default function VoiceButton({ onTranscript, onError, disabled }: VoiceButtonProps) {
  const { locale } = useLocale();
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const Ctor = getSpeechRecognition();
    setSupported(!!Ctor);
  }, []);

  const start = () => {
    const Ctor = getSpeechRecognition();
    if (!Ctor) return;

    // Tamil in Sri Lanka: "ta-LK"; English (Sri Lanka): "en-LK". Fall back to
    // generic tags if the browser doesn't recognise the regional ones.
    const recog = new Ctor();
    recog.lang = locale === 'ta' ? 'ta-LK' : 'en-US';
    recog.continuous = false;
    recog.interimResults = true;

    recog.onresult = (event) => {
      let finalText = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        if (result.isFinal) {
          finalText += transcript;
        } else {
          interim += transcript;
        }
      }
      if (finalText) {
        onTranscript(finalText.trim(), true);
      } else if (interim) {
        onTranscript(interim, false);
      }
    };

    recog.onerror = (event) => {
      setListening(false);
      const msg =
        event.error === 'not-allowed' || event.error === 'service-not-allowed'
          ? locale === 'en'
            ? 'Microphone permission was denied.'
            : 'மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது.'
          : event.error === 'no-speech'
          ? locale === 'en'
            ? 'No speech detected. Try again.'
            : 'பேச்சு கண்டறியப்படவில்லை. மீண்டும் முயற்சிக்கவும்.'
          : locale === 'en'
          ? `Voice input error: ${event.error}`
          : `குரல் உள்ளீட்டு பிழை: ${event.error}`;
      onError?.(msg);
    };

    recog.onstart = () => setListening(true);
    recog.onend = () => setListening(false);

    try {
      recog.start();
      recognitionRef.current = recog;
    } catch {
      setListening(false);
    }
  };

  const stop = () => {
    recognitionRef.current?.stop();
  };

  if (!supported) {
    // Don't render anything if browser doesn't support Web Speech API —
    // users keep the text input.
    return null;
  }

  const toggle = () => {
    if (listening) stop();
    else start();
  };

  const label = listening
    ? locale === 'en'
      ? 'Stop recording'
      : 'பதிவை நிறுத்து'
    : locale === 'en'
    ? 'Speak your message'
    : 'உங்கள் செய்தியைப் பேசுங்கள்';

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      className={`flex items-center justify-center h-11 w-11 rounded-xl flex-shrink-0 transition-all disabled:opacity-40 ${
        listening
          ? 'bg-primary text-white animate-pulse'
          : 'border border-border text-text-secondary hover:text-primary hover:border-primary/40'
      }`}
      aria-label={label}
      aria-pressed={listening}
    >
      {listening ? (
        <MicOff className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Mic className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
