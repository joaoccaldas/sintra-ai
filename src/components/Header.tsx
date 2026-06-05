"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, Search, Bookmark, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import TesseractMark from "./TesseractMark";
import { useLanguage } from "@/context/LanguageContext";
import { useSavedPrompts } from "@/context/SavedPromptsContext";
import { BASE_PATH } from "@/lib/data";

const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });
const SavedPanel     = dynamic(() => import("./SavedPanel"),     { ssr: false });

interface Props { total: number; }

// ── Navigation groups ─────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: "Discover",
    items: [
      { href: `${BASE_PATH}/news/`,       label: "AI News",        desc: "Curated AI timeline" },
      { href: `${BASE_PATH}/topics/`,     label: "Topic Hubs",     desc: "Cross-silo views by theme" },
      { href: `${BASE_PATH}/ai-history/`, label: "AI History",     desc: "70 years of milestones" },
      { href: `${BASE_PATH}/ai-labs/`,    label: "AI Labs",        desc: "Lab profiles & model matrix" },
      { href: `${BASE_PATH}/research/`,   label: "Research",       desc: "Key papers in plain English" },
    ],
  },
  {
    label: "Learn",
    items: [
      { href: `${BASE_PATH}/learn/`,      label: "Learning Paths", desc: "Structured paths for every level" },
      { href: `${BASE_PATH}/guides/`,     label: "Guides",         desc: "Practical how-to guides" },
      { href: `${BASE_PATH}/resources/`,  label: "Resources",      desc: "APIs, frameworks & videos" },
      { href: `${BASE_PATH}/concepts/`,   label: "Concepts",       desc: "Core AI concepts explained" },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: `${BASE_PATH}/tools/`,           label: "AI Tools",  desc: "Curated tools directory" },
      { href: `${BASE_PATH}/models/`,          label: "Models",    desc: "Pricing, benchmarks & capabilities" },
      { href: `${BASE_PATH}/claude/`,          label: "Claude",    desc: "Models, products & capabilities" },
      { href: `${BASE_PATH}/google-ai-tools/`, label: "Google AI", desc: "Google's AI product suite" },
    ],
  },
];

// Map path segment → active group label
const PATH_TO_GROUP: Record<string, string> = {
  news: "Discover", topics: "Discover", "ai-history": "Discover", "ai-labs": "Discover", research: "Discover",
  learn: "Learn", guides: "Learn", resources: "Learn", concepts: "Learn",
  tools: "Reference", models: "Reference", claude: "Reference", "google-ai-tools": "Reference",
};

