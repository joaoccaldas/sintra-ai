"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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
  const [saved, setSaved] = useState<Set<number>>(() => new Set());

  // Match static HTML during hydration, then restore the visitor's saved prompts.
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(raw)) setSaved(new Set(raw.filter(id => typeof id === "number")));
    } catch { /* Keep the empty state if browser storage is unavailable. */ }
  }, []);

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
