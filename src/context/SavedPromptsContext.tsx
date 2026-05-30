"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const STORAGE_KEY = "sintra_saved";

interface SavedCtx {
  saved: Set<number>;
  toggle: (id: number) => void;
  isSaved: (id: number) => boolean;
  clear: () => void;
}

const SavedPromptsContext = createContext<SavedCtx>({
  saved: new Set(),
  toggle: () => {},
  isSaved: () => false,
  clear: () => {},
});

export function SavedPromptsProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Set<number>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw) as number[]) : new Set();
    } catch { return new Set(); }
  });

  const toggle = (id: number) => {
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  const clear = () => {
    setSaved(new Set());
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return (
    <SavedPromptsContext.Provider value={{ saved, toggle, isSaved: id => saved.has(id), clear }}>
      {children}
    </SavedPromptsContext.Provider>
  );
}

export function useSavedPrompts() {
  return useContext(SavedPromptsContext);
}
