"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Search, X, Clock, Zap, BookOpen, Wrench } from "lucide-react";
import { BASE_PATH, USE_CASES, DISC_COUNTS, matchesUseCase, UseCase } from "@/lib/data";
import { AI_NEWS } from "@/lib/newsData";
import { AI_TOOLS } from "@/lib/toolsData";
import { AI_MODELS } from "@/lib/modelsData";
import { CONCEPTS } from "@/lib/concepts";
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
function SectionHead({
  label, href, linkLabel, count,
}: {
  label: string; href?: string; linkLabel?: string; count?: number;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet/60" />
      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4">{label}</span>
      {count !== undefined && (
        <span className="font-mono text-[10px] text-fg-4 opacity-50">· {count}</span>
      )}
      <span className="flex-1 h-px bg-hairline" />
      {href && (
        <a
          href={href}
          className="font-mono text-[10px] text-fg-4 hover:text-violet-bright transition-colors flex items-center gap-1"
        >
          {linkLabel ?? "View all"} <ArrowRight size={10} />
        </a>
      )}
    </div>
  );
}

/* ── 1. Intent nav — 3 clear entry points ───────────────────────────── */
const INTENTS = [
  {
    id: "current",
    icon: Zap,
    color: "#9F8CFF",
    gradient: "from-violet-500/10 to-violet-500/0",
    label: "Stay Current",
    desc: "What's happening in AI right now",
    links: [
      { label: "AI News",    sub: `${AI_NEWS.length} items · updated daily`, href: `${BASE_PATH}/news/`       },
      { label: "AI History", sub: "70 years of milestones",                   href: `${BASE_PATH}/ai-history/` },
      { label: "Research",   sub: "Key papers in plain English",              href: `${BASE_PATH}/research/`   },
    ],
  },
  {
    id: "learn",
    icon: BookOpen,
    color: "#10b981",
    gradient: "from-emerald-500/10 to-emerald-500/0",
    label: "Learn",
    desc: "Build real understanding, fast",
    links: [
      { label: "Guides",         sub: `${GUIDES.length} practical how-to guides`,   href: `${BASE_PATH}/guides/`    },
      { label: "Learning Paths", sub: `${LEARNING_PATHS.length} structured paths`,  href: `${BASE_PATH}/learn/`     },
      { label: "Concepts",       sub: `${CONCEPTS.length} core AI concepts`,         href: `${BASE_PATH}/concepts/`  },
    ],
  },
  {
    id: "build",
    icon: Wrench,
    color: "#f59e0b",
    gradient: "from-amber-500/10 to-amber-500/0",
    label: "Build",
    desc: "Prompts, tools and model intelligence",
    links: [
      { label: "Prompt Library", sub: `${USE_CASES.length} curated use cases`,     href: "#library",             internal: true },
      { label: "AI Tools",       sub: `${AI_TOOLS.length} tools & apps`,           href: `${BASE_PATH}/tools/`   },
      { label: "Model Pricing",  sub: `${AI_MODELS.length} models compared`,       href: `${BASE_PATH}/models/`  },
    ],
  },
] as const;

