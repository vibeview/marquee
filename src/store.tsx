import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// My list is a set of title ids persisted on the device. The visible count
// is always derived from the set, never stored.
const STORAGE_KEY = 'marquee.mylist.v1';

type MyList = {
  ids: ReadonlySet<string>;
  loaded: boolean;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
};

const Ctx = createContext<MyList | null>(null);

export function MyListProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<ReadonlySet<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (cancelled) return;
        if (raw) {
          const parsed: unknown = JSON.parse(raw);
          if (Array.isArray(parsed)) setIds(new Set(parsed.filter((x) => typeof x === 'string')));
        }
      })
      .catch((err) => console.warn('[mylist] load failed', err))
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...next])).catch((err) =>
        console.warn('[mylist] save failed', err),
      );
      return next;
    });
  }, []);

  const value = useMemo<MyList>(
    () => ({ ids, loaded, has: (id) => ids.has(id), toggle }),
    [ids, loaded, toggle],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMyList(): MyList {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useMyList must be used inside MyListProvider');
  return ctx;
}
