"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { USE_CASES, DISC_COUNTS, matchesUseCase, DIFF_COLOR, type UseCase } from "@/lib/data";
import { CAROUSEL_ITEMS } from "@/lib/carouselData";
import UseCaseCard from "./UseCaseCard";
import RecentlyViewed from "./RecentlyViewed";
import { trackRecentlyViewed } from "@/lib/hooks";
import { getCopyCounts } from "@/lib/copyCountStore";

// Loaded once a user opens a card — defers react-markdown / remark-gfm / the
// AnimatePresence modal out of this (already lazy) section's chunk.
const ExpandedCard = dynamic(() => import("./ExpandedCard"), { ssr: false });

const PAGE_SIZE = 12;

const DIFFICULTIES = ["all", "beginner", "intermediate", "advanced", "expert"] as const;
type DiffFilter = (typeof DIFFICULTIES)[number];

const SORTS = [
  { id: "default", label: "Featured" },
  { id: "most-used", label: "Most used" },
  { id: "newest", label: "Newest" },
  { id: "quickest", label: "Quickest" },
] as const;
type SortId = (typeof SORTS)[number]["id"];

/** Parse an est_time string like "10 min" / "1 hr" into minutes for sorting. */
function timeToMinutes(t: string): number {
  if (!t) return Number.MAX_SAFE_INTEGER;
  const n = parseFloat(t);
  if (isNaN(n)) return Number.MAX_SAFE_INTEGER;
  return /hr|hour/i.test(t) ? n * 60 : n;
}

function SectionHead({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet/60" />
      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4">{label}</span>
      {count !== undefined && (
        <span className="font-mono text-[10px] text-fg-4 opacity-50">· {count}</span>
      )}
      <span className="flex-1 h-px bg-hairline" />
    </div>
  );
}

