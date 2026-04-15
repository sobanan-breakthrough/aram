'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import { Sparkles } from 'lucide-react';

export default function AssistantFAB() {
  const pathname = usePathname();
  const { locale } = useLocale();

  // Hide on the assistant page itself
  if (pathname === '/assistant') return null;

  return (
    <Link
      href="/assistant"
      aria-label={locale === 'en' ? 'Open assistant' : 'உதவியாளரை திற'}
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-primary text-white shadow-lg px-4 py-3 hover:bg-primary-dark transition-all active:scale-95 no-print"
    >
      <Sparkles className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm font-semibold">
        {locale === 'en' ? 'Ask Aram' : 'அறம்'}
      </span>
    </Link>
  );
}
