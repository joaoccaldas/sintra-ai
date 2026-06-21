"use client";

import { useState, useEffect } from "react";
import { Menu, Search, Bookmark, Globe } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import TesseractMark from "./TesseractMark";
import { useLanguage } from "@/context/LanguageContext";
import { useSavedPrompts } from "@/context/SavedPromptsContext";
import { useSidebar } from "@/context/SidebarContext";
import { BASE_PATH } from "@/lib/constants";

const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });
const SavedPanel     = dynamic(() => import("./SavedPanel"),     { ssr: false });

interface Props { total: number; }

// Breadcrumb label map
const PATH_LABEL: Record<string, string> = {
  news: "AI News", weekly: "Weekly Digest", topics: "Topic Hubs",
  "ai-history": "AI History", "ai-labs": "AI Labs", research: "Research",
  learn: "Learning Paths", guides: "Guides", resources: "Resources", concepts: "Concepts",
  tools: "AI Tools", models: "Models", claude: "Claude", "google-ai-tools": "Google AI",
  "token-calculator": "Cost Calc",
  collections: "Collections", prompts: "Prompt", videos: "Videos",
};

export default function Header({ total }: Props) {
  const { t, locale, toggle } = useLanguage();
  const { saved } = useSavedPrompts();
  const { setMobileOpen } = useSidebar();
  const pathname = usePathname();

  const [scrolled,       setScrolled]       = useState(false);
  const [paletteOpen,    setPaletteOpen]    = useState(false);
  const [savedPanelOpen, setSavedPanelOpen] = useState(false);

  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const crumb   = PATH_LABEL[segment];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setPaletteOpen(p => !p); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-3 focus:py-2 focus:rounded focus:bg-steel focus:text-fg-1 focus:outline focus:outline-violet-bright"
      >
        Skip to content
      </a>

      <header
        className={[
          "fixed top-0 right-0 z-30 h-16 flex items-center transition-all duration-200",
          "left-0 lg:left-[var(--sidebar-w)]",
          scrolled
            ? "bg-abyss/80 backdrop-blur-[14px] border-b border-violet/[0.10]"
            : "bg-transparent",
        ].join(" ")}
        style={{ transition: "left 240ms cubic-bezier(0.22,1,0.36,1), background 200ms" }}
      >
        <div className="w-full px-4 md:px-6 flex items-center gap-3">

          {/* Mobile: hamburger → opens sidebar drawer */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 shrink-0 text-fg-3 hover:text-fg-1 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>

          {/* Mobile: logo (desktop logo lives in sidebar) */}
          <a href={`${BASE_PATH}/`} className="lg:hidden flex items-center gap-2 text-violet-bright shrink-0">
            <TesseractMark size={18} />
            <span className="font-serif text-[15px] text-fg-1 leading-none">
              Sintra <em className="italic text-violet-bright">AI</em>
            </span>
          </a>

          {/* Desktop: breadcrumb */}
          {crumb && (
            <div className="hidden lg:flex items-center gap-2 text-fg-4 font-mono text-[11px] tracking-[0.06em]">
              <a href={`${BASE_PATH}/`} className="hover:text-fg-2 transition-colors">Library</a>
              <span>/</span>
              <span className="text-fg-2">{crumb}</span>
            </div>
          )}

          <div className="flex-1" />

          {/* ⌘K search pill */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg bg-white/[0.04] border border-hairline font-mono text-[11px] text-fg-4 hover:text-fg-1 hover:border-violet/30 hover:bg-white/[0.07] transition-all"
            aria-label="Search (⌘K)"
          >
            <Search size={12} className="shrink-0" />
            <span>Search</span>
            <kbd className="ml-0.5 text-[9px] px-1 py-0.5 rounded bg-white/[0.05] border border-hairline leading-none">⌘K</kbd>
          </button>

          {/* Mobile search icon */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="md:hidden flex items-center justify-center w-9 h-9 text-fg-3 hover:text-fg-1 transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Saved prompts */}
          <button
            onClick={() => setSavedPanelOpen(true)}
            className="relative flex items-center justify-center w-8 h-8 rounded-full border border-hairline text-fg-3 hover:text-violet-bright hover:border-violet/40 transition-all"
            aria-label={`Saved prompts${saved.size > 0 ? ` (${saved.size})` : ""}`}
          >
            <Bookmark size={14} />
            {saved.size > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-violet text-fg-on-violet font-mono text-[9px] font-bold leading-none">
                {saved.size > 9 ? "9+" : saved.size}
              </span>
            )}
          </button>

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="hidden lg:inline-flex items-center gap-1 h-8 px-2.5 rounded-lg font-mono text-[11px] tracking-[0.06em] text-fg-4 hover:text-fg-1 hover:bg-white/[0.06] transition-all shrink-0"
            aria-label={locale === "en" ? "Switch to Portuguese" : "Switch to English"}
          >
            <Globe size={12} className="shrink-0" />
            {locale === "en" ? "PT" : "EN"}
          </button>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <SavedPanel open={savedPanelOpen} onClose={() => setSavedPanelOpen(false)} />
    </>
  );
}
