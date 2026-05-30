"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { USE_CASES, UseCase, DISC_COUNTS, matchesUseCase } from "@/lib/data";
import { CAROUSEL_ITEMS } from "./CategoryCarousel3D";
import UseCaseCard from "./UseCaseCard";
import ExpandedCard from "./ExpandedCard";
import { trackRecentlyViewed } from "@/lib/hooks";

const PAGE_SIZE = 12;

interface Props {
  heroSearch?: { query: string; version: number };
}

export default function CategoryBrowser({ heroSearch }: Props) {
  const prefersReducedMotion = useReducedMotion();

  const [selectedCat, setSelectedCat] = useState<string>(CAROUSEL_ITEMS[0].id);
  const [search, setSearch]           = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [expanded, setExpanded]         = useState<UseCase | null>(null);
  const [expandedItems, setExpandedItems] = useState<UseCase[]>([]);

  // Seed from hero search
  useEffect(() => {
    if (heroSearch?.query) setSearch(heroSearch.query);
  }, [heroSearch?.version]); // eslint-disable-line react-hooks/exhaustive-deps

  // URL hash deep-linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith("uc-")) {
      const ucId = parseInt(hash.slice(3), 10);
      const uc = USE_CASES.find(u => u.id === ucId);
      if (uc) {
        setSelectedCat(uc.category);
        setExpanded(uc);
        setExpandedItems(USE_CASES.filter(u => u.category === uc.category));
        trackRecentlyViewed({ id: uc.id, slug: uc.slug, title: uc.title, category: uc.category });
      }
      return;
    }
    const match = CAROUSEL_ITEMS.findIndex(c => c.id === hash);
    if (match >= 0) setSelectedCat(CAROUSEL_ITEMS[match].id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update URL when category changes (only when not searching)
  useEffect(() => {
    if (!search.trim()) {
      window.history.replaceState(null, "", `#${selectedCat}`);
    }
  }, [selectedCat]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset pagination on filter change
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [selectedCat, search]);

  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    if (isSearching) return USE_CASES.filter(u => matchesUseCase(u, search));
    return USE_CASES.filter(u => u.category === selectedCat);
  }, [selectedCat, search, isSearching]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const openCard = useCallback((item: UseCase) => {
    const ctx = isSearching ? filtered : USE_CASES.filter(u => u.category === item.category);
    setExpanded(item);
    setExpandedItems(ctx);
    trackRecentlyViewed({ id: item.id, slug: item.slug, title: item.title, category: item.category });
    window.history.replaceState(null, "", `#uc-${item.id}`);
  }, [filtered, isSearching]);

  const clearFilters = useCallback(() => { setSearch(""); }, []);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 md:px-8 pb-24 pt-10">

      {/* ── Category tab rail ──────────────────────────────────────── */}
      <div className="overflow-x-auto scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 mb-5">
        <div className="flex gap-1.5 min-w-max">
          {CAROUSEL_ITEMS.map(cat => {
            const active = cat.id === selectedCat && !isSearching;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCat(cat.id); setSearch(""); }}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] uppercase px-3.5 py-2 rounded-full border transition-all duration-150 whitespace-nowrap"
                style={{
                  background:  active ? "rgba(159,140,255,0.14)" : "transparent",
                  borderColor: active ? "rgba(159,140,255,0.55)" : "rgba(255,255,255,0.10)",
                  color:       active ? "#B6A6FF" : "#6b6a8a",
                }}
                aria-current={active ? "true" : undefined}
              >
                {cat.label}
                <span className="opacity-50 text-[9px]">{DISC_COUNTS[cat.id] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Search ───────────────────────────────────────────────── */}
      <div className="relative mb-5 max-w-sm">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Search ${USE_CASES.length} prompts…`}
          className="w-full bg-white/[0.04] border border-hairline rounded-lg pl-8 pr-8 py-2 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/50 transition-colors"
        />
        {search && (
          <button
            onClick={clearFilters}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-4 hover:text-fg-2 transition-colors"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* ── Result count ─────────────────────────────────────────── */}
      {isSearching && (
        <p className="font-mono text-[11px] text-fg-4 mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          <span className="text-fg-3"> for &ldquo;{search}&rdquo;</span>
        </p>
      )}

      {/* ── Cards ─────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-mono text-[13px] text-fg-4">No prompts match your filters.</p>
          <button onClick={clearFilters} className="mt-3 font-mono text-[11px] text-violet-bright hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCat}-${search}`}
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {visible.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <UseCaseCard item={item} onOpen={openCard} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {hasMore && (
            <div className="flex flex-col items-center gap-1 mt-10">
              <button
                onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                className="font-mono text-[11px] tracking-[0.08em] uppercase px-6 py-3 rounded-full border border-white/[0.10] text-fg-3 hover:border-violet/40 hover:text-violet-bright transition-all"
              >
                Show {Math.min(PAGE_SIZE, filtered.length - visibleCount)} more
              </button>
              <span className="font-mono text-[10px] text-fg-4">
                {visibleCount} of {filtered.length}
              </span>
            </div>
          )}
        </>
      )}

      <ExpandedCard
        item={expanded}
        onClose={() => {
          setExpanded(null);
          window.history.replaceState(null, "", `#${selectedCat}`);
        }}
        items={expandedItems}
      />
    </section>
  );
}
