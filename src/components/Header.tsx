"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, Search, Bookmark } from "lucide-react";
import dynamic from "next/dynamic";
import TesseractMark from "./TesseractMark";
import { useLanguage } from "@/context/LanguageContext";
import { useSavedPrompts } from "@/context/SavedPromptsContext";

const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });
const SavedPanel = dynamic(() => import("./SavedPanel"), { ssr: false });

interface Props {
  total: number;
}

import { BASE_PATH } from "@/lib/data";

export default function Header({ total }: Props) {
  const { t, locale, toggle } = useLanguage();
  const { saved } = useSavedPrompts();
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [paletteOpen,   setPaletteOpen]   = useState(false);
  const [savedPanelOpen, setSavedPanelOpen] = useState(false);

  const PRIMARY_LINKS = [
    { href: "#explore",             label: t.nav_explore },
    { href: `${BASE_PATH}/tools/`,  label: t.nav_tools,     external: true },
    { href: `${BASE_PATH}/news/`,   label: t.nav_news,      external: true },
    { href: `${BASE_PATH}/learn/`,  label: t.nav_learn,     external: true },
    { href: `${BASE_PATH}/claude/`, label: t.nav_claude,    external: true },
  ];

  const LINKS = [
    { href: "#explore",                      label: t.nav_explore },
    { href: `${BASE_PATH}/tools/`,           label: t.nav_tools,        external: true },
    { href: `${BASE_PATH}/news/`,            label: t.nav_news,         external: true },
    { href: `${BASE_PATH}/learn/`,           label: t.nav_learn,        external: true },
    { href: `${BASE_PATH}/claude/`,          label: t.nav_claude,       external: true },
    { href: `${BASE_PATH}/resources/`,       label: t.nav_resources,    external: true },
    { href: `${BASE_PATH}/concepts/`,        label: t.nav_concepts,     external: true },
    { href: `${BASE_PATH}/ai-history/`,      label: t.nav_ai_history,   external: true },
    { href: `${BASE_PATH}/ai-labs/`,         label: t.nav_ai_labs,      external: true },
    { href: `${BASE_PATH}/google-ai-tools/`, label: t.nav_google_tools, external: true },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(p => !p);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
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

          {/* Desktop nav — primary links only to avoid overflow */}
          <nav className="hidden lg:flex gap-5 ml-4">
            {PRIMARY_LINKS.map(l => (
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

          {/* ⌘K search trigger */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden lg:flex items-center gap-2 h-8 px-3 rounded-lg bg-white/[0.04] border border-hairline font-mono text-[11px] text-fg-4 hover:text-fg-1 hover:border-violet/30 hover:bg-white/[0.07] transition-all"
            aria-label="Open search (⌘K)"
          >
            <Search size={12} className="shrink-0" />
            <span>Search</span>
            <kbd className="ml-0.5 text-[9px] px-1 py-0.5 rounded bg-white/[0.05] border border-hairline leading-none">⌘K</kbd>
          </button>

          {/* Saved prompts badge */}
          <button
            onClick={() => setSavedPanelOpen(true)}
            className="relative flex items-center justify-center w-8 h-8 rounded-full border border-hairline text-fg-3 hover:text-violet-bright hover:border-violet/40 transition-all"
            aria-label={`Saved prompts${saved.size > 0 ? ` (${saved.size})` : ""}`}
            title="Saved prompts"
          >
            <Bookmark size={14} />
            {saved.size > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-violet text-white font-mono text-[9px] font-bold leading-none">
                {saved.size > 9 ? "9+" : saved.size}
              </span>
            )}
          </button>

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

          <div className="hidden md:flex shrink-0">
            <a href="#explore" className="btn">{t.nav_enter_library}</a>
          </div>

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

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <SavedPanel open={savedPanelOpen} onClose={() => setSavedPanelOpen(false)} />

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-abyss/95 backdrop-blur-md animate-scrim-in">
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
