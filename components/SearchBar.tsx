'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { searchAllContent } from '@/lib/search';
import type { ContentItem } from '@/lib/types';
import Link from 'next/link';

interface SearchBarProps {
  autoFocus?: boolean;
  onClose?: () => void;
}

const pillarPaths: Record<string, string> = {
  wellbeing: '/wellbeing',
  send: '/send',
  health: '/health',
  technology: '/technology',
  community: '/community',
  education: '/education',
  diaspora: '/diaspora',
  shared: '/',
};

export default function SearchBar({ autoFocus, onClose }: SearchBarProps) {
  const { locale } = useLocale();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ pillar: string; items: ContentItem[] }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const grouped = searchAllContent(query.trim());
    setResults(grouped);
  }, [query]);

  return (
    <div className="flex-1 relative">
      <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2">
        <Search className="h-4 w-4 text-text-secondary flex-shrink-0" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={locale === 'en' ? 'Search resources...' : 'வளங்களைத் தேடுங்கள்...'}
          className="bg-transparent w-full text-sm text-text-primary placeholder:text-text-secondary outline-none"
          aria-label={locale === 'en' ? 'Search' : 'தேடு'}
        />
      </div>

      {query.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-text-secondary text-center">
              {locale === 'en' ? 'No results found' : 'முடிவுகள் எதுவும் கிடைக்கவில்லை'}
            </p>
          ) : (
            results.map(group => (
              <div key={group.pillar}>
                <div className="px-3 py-1.5 bg-background text-xs font-semibold text-text-secondary uppercase tracking-wide">
                  {group.pillar}
                </div>
                {group.items.map(item => (
                  <Link
                    key={item.id}
                    href={pillarPaths[group.pillar] || '/'}
                    onClick={() => {
                      setQuery('');
                      onClose?.();
                    }}
                    className="block px-3 py-2.5 hover:bg-background transition-colors border-b border-border last:border-0"
                  >
                    <p className="text-sm font-medium text-text-primary">
                      {locale === 'en' ? item.titleEn : item.titleTa}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                      {locale === 'en' ? item.bodyEn : item.bodyTa}
                    </p>
                  </Link>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
