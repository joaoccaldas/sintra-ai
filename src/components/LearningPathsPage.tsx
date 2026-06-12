"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, Clock, ArrowRight, X, CheckCircle2 } from "lucide-react";
import { LEARNING_PATHS, type LearningPath, type PathStep } from "@/lib/learningPathsData";
import { BASE_PATH } from "@/lib/constants";

// ── Progress tracking (localStorage) ────────────────────────────────────────
const STORE_KEY = "sintra-path-progress";

function readProgress(): Record<string, Set<number>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) ?? "{}") as Record<string, number[]>;
    return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, new Set(v)]));
  } catch { return {}; }
}

function writeProgress(data: Record<string, Set<number>>) {
  const serialisable = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, [...v]]));
  localStorage.setItem(STORE_KEY, JSON.stringify(serialisable));
  window.dispatchEvent(new Event("sintra-progress"));
}

function usePathProgress(pathId: string) {
  const completed = useSyncExternalStore(
    cb => { window.addEventListener("sintra-progress", cb); return () => window.removeEventListener("sintra-progress", cb); },
    () => readProgress()[pathId] ?? new Set<number>(),
    () => new Set<number>(),
  );

  const toggle = useCallback((idx: number) => {
    const all = readProgress();
    const cur = new Set(all[pathId] ?? []);
    cur.has(idx) ? cur.delete(idx) : cur.add(idx);
    writeProgress({ ...all, [pathId]: cur });
  }, [pathId]);

  return { completed, toggle };
}

const LEVEL_STYLE = {
  beginner:     { label: "Beginner",     color: "#10b981" },
  intermediate: { label: "Intermediate", color: "#9F8CFF" },
  advanced:     { label: "Advanced",     color: "#ef4444" },
};

const STEP_TYPE_ICON: Record<PathStep["type"], string> = {
  concept:    "💡",
  "use-case": "⚡",
  tool:       "🔧",
  page:       "📄",
  read:       "📖",
};

function PathCard({ path, onClick }: { path: LearningPath; onClick: () => void }) {
  const lvl = LEVEL_STYLE[path.level];
  const { completed } = usePathProgress(path.id);
  const pct = path.steps.length > 0 ? Math.round((completed.size / path.steps.length) * 100) : 0;
  const done = pct === 100;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      className="group text-left rounded-2xl border p-6 transition-all duration-200 bg-[#0d0a1c] w-full"
      style={{ borderColor: path.color + "28" }}
    >
      {/* Accent top with progress fill */}
      <div className="h-[2px] w-full rounded-full mb-5 bg-white/[0.06]">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: path.color }} />
      </div>

      {/* Emoji + level */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-4xl">{path.emoji}</span>
        <div className="flex items-center gap-2">
          {pct > 0 && (
            <span className="font-mono text-[9px] tracking-[0.06em] px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: path.color + "18", color: path.color }}>
              {done ? <CheckCircle2 size={9} /> : null}
              {done ? "Complete" : `${pct}%`}
            </span>
          )}
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border"
            style={{ color: lvl.color, borderColor: lvl.color + "44", background: lvl.color + "12" }}>
            {lvl.label}
          </span>
        </div>
      </div>

      <h3 className="font-serif text-[22px] font-normal text-fg-1 leading-[1.15] mb-2 group-hover:text-white transition-colors">
        {path.title}
      </h3>
      <p className="font-sans text-[13px] text-fg-3 leading-[1.5] mb-5">{path.tagline}</p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-fg-4">
        <span className="font-mono text-[10px] flex items-center gap-1">
          <Clock size={10} /> {path.totalDuration}
        </span>
        <span className="text-fg-4">·</span>
        <span className="font-mono text-[10px]">{path.steps.length} steps</span>
        {completed.size > 0 && <><span className="text-fg-4">·</span><span className="font-mono text-[10px]" style={{ color: path.color }}>{completed.size}/{path.steps.length} done</span></>}
      </div>

      {/* Steps preview */}
      <div className="flex items-center gap-1 mt-4 pt-4 border-t border-hairline/40">
        {path.steps.slice(0, 5).map((step, i) => (
          <span key={i} title={step.label}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm border transition-all"
            style={completed.has(i)
              ? { background: path.color + "22", borderColor: path.color + "55" }
              : { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }
            }>
            {completed.has(i) ? "✓" : step.icon}
          </span>
        ))}
        {path.steps.length > 5 && (
          <span className="font-mono text-[10px] text-fg-4 ml-1">+{path.steps.length - 5}</span>
        )}
        <ChevronRight size={14} className="text-fg-4 group-hover:text-violet-bright ml-auto transition-colors" />
      </div>
    </motion.button>
  );
}

