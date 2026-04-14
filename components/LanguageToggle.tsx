'use client';

import { useLocale } from '@/lib/locale-context';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-text-primary border border-border hover:bg-background transition-colors"
      aria-label={locale === 'en' ? 'Switch to Tamil' : 'ஆங்கிலத்திற்கு மாறு'}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span className="font-semibold">{locale === 'en' ? 'த' : 'EN'}</span>
    </button>
  );
}
