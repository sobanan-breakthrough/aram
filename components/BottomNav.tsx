'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import { Home, LifeBuoy, Sparkles, Bookmark, Menu } from 'lucide-react';
import CrisisModal from './CrisisModal';
import MoreSheet from './MoreSheet';
import { useFavourites } from '@/lib/favourites-context';

// Mobile bottom nav: single row of 5 items.
//  1. Home              → /
//  2. Get Help (modal)  → opens CrisisModal in place
//  3. Ask Aram          → /assistant  (centered, raised, brand-coloured)
//  4. Saved             → /saved
//  5. More (sheet)      → opens MoreSheet with all pillars + extras
//
// This replaces the previous 2-row 8-item nav + floating FABs, which were
// overlapping content on mobile and felt cluttered.
export default function BottomNav() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const { count } = useFavourites();
  const [crisisOpen, setCrisisOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const isHome = pathname === '/';
  const isAssistant = pathname.startsWith('/assistant');
  const isSaved = pathname.startsWith('/saved');

  // The desktop has its own TopTabNav with all pillars, so we hide the entire
  // bottom nav on md+ screens.
  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border no-print safe-bottom md:hidden"
        aria-label={locale === 'en' ? 'Main navigation' : 'முதன்மை வழிசெலுத்தல்'}
      >
        <div className="grid grid-cols-5 items-stretch">
          {/* Home */}
          <Link
            href="/"
            aria-label={locale === 'en' ? 'Home' : 'முகப்பு'}
            aria-current={isHome ? 'page' : undefined}
            className={`flex flex-col items-center justify-center py-2 px-1 gap-0.5 transition-colors ${
              isHome ? 'text-primary' : 'text-text-secondary'
            }`}
          >
            <Home className="h-[20px] w-[20px]" aria-hidden="true" strokeWidth={isHome ? 2.5 : 2} />
            <span className="text-[10px] leading-tight font-medium">
              {locale === 'en' ? 'Home' : 'முகப்பு'}
            </span>
          </Link>

          {/* Get Help — opens crisis modal in place. Outline red treatment to
              communicate safety without overwhelming the nav with colour. */}
          <button
            onClick={() => setCrisisOpen(true)}
            aria-label={locale === 'en' ? 'Get help — emergency contacts' : 'உதவி பெற — அவசர தொடர்புகள்'}
            className="flex flex-col items-center justify-center py-2 px-1 gap-0.5 text-primary transition-colors"
          >
            <LifeBuoy className="h-[20px] w-[20px]" aria-hidden="true" strokeWidth={2.25} />
            <span className="text-[10px] leading-tight font-semibold">
              {locale === 'en' ? 'Get Help' : 'உதவி'}
            </span>
          </button>

          {/* Ask Aram — primary action, centered, slightly raised/filled. */}
          <Link
            href="/assistant"
            aria-label={locale === 'en' ? 'Ask Aram — AI assistant' : 'அறம் உதவியாளர்'}
            aria-current={isAssistant ? 'page' : undefined}
            className="flex flex-col items-center justify-start py-1.5 px-1 gap-0.5 transition-colors"
          >
            <div
              className={`flex items-center justify-center w-11 h-11 rounded-full shadow-md transition-all ${
                isAssistant
                  ? 'bg-primary-dark text-white ring-2 ring-primary/30'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className={`text-[10px] leading-tight font-semibold mt-0.5 ${isAssistant ? 'text-primary' : 'text-text-primary'}`}>
              {locale === 'en' ? 'Ask Aram' : 'அறம்'}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/saved"
            aria-label={
              locale === 'en'
                ? `Saved${count > 0 ? ` (${count})` : ''}`
                : `சேமித்தது${count > 0 ? ` (${count})` : ''}`
            }
            aria-current={isSaved ? 'page' : undefined}
            className={`relative flex flex-col items-center justify-center py-2 px-1 gap-0.5 transition-colors ${
              isSaved ? 'text-primary' : 'text-text-secondary'
            }`}
          >
            <div className="relative">
              <Bookmark className="h-[20px] w-[20px]" aria-hidden="true" strokeWidth={isSaved ? 2.5 : 2} fill={isSaved ? 'currentColor' : 'none'} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center min-w-[16px] h-[16px] rounded-full bg-primary text-white text-[9px] font-bold px-1 leading-none">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </div>
            <span className="text-[10px] leading-tight font-medium">
              {locale === 'en' ? 'Saved' : 'சேமித்தது'}
            </span>
          </Link>

          {/* More — opens sheet with all pillars */}
          <button
            onClick={() => setMoreOpen(true)}
            aria-label={locale === 'en' ? 'More sections' : 'மேலும் பகுதிகள்'}
            aria-expanded={moreOpen}
            className="flex flex-col items-center justify-center py-2 px-1 gap-0.5 text-text-secondary transition-colors"
          >
            <Menu className="h-[20px] w-[20px]" aria-hidden="true" strokeWidth={2} />
            <span className="text-[10px] leading-tight font-medium">
              {locale === 'en' ? 'More' : 'மேலும்'}
            </span>
          </button>
        </div>
      </nav>

      <CrisisModal open={crisisOpen} onClose={() => setCrisisOpen(false)} />
      <MoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}
