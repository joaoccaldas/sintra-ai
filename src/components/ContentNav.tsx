"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ExternalLink,
  Zap, BookOpen, Wrench, Newspaper, Lightbulb, FlaskConical,
  Rss, Play, Radio, Workflow,
} from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { AI_NEWS, getLatestNewsDate } from "@/lib/newsDataCombined";
import { AI_TOOLS } from "@/lib/toolsData";
import { AI_MODELS } from "@/lib/modelsData";
import { CONCEPTS } from "@/lib/concepts";
import { LEARNING_PATHS } from "@/lib/learningPathsData";
import { GUIDES } from "@/lib/guidesData";
import { THIS_WEEK, type FeaturedItem, type FeaturedItemType } from "@/lib/featuredData";
import { YOUTUBE_VIDEOS } from "@/lib/videoData";
import { LIVE_ITEMS, liveAge } from "@/lib/liveFeedData";
import { AUTOMATION_WORKFLOWS } from "@/lib/automationData";
import LibraryTeaser from "./LibraryTeaser";

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Shared section header ──────────────────────────────────────────── */
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
        <a href={href} className="font-mono text-[10px] text-fg-4 hover:text-violet-bright transition-colors flex items-center gap-1">
          {linkLabel ?? "View all"} <ArrowRight size={10} />
        </a>
      )}
    </div>
  );
}

/* ── 1. Intent nav — clear operating modes ───────────────────────────── */
const INTENTS = [
  {
    id: "current", icon: Zap,
    color: "#9F8CFF", glow: "rgba(159,140,255,0.08)",
    gradient: "from-violet-500/8 to-violet-500/0",
    label: "Track", desc: "What's changing in AI now",
    links: [
      { label: "Live Feed",  sub: `${LIVE_ITEMS.length} live signals`,          href: `${BASE_PATH}/live/`       },
      { label: "AI News",    sub: `${AI_NEWS.length} items · updated daily`,    href: `${BASE_PATH}/news/`       },
      { label: "Research",   sub: "Key papers in plain English",              href: `${BASE_PATH}/research/`   },
    ],
  },
  {
    id: "automate", icon: Workflow,
    color: "#8FE3D2", glow: "rgba(143,227,210,0.08)",
    gradient: "from-cyan-500/8 to-cyan-500/0",
    label: "Automate", desc: "Turn AI into repeatable work",
    links: [
      { label: "Automation Hub", sub: `${AUTOMATION_WORKFLOWS.length} workflow blueprints`, href: `${BASE_PATH}/automate/` },
      { label: "Prompt Library", sub: `${USE_CASES_COUNT} executable use cases`, href: `${BASE_PATH}/library/` },
      { label: "AI Tools",       sub: `${AI_TOOLS.length} tools & apps`,         href: `${BASE_PATH}/tools/` },
    ],
  },
  {
    id: "learn", icon: BookOpen,
    color: "#10b981", glow: "rgba(16,185,129,0.08)",
    gradient: "from-emerald-500/8 to-emerald-500/0",
    label: "Learn", desc: "Build real understanding, fast",
    links: [
      { label: "Guides",         sub: `${GUIDES.length} practical how-to guides`,  href: `${BASE_PATH}/guides/`   },
      { label: "Learning Paths", sub: `${LEARNING_PATHS.length} structured paths`, href: `${BASE_PATH}/learn/`    },
      { label: "Concepts",       sub: `${CONCEPTS.length} core AI concepts`,       href: `${BASE_PATH}/concepts/` },
    ],
  },
  {
    id: "build", icon: Wrench,
    color: "#f59e0b", glow: "rgba(245,158,11,0.08)",
    gradient: "from-amber-500/8 to-amber-500/0",
    label: "Build", desc: "Models, tools and decision support",
    links: [
      { label: "Model Radar",     sub: `${AI_MODELS.length} models compared`, href: `${BASE_PATH}/models/` },
      { label: "AI History",      sub: "70 years of milestones",             href: `${BASE_PATH}/ai-history/` },
      { label: "Videos",          sub: `${YOUTUBE_VIDEOS.length} lessons`,     href: `${BASE_PATH}/videos/` },
    ],
  },
] as const;