export default function PromptLibrary() {
  const [selectedCat, setSelectedCat] = useState<string>(() => {
    if (typeof window === "undefined") return CAROUSEL_ITEMS[0].id;
    return new URLSearchParams(window.location.search).get("cat") || CAROUSEL_ITEMS[0].id;
  });
  const [search, setSearch] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") || "";
  });
  const [difficulty, setDifficulty] = useState<DiffFilter>(() => {
    if (typeof window === "undefined") return "all";
    const d = new URLSearchParams(window.location.search).get("diff");
    return d && (DIFFICULTIES as readonly string[]).includes(d) ? (d as DiffFilter) : "all";
  });
  const [sortBy, setSortBy] = useState<SortId>(() => {
    if (typeof window === "undefined") return "default";
    const s = new URLSearchParams(window.location.search).get("sort");
    if (s === "used") return "most-used"; // back-compat with the old ?sort=used param
    return s && SORTS.some(o => o.id === s) ? (s as SortId) : "default";
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [expanded, setExpanded]         = useState<UseCase | null>(null);
  const [expandedItems, setExpandedItems] = useState<UseCase[]>([]);
  const [copyCounts, setCopyCounts]     = useState<Record<string, number>>({});

  useEffect(() => { setCopyCounts(getCopyCounts()); }, []);

  // Keep cat/search/diff/sort in the URL so filtered views are shareable/bookmarkable.
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCat !== CAROUSEL_ITEMS[0].id) params.set("cat", selectedCat);
    if (search) params.set("q", search);
    if (difficulty !== "all") params.set("diff", difficulty);
    if (sortBy !== "default") params.set("sort", sortBy);
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [selectedCat, search, difficulty, sortBy]);

  // Reset pagination when any filter changes.
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [selectedCat, search, difficulty, sortBy]);

  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    let base = isSearching
      ? USE_CASES.filter(u => matchesUseCase(u, search))
      : USE_CASES.filter(u => u.category === selectedCat);

    if (difficulty !== "all") base = base.filter(u => u.difficulty === difficulty);

    if (sortBy === "most-used") {
      base = [...base].sort((a, b) => (copyCounts[b.id] ?? 0) - (copyCounts[a.id] ?? 0));
    } else if (sortBy === "newest") {
      base = [...base].sort((a, b) => (b.dateAdded || "").localeCompare(a.dateAdded || ""));
    } else if (sortBy === "quickest") {
      base = [...base].sort((a, b) => timeToMinutes(a.est_time) - timeToMinutes(b.est_time));
    }
    return base;
  }, [selectedCat, search, isSearching, difficulty, sortBy, copyCounts]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const openCard = (item: UseCase) => {
    const ctx = isSearching ? filtered : USE_CASES.filter(u => u.category === item.category);
    setExpanded(item);
    setExpandedItems(ctx);
    trackRecentlyViewed({ id: item.id, slug: item.slug, title: item.title, category: item.category });
    window.history.replaceState(null, "", `#uc-${item.id}`);
  };

  return (
    <div>
      <SectionHead label="Prompt Library" count={USE_CASES.length} />

      {/* Recently viewed — self-hides when localStorage has no history */}
      <RecentlyViewed onOpen={openCard} allItems={USE_CASES} />

      {/* Category rail — clean 3x3 grid on mobile (9 categories), horizontal
          scrolling pill row from sm up where labels fit on one line */}
      <div className="grid grid-cols-3 gap-1.5 mb-4 sm:hidden">
        {CAROUSEL_ITEMS.map(cat => {
          const active = cat.id === selectedCat && !isSearching;
          return (
            <button
              key={cat.id}
              onClick={() => { setSelectedCat(cat.id); setSearch(""); setVisibleCount(PAGE_SIZE); }}
              className="flex flex-col items-center justify-center gap-0.5 text-center font-mono text-[9px] leading-tight tracking-[0.04em] uppercase px-1.5 py-2.5 rounded-xl border transition-all duration-150"
              style={{
                background:  active ? "rgba(159,140,255,0.12)" : "transparent",
                borderColor: active ? "rgba(159,140,255,0.50)" : "rgba(255,255,255,0.08)",
                color:       active ? "#B6A6FF" : "#6b6a8a",
              }}
            >
              <span>{cat.label}</span>
              <span className="opacity-40 text-[8px]">{DISC_COUNTS[cat.id] ?? 0}</span>
            </button>
          );
        })}
      </div>
      <div className="hidden sm:block overflow-x-auto scrollbar-none mb-4">
        <div className="flex gap-1.5 min-w-max">
          {CAROUSEL_ITEMS.map(cat => {
            const active = cat.id === selectedCat && !isSearching;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCat(cat.id); setSearch(""); setVisibleCount(PAGE_SIZE); }}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border transition-all duration-150 whitespace-nowrap"
                style={{
                  background:  active ? "rgba(159,140,255,0.12)" : "transparent",
                  borderColor: active ? "rgba(159,140,255,0.50)" : "rgba(255,255,255,0.08)",
                  color:       active ? "#B6A6FF" : "#6b6a8a",
                }}
              >
                {cat.label}
                <span className="opacity-40 text-[9px]">{DISC_COUNTS[cat.id] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-4">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Search ${USE_CASES.length} prompts…`}
          className="w-full bg-white/[0.04] border border-hairline rounded-lg pl-8 pr-8 py-2 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/50 transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-4 hover:text-fg-2 transition-colors">
            <X size={12} />
          </button>
        )}
      </div>

      {/* Difficulty filter + sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Filter by difficulty">
          {DIFFICULTIES.map(d => {
            const active = difficulty === d;
            return (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                aria-pressed={active}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.04em] capitalize px-3 py-1.5 rounded-full border transition-all duration-150"
                style={{
                  background:  active ? "rgba(159,140,255,0.12)" : "transparent",
                  borderColor: active ? "rgba(159,140,255,0.5)" : "rgba(255,255,255,0.08)",
                  color:       active ? "#B6A6FF" : "#6b6a8a",
                }}
              >
                {d !== "all" && (
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: DIFF_COLOR[d] }} />
                )}
                {d === "all" ? "All levels" : d}
              </button>
            );
          })}
        </div>

        <label className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-4">
          Sort
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortId)}
            className="bg-white/[0.04] border border-hairline rounded-lg px-2.5 py-1.5 font-mono text-[11px] text-fg-2 outline-none focus:border-violet/50 transition-colors cursor-pointer"
          >
            {SORTS.map(o => (
              <option key={o.id} value={o.id} className="bg-night text-fg-1">{o.label}</option>
            ))}
          </select>
        </label>
      </div>

      {isSearching && (
        <p className="font-mono text-[11px] text-fg-4 mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          <span className="text-fg-3"> for &ldquo;{search}&rdquo;</span>
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-mono text-[13px] text-fg-4">No prompts match your filters.</p>
          <button onClick={() => { setSearch(""); setDifficulty("all"); }}
            className="mt-3 font-mono text-[11px] text-violet-bright hover:underline">Clear filters</button>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCat}-${search}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {visible.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <UseCaseCard item={item} onOpen={openCard} copyCount={copyCounts[item.id] ?? 0} />
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
              <span className="font-mono text-[10px] text-fg-4">{visibleCount} of {filtered.length}</span>
            </div>
          )}
        </>
      )}

      <ExpandedCard
        item={expanded}
        onClose={() => { setExpanded(null); window.history.replaceState(null, "", "#"); }}
        items={expandedItems}
      />
    </div>
  );
}