function PathDetail({ path, onClose }: { path: LearningPath; onClose: () => void }) {
  const lvl = LEVEL_STYLE[path.level];
  const { completed, toggle } = usePathProgress(path.id);
  const pct = path.steps.length > 0 ? Math.round((completed.size / path.steps.length) * 100) : 0;
  return (
    <>
      <motion.div key="scrim" className="fixed inset-0 z-[80] bg-void/75 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }} onClick={onClose} />

      <motion.div key="panel"
        className="fixed inset-y-0 right-0 z-[90] w-full max-w-[560px] overflow-y-auto bg-[#0d0a1c] border-l border-violet/15 shadow-2xl"
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}>

        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${path.color}, transparent)` }} />

        <div className="px-6 pt-6 pb-16">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-4xl block mb-3">{path.emoji}</span>
              <h2 className="font-serif text-[28px] font-normal text-fg-1 leading-[1.1] mb-1">{path.title}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border"
                  style={{ color: lvl.color, borderColor: lvl.color + "44", background: lvl.color + "12" }}>
                  {lvl.label}
                </span>
                <span className="font-mono text-[10px] text-fg-4 flex items-center gap-1">
                  <Clock size={10} /> {path.totalDuration}
                </span>
              </div>
            </div>
            <button onClick={onClose}
              className="shrink-0 w-9 h-9 rounded-full bg-violet/[0.10] border border-violet/20 flex items-center justify-center text-fg-3 hover:text-fg-1 transition-all mt-1">
              <X size={15} />
            </button>
          </div>

          <p className="font-serif italic text-[16px] leading-[1.5] text-fg-2 pl-4 border-l-2 mb-6"
            style={{ borderColor: path.color }}>
            {path.tagline}
          </p>
          <p className="font-mono text-[11px] text-fg-4 mb-4">{path.audience}</p>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] text-fg-4">Progress</span>
              <span className="font-mono text-[10px]" style={{ color: path.color }}>{completed.size}/{path.steps.length} steps · {pct}%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: path.color }} />
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-0">
            {path.steps.map((step, idx) => {
              const isDone = completed.has(idx);
              return (
              <div key={idx} className="relative flex gap-4">
                {/* Line */}
                {idx < path.steps.length - 1 && (
                  <div className="absolute left-[19px] top-[38px] bottom-0 w-px" style={{ background: isDone ? path.color + "60" : path.color + "30" }} />
                )}
                {/* Icon — clickable checkbox */}
                <button
                  onClick={() => toggle(idx)}
                  title={isDone ? "Mark incomplete" : "Mark complete"}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 z-10 border transition-all duration-200"
                  style={isDone
                    ? { background: path.color + "30", borderColor: path.color, color: "white" }
                    : { background: path.color + "14", borderColor: path.color + "44" }
                  }>
                  {isDone ? <CheckCircle2 size={18} style={{ color: path.color }} /> : step.icon}
                </button>
                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[9px] tracking-[0.10em] uppercase text-fg-4">
                      Step {idx + 1} · {step.duration}
                    </span>
                  </div>
                  <p className="font-serif text-[15px] text-fg-1 leading-[1.3] mb-1">{step.label}</p>
                  <p className="font-sans text-[13px] text-fg-3 leading-[1.5] mb-3">{step.desc}</p>
                  <a
                    href={step.href}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] px-3 py-1.5 rounded-lg border transition-all"
                    style={{ color: path.color, borderColor: path.color + "44", background: path.color + "0e" }}
                    {...(step.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    Open <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            );})}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function LearningPathsPage() {
  const [activePath, setActivePath] = useState<LearningPath | null>(null);

  return (
    <div className="min-h-screen bg-abyss text-fg-1">
      {/* Ambient */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #9F8CFF, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-8">
        {/* Back */}
        <div className="pt-10 pb-6">
          <a href={`${BASE_PATH}/`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Sintra
          </a>
        </div>

        {/* Hero */}
        <motion.header className="pt-6 pb-16 border-b border-violet/[0.12]"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex gap-3.5 items-center mb-6">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="eyebrow violet">Structured Learning</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(40px,6vw,80px)] leading-[1.04] tracking-[-0.025em] text-fg-1 mb-5">
            Learning{" "}
            <em className="italic" style={{
              backgroundImage: "linear-gradient(180deg, #F4F2EA 0%, #9F8CFF 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>paths.</em>
          </h1>
          <p className="font-sans text-[17px] text-fg-2 max-w-xl leading-[1.55]">
            Structured tracks that chain concepts, prompts, tools, and history into a curriculum — wherever you are in your AI journey.
          </p>
        </motion.header>

        {/* Paths grid */}
        <div className="py-12">
          {LEARNING_PATHS.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-violet/[0.15] rounded-2xl">
              <p className="font-serif text-[22px] text-fg-3 mb-2">Paths coming soon</p>
              <p className="font-mono text-[12px] text-fg-4">The first learning tracks are being curated.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, staggerChildren: 0.08 }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {LEARNING_PATHS.map(path => (
                <PathCard key={path.id} path={path} onClick={() => setActivePath(path)} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Callout */}
        <div className="pb-24 border-t border-violet/[0.08] pt-10">
          <p className="font-sans text-[14px] text-fg-4 text-center leading-[1.6] max-w-md mx-auto">
            Each path links directly to existing Sintra content — use cases, concepts, labs, and tools. No fluff, just signal.
          </p>
        </div>
      </div>

      {/* Path detail panel */}
      <AnimatePresence>
        {activePath && <PathDetail key={activePath.id} path={activePath} onClose={() => setActivePath(null)} />}
      </AnimatePresence>
    </div>
  );
}
