"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowLeft, Search, Copy, Check } from "lucide-react";
import dynamic from "next/dynamic";
import { USE_CASES, UseCase, DISC_COUNTS, DIFF_COLOR, matchesUseCase } from "@/lib/data";
import { CAROUSEL_ITEMS } from "./CategoryCarousel3D";
import UseCaseCard from "./UseCaseCard";
import ExpandedCard from "./ExpandedCard";
import { useLanguage } from "@/context/LanguageContext";

const CategoryCarousel3D = dynamic(() => import("./CategoryCarousel3D"), { ssr: false });

const DIFFS = ["all", "beginner", "intermediate", "advanced", "expert"] as const;

const POPULAR_TASKS = [
  "variance analysis", "meeting notes", "Python script",
  "executive summary", "data visualization", "competitor research",
  "forecast model", "cold email",
];

const CAT_ACCENT: Record<string, string> = {
  "quick-wins":     "#F4D06F",
  "productivity":   "#8FE3D2",
  "writing":        "#F08CA8",
  "research":       "#B6A6FF",
  "finance":        "#6EE7A0",
  "data-analytics": "#E8C089",
  "coding":         "#9F8CFF",
  "creative-ai":    "#5EEAD4",
  "game-advanced":  "#E9D9B6",
};

function SearchResultRow({ item, onOpen }: { item: UseCase; onOpen: (item: UseCase) => void }) {
  const [copied, setCopied] = useState(false);
  const catColor = CAT_ACCENT[item.category] || "#9F8CFF";
  const quickCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="flex gap-4 py-4 px-4 rounded-xl border border-white/[0.06] hover:border-violet/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: catColor }} />
          <span className="font-mono text-[9px] tracking-[0.14em] uppercase" style={{ color: catColor }}>{item.category}</span>
          <span className="text-white/20">·</span>
          <span className="font-mono text-[9px] text-fg-4 capitalize">{item.difficulty}</span>
        </div>
        <h3 className="font-serif text-[17px] leading-[1.18] text-fg-1 mb-1.5 group-hover:text-violet-bright transition-colors">
          {item.title}
        </h3>
        <p className="font-sans text-[12.5px] text-fg-3 leading-[1.5] line-clamp-2">
          {item.outcome || item.desc}
        </p>
      </div>
      <div className="flex flex-col gap-2 shrink-0 pt-0.5 items-end">
        <button
          onClick={quickCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet/10 border border-violet/30 font-mono text-[10px] text-violet-bright hover:bg-violet/20 hover:border-violet/60 transition-all whitespace-nowrap"
        >
          {copied ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy prompt</>}
        </button>
        <button
          onClick={() => onOpen(item)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/[0.08] font-mono text-[10px] text-fg-4 hover:text-fg-2 hover:border-white/20 transition-all whitespace-nowrap"
        >
          Full details
        </button>
      </div>
    </div>
  );
}

interface Props {
  heroSearch?: { query: string; version: number };
}

export default function CategoryBrowser({ heroSearch }: Props) {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [selectedIdx, setSelectedIdx]   = useState(0);
  const [browsingIdx, setBrowsingIdx]   = useState<number | null>(null);
  const [expanded, setExpanded]         = useState<UseCase | null>(null);
  const [expandedItems, setExpandedItems] = useState<UseCase[]>([]);

  // Global search — seeded by hero search prop
  const [globalSearch, setGlobalSearch] = useState("");
  useEffect(() => {
    if (heroSearch?.query) setGlobalSearch(heroSearch.query);
  }, [heroSearch?.version]); // eslint-disable-line react-hooks/exhaustive-deps

  // Panel search/filter state
  const [panelSearch, setPanelSearch]   = useState("");
  const [panelDiff, setPanelDiff]       = useState<string>("all");

  const CARD_VARIANTS = useMemo(() => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24, scale: prefersReducedMotion ? 1 : 0.97 },
    show: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0.1 }
        : { duration: 0.35, delay: Math.min(i, 12) * 0.045, ease: [0.22, 1, 0.36, 1] as const },
    }),
    exit: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95, transition: { duration: prefersReducedMotion ? 0.1 : 0.15 } },
  }), [prefersReducedMotion]);

  const selected  = CAROUSEL_ITEMS[selectedIdx];
  const browsing  = browsingIdx !== null ? CAROUSEL_ITEMS[browsingIdx] : null;

  // ── URL hash deep-linking ────────────────────────────────────────────────────
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const idx = CAROUSEL_ITEMS.findIndex(c => c.id === hash);
    if (idx >= 0) {
      setSelectedIdx(idx);
      setBrowsingIdx(idx);
    }
  }, []);

  useEffect(() => {
    if (browsingIdx !== null) {
      window.history.replaceState(null, "", `#${CAROUSEL_ITEMS[browsingIdx].id}`);
    }
    // Don't reset to #explore on close — let the section anchor remain
  }, [browsingIdx]);

  // ── Global search results — uses shared matchesUseCase helper ───────────────
  const globalResults = useMemo(() => {
    if (!globalSearch.trim()) return [];
    return USE_CASES.filter(c => matchesUseCase(c, globalSearch));
  }, [globalSearch]);

  // ── Cases for current browsing category ─────────────────────────────────────
  const cases = useMemo(
    () => browsing ? USE_CASES.filter(u => u.category === browsing.id) : [],
    [browsing]
  );

  // Filtered cases (search + difficulty)
  // Panel search uses the same matchesUseCase helper as global search
  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      if (panelDiff !== "all" && c.difficulty !== panelDiff) return false;
      if (panelSearch && !matchesUseCase(c, panelSearch)) return false;
      return true;
    });
  }, [cases, panelSearch, panelDiff]);

  // Reset filters when panel opens
  useEffect(() => {
    if (browsingIdx !== null) {
      setPanelSearch("");
      setPanelDiff("all");
    }
  }, [browsingIdx]);

  const prev = () => setSelectedIdx(i => (i - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  const next = () => setSelectedIdx(i => (i + 1) % CAROUSEL_ITEMS.length);

  // Clicking the 3D shape selects it; clicking again (already selected) opens the panel
  const handleSelect = useCallback((idx: number) => {
    if (idx === selectedIdx) {
      setBrowsingIdx(idx);
    } else {
      setSelectedIdx(idx);
    }
  }, [selectedIdx]);

  const closeBrowsing = () => setBrowsingIdx(null);

  const handleOpenExpanded = useCallback((item: UseCase) => {
    setExpanded(item);
    setExpandedItems(filteredCases);
  }, [filteredCases]);

  return (
    <section id="explore" className="relative bg-void overflow-hidden">
      {/* ── Global search ────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-2xl mx-auto px-6 pt-10 pb-0">
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
          <input
            type="search"
            value={globalSearch}
            onChange={e => setGlobalSearch(e.target.value)}
            placeholder={`Search ${USE_CASES.length} use cases by task, tool, or keyword…`}
            aria-label="Search all use cases"
            className="w-full bg-white/[0.04] border border-hairline rounded-xl pl-9 pr-9 py-3 font-mono text-[13px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/60 transition-colors"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fg-4 hover:text-fg-2 transition-colors"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Popular task chips */}
        {!globalSearch && (
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="font-mono text-[10px] text-fg-4 tracking-[0.08em] uppercase self-center mr-1">Try:</span>
            {POPULAR_TASKS.map(task => (
              <button
                key={task}
                onClick={() => setGlobalSearch(task)}
                className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/[0.1] text-fg-3 hover:text-fg-1 hover:border-violet/40 hover:bg-violet/[0.07] transition-all capitalize"
              >
                {task}
              </button>
            ))}
          </div>
        )}

        {globalSearch && (
          <p className="font-mono text-[11px] text-fg-4 mt-2 ml-0.5">
            {globalResults.length} result{globalResults.length !== 1 ? "s" : ""}
            {globalResults.length > 0 && <span> — click Copy prompt to use immediately</span>}
          </p>
        )}
      </div>

      {/* ── Global search results (compact copy-first rows) ──────────── */}
      <AnimatePresence>
        {globalSearch.trim() && (
          <motion.div
            key="global-results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.22 }}
            className="relative z-10 max-w-2xl mx-auto px-6 pb-16 mt-4"
          >
            {globalResults.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-mono text-[13px] text-fg-4">No use cases match &ldquo;{globalSearch}&rdquo;.</p>
                <button
                  onClick={() => setGlobalSearch("")}
                  className="mt-3 font-mono text-[11px] text-violet-bright hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {globalResults.map(item => (
                  <SearchResultRow
                    key={item.id}
                    item={item}
                    onOpen={item => { setExpanded(item); setExpandedItems(globalResults); }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── 3D Carousel — full height on md+, compact on mobile ────── */}
        <div className="relative h-[38vh] md:h-[56vh] min-h-[260px] md:min-h-[360px] max-h-[520px] w-full">
          <CategoryCarousel3D selectedIndex={selectedIdx} onSelect={handleSelect} />

          <button onClick={prev} className="carousel-arrow carousel-arrow--left" aria-label="Previous category">
            <ChevronLeft size={22} />
          </button>
          <button onClick={next} className="carousel-arrow carousel-arrow--right" aria-label="Next category">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* ── Active category label ────────────────────────────────────── */}
        <div className="relative z-10 text-center py-8 md:py-10 px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="eyebrow mb-3" style={{ color: selected.hex }}>
                {selected.cosmicName.toUpperCase()}
              </p>
              <h2
                className="font-serif font-light text-[clamp(32px,4.5vw,64px)] leading-[1.03] tracking-[-0.02em] text-fg-1"
                style={{ textShadow: `0 0 60px ${selected.hex}30` }}
              >
                {selected.label}
              </h2>
              <p className="font-sans text-[15px] text-fg-3 mt-2 max-w-sm mx-auto leading-[1.5]">
                {selected.essence}
              </p>
              <span className="font-mono text-[11px] text-fg-4 tracking-[0.08em] mt-3 block">
                {String(selectedIdx + 1).padStart(2, "0")} / {String(CAROUSEL_ITEMS.length).padStart(2, "0")}
                &nbsp;·&nbsp;
                {t.carousel_use_cases(DISC_COUNTS[selected.id] ?? 0)}
              </span>

              {/* Explore CTA */}
              <button
                onClick={() => setBrowsingIdx(selectedIdx)}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-current font-mono text-[11px] tracking-[0.1em] uppercase transition-all duration-200 hover:bg-white/5"
                style={{ color: selected.hex, borderColor: `${selected.hex}60` }}
              >
                {t.carousel_explore_cta}
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigator */}
          <div className="flex justify-center gap-2 mt-6">
            {CAROUSEL_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setSelectedIdx(i)}
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{
                  background: i === selectedIdx ? item.hex : "rgba(255,255,255,0.15)",
                  transform:  i === selectedIdx ? "scale(1.4)" : "scale(1)",
                  boxShadow:  i === selectedIdx ? `0 0 8px ${item.hex}` : "none",
                }}
                aria-label={item.label}
              />
            ))}
          </div>

          {/* Category chip rail — quick-select fallback */}
          <div className="mt-6 px-4 pb-1">
            <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:justify-center md:gap-2">
              {CAROUSEL_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedIdx(i); setBrowsingIdx(i); }}
                  className="font-mono text-[10px] tracking-[0.07em] uppercase px-3 py-2 rounded-full border transition-all duration-150 whitespace-nowrap text-center"
                  style={{
                    background:  i === selectedIdx ? `${item.hex}20` : "transparent",
                    borderColor: i === selectedIdx ? `${item.hex}70` : "#ffffff15",
                    color:       i === selectedIdx ? item.hex : "#6b6a8a",
                  }}
                  aria-current={i === selectedIdx ? "true" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Domain panel (full-screen overlay) ───────────────────────── */}
      <AnimatePresence>
        {browsing && (
          <motion.div
            key="domain-panel"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-void overflow-y-auto"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            {/* Panel header */}
            <div
              className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-hairline bg-void/95 backdrop-blur-md"
              style={{ boxShadow: `0 1px 0 ${browsing.hex}18` }}
            >
              <button
                onClick={closeBrowsing}
                className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-fg-3 hover:text-fg-1 transition-colors"
              >
                <ArrowLeft size={14} /> {t.carousel_back}
              </button>

              <div className="text-center">
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: browsing.hex }}>
                  {browsing.cosmicName}
                </p>
                <p className="font-sans text-[13px] font-medium text-fg-1">{browsing.label}</p>
              </div>

              <button
                onClick={closeBrowsing}
                className="w-8 h-8 flex items-center justify-center rounded-full text-fg-3 hover:text-fg-1 hover:bg-white/8 transition-all"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Accent line */}
            <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${browsing.hex}60, transparent)` }} />

            {/* Search + difficulty filter bar */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-4 flex items-center gap-3 flex-wrap border-b border-hairline/50">
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
                <input
                  type="search"
                  value={panelSearch}
                  onChange={e => setPanelSearch(e.target.value)}
                  placeholder="Search use cases…"
                  className="w-full bg-white/[0.04] border border-hairline rounded-lg pl-8 pr-3 py-1.5 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/60 transition-colors"
                />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {DIFFS.map(d => (
                  <button
                    key={d}
                    onClick={() => setPanelDiff(d)}
                    className="font-mono text-[10px] tracking-[0.06em] px-2.5 py-1 rounded-full border transition-all duration-150 capitalize"
                    style={{
                      background:  panelDiff === d ? (d === "all" ? "#9F8CFF22" : (DIFF_COLOR as Record<string, string>)[d] + "22") : "transparent",
                      borderColor: panelDiff === d ? (d === "all" ? "#9F8CFF88" : (DIFF_COLOR as Record<string, string>)[d] + "88") : "#ffffff18",
                      color:       panelDiff === d ? (d === "all" ? "#B6A6FF"   : (DIFF_COLOR as Record<string, string>)[d]) : "#6b6a8a",
                    }}
                  >
                    {d === "all" ? "All levels" : d}
                  </button>
                ))}
              </div>
              {(panelSearch || panelDiff !== "all") && (
                <span className="font-mono text-[11px] text-fg-4 ml-auto">
                  {filteredCases.length} result{filteredCases.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Cards grid */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-10 md:py-14">
              {filteredCases.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-mono text-[13px] text-fg-4">No use cases match your filter.</p>
                  <button
                    onClick={() => { setPanelSearch(""); setPanelDiff("all"); }}
                    className="mt-4 font-mono text-[11px] text-violet-bright hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {filteredCases.map((item, i) => {
                      const featured = i === 0 && filteredCases.length >= 4;
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          custom={i}
                          variants={CARD_VARIANTS}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          className={featured ? "sm:col-span-2 lg:col-span-2" : ""}
                        >
                          <UseCaseCard
                            item={item}
                            onOpen={handleOpenExpanded}
                            onTagFilter={tag => { closeBrowsing(); setGlobalSearch(tag); }}
                            isFeatured={featured}
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ExpandedCard item={expanded} onClose={() => setExpanded(null)} items={expandedItems} />
    </section>
  );
}
