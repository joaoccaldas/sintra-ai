"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex items-center gap-7">
          <a href="#" className="flex items-center gap-2.5 text-violet-bright [filter:drop-shadow(0_0_12px_rgba(159,140,255,0.25))]" aria-label="Sintra Tesseract — home">
            <TesseractMark size={20} />
            <span className="font-serif text-[17px] text-fg-1 leading-none tracking-[0.005em]">
              Sintra <em className="italic text-violet-bright">Tesseract</em>
            </span>
          </a>

          <nav className="hidden md:flex gap-6 ml-7">
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

          <span className="hidden sm:inline font-mono text-[11px] text-fg-3 tracking-[0.06em] whitespace-nowrap">
            <b className="text-fg-1 font-medium">{total}</b> {locale === "pt" ? "casos de uso" : "use cases"}
          </span>

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="hidden sm:inline-flex items-center justify-center h-7 px-2.5 rounded border border-violet/[0.22] font-mono text-[10px] tracking-[0.08em] uppercase text-fg-3 hover:text-fg-1 hover:border-violet/60 transition-all duration-140"
            aria-label={locale === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
          >
            {locale === "en" ? "PT" : "EN"}
          </button>

          <a href="#library" className="btn hidden sm:inline-flex">{t.nav_enter_library}</a>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 text-fg-1"
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
            <a href="#" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 text-violet-bright">
              <TesseractMark size={20} />
              <span className="font-serif text-[17px] text-fg-1">
                Sintra <em className="italic text-violet-bright">Tesseract</em>
              </span>
            </a>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { toggle(); }}
                className="flex items-center justify-center h-7 px-2.5 rounded border border-violet/[0.22] font-mono text-[10px] tracking-[0.08em] uppercase text-fg-3 hover:text-fg-1 transition-all"
                aria-label={locale === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
              >
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
              href="#library"
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
