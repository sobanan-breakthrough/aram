'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useLocale } from '@/lib/locale-context';
import { Send, Sparkles, RotateCcw, AlertTriangle, User, Bot, Volume2, VolumeX } from 'lucide-react';
import VoiceButton from '@/components/VoiceButton';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const suggestedPromptsEn = [
  'Help me find mental health support in Jaffna',
  'How do I start a small business with my phone?',
  'Explain diabetes warning signs simply',
  "Draft a respectful message to my child's teacher",
];

const suggestedPromptsTa = [
  'யாழ்ப்பாணத்தில் மனநல ஆதரவைக் கண்டறிய உதவுங்கள்',
  'என் தொலைபேசியில் சிறு வணிகத்தை எப்படி தொடங்குவது?',
  'நீரிழிவு எச்சரிக்கை அறிகுறிகளை எளிமையாக விளக்குங்கள்',
  'என் குழந்தையின் ஆசிரியருக்கு ஒரு மரியாதையான செய்தியை தயாரிக்கவும்',
];

export default function AssistantPage() {
  const { locale } = useLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const interimTextRef = useRef<string>('');

  useEffect(() => {
    setSpeechSupported(
      typeof window !== 'undefined' && 'speechSynthesis' in window
    );
  }, []);

  const suggestedPrompts = locale === 'en' ? suggestedPromptsEn : suggestedPromptsTa;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-grow textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  const speakText = (text: string) => {
    if (!speechEnabled || !speechSupported) return;
    try {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = locale === 'ta' ? 'ta-LK' : 'en-US';
      utter.rate = 1.0;
      utter.pitch = 1.0;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch {
      // silently ignore speech synth errors
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage: Message = { role: 'user', content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    interimTextRef.current = '';
    setIsStreaming(true);

    setMessages([...newMessages, { role: 'assistant', content: '' }]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, locale }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let errMsg = locale === 'en' ? 'Could not reach the assistant.' : 'உதவியாளரை அடைய முடியவில்லை.';
        try {
          const errData = await response.json();
          if (errData.error) errMsg = errData.error;
        } catch {}
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: `⚠️ ${errMsg}` };
          return updated;
        });
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: accumulated };
          return updated;
        });
      }

      // Speak the final reply if voice output is enabled
      if (accumulated && speechEnabled) {
        speakText(accumulated);
      }
    } catch (err) {
      const errorMsg = err instanceof Error && err.name === 'AbortError'
        ? (locale === 'en' ? 'Stopped.' : 'நிறுத்தப்பட்டது.')
        : (locale === 'en' ? 'Something went wrong. Please try again.' : 'ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.');
      setMessages(prev => {
        const updated = [...prev];
        if (updated[updated.length - 1]?.content === '') {
          updated[updated.length - 1] = { role: 'assistant', content: `⚠️ ${errorMsg}` };
        }
        return updated;
      });
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleVoiceTranscript = (text: string, isFinal: boolean) => {
    setVoiceError(null);
    if (isFinal) {
      // Commit final transcript into the input box, ready for the user to send
      // (or auto-send if they prefer — currently requires manual submit for
      // confirmation, avoiding accidental sends from background noise)
      const committed = (interimTextRef.current + text).trim();
      interimTextRef.current = '';
      setInput(prev => (prev ? `${prev} ${committed}`.trim() : committed));
    } else {
      // Show interim transcription in the input field
      interimTextRef.current = text;
      // Don't overwrite what user has already typed; append interim as preview
      // Simplest approach: replace input with the current interim text
      setInput(text);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    if (speechSupported) window.speechSynthesis?.cancel();
    setMessages([]);
    setInput('');
    interimTextRef.current = '';
    setIsStreaming(false);
  };

  const toggleSpeech = () => {
    if (speechEnabled && speechSupported) {
      window.speechSynthesis.cancel();
    }
    setSpeechEnabled(v => !v);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-8.5rem)] md:h-[calc(100dvh-7rem)] -mx-4 sm:mx-0">
      {/* Header */}
      <div className="flex items-start justify-between px-4 sm:px-0 mb-3 flex-shrink-0">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 flex-shrink-0">
            <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-text-primary leading-tight">
              {locale === 'en' ? 'Ask Aram' : 'அறத்திடம் கேளுங்கள்'}
            </h1>
            <p className="text-[13px] text-text-secondary mt-0.5 leading-snug">
              {locale === 'en'
                ? 'Your bilingual guide to resources'
                : 'வளங்களுக்கான உங்கள் இரு மொழி வழிகாட்டி'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {speechSupported && (
            <button
              onClick={toggleSpeech}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                speechEnabled
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background'
              }`}
              aria-label={
                speechEnabled
                  ? locale === 'en' ? 'Turn off voice output' : 'குரல் வெளியீட்டை அணை'
                  : locale === 'en' ? 'Turn on voice output' : 'குரல் வெளியீட்டை இயக்கு'
              }
              aria-pressed={speechEnabled}
            >
              {speechEnabled ? (
                <Volume2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
          {messages.length > 0 && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 h-10 px-3 text-sm text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-colors"
              aria-label={locale === 'en' ? 'Start new chat' : 'புதிய அரட்டையைத் தொடங்கு'}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{locale === 'en' ? 'New' : 'புதியது'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages area — scrollable */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-0">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <div className="flex items-start gap-2 rounded-lg bg-secondary/10 p-3">
              <AlertTriangle className="h-4 w-4 text-secondary-dark mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-[13px] text-text-secondary leading-relaxed">
                {locale === 'en'
                  ? 'Not a substitute for medical, legal, or professional advice. In crisis, call Sumithrayo on +94 11 268 2535 (24/7) or dial 1990 for emergencies.'
                  : 'மருத்துவ, சட்ட அல்லது தொழில்முறை ஆலோசனைக்கு மாற்று அல்ல. நெருக்கடியில், சுமித்ரயோவை +94 11 268 2535 (24/7) அல்லது 1990 என்ற அவசர எண்ணை அழையுங்கள்.'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
                {locale === 'en' ? 'Try asking' : 'இதைக் கேளுங்கள்'}
              </p>
              <div className="space-y-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    className="block w-full text-left rounded-xl bg-surface border border-border p-3 text-sm text-text-primary hover:border-primary/40 hover:bg-background transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pb-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  }`}
                  aria-hidden="true"
                >
                  {msg.role === 'user' ? (
                    <User className="h-3.5 w-3.5" />
                  ) : (
                    <Bot className="h-3.5 w-3.5" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-3.5 py-2.5 max-w-[82%] text-[15px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-tr-sm'
                      : 'bg-surface border border-border text-text-primary rounded-tl-sm'
                  }`}
                >
                  {msg.content || (
                    <span className="inline-flex gap-1 text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Voice error message */}
      {voiceError && (
        <div className="mx-4 sm:mx-0 mb-2 flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/20 p-2.5 text-xs text-primary-dark">
          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>{voiceError}</span>
        </div>
      )}

      {/* Input — sticky at bottom */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 border-t border-border bg-background pt-3 px-4 sm:px-0 flex-shrink-0"
      >
        <VoiceButton
          onTranscript={handleVoiceTranscript}
          onError={setVoiceError}
          disabled={isStreaming}
        />
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder={
            locale === 'en'
              ? 'Ask in English or Tamil...'
              : 'ஆங்கிலம் அல்லது தமிழில் கேளுங்கள்...'
          }
          rows={1}
          className="flex-1 resize-none rounded-xl border border-border bg-surface px-3.5 py-2.5 text-[15px] text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/40 min-h-[44px] max-h-40"
          disabled={isStreaming}
          aria-label={locale === 'en' ? 'Message' : 'செய்தி'}
        />
        <button
          type="submit"
          disabled={!input.trim() || isStreaming}
          className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors flex-shrink-0"
          aria-label={locale === 'en' ? 'Send message' : 'செய்தியை அனுப்பு'}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
