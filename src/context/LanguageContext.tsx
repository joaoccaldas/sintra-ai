"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import translations, { type Locale, type Translations } from "@/lib/i18n";

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
  const [locale, setLocale] = useState<Locale>("en");
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
