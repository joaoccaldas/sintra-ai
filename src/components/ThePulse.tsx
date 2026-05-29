"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { USE_CASES, BASE_PATH } from "@/lib/data";
import { relativeDate } from "@/lib/dateUtils";
import { AI_NEWS } from "@/lib/newsData";
import { LEARNING_PATHS } from "@/lib/learningPathsData";
import UseCaseCard from "./UseCaseCard";
import ExpandedCard from "./ExpandedCard";
import type { UseCase } from "@/lib/data";

// ── Constants ──────────────────────────────────────────────────────────────

const CUTOFF_DAYS = 14;
const SITE = BASE_PATH;

const SIG_META = {
  landmark: { label: "Landmark", color: "#d97706", bg: "rgba(217,119,6,0.10)", border: "rgba(217,119,6,0.28)" },
  major:    { label: "Major",    color: "#9F8CFF", bg: "rgba(159,140,255,0.08)", border: "rgba(159,140,255,0.20)" },
  notable:  { label: "Notable",  color: "#5EEAD4", bg: "rgba(94,234,212,0.08)",  border: "rgba(94,234,212,0.18)" },
};

const LEVEL_COLOR: Record<string, string> = {
  beginner:     "#10b981",
  intermediate: "#9F8CFF",
  advanced:     "#ef4444",
};

function isRecent(iso: string) {
  return Date.now() - new Date(iso).getTime() < CUTOFF_DAYS * 24 * 60 * 60 * 1000;
}

// ── Sub-panels ─────────────────────────────────────────────────────────────