function IntentNav() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-16">
      {INTENTS.map((intent, i) => {
        const Icon = intent.icon;
        return (
          <motion.div
            key={intent.id}
            custom={i} variants={fade} initial="hidden" animate="show"
            whileHover={{ y: -2, boxShadow: `0 8px 40px ${intent.glow}` }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`relative rounded-2xl border border-white/[0.07] bg-gradient-to-b ${intent.gradient} p-5 flex flex-col gap-4 overflow-hidden cursor-default`}
          >
            <div className="absolute top-0 left-5 right-5 h-px" style={{ background: `linear-gradient(90deg, transparent, ${intent.color}44, transparent)` }} />
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                style={{ background: intent.color + "18", color: intent.color }}>
                <Icon size={15} />
              </span>
              <div>
                <p className="font-serif text-[15px] text-fg-1 leading-none">{intent.label}</p>
                <p className="font-mono text-[10px] text-fg-4 mt-0.5">{intent.desc}</p>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              {intent.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] font-medium group-hover:text-white transition-colors truncate"
                      style={{ color: intent.color }}>
                      {link.label}
                    </p>
                    <p className="font-mono text-[10px] text-fg-4 truncate">{link.sub}</p>
                  </div>
                  <ArrowRight size={11}
                    className="shrink-0 text-fg-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── 2. This Week hub — tabbed editorial picks + latest news ─────────── */
const PICK_ICON: Record<FeaturedItemType, React.ComponentType<{ size?: number; className?: string }>> = {
  news:   Newspaper as React.ComponentType<{ size?: number; className?: string }>,
  prompt: Lightbulb as React.ComponentType<{ size?: number; className?: string }>,
  guide:  BookOpen  as React.ComponentType<{ size?: number; className?: string }>,
  paper:  FlaskConical as React.ComponentType<{ size?: number; className?: string }>,
  tool:   Lightbulb as React.ComponentType<{ size?: number; className?: string }>,
};
const PICK_LABEL: Record<FeaturedItemType, string> = {
  news: "Story", prompt: "Prompt", guide: "Guide", paper: "Paper", tool: "Tool",
};

function PickCard({ item, index }: { item: FeaturedItem; index: number }) {
  const Icon = PICK_ICON[item.type];
  const href = item.href.startsWith("http") || item.href.startsWith("#")
    ? item.href : `${BASE_PATH}${item.href}`;
  const isExternal = item.href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -1 }}
      className="group flex flex-col gap-3 p-4 rounded-xl border border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.14] transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] uppercase text-fg-4">
          <Icon size={10} />{PICK_LABEL[item.type]}
        </span>
        {item.badge && (
          <span className="font-mono text-[9px] tracking-[0.08em] uppercase px-1.5 py-0.5 rounded-full border"
            style={{ color: item.badgeColor ?? "#9F8CFF", borderColor: (item.badgeColor ?? "#9F8CFF") + "44", background: (item.badgeColor ?? "#9F8CFF") + "12" }}>
            {item.badge}
          </span>
        )}
      </div>
      <p className="font-serif text-[14px] text-fg-1 leading-[1.35] group-hover:text-white transition-colors line-clamp-2">
        {item.title}
      </p>
      <p className="font-mono text-[10px] text-fg-4 leading-[1.5] line-clamp-2">{item.why}</p>
      <span className="mt-auto flex items-center gap-1 font-mono text-[9px] tracking-[0.10em] uppercase text-fg-4 group-hover:text-violet-bright transition-colors">
        Read <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" />
      </span>
    </motion.a>
  );
}

const SIG_COLOR: Record<string, string> = {
  landmark: "#f59e0b", major: "#9F8CFF", notable: "rgba(255,255,255,0.18)",
};

function NewsGrid() {
  const items = useMemo(() =>
    [...AI_NEWS]
      .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
      .slice(0, 6),
  []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y divide-hairline md:divide-y-0">
      {items.map((item, i) => (
        <motion.a
          key={item.id}
          href={item.url ?? `${BASE_PATH}/news/`}
          target={item.url ? "_blank" : undefined}
          rel={item.url ? "noopener noreferrer" : undefined}
          custom={i} variants={fade} initial="hidden" animate="show"
          className="group flex items-start gap-3 py-3 hover:bg-white/[0.02] -mx-3 px-3 rounded-lg transition-colors"
        >
          <span className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full"
            style={{ background: SIG_COLOR[item.significance] }} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-mono text-[9px] font-semibold tracking-wider uppercase"
                style={{ color: item.providerColor ?? "#9F8CFF" }}>{item.provider}</span>
              <span className="font-mono text-[9px] text-fg-4">
                {item.dateDay ? `${item.dateDay} ` : ""}{item.date}
              </span>
            </div>
            <p className="font-sans text-[13px] text-fg-2 leading-[1.4] group-hover:text-fg-1 transition-colors line-clamp-2">
              {item.title}
            </p>
          </div>
          <ExternalLink size={10} className="shrink-0 mt-1 text-fg-4 opacity-0 group-hover:opacity-50 transition-opacity" />
        </motion.a>
      ))}
    </div>
  );
}

type WeekTab = "picks" | "news";

function ThisWeekHub() {
  const [tab, setTab] = useState<WeekTab>("picks");

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet/60" />
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4">This Week</span>
        <span className="font-mono text-[10px] text-fg-4 opacity-40">· {THIS_WEEK.weekOf}</span>
        <span className="font-mono text-[10px] text-emerald-400 opacity-80 hidden sm:inline">
          · News updated {getLatestNewsDate()}
        </span>
        <div className="flex gap-0.5 p-0.5 rounded-lg bg-white/[0.03] border border-hairline ml-1">
          {(["picks", "news"] as WeekTab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-mono text-[9px] tracking-[0.10em] uppercase px-2.5 py-1 rounded-md transition-all duration-150 ${
                tab === t
                  ? "bg-violet/20 text-violet-bright"
                  : "text-fg-4 hover:text-fg-2"
              }`}
            >
              {t === "picks" ? "Picks" : "News"}
            </button>
          ))}
        </div>
        <span className="flex-1 h-px bg-hairline" />
        <a href={`${BASE_PATH}/news/`}
          className="font-mono text-[10px] text-fg-4 hover:text-violet-bright transition-colors flex items-center gap-1">
          All {AI_NEWS.length} <ArrowRight size={10} />
        </a>
      </div>
      <AnimatePresence mode="wait">
        {tab === "picks" ? (
          <motion.div
            key="picks"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <p className="font-sans text-[13px] text-fg-3 leading-[1.6] mb-5 max-w-2xl">
              {THIS_WEEK.editorial}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {THIS_WEEK.items.map((item, i) => <PickCard key={i} item={item} index={i} />)}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="news"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <NewsGrid />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── 3. Live feed strip — freshest posts from primary sources ───────────── */
function LiveStrip() {
  const items = LIVE_ITEMS.slice(0, 5);
  if (!items.length) return null;
  return (
    <div className="mb-16">
      <SectionHead
        label="Live from the frontier"
        count={LIVE_ITEMS.length}
        href={`${BASE_PATH}/live/`}
        linkLabel="Open live feed"
      />
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] divide-y divide-white/[0.05] overflow-hidden">
        {items.map((it, i) => (
          <motion.a
            key={it.id}
            href={it.url}
            target="_blank"
            rel="noopener noreferrer"
            custom={i}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors"
          >
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: it.color, boxShadow: `0 0 8px ${it.color}66` }}
            />
            <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-fg-4 w-28 shrink-0 truncate hidden sm:block">
              {it.source}
            </span>
            <span className="flex-1 text-[13px] text-fg-2 group-hover:text-fg-1 transition-colors truncate">
              {it.title}
            </span>
            <span className="font-mono text-[10px] text-fg-4 shrink-0">{liveAge(it.publishedAt)}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

/* ── 4. Newsletter / RSS CTA ─────────────────────────────────────────────── */
function NewsletterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mb-16 rounded-2xl border border-violet/[0.14] bg-gradient-to-br from-violet/[0.06] to-transparent p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
    >
      <div className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-violet/[0.14] border border-violet/[0.25]">
        <Rss size={18} className="text-violet-bright" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-serif text-[15px] text-fg-1 leading-[1.2] mb-0.5">Stay ahead of AI — follow the RSS feed</p>
        <p className="font-mono text-[11px] text-fg-4 leading-[1.5]">
          Subscribe in any RSS reader to get every new prompt, news item, live signal and model update from Sintra.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        <a
          href={`${BASE_PATH}/feed.xml`}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase px-4 py-2 rounded-lg border border-violet/40 bg-violet/[0.10] text-violet-bright hover:bg-violet/[0.20] transition-all"
        >
          <Rss size={11} /> RSS Feed
        </a>
        <a
          href={`${BASE_PATH}/live/`}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase px-4 py-2 rounded-lg border border-hairline text-fg-3 hover:border-violet/30 hover:text-fg-1 transition-all"
        >
          <Radio size={10} /> Live Feed
        </a>
        <a
          href={`${BASE_PATH}/automate/`}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase px-4 py-2 rounded-lg border border-hairline text-fg-3 hover:border-violet/30 hover:text-fg-1 transition-all"
        >
          <Workflow size={10} /> Automate
        </a>
        <a
          href={`${BASE_PATH}/videos/`}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase px-4 py-2 rounded-lg border border-hairline text-fg-3 hover:border-violet/30 hover:text-fg-1 transition-all"
        >
          <Play size={10} /> Videos
        </a>
      </div>
    </motion.div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────────── */
export default function ContentNav() {
  return (
    <section id="explore" className="w-full max-w-[1200px] mx-auto px-6 md:px-8 pb-24 pt-10">
      {/* 1 — clear operating modes (the one on-page IA recap; the sidebar is
             the persistent one) */}
      <IntentNav />

      {/* 2 — this week: editorial picks + latest news (tabbed) */}
      <ThisWeekHub />

      {/* 3 — live feed strip */}
      <LiveStrip />

      {/* 4 — prompt library teaser — full library lives at /library/ */}
      <LibraryTeaser />

      {/* 5 — newsletter + RSS CTA */}
      <NewsletterCTA />
    </section>
  );
}