// ── Dropdown ──────────────────────────────────────────────────────────────────
function NavDropdown({
  group, active, open, onOpen, onClose,
}: {
  group: typeof NAV_GROUPS[0];
  active: boolean; open: boolean;
  onOpen: () => void; onClose: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        onClick={() => open ? onClose() : onOpen()}
        className={[
          "relative flex items-center gap-1 font-sans text-[13px] transition-colors duration-140 whitespace-nowrap",
          active || open ? "text-fg-1" : "text-fg-3 hover:text-fg-1",
        ].join(" ")}
        aria-expanded={open}
      >
        {group.label}
        <ChevronDown size={12} className={["transition-transform duration-150", open ? "rotate-180" : ""].join(" ")} />
        {active && (
          <span className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-bright" />
        )}
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-52 rounded-xl border border-violet/[0.18] bg-[#0b0c18]/96 backdrop-blur-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-1.5">
            {group.items.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="group flex flex-col px-3 py-2.5 rounded-lg hover:bg-violet/[0.1] transition-colors"
              >
                <span className="font-sans text-[13px] text-fg-1 group-hover:text-white transition-colors leading-snug">
                  {item.label}
                </span>
                <span className="font-mono text-[10px] text-fg-4 leading-snug">{item.desc}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
export default function Header({ total }: Props) {
  const { t, locale, toggle } = useLanguage();
  const { saved } = useSavedPrompts();
  const pathname = usePathname();

  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [paletteOpen,    setPaletteOpen]    = useState(false);
  const [savedPanelOpen, setSavedPanelOpen] = useState(false);
  const [openGroup,      setOpenGroup]      = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  // Derive active nav group from pathname
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const activeGroup = PATH_TO_GROUP[segment] ?? null;

  const handleGroupOpen = (label: string) => {
    clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const handleGroupClose = () => {
    closeTimer.current = setTimeout(() => setOpenGroup(null), 100);
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setPaletteOpen(p => !p); }
      if (e.key === "Escape") setOpenGroup(null);
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
          scrolled ? "bg-abyss/72 backdrop-blur-[14px] border-b border-violet/[0.12]" : "bg-transparent",
        ].join(" ")}
      >
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 flex items-center gap-2 md:gap-4 lg:gap-5">

          {/* Logo */}
          <a href={`${BASE_PATH}/`} className="flex items-center gap-2 shrink-0 text-violet-bright [filter:drop-shadow(0_0_12px_rgba(159,140,255,0.25))]" aria-label="Sintra Tesseract — home">
            <TesseractMark size={20} />
            <span className="font-serif text-[16px] md:text-[17px] text-fg-1 leading-none tracking-[0.005em]">
              Sintra <em className="italic text-violet-bright">Tesseract</em>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 ml-4">
            <a
              href={`${BASE_PATH}/#explore`}
              className={[
                "font-sans text-[13px] transition-colors duration-140 whitespace-nowrap",
                !activeGroup ? "text-fg-1" : "text-fg-3 hover:text-fg-1",
              ].join(" ")}
            >
              Library
            </a>
            {NAV_GROUPS.map(group => (
              <NavDropdown
                key={group.label}
                group={group}
                active={activeGroup === group.label}
                open={openGroup === group.label}
                onOpen={() => handleGroupOpen(group.label)}
                onClose={handleGroupClose}
              />
            ))}
          </nav>

          <div className="flex-1" />

          {/* ⌘K search */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden lg:flex items-center gap-2 h-8 px-3 rounded-lg bg-white/[0.04] border border-hairline font-mono text-[11px] text-fg-4 hover:text-fg-1 hover:border-violet/30 hover:bg-white/[0.07] transition-all"
            aria-label="Open search (⌘K)"
          >
            <Search size={12} className="shrink-0" />
            <span>Search</span>
            <kbd className="ml-0.5 text-[9px] px-1 py-0.5 rounded bg-white/[0.05] border border-hairline leading-none">⌘K</kbd>
          </button>

          {/* Saved prompts */}
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

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="hidden lg:inline-flex items-center gap-1 h-8 px-2.5 rounded-lg font-mono text-[11px] tracking-[0.06em] text-fg-4 hover:text-fg-1 hover:bg-white/[0.06] transition-all duration-150 shrink-0"
            aria-label={locale === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
            title={locale === "en" ? "Switch to Portuguese (PT-BR)" : "Switch to English (EN)"}
          >
            <Globe size={12} className="shrink-0" />
            {locale === "en" ? "PT" : "EN"}
          </button>

          {/* Mobile: search icon (opens ⌘K) + hamburger */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="lg:hidden flex items-center justify-center w-9 h-9 shrink-0 text-fg-3 hover:text-fg-1 transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
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
              <span className="font-serif text-[17px] text-fg-1">Sintra <em className="italic text-violet-bright">Tesseract</em></span>
            </a>
            <div className="flex items-center gap-3">
              <button
                onClick={toggle}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-violet/[0.12] border border-violet/30 font-mono text-[11px] tracking-[0.06em] font-medium text-fg-1 hover:bg-violet/25 transition-all"
                aria-label={locale === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
              >
                <Globe size={13} className="text-violet-bright shrink-0" />
                {locale === "en" ? "PT" : "EN"}
              </button>
              <button className="flex items-center justify-center w-10 h-10 -mr-2 text-fg-1" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="flex flex-col px-6 pt-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <a
              href="#explore"
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl py-3.5 border-b border-violet/[0.12] text-fg-1"
            >
              {t.nav_explore}
            </a>
            {NAV_GROUPS.map(group => (
              <div key={group.label} className="mb-2">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-violet-bright/50 pt-5 pb-1">
                  {group.label}
                </p>
                {group.items.map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between font-serif text-xl py-2.5 border-b border-violet/[0.08] text-fg-2 hover:text-fg-1 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>

          <div className="px-6 mt-6">
            <a href="#explore" onClick={() => setMobileOpen(false)} className="btn self-start">
              {t.nav_enter_library}
            </a>
            <span className="font-mono text-[11px] text-fg-3 tracking-[0.06em] mt-4 block">
              <b className="text-fg-1 font-medium">{total}</b>{" "}
              {locale === "pt" ? "casos de uso selecionados" : "use cases curated"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
