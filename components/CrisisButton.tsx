'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import { LifeBuoy } from 'lucide-react';
import CrisisModal from './CrisisModal';

// Desktop-only floating "Get Help" button. On mobile, the Get Help action lives
// in the bottom nav (see BottomNav). Suppresses on /assistant where crisis info
// is inline in the chat UI.
export default function CrisisButton() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);

  if (pathname === '/assistant') return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={
          locale === 'en'
            ? 'Get help now — emergency contacts'
            : 'இப்போது உதவி பெற — அவசர தொடர்புகள்'
        }
        className="hidden md:inline-flex fixed z-40 bottom-6 left-6 items-center gap-2 rounded-full bg-white text-primary border-2 border-primary shadow-lg hover:bg-primary hover:text-white active:scale-95 transition-all no-print px-4 py-3"
      >
        <LifeBuoy className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span className="text-sm font-semibold whitespace-nowrap">
          {locale === 'en' ? 'Get Help' : 'உதவி'}
        </span>
      </button>
      <CrisisModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
