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
const SavedPanel = dynamic(() => import("./SavedPanel"), { ssr: false });

interface Props { total: number; }

const PATH_LABEL: Record<string, string> = {
  news: "AI News", live: "Live Feed", automate: "Automation Hub", weekly: "Weekly Digest", topics: "Topic Hubs",
  "ai-history": "AI History", "ai-labs": "AI Labs", research: "Research",
  learn: "Learning Paths", guides: "Guides", resources: "Resources", concepts: "Concepts",
  tools: "AI Tools", models: "Models", claude: "Claude", "google-ai-tools": "Google AI",
  "token-calculator": "Cost Calc", collections: "Collections", prompts: "Prompt", videos: "Videos",
};

export default function Header({ total: _total }: Props) {
  const { locale, toggle } = useLanguage();
  const { saved } = useSavedPrompts();
  const { setMobileOpen } = useSidebar();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [savedPanelOpen, setSavedPanelOpen] = useState(false);

  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const crumb = PATH_LABEL[segment];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(open => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
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
        <div className="w-full px-4 md:px-6 flex items-center gap-2 md:gap-3">
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-9 h-9 shrink-0 text-fg-3 hover:text-fg-1 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          <a href={BASE_PATH + "/"} className="flex items-center gap-2 min-w-0 shrink-0">
            <TesseractMark size={28} />
            <span className="hidden sm:inline font-serif text-[18px] leading-none tracking-[-0.01em] text-fg-1">
              Sintra <em className="italic text-violet-bright">AI</em>
            </span>
          </a>

          {crumb && (
            <>
              <span className="hidden md:block h-4 w-px bg-hairline" />
              <span className="hidden md:block font-mono text-[11px] tracking-[0.10em] uppercase text-fg-4 truncate">
                {crumb}
              </span>
            </>
          )}

          <div className="flex-1" />

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg border border-hairline text-fg-4 hover:text-fg-2 hover:border-violet/30 transition-colors"
            aria-label="Open search"
          >
            <Search size={14} />
            <span className="font-mono text-[11px]">Search</span>
            <kbd className="font-mono text-[9px] text-fg-4 border border-hairline rounded px-1 py-0.5">⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={() => setSavedPanelOpen(true)}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg text-fg-4 hover:text-fg-2 hover:bg-white/[0.05] transition-colors"
            aria-label="Open saved prompts"
          >
            <Bookmark size={16} />
            {saved.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-violet text-white font-mono text-[9px] flex items-center justify-center">
                {saved.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={toggle}
            className="sintra-runtime-language flex items-center gap-1.5 h-9 px-2.5 rounded-lg text-fg-4 hover:text-fg-2 hover:bg-white/[0.05] transition-colors"
            aria-label={locale === "en" ? "Switch to Portuguese" : "Switch to English"}
          >
            <Globe size={15} />
            <span className="font-mono text-[11px] uppercase">{locale === "en" ? "PT" : "EN"}</span>
          </button>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <SavedPanel open={savedPanelOpen} onClose={() => setSavedPanelOpen(false)} />
    </>
  );
}
