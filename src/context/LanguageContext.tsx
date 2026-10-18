"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import translations, { type Locale, type Translations } from "@/lib/i18n";

const LOCALE_KEY = "sintra_locale";

interface LanguageCtx {
  locale: Locale;
  t:      Translations;
  toggle: () => void;
}

const Ctx = createContext<LanguageCtx>({
  locale: "en",
  t:      translations.en,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Render "en" on the server and the first client paint so static prerender and
  // hydration agree; the stored preference or browser language is applied in the
  // effect below, right after mount.
  const [locale, setLocale] = useState<Locale>("en");

  // First mount: honour a saved choice, otherwise auto-detect from the browser
  // language (pt-BR / pt-* → Portuguese). Runs once.
  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored === "en" || stored === "pt") {
      setLocale(stored);
      return;
    }
    const nav = (navigator.languages?.[0] || navigator.language || "").toLowerCase();
    if (nav.startsWith("pt")) setLocale("pt");
  }, []);

  // Persist the active choice and keep <html lang> in sync for a11y/SEO.
  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const toggle = useCallback(() => setLocale(l => (l === "en" ? "pt" : "en")), []);
  return (
    <Ctx.Provider value={{ locale, t: translations[locale], toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLanguage() {
  return useContext(Ctx);
}