function SignalsPanel() {
  const items = useMemo(() =>
    [...AI_NEWS]
      .filter(n => n.significance === "landmark" || n.significance === "major")
      .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
      .slice(0, 8),
  []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.map((item, i) => {
        const sig = SIG_META[item.significance];
        return (
          <motion.a
            key={item.id}
            href={item.url ?? `${SITE}/news/`}
            target={item.url ? "_blank" : undefined}
            rel={item.url ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col gap-2 p-3.5 rounded-xl border transition-all hover:scale-[1.012]"
            style={{ background: "rgba(255,255,255,0.018)", borderColor: "rgba(255,255,255,0.07)" }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = sig.border;
              el.style.background = sig.bg;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.07)";
              el.style.background = "rgba(255,255,255,0.018)";
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className="font-mono text-[8px] tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-full border"
                style={{ color: sig.color, background: sig.bg, borderColor: sig.border }}
              >
                {sig.label}
              </span>
              <span className="font-mono text-[9px] text-fg-4 shrink-0">
                {item.dateDay ? `${item.dateDay} ` : ""}{item.date}
              </span>
            </div>
            <p className="font-sans text-[12.5px] font-medium text-fg-1 leading-[1.4] line-clamp-2 group-hover:text-white transition-colors">
              {item.country === "BR" && <span className="mr-1 text-[10px]">🇧🇷</span>}
              {item.country === "SE" && <span className="mr-1 text-[10px]">🇸🇪</span>}
              {item.title}
            </p>
            <div className="flex items-center gap-1.5 pt-1 border-t border-white/[0.05]">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.providerColor }} />
              <span className="font-mono text-[9px] text-fg-4 truncate flex-1">{item.provider}</span>
              {item.url && <ExternalLink size={9} className="text-fg-5 group-hover:text-fg-3 transition-colors shrink-0" />}
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}

function NewPromptsPanel({ onOpen }: { onOpen: (u: UseCase) => void }) {
  const recent = useMemo(() => USE_CASES.filter(u => isRecent(u.dateAdded)).slice(0, 8), []);
  const latest = useMemo(() => USE_CASES.slice(0, 3), []);
  const showRecent = recent.length > 0;

  return (
    <div className="space-y-6">
      {showRecent && (
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-3">
            Added in the last 2 weeks
          </p>
          <div className="flex flex-wrap gap-2">
            {recent.map(u => (
              <button
                key={u.id}
                onClick={() => onOpen(u)}
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] hover:border-violet/40 hover:bg-violet/[0.06] transition-all text-left"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-bright shrink-0 opacity-70 group-hover:opacity-100" />
                <span className="font-sans text-[12px] text-fg-2 group-hover:text-fg-1 line-clamp-1 max-w-[220px]">
                  {u.title}
                </span>
                <span className="font-mono text-[10px] text-fg-4 shrink-0">{relativeDate(u.dateAdded)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-3">
          Latest additions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {latest.map(item => (
            <UseCaseCard key={item.id} item={item} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LearnPanel() {
  const paths = LEARNING_PATHS.slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {paths.map((path, i) => (
        <motion.a
          key={path.id}
          href={`${SITE}/learn/`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group flex gap-4 p-4 rounded-xl border transition-all hover:scale-[1.012] bg-[#0d0a1c]"
          style={{ borderColor: path.color + "28" }}
        >
          <span className="text-3xl leading-none mt-0.5 shrink-0">{path.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-serif text-[15px] text-fg-1 group-hover:text-white transition-colors leading-none">
                {path.title}
              </h3>
              <span
                className="font-mono text-[9px] px-1.5 py-0.5 rounded-full border uppercase tracking-[0.08em] shrink-0"
                style={{ color: LEVEL_COLOR[path.level], borderColor: LEVEL_COLOR[path.level] + "44", background: LEVEL_COLOR[path.level] + "12" }}
              >
                {path.level}
              </span>
            </div>
            <p className="font-sans text-[12px] text-fg-3 leading-[1.45] line-clamp-2 mb-2">{path.tagline}</p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-fg-4">
              <Clock size={10} />
              <span>{path.totalDuration}</span>
              <span>·</span>
              <span>{path.steps.length} steps</span>
            </div>
          </div>
          <ArrowRight size={14} className="text-fg-4 group-hover:text-fg-2 transition-colors shrink-0 mt-1 group-hover:translate-x-0.5" />
        </motion.a>
      ))}
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────────────

const TABS = [
  { id: "signals",  label: "AI Signals",   dot: "#d97706" },
  { id: "new",      label: "New Prompts",  dot: "#9F8CFF" },
  { id: "learn",    label: "Learn",        dot: "#10b981" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ── Main export ────────────────────────────────────────────────────────────

export default function ThePulse() {
  const [tab, setTab] = useState<TabId>("signals");
  const [expanded, setExpanded] = useState<UseCase | null>(null);

  const viewAllHref =
    tab === "signals" ? `${SITE}/news/` :
    tab === "new"     ? "#explore" :
    `${SITE}/learn/`;

  const viewAllLabel =
    tab === "signals" ? "All news →" :
    tab === "new"     ? "Browse all →" :
    "All paths →";

  return (
    <>
      <section className="w-full max-w-[860px] mx-auto px-6 md:px-8 mb-12">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg-4">The Pulse</span>
          </div>
          <span className="flex-1 h-px bg-hairline" />
          {tab === "new" ? (
            <button
              onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}
              className="font-mono text-[10px] tracking-[0.06em] text-fg-4 hover:text-violet-bright transition-colors"
            >
              {viewAllLabel}
            </button>
          ) : (
            <a
              href={viewAllHref}
              className="font-mono text-[10px] tracking-[0.06em] text-fg-4 hover:text-violet-bright transition-colors"
            >
              {viewAllLabel}
            </a>
          )}
        </div>

        {/* Tab rail */}
        <div className="flex gap-1 mb-5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={[
                "relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono text-[10px] tracking-[0.08em] uppercase transition-all duration-200",
                tab === t.id
                  ? "bg-white/[0.08] text-fg-1 shadow-sm"
                  : "text-fg-4 hover:text-fg-2 hover:bg-white/[0.03]",
              ].join(" ")}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: tab === t.id ? t.dot : "#4a4860" }}
              />
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "signals" && <SignalsPanel />}
            {tab === "new"     && <NewPromptsPanel onOpen={setExpanded} />}
            {tab === "learn"   && <LearnPanel />}
          </motion.div>
        </AnimatePresence>
      </section>

      {expanded && (
        <ExpandedCard item={expanded} onClose={() => setExpanded(null)} />
      )}
    </>
  );
}
