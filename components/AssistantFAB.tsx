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
      aria-label={locale === 'en' ? 'Open Ask Aram assistant' : 'அறம் உதவியாளரை திற'}
      className="fixed z-40 bottom-[5.5rem] md:bottom-6 right-4 md:right-6 inline-flex w-auto items-center gap-2 rounded-full bg-primary text-white shadow-lg hover:shadow-xl hover:bg-primary-dark active:scale-95 transition-all no-print px-4 py-3"
      style={{ width: 'auto' }}
    >
      <Sparkles className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span className="text-sm font-semibold whitespace-nowrap">
        {locale === 'en' ? 'Ask Aram' : 'அறம்'}
      </span>
    </Link>
  );
}
