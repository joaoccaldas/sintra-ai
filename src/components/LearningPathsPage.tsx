"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Clock, X } from "lucide-react";
import { LEARNING_PATHS, type LearningPath } from "@/lib/learningPathsData";
import { BASE_PATH } from "@/lib/constants";

const STORE_KEY = "sintra-path-progress";
const STORE_EVENT = "sintra-progress";
const EMPTY_SNAPSHOT = "{}";

function readStore(): string {
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;
  return localStorage.getItem(STORE_KEY) ?? EMPTY_SNAPSHOT;
}

function subscribeStore(callback: () => void): () => void {
  window.addEventListener(STORE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function parseProgress(snapshot: string): Record<string, number[]> {
  try {
    const parsed = JSON.parse(snapshot) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.filter(item => Number.isInteger(item)) as number[] : [],
      ]),
    );
  } catch {
    return {};
  }
}

function writeProgress(data: Record<string, number[]>): void {
  const normalized = Object.fromEntries(
    Object.entries(data).map(([key, values]) => [key, [...new Set(values)].sort((a, b) => a - b)]),
  );
  localStorage.setItem(STORE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new Event(STORE_EVENT));
}

function usePathProgress(pathId: string) {
  const snapshot = useSyncExternalStore(subscribeStore, readStore, () => EMPTY_SNAPSHOT);
  const completed = useMemo(() => new Set(parseProgress(snapshot)[pathId] ?? []), [pathId, snapshot]);

  const toggle = useCallback((index: number) => {
    const all = parseProgress(readStore());
    const current = new Set(all[pathId] ?? []);
    current.has(index) ? current.delete(index) : current.add(index);
    writeProgress({ ...all, [pathId]: [...current] });
  }, [pathId]);

  return { completed, toggle };
}

const LEVEL_STYLE = {
  beginner: { label: "Beginner", color: "#10b981" },
  intermediate: { label: "Intermediate", color: "#9F8CFF" },
  advanced: { label: "Advanced", color: "#ef4444" },
};

