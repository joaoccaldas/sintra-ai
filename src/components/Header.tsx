"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import TesseractMark from "./TesseractMark";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  total: number;
}

import { BASE_PATH } from "@/lib/data";

export default function Header({ total }: Props) {
  const { t, locale, toggle } = useLanguage();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const LINKS = [
    { href: "#explore",                      label: t.nav_explore },
    { href: `${BASE_PATH}/google-ai-tools/`, label: t.nav_google_tools, external: true },
    { href: `${BASE_PATH}/concepts/`,        label: t.nav_concepts,     external: true },
    { href: `${BASE_PATH}/ai-history/`,      label: t.nav_ai_history,   external: true },
    { href: `${BASE_PATH}/ai-labs/`,         label: t.nav_ai_labs,      external: true },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 h-16 flex items-center transition-all duration-240 ease-out-custom",
          scrolled
            ? "bg-abyss/72 backdrop-blur-[14px] border-b border-violet/[0.12]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 flex items-center gap-2 md:gap-4 lg:gap-6">
          <a href={`${BASE_PATH}/`} className="flex items-center gap-2 shrink-0 text-violet-bright [filter:drop-shadow(0_0_12px_rgba(159,140,255,0.25))]" aria-label="Sintra Tesseract — home">
            <TesseractMark size={20} />
            <span className="font-serif text-[16px] md:text-[17px] text-fg-1 leading-none tracking-[0.005em]">
              Sintra <em className="italic text-violet-bright">Tesseract</em>
            </span>
          </a>

          {/* Desktop nav — only shows at lg+ to avoid overflow */}
          <nav className="hidden lg:flex gap-5 ml-4">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={[
                  "font-sans text-[13px] transition-colors duration-140 ease-out-custom whitespace-nowrap",
                  l.external
                    ? "text-cyan-ice/70 hover:text-cyan-ice"
                    : "text-fg-3 hover:text-fg-1",
                ].join(" ")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex-1" />

          <span className="hidden lg:inline font-mono text-[11px] text-fg-3 tracking-[0.06em] whitespace-nowrap">
            <b className="text-fg-1 font-medium">{total}</b> {locale === "pt" ? "casos de uso" : "use cases"}
          </span>

          {/* Language toggle — pill */}
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-violet/[0.12] border border-violet/30 font-mono text-[11px] tracking-[0.06em] font-medium text-fg-1 hover:bg-violet/25 hover:border-violet/60 transition-all duration-150 shrink-0"
            aria-label={locale === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
            title={locale === "en" ? "Switch to Portuguese (PT-BR)" : "Switch to English (EN)"}
          >
            <Globe size={13} className="text-violet-bright shrink-0" />
            {locale === "en" ? "PT" : "EN"}
          </button>

          <a href="#explore" className="btn hidden md:inline-flex shrink-0">{t.nav_enter_library}</a>

          {/* Hamburger — visible below lg where nav is hidden */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 shrink-0 text-fg-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-abyss/95 backdrop-blur-md animate-scrim-in">
          <div className="flex items-center justify-between h-16 px-6">
            <a href={`${BASE_PATH}/`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 text-violet-bright">
              <TesseractMark size={20} />
              <span className="font-serif text-[17px] text-fg-1">
                Sintra <em className="italic text-violet-bright">Tesseract</em>
              </span>
            </a>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { toggle(); }}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-violet/[0.12] border border-violet/30 font-mono text-[11px] tracking-[0.06em] font-medium text-fg-1 hover:bg-violet/25 transition-all"
                aria-label={locale === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
              >
                <Globe size={13} className="text-violet-bright shrink-0" />
                {locale === "en" ? "PT" : "EN"}
              </button>
              <button
                className="flex items-center justify-center w-10 h-10 -mr-2 text-fg-1"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <nav className="flex flex-col px-6 pt-8 gap-4">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "font-serif text-3xl py-2 border-b border-violet/[0.12]",
                  l.external ? "text-cyan-ice" : "text-fg-1",
                ].join(" ")}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#explore"
              onClick={() => setMobileOpen(false)}
              className="btn mt-6 self-start"
            >
              {t.nav_enter_library}
            </a>
            <span className="font-mono text-[11px] text-fg-3 tracking-[0.06em] mt-6">
              <b className="text-fg-1 font-medium">{total}</b> {locale === "pt" ? "casos de uso selecionados" : "use cases curated"}
            </span>
          </nav>
        </div>
      )}
    </>
  );
}
