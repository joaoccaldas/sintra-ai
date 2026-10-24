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
  locale: "pt",
  t:      translations.pt,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Brazil-first static HTML begins in Portuguese; a stored explicit English
  // preference applies after hydration. True /pt-br/ and /en/ routes are a
  // subsequent migration and must not be claimed as complete here.
  const [locale, setLocale] = useState<Locale>("pt");

  // First mount: restore the visitor's explicit choice. Brazil is the
  // default even when browser/device locale is English.
  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored === "en" || stored === "pt") setLocale(stored);
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
