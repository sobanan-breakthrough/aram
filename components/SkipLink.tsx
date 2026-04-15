'use client';

import { useLocale } from '@/lib/locale-context';

export default function SkipLink() {
  const { locale } = useLocale();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:shadow-lg no-print"
    >
      {locale === 'en' ? 'Skip to main content' : 'முதன்மை உள்ளடக்கத்திற்கு செல்'}
    </a>
  );
}
