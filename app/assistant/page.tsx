'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useLocale } from '@/lib/locale-context';
import { Send, Sparkles, RotateCcw, AlertTriangle, User, Bot } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const suggestedPromptsEn = [
  'Help me find mental health support in Jaffna',
  'How do I start a small business with my phone?',
  'Explain diabetes warning signs simply',
  'Draft a respectful message to my child\'s teacher',
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const suggestedPrompts = locale === 'en' ? suggestedPromptsEn : suggestedPromptsTa;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage: Message = { role: 'user', content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);

    // Add an empty assistant message that we'll stream into
    setMessages([...newMessages, { role: 'assistant', content: '' }]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          locale,
        }),
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setMessages([]);
    setInput('');
    setIsStreaming(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-lg font-bold text-text-primary">
              {locale === 'en' ? 'Ask Aram' : 'அறத்திடம் கேளுங்கள்'}
            </h1>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            {locale === 'en'
              ? 'Your bilingual guide to resources and support'
              : 'வளங்கள் மற்றும் ஆதரவுக்கான உங்கள் இரு மொழி வழிகாட்டி'}
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors"
            aria-label={locale === 'en' ? 'Start new chat' : 'புதிய அரட்டையைத் தொடங்கு'}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            {locale === 'en' ? 'New chat' : 'புதியது'}
          </button>
        )}
      </div>

      {/* Disclaimer */}
      {messages.length === 0 && (
        <div className="flex items-start gap-2 rounded-lg bg-secondary/10 p-3 mb-4">
          <AlertTriangle className="h-4 w-4 text-secondary-dark mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-xs text-text-secondary leading-relaxed">
            {locale === 'en'
              ? 'This assistant helps you find resources and answers. It is not a substitute for medical, legal, or professional advice. If you are in crisis, call Sumithrayo on +94 11 268 2535 (24/7) or dial 1990 for emergencies.'
              : 'இந்த உதவியாளர் வளங்கள் மற்றும் பதில்களைக் கண்டறிய உதவுகிறார். இது மருத்துவ, சட்ட அல்லது தொழில்முறை ஆலோசனைக்கு மாற்று அல்ல. நீங்கள் நெருக்கடியில் இருந்தால், சுமித்ரயோவை +94 11 268 2535 (24/7) அல்லது 1990 என்ற அவசர எண்ணை அழையுங்கள்.'}
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-secondary mb-2">
              {locale === 'en' ? 'Try asking:' : 'இதைக் கேட்டுப் பாருங்கள்:'}
            </p>
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                className="block w-full text-left rounded-xl bg-surface border border-border p-3 text-sm text-text-primary hover:border-primary/30 hover:bg-background transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : (
          messages.map((msg, i) => (
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
                className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap ${
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
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-border pt-3">
        <textarea
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
              ? 'Ask anything in English or Tamil...'
              : 'ஆங்கிலம் அல்லது தமிழில் எதையும் கேளுங்கள்...'
          }
          rows={1}
          className="flex-1 resize-none rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/40 max-h-32"
          disabled={isStreaming}
          aria-label={locale === 'en' ? 'Message' : 'செய்தி'}
        />
        <button
          type="submit"
          disabled={!input.trim() || isStreaming}
          className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary text-white disabled:opacity-40 hover:bg-primary-dark transition-colors flex-shrink-0"
          aria-label={locale === 'en' ? 'Send' : 'அனுப்பு'}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
