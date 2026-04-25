'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface FavouritesContextValue {
  favourites: Set<string>;
  isFavourite: (id: string) => boolean;
  toggleFavourite: (id: string) => void;
  count: number;
}

const FavouritesContext = createContext<FavouritesContextValue>({
  favourites: new Set(),
  isFavourite: () => false,
  toggleFavourite: () => {},
  count: 0,
});

const STORAGE_KEY = 'aram-favourites';

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        if (Array.isArray(arr)) {
          setFavourites(new Set(arr));
        }
      }
    } catch {
      // Ignore — corrupt data, start fresh
    }
    setHydrated(true);
  }, []);

  // Persist on change (after initial hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favourites)));
    } catch {
      // Ignore quota errors etc.
    }
  }, [favourites, hydrated]);

  const isFavourite = useCallback((id: string) => favourites.has(id), [favourites]);

  const toggleFavourite = useCallback((id: string) => {
    setFavourites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <FavouritesContext.Provider
      value={{ favourites, isFavourite, toggleFavourite, count: favourites.size }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}
