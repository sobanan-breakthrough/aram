'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import SearchBar from './SearchBar';

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border no-print">
      <div className="flex items-center justify-between px-4 h-14">
        {searchOpen ? (
          <div className="flex items-center gap-2 w-full">
            <SearchBar autoFocus onClose={() => setSearchOpen(false)} />
            <button
              onClick={() => setSearchOpen(false)}
              className="flex items-center justify-center p-2"
              aria-label="Close search"
            >
              <X className="h-5 w-5 text-text-secondary" />
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-lg font-bold text-primary">
              Aram <span className="text-text-secondary font-normal">|</span>{' '}
              <span className="font-tamil">அறம்</span>
            </h1>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center p-2 rounded-full hover:bg-background transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-text-secondary" />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
