"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Search, X, Clock } from "lucide-react";
import { BASE_PATH, USE_CASES, DISC_COUNTS, matchesUseCase, UseCase } from "@/lib/data";
import { AI_NEWS } from "@/lib/newsData";
import { AI_TOOLS } from "@/lib/toolsData";
import { AI_MODELS } from "@/lib/modelsData";
import { CONCEPTS } from "@/lib/concepts";
import { TOPIC_HUBS } from "@/lib/topicsData";
import { LEARNING_PATHS } from "@/lib/learningPathsData";
import { GUIDES } from "@/lib/guidesData";
import { CAROUSEL_ITEMS } from "./CategoryCarousel3D";
import UseCaseCard from "./UseCaseCard";
import ExpandedCard from "./ExpandedCard";
import { trackRecentlyViewed } from "@/lib/hooks";

const PAGE_SIZE = 12;

const fade = {
  hidden: { opacity: 0, y: 10 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Section header ─────────────────────────────────────────────────── */
function SectionHead({ label, href, linkLabel }: { label: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet/60" />
      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4">{label}</span>
      <span className="flex-1 h-px bg-hairline" />
      {href && (
        <a href={href} className="font-mono text-[10px] text-fg-4 hover:text-violet-bright transition-colors flex items-center gap-1">
          {linkLabel ?? "View all"} <ArrowRight size={10} />
        </a>
      )}
    </div>
  );
}

/* ── 1. Overview strip ──────────────────────────────────────────────── */
function OverviewStrip() {
  const destinations = [
    { label: "Prompts",  count: USE_CASES.length,   desc: "Ready-to-use AI prompts",         href: "#library",               internal: true  },
    { label: "Tools",    count: AI_TOOLS.length,     desc: "Curated AI tools & apps",          href: `${BASE_PATH}/tools/`,    internal: false },
    { label: "News",     count: AI_NEWS.length,      desc: "AI news & announcements",          href: `${BASE_PATH}/news/`,     internal: false },
    { label: "Concepts", count: CONCEPTS.length,     desc: "Key AI concepts explained",        href: `${BASE_PATH}/concepts/`, internal: false },
    { label: "Models",   count: AI_MODELS.length,    desc: "Model comparison & benchmarks",    href: `${BASE_PATH}/models/`,   internal: false },
    { label: "Guides",   count: GUIDES.length,       desc: "Practical how-to guides",          href: `${BASE_PATH}/guides/`,   internal: false },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
      {destinations.map((d, i) => (
        <motion.a
          key={d.label}
          href={d.href}
          custom={i} variants={fade} initial="hidden" animate="show"
          onClick={d.internal ? (e) => {
            e.preventDefault();
            document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
          } : undefined}
          className="group flex flex-col gap-2 p-4 rounded-xl border border-hairline bg-white/[0.02] hover:border-violet/35 hover:bg-violet/[0.04] transition-all duration-200 cursor-pointer"
        >
          <span className="font-mono text-[24px] font-medium text-fg-1 tabular-nums leading-none">
            {d.count}
          </span>
          <div>
            <p className="font-mono text-[11px] text-fg-2 font-medium group-hover:text-violet-bright transition-colors">{d.label}</p>
            <p className="font-sans text-[11px] text-fg-4 leading-[1.4] mt-0.5 hidden sm:block">{d.desc}</p>
          </div>
          <span className="mt-auto font-mono text-[9px] tracking-[0.08em] uppercase text-violet-bright opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Browse <ArrowRight size={9} />
          </span>
        </motion.a>
      ))}
    </div>
  );
}

/* ── 1b. Topic hubs ─────────────────────────────────────────────────── */
function TopicHubs() {
  return (
    <div className="mb-14">
      <SectionHead label="Browse by Topic" href={`${BASE_PATH}/topics/`} linkLabel={`All ${TOPIC_HUBS.length} topics`} />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {TOPIC_HUBS.map((topic, i) => (
          <motion.a
            key={topic.slug}
            href={`${BASE_PATH}/topics/${topic.slug}/`}
            custom={i} variants={fade} initial="hidden" animate="show"
            className="group flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border border-hairline bg-white/[0.01] hover:bg-violet/[0.05] hover:border-violet/25 transition-all duration-200 text-center"
          >
            <span className="text-[16px] leading-none" style={{ color: topic.color }}>
              {topic.icon}
            </span>
            <span className="font-mono text-[9px] tracking-[0.06em] uppercase text-fg-4 group-hover:text-fg-1 transition-colors leading-tight">
              {topic.label}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

/* ── 1c. Learning paths strip ───────────────────────────────────────── */
const LEVEL_BADGE = {
  beginner:     { label: "Beginner",     color: "#10b981" },
  intermediate: { label: "Intermediate", color: "#9F8CFF" },
  advanced:     { label: "Advanced",     color: "#ef4444" },
};

function LearningPathsStrip() {
  return (
    <div className="mb-14">
      <SectionHead label="Learning Paths" href={`${BASE_PATH}/learn/`} linkLabel="Open all paths" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {LEARNING_PATHS.map((path, i) => {
          const lvl = LEVEL_BADGE[path.level];
          return (
            <motion.a
              key={path.id}
              href={`${BASE_PATH}/learn/`}
              custom={i} variants={fade} initial="hidden" animate="show"
              className="group flex items-center gap-4 p-4 rounded-xl border bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-200"
              style={{ borderColor: path.color + "22" }}
            >
              <span className="text-2xl shrink-0 leading-none">{path.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-[15px] text-fg-1 group-hover:text-white transition-colors leading-[1.2] truncate mb-1">
                  {path.title}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-[9px] tracking-[0.10em] uppercase px-1.5 py-0.5 rounded-full border"
                    style={{ color: lvl.color, borderColor: lvl.color + "44", background: lvl.color + "12" }}
                  >
                    {lvl.label}
                  </span>
                  <span className="font-mono text-[10px] text-fg-4 flex items-center gap-1">
                    <Clock size={9} /> {path.totalDuration}
                  </span>
                </div>
              </div>
              <ArrowRight size={13} className="text-fg-4 group-hover:text-violet-bright transition-colors shrink-0" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

/* ── 2. Latest news ─────────────────────────────────────────────────── */
function LatestNews() {
  const items = useMemo(() =>
    [...AI_NEWS]
      .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
      .slice(0, 5),
  []);

  return (
    <div className="mb-14">
      <SectionHead label="Latest News" href={`${BASE_PATH}/news/`} linkLabel={`All ${AI_NEWS.length}`} />
      <div className="flex flex-col divide-y divide-hairline">
        {items.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.url ?? `${BASE_PATH}/news/`}
            target={item.url ? "_blank" : undefined}
            rel={item.url ? "noopener noreferrer" : undefined}
            custom={i} variants={fade} initial="hidden" animate="show"
            className="group flex items-start gap-4 py-3 hover:bg-white/[0.02] -mx-3 px-3 rounded-lg transition-colors"
          >
            {/* Date */}
            <span className="font-mono text-[10px] text-fg-4 whitespace-nowrap mt-px shrink-0 w-20">
              {item.dateDay ? `${item.dateDay} ` : ""}{item.date}
            </span>

            {/* Significance */}
            <span className="mt-1.5 shrink-0">
              {item.significance === "landmark" ? (
                <span className="block w-1.5 h-1.5 rounded-full bg-amber-400" />
              ) : item.significance === "major" ? (
                <span className="block w-1.5 h-1.5 rounded-full bg-violet/70" />
              ) : (
                <span className="block w-1.5 h-1.5 rounded-full bg-white/20" />
              )}
            </span>

            {/* Title */}
            <span className="flex-1 font-sans text-[13px] text-fg-2 leading-[1.45] group-hover:text-fg-1 transition-colors line-clamp-1">
              {item.title}
            </span>

            {/* Provider */}
            <span className="font-mono text-[10px] text-fg-4 shrink-0 hidden sm:block">{item.provider}</span>

            <ExternalLink size={11} className="shrink-0 mt-0.5 text-fg-4 opacity-0 group-hover:opacity-60 transition-opacity" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

/* ── 3. Recently added prompts ──────────────────────────────────────── */
function RecentPrompts({ onOpen }: { onOpen: (item: UseCase) => void }) {
  const recent = useMemo(() =>
    [...USE_CASES]
      .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
      .slice(0, 3),
  []);

  return (
    <div className="mb-14">
      <SectionHead label="Recently Added" href="#library" linkLabel="All prompts" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recent.map((item, i) => (
          <motion.div key={item.id} custom={i} variants={fade} initial="hidden" animate="show">
            <UseCaseCard item={item} onOpen={onOpen} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── 4. Prompt library (full browser) ───────────────────────────────── */
function PromptLibrary() {
  const [selectedCat, setSelectedCat] = useState<string>(CAROUSEL_ITEMS[0].id);
  const [search, setSearch]           = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [expanded, setExpanded]         = useState<UseCase | null>(null);
  const [expandedItems, setExpandedItems] = useState<UseCase[]>([]);

  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    if (isSearching) return USE_CASES.filter(u => matchesUseCase(u, search));
    return USE_CASES.filter(u => u.category === selectedCat);
  }, [selectedCat, search, isSearching]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore  = visibleCount < filtered.length;

  const openCard = (item: UseCase) => {
    const ctx = isSearching ? filtered : USE_CASES.filter(u => u.category === item.category);
    setExpanded(item);
    setExpandedItems(ctx);
    trackRecentlyViewed({ id: item.id, slug: item.slug, title: item.title, category: item.category });
    window.history.replaceState(null, "", `#uc-${item.id}`);
  };

  return (
    <div>
      <SectionHead label="Prompt Library" linkLabel={`${USE_CASES.length} prompts`} />

      {/* Category sub-nav */}
      <div className="overflow-x-auto scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 mb-4">
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

/* ── Main export ─────────────────────────────────────────────────────── */
export default function ContentNav() {
  const [expanded, setExpanded]     = useState<UseCase | null>(null);
  const [expandedItems, setExpandedItems] = useState<UseCase[]>([]);

  const openFromRecent = (item: UseCase) => {
    setExpanded(item);
    setExpandedItems(USE_CASES.filter(u => u.category === item.category));
    trackRecentlyViewed({ id: item.id, slug: item.slug, title: item.title, category: item.category });
    window.history.replaceState(null, "", `#uc-${item.id}`);
  };

  return (
    <section id="explore" className="w-full max-w-[1200px] mx-auto px-6 md:px-8 pb-24 pt-4">

      {/* 1 — what's here */}
      <OverviewStrip />

      {/* 2 — browse by topic */}
      <TopicHubs />

      {/* 3 — latest news */}
      <LatestNews />

      {/* 4 — learning paths */}
      <LearningPathsStrip />

      {/* 5 — recently added prompts */}
      <RecentPrompts onOpen={openFromRecent} />

      {/* 6 — full library */}
      <div id="library">
        <PromptLibrary />
      </div>

      {/* Shared expanded card for "recently added" section */}
      <ExpandedCard
        item={expanded}
        onClose={() => { setExpanded(null); window.history.replaceState(null, "", "#"); }}
        items={expandedItems}
      />
    </section>
  );
}