function PathCard({ path, onOpen }: { path: LearningPath; onOpen: () => void }) {
  const level = LEVEL_STYLE[path.level];
  const { completed } = usePathProgress(path.id);
  const percent = path.steps.length ? Math.round((completed.size / path.steps.length) * 100) : 0;
  const done = percent === 100;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      className="group text-left rounded-2xl border p-6 transition-all duration-200 bg-[#0d0a1c] w-full"
      style={{ borderColor: `${path.color}28` }}
      aria-label={`${path.title}, ${level.label}, ${path.totalDuration}, ${percent}% complete`}
    >
      <div className="h-[2px] w-full rounded-full mb-5 bg-white/[0.06]" aria-hidden="true">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percent}%`, background: path.color }} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-4xl" aria-hidden="true">{path.emoji}</span>
        <div className="flex items-center gap-2">
          {percent > 0 && (
            <span className="font-mono text-[10px] tracking-[0.06em] px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: `${path.color}18`, color: path.color }}>
              {done && <CheckCircle2 size={10} />}
              {done ? "Complete" : `${percent}%`}
            </span>
          )}
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border" style={{ color: level.color, borderColor: `${level.color}44`, background: `${level.color}12` }}>
            {level.label}
          </span>
        </div>
      </div>

      <h2 className="font-serif text-[22px] font-normal text-fg-1 leading-[1.15] mb-2 group-hover:text-white transition-colors">{path.title}</h2>
      <p className="font-sans text-[14px] text-fg-3 leading-[1.55] mb-5">{path.tagline}</p>

      <div className="flex items-center gap-3 text-fg-4">
        <span className="font-mono text-[11px] flex items-center gap-1"><Clock size={11} /> {path.totalDuration}</span>
        <span aria-hidden="true">·</span>
        <span className="font-mono text-[11px]">{path.steps.length} steps</span>
        {completed.size > 0 && (
          <>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px]" style={{ color: path.color }}>{completed.size}/{path.steps.length} done</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-1 mt-4 pt-4 border-t border-hairline/40" aria-hidden="true">
        {path.steps.slice(0, 5).map((step, index) => (
          <span
            key={`${path.id}-${index}`}
            title={step.label}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm border transition-all"
            style={completed.has(index)
              ? { background: `${path.color}22`, borderColor: `${path.color}55` }
              : { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
          >
            {completed.has(index) ? "✓" : step.icon}
          </span>
        ))}
        {path.steps.length > 5 && <span className="font-mono text-[10px] text-fg-4 ml-1">+{path.steps.length - 5}</span>}
        <ChevronRight size={14} className="text-fg-4 group-hover:text-violet-bright ml-auto transition-colors" />
      </div>
    </motion.button>
  );
}

function PathDetail({ path, onClose }: { path: LearningPath; onClose: () => void }) {
  const level = LEVEL_STYLE[path.level];
  const { completed, toggle } = usePathProgress(path.id);
  const percent = path.steps.length ? Math.round((completed.size / path.steps.length) * 100) : 0;
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[80] bg-void/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.aside
        className="fixed inset-y-0 right-0 z-[90] w-full max-w-[560px] overflow-y-auto bg-[#0d0a1c] border-l border-violet/15 shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`path-${path.id}-title`}
      >
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${path.color}, transparent)` }} />
        <div className="px-6 pt-6 pb-16">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-4xl block mb-3" aria-hidden="true">{path.emoji}</span>
              <h2 id={`path-${path.id}-title`} className="font-serif text-[28px] font-normal text-fg-1 leading-[1.1] mb-1">{path.title}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border" style={{ color: level.color, borderColor: `${level.color}44`, background: `${level.color}12` }}>{level.label}</span>
                <span className="font-mono text-[11px] text-fg-4 flex items-center gap-1"><Clock size={11} /> {path.totalDuration}</span>
              </div>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="shrink-0 w-9 h-9 rounded-full bg-violet/[0.10] border border-violet/20 flex items-center justify-center text-fg-3 hover:text-fg-1 transition-all mt-1"
              aria-label={`Close ${path.title}`}
            >
              <X size={15} />
            </button>
          </div>

          <p className="font-serif italic text-[16px] leading-[1.5] text-fg-2 pl-4 border-l-2 mb-6" style={{ borderColor: path.color }}>{path.tagline}</p>
          <p className="font-mono text-[11px] text-fg-4 mb-4">{path.audience}</p>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[11px] text-fg-4">Progress</span>
              <span className="font-mono text-[11px]" style={{ color: path.color }}>{completed.size}/{path.steps.length} steps · {percent}%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/[0.06]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label={`${path.title} progress`}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percent}%`, background: path.color }} />
            </div>
          </div>

          <ol className="flex flex-col gap-0">
            {path.steps.map((step, index) => {
              const done = completed.has(index);
              return (
                <li key={`${path.id}-step-${index}`} className="relative flex gap-4">
                  {index < path.steps.length - 1 && <div className="absolute left-[19px] top-[38px] bottom-0 w-px" style={{ background: done ? `${path.color}60` : `${path.color}30` }} aria-hidden="true" />}
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    title={done ? "Mark incomplete" : "Mark complete"}
                    aria-pressed={done}
                    aria-label={`${done ? "Mark incomplete" : "Mark complete"}: ${step.label}`}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 z-10 border transition-all duration-200"
                    style={done
                      ? { background: `${path.color}30`, borderColor: path.color, color: "white" }
                      : { background: `${path.color}14`, borderColor: `${path.color}44` }}
                  >
                    {done ? <CheckCircle2 size={18} style={{ color: path.color }} /> : step.icon}
                  </button>
                  <div className="flex-1 pb-6">
                    <span className="font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4">Step {index + 1} · {step.duration}</span>
                    <h3 className="font-serif text-[16px] text-fg-1 leading-[1.3] mt-1 mb-1">{step.label}</h3>
                    <p className="font-sans text-[14px] text-fg-3 leading-[1.55] mb-3">{step.desc}</p>
                    <a
                      href={step.href}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] px-3 py-1.5 rounded-lg border transition-all"
                      style={{ color: path.color, borderColor: `${path.color}44`, background: `${path.color}0e` }}
                      {...(step.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      Open <ArrowRight size={11} />
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </motion.aside>
    </>
  );
}

export default function LearningPathsPage() {
  const [activePath, setActivePath] = useState<LearningPath | null>(null);

  const setPathInUrl = useCallback((path: LearningPath | null) => {
    const url = new URL(window.location.href);
    path ? url.searchParams.set("path", path.id) : url.searchParams.delete("path");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const openPath = useCallback((path: LearningPath) => {
    setActivePath(path);
    setPathInUrl(path);
  }, [setPathInUrl]);

  const closePath = useCallback(() => {
    setActivePath(null);
    setPathInUrl(null);
  }, [setPathInUrl]);

  useEffect(() => {
    const requestedId = new URLSearchParams(window.location.search).get("path");
    const requested = LEARNING_PATHS.find(path => path.id === requestedId);
    if (requested) setActivePath(requested);
  }, []);

  return (
    <div className="min-h-screen bg-abyss text-fg-1">
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, #9F8CFF, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-8">
        <div className="pt-10 pb-6">
          <a href={`${BASE_PATH}/`} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Sintra
          </a>
        </div>

        <motion.header className="pt-6 pb-16 border-b border-violet/[0.12]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex gap-3.5 items-center mb-6">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="eyebrow violet">Structured Learning</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(40px,6vw,80px)] leading-[1.04] tracking-[-0.025em] text-fg-1 mb-5">
            Learning <em className="italic text-violet-bright">paths.</em>
          </h1>
          <p className="font-sans text-[17px] text-fg-2 max-w-xl leading-[1.55]">
            Structured tracks that connect concepts, prompts, tools, and history into a curriculum, wherever you are in your AI journey.
          </p>
        </motion.header>

        <div className="py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid sm:grid-cols-2 gap-5">
            {LEARNING_PATHS.map(path => <PathCard key={path.id} path={path} onOpen={() => openPath(path)} />)}
          </motion.div>
        </div>

        <div className="pb-24 border-t border-violet/[0.08] pt-10">
          <p className="font-sans text-[14px] text-fg-4 text-center leading-[1.6] max-w-md mx-auto">
            Each path links directly to Sintra concepts, use cases, labs, and tools. Progress is stored privately in this browser.
          </p>
        </div>
      </div>

      <AnimatePresence>{activePath && <PathDetail key={activePath.id} path={activePath} onClose={closePath} />}</AnimatePresence>
    </div>
  );
}
