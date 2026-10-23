"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light" | "forest" | "ocean";

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "light", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  // Parent ond.ai is light-first. Respect an explicitly stored user theme.
  useEffect(() => {
    const stored = localStorage.getItem("sintra-theme") as Theme | null;
    if (stored && ["dark", "light", "forest", "ocean"].includes(stored)) {
      setThemeState(stored);
      document.documentElement.dataset.theme = stored;
    } else {
      setThemeState("light");
      document.documentElement.dataset.theme = "light";
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
