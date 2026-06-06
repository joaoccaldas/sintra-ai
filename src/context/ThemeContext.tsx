"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light" | "forest" | "ocean";

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  // Initialise from localStorage (runs once on client)
  useEffect(() => {
    const stored = localStorage.getItem("sintra-theme") as Theme | null;
    if (stored && ["dark", "light", "forest", "ocean"].includes(stored)) {
      setThemeState(stored);
      document.documentElement.dataset.theme = stored;
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("sintra-theme", t);
    document.documentElement.dataset.theme = t;
  }, []);

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() { return useContext(Ctx); }
