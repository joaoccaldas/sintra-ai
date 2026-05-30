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
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem(LOCALE_KEY) as Locale | null) ?? "en";
  });

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
