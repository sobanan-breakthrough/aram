'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import { Sparkles } from 'lucide-react';

// Desktop-only floating Ask Aram pill. On mobile, the action lives in the
// bottom nav itself, so we hide this to avoid overlap with content/nav.
export default function AssistantFAB() {
  const pathname = usePathname();
  const { locale } = useLocale();

  if (pathname === '/assistant') return null;

  return (
    <Link
      href="/assistant"
      aria-label={locale === 'en' ? 'Open Ask Aram assistant' : 'அறம் உதவியாளரை திற'}
      className="hidden md:inline-flex fixed z-40 bottom-6 right-6 items-center gap-2 rounded-full bg-primary text-white shadow-lg hover:shadow-xl hover:bg-primary-dark active:scale-95 transition-all no-print px-4 py-3"
    >
      <Sparkles className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span className="text-sm font-semibold whitespace-nowrap">
        {locale === 'en' ? 'Ask Aram' : 'அறம்'}
      </span>
    </Link>
  );
}
