'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

type Locale = 'en' | 'ta';

interface LocaleContextValue {
  locale: Locale;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  toggleLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('aram-locale') as Locale | null;
    if (saved === 'en' || saved === 'ta') {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale(prev => {
      const next = prev === 'en' ? 'ta' : 'en';
      localStorage.setItem('aram-locale', next);
      return next;
    });
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
