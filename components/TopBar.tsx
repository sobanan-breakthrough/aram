'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, X, Bookmark } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import SearchBar from './SearchBar';
import { useLocale } from '@/lib/locale-context';
import { useFavourites } from '@/lib/favourites-context';

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { locale } = useLocale();
  const { count } = useFavourites();

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border no-print safe-top">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
        {searchOpen ? (
          <div className="flex items-center gap-2 w-full">
            <SearchBar autoFocus onClose={() => setSearchOpen(false)} />
            <button
              onClick={() => setSearchOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-background transition-colors"
              aria-label={locale === 'en' ? 'Close search' : 'தேடலை மூடு'}
            >
              <X className="h-5 w-5 text-text-secondary" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/"
              className="text-lg font-bold text-primary hover:opacity-90 transition-opacity flex items-center gap-2"
              aria-label="Aram home"
            >
              <span>Aram</span>
              <span className="text-border font-normal" aria-hidden="true">|</span>
              <span className="font-tamil">அறம்</span>
            </Link>
            <div className="flex items-center gap-1.5">
              <LanguageToggle />
              <Link
                href="/saved"
                className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-background transition-colors"
                aria-label={
                  locale === 'en'
                    ? `Saved resources${count > 0 ? ` (${count})` : ''}`
                    : `சேமித்த வளங்கள்${count > 0 ? ` (${count})` : ''}`
                }
              >
                <Bookmark className="h-5 w-5 text-text-secondary" aria-hidden="true" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-primary text-white text-[10px] font-bold px-1">
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-background transition-colors"
                aria-label={locale === 'en' ? 'Search' : 'தேடு'}
              >
                <Search className="h-5 w-5 text-text-secondary" aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