function IntentNav() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
      {INTENTS.map((intent, i) => {
        const Icon = intent.icon;
        return (
          <motion.div
            key={intent.id}
            custom={i} variants={fade} initial="hidden" animate="show"
            className={`relative rounded-2xl border border-white/8 bg-gradient-to-b ${intent.gradient} p-5 flex flex-col gap-4 overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                style={{ background: intent.color + "18", color: intent.color }}
              >
                <Icon size={15} />
              </span>
              <div>
                <p className="font-serif text-[15px] text-fg-1 leading-none">{intent.label}</p>
                <p className="font-mono text-[10px] text-fg-4 mt-0.5">{intent.desc}</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-1">
              {intent.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={"internal" in link && link.internal ? (e) => {
                    e.preventDefault();
                    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
                  } : undefined}
                  className="group flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                >
                  <div className="min-w-0">
                    <p
                      className="font-mono text-[11px] font-medium group-hover:text-white transition-colors truncate"
                      style={{ color: intent.color }}
                    >
                      {link.label}
                    </p>
                    <p className="font-mono text-[10px] text-fg-4 truncate">{link.sub}</p>
                  </div>
                  <ArrowRight
                    size={11}
                    className="shrink-0 text-fg-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── 2. Latest news — lead with signal ──────────────────────────────── */
const SIG_COLOR: Record<string, string> = {
  landmark: "#f59e0b",
  major:    "#9F8CFF",
  notable:  "rgba(255,255,255,0.18)",
};

function LatestNews() {
  const items = useMemo(() =>
    [...AI_NEWS]
      .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
      .slice(0, 6),
  []);

  return (
    <div className="mb-16">
      <SectionHead
        label="Latest in AI"
        href={`${BASE_PATH}/news/`}
        linkLabel={`All ${AI_NEWS.length}`}
        count={AI_NEWS.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y divide-hairline md:divide-y-0">
        {items.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.url ?? `${BASE_PATH}/news/`}
            target={item.url ? "_blank" : undefined}
            rel={item.url ? "noopener noreferrer" : undefined}
            custom={i} variants={fade} initial="hidden" animate="show"
            className="group flex items-start gap-3 py-3 md:py-3 hover:bg-white/[0.02] -mx-3 px-3 rounded-lg transition-colors"
          >
            {/* Significance dot */}
            <span
              className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full"
              style={{ background: SIG_COLOR[item.significance] }}
            />

            <div className="flex-1 min-w-0">
              {/* Provider + date */}
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="font-mono text-[9px] font-semibold tracking-wider uppercase"
                  style={{ color: item.providerColor ?? "#9F8CFF" }}
                >
                  {item.provider}
                </span>
                <span className="font-mono text-[9px] text-fg-4">
                  {item.dateDay ? `${item.dateDay} ` : ""}{item.date}
                </span>
              </div>
              {/* Title */}
              <p className="font-sans text-[13px] text-fg-2 leading-[1.4] group-hover:text-fg-1 transition-colors line-clamp-2">
                {item.title}
              </p>
            </div>

            <ExternalLink
              size={10}
              className="shrink-0 mt-1 text-fg-4 opacity-0 group-hover:opacity-50 transition-opacity"
            />
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
    <div className="mb-16">
      <SectionHead
        label="New Prompts"
        href="#library"
        linkLabel={`Browse all ${USE_CASES.length}`}
      />
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

/* ── 4. Learning paths ──────────────────────────────────────────────── */
const LEVEL_BADGE = {
  beginner:     { label: "Beginner",     color: "#10b981" },
  intermediate: { label: "Intermediate", color: "#9F8CFF" },
  advanced:     { label: "Advanced",     color: "#ef4444" },
};

function LearningPathsStrip() {
  return (
    <div className="mb-16">
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

/* ── 5. Prompt library ──────────────────────────────────────────────── */
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

  const visible  = filtered.slice(0, visibleCount);
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
      <SectionHead label="Prompt Library" count={USE_CASES.length} />

      {/* Category rail */}
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
          <button
            onClick={() => setSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-4 hover:text-fg-2 transition-colors"
          >
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

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-mono text-[13px] text-fg-4">No prompts match.</p>
          <button
            onClick={() => setSearch("")}
            className="mt-3 font-mono text-[11px] text-violet-bright hover:underline"
          >
            Clear search
          </button>
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
  const [expanded, setExpanded]           = useState<UseCase | null>(null);
  const [expandedItems, setExpandedItems] = useState<UseCase[]>([]);

  const openFromRecent = (item: UseCase) => {
    setExpanded(item);
    setExpandedItems(USE_CASES.filter(u => u.category === item.category));
    trackRecentlyViewed({ id: item.id, slug: item.slug, title: item.title, category: item.category });
    window.history.replaceState(null, "", `#uc-${item.id}`);
  };

  return (
    <section id="explore" className="w-full max-w-[1200px] mx-auto px-6 md:px-8 pb-24 pt-10">

      {/* 1 — three clear entry points */}
      <IntentNav />

      {/* 2 — what's happening now */}
      <LatestNews />

      {/* 3 — new prompts */}
      <RecentPrompts onOpen={openFromRecent} />

      {/* 4 — structured learning */}
      <LearningPathsStrip />

      {/* 5 — full library */}
      <div id="library">
        <PromptLibrary />
      </div>

      <ExpandedCard
        item={expanded}
        onClose={() => { setExpanded(null); window.history.replaceState(null, "", "#"); }}
        items={expandedItems}
      />
    </section>
  );
}
