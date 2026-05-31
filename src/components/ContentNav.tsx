"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { BASE_PATH, USE_CASES, DISC_COUNTS, matchesUseCase, UseCase } from "@/lib/data";
import { AI_NEWS } from "@/lib/newsData";
import { AI_TOOLS } from "@/lib/toolsData";
import { CONCEPTS } from "@/lib/concepts";
import { CAROUSEL_ITEMS } from "./CategoryCarousel3D";
import UseCaseCard from "./UseCaseCard";
import ExpandedCard from "./ExpandedCard";
import { trackRecentlyViewed } from "@/lib/hooks";
import { Search, X } from "lucide-react";

const MAIN_TABS = [
  { id: "prompts",  label: "Prompts"  },
  { id: "tools",    label: "Tools"    },
  { id: "news",     label: "News"     },
  { id: "concepts", label: "Concepts" },
  { id: "models",   label: "Models"   },
] as const;

type Tab = typeof MAIN_TABS[number]["id"];

const PAGE_SIZE = 12;

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.14 } },
};

const subVariants = {
  hidden: { height: 0, opacity: 0 },
  show:   { height: "auto", opacity: 1, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { height: 0, opacity: 0, transition: { duration: 0.16 } },
};

/* ── Tool preview ───────────────────────────────────────────────────── */
function ToolsPreview() {
  const items = useMemo(() => AI_TOOLS.slice(0, 9), []);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((tool, i) => (
          <motion.a
            key={tool.id}
            href={`${BASE_PATH}/tools/${tool.id}/`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.035, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="group flex items-start gap-3 p-4 rounded-lg border border-hairline bg-white/[0.02] hover:border-violet/30 hover:bg-violet/[0.03] transition-all"
          >
            <span
              className="mt-0.5 w-2 h-2 rounded-full shrink-0 bg-violet/60"
            />
            <div className="min-w-0">
              <p className="font-mono text-[11px] text-fg-1 font-medium truncate group-hover:text-violet-bright transition-colors">
                {tool.name}
              </p>
              <p className="font-sans text-[12px] text-fg-4 line-clamp-1 mt-0.5">{tool.tagline}</p>
            </div>
            <ExternalLink size={10} className="shrink-0 mt-1 text-fg-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <a href={`${BASE_PATH}/tools/`} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-violet-bright hover:text-fg-1 transition-colors">
          Browse all {AI_TOOLS.length} tools <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
}

/* ── News preview ───────────────────────────────────────────────────── */
function NewsPreview() {
  const items = useMemo(() =>
    [...AI_NEWS]
      .filter(n => n.significance === "landmark" || n.significance === "major")
      .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
      .slice(0, 8),
  []);
  return (
    <div>
      <div className="flex flex-col divide-y divide-hairline">
        {items.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.url ?? `${BASE_PATH}/news/`}
            target={item.url ? "_blank" : undefined}
            rel={item.url ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
            className="group flex items-start gap-4 py-3.5 hover:bg-white/[0.015] -mx-2 px-2 rounded transition-colors"
          >
            <span className="font-mono text-[9px] text-fg-4 whitespace-nowrap mt-0.5 w-16 shrink-0">
              {item.dateDay ? `${item.dateDay} ` : ""}{item.date}
            </span>
            <span className="flex-1 font-sans text-[13px] text-fg-2 leading-[1.4] group-hover:text-fg-1 transition-colors line-clamp-2">
              {item.significance === "landmark" && (
                <span className="inline-block mr-1.5 font-mono text-[8px] tracking-[0.1em] uppercase text-amber-400/80 align-middle">★</span>
              )}
              {item.title}
            </span>
            <span className="font-mono text-[9px] text-fg-4 shrink-0 mt-0.5">{item.provider}</span>
          </motion.a>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <a href={`${BASE_PATH}/news/`} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-violet-bright hover:text-fg-1 transition-colors">
          All {AI_NEWS.length} news items <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
}

/* ── Concepts preview ───────────────────────────────────────────────── */
function ConceptsPreview() {
  const items = useMemo(() => CONCEPTS.slice(0, 9), []);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((c, i) => (
          <motion.a
            key={c.id}
            href={`${BASE_PATH}/concepts/#${c.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.035, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="group flex flex-col gap-1 p-4 rounded-lg border border-hairline bg-white/[0.02] hover:border-violet/30 hover:bg-violet/[0.03] transition-all"
          >
            <span className="font-mono text-[10px] text-violet-bright">{c.icon} {c.term}</span>
            <p className="font-sans text-[12px] text-fg-4 line-clamp-2 leading-[1.45]">{c.tagline}</p>
          </motion.a>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <a href={`${BASE_PATH}/concepts/`} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-violet-bright hover:text-fg-1 transition-colors">
          Browse all {CONCEPTS.length} concepts <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
}

/* ── Models preview ─────────────────────────────────────────────────── */
function ModelsPreview() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <p className="font-mono text-[11px] text-fg-4">Full model comparison with benchmarks</p>
      <a href={`${BASE_PATH}/models/`} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-violet-bright hover:text-fg-1 transition-colors">
        Open models page <ArrowRight size={12} />
      </a>
    </div>
  );
}

/* ── Prompt grid ────────────────────────────────────────────────────── */
function PromptGrid({ selectedCat }: { selectedCat: string }) {
  const [search, setSearch]   = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [expanded, setExpanded]         = useState<UseCase | null>(null);
  const [expandedItems, setExpandedItems] = useState<UseCase[]>([]);

  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    if (isSearching) return USE_CASES.filter(u => matchesUseCase(u, search));
    return USE_CASES.filter(u => u.category === selectedCat);
  }, [selectedCat, search, isSearching]);

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
      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
        <input
          type="search"
          value={search}
          onChange={e => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
          placeholder={`Search ${USE_CASES.length} prompts…`}
          className="w-full bg-white/[0.04] border border-hairline rounded-lg pl-8 pr-8 py-2 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/50 transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-4 hover:text-fg-2 transition-colors">
            <X size={12} />
          </button>
        )}
      </div>
      {isSearching && (
        <p className="font-mono text-[11px] text-fg-4 mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          <span className="text-fg-3"> for &ldquo;{search}&rdquo;</span>
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-mono text-[13px] text-fg-4">No prompts match.</p>
          <button onClick={() => setSearch("")} className="mt-3 font-mono text-[11px] text-violet-bright hover:underline">Clear search</button>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCat}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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

/* ── ContentNav (main export) ───────────────────────────────────────── */
export default function ContentNav() {
  const [activeTab, setActiveTab] = useState<Tab>("prompts");
  const [selectedCat, setSelectedCat] = useState<string>(CAROUSEL_ITEMS[0].id);

  return (
    <section id="explore" className="w-full max-w-[1200px] mx-auto px-6 md:px-8 pb-24">

      {/* ── Main tab menu ───────────────────────────────────────── */}
      <div className="flex items-end gap-0 border-b border-hairline mb-0">
        {MAIN_TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-4 py-3 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors duration-150 whitespace-nowrap"
              style={{ color: active ? "#B6A6FF" : "#6b6a8a" }}
            >
              {tab.label}
              {active && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "var(--violet-bright)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Sub-menu: category pills (Prompts only) ─────────────── */}
      <AnimatePresence initial={false}>
        {activeTab === "prompts" && (
          <motion.div
            key="subcats"
            variants={subVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="overflow-x-auto scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
              <div className="flex gap-1.5 py-3 min-w-max">
                {CAROUSEL_ITEMS.map(cat => {
                  const active = cat.id === selectedCat;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.id)}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Content area ───────────────────────────────────────── */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {activeTab === "prompts"  && <PromptGrid selectedCat={selectedCat} />}
            {activeTab === "tools"    && <ToolsPreview />}
            {activeTab === "news"     && <NewsPreview />}
            {activeTab === "concepts" && <ConceptsPreview />}
            {activeTab === "models"   && <ModelsPreview />}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
