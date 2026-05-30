"use client";

import { useState, useMemo } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { BASE_PATH } from "@/lib/data";
import { AI_MODELS, TIER_META, SPEED_META, type ModelEntry } from "@/lib/modelsData";

// ── Question definitions ───────────────────────────────────────────────────

const TASKS = [
  { id: "writing",    label: "Writing & content",    icon: "✦", desc: "Copy, reports, summaries, emails" },
  { id: "coding",     label: "Coding",               icon: "⬡", desc: "Code gen, review, debugging, agents" },
  { id: "research",   label: "Research & analysis",  icon: "◇", desc: "Literature, synthesis, long docs" },
  { id: "math",       label: "Math & reasoning",     icon: "◎", desc: "Equations, logic, science problems" },
  { id: "vision",     label: "Vision / multimodal",  icon: "△", desc: "Image understanding, video, OCR" },
  { id: "volume",     label: "High-volume / scale",  icon: "⊞", desc: "Batch jobs, APIs, classification" },
] as const;
type Task = typeof TASKS[number]["id"];

const CONTEXT_SIZES = [
  { id: "short",    label: "Short",     desc: "< 32k tokens — typical chat", tokens: 32 },
  { id: "medium",   label: "Medium",    desc: "32k–200k — long documents",  tokens: 200 },
  { id: "long",     label: "Long",      desc: "200k–1M — books, codebases", tokens: 1000 },
  { id: "massive",  label: "Massive",   desc: "1M+ tokens — entire repos",   tokens: 10000 },
] as const;
type ContextSize = typeof CONTEXT_SIZES[number]["id"];

const BUDGETS = [
  { id: "minimal",  label: "Minimal",   desc: "< $0.50/1M tokens",  max: 0.5 },
  { id: "low",      label: "Economy",   desc: "$0.50–$2/1M tokens", max: 2 },
  { id: "mid",      label: "Balanced",  desc: "$2–$8/1M tokens",    max: 8 },
  { id: "high",     label: "Quality first", desc: "Any cost",       max: Infinity },
  { id: "oss",      label: "Open source", desc: "Self-host for free", max: Infinity },
] as const;
type Budget = typeof BUDGETS[number]["id"];

// ── Scoring ────────────────────────────────────────────────────────────────

function scoreModel(m: ModelEntry, task: Task, ctx: ContextSize, budget: Budget): number {
  let score = 0;

  // Context window fit
  const ctxTokens = CONTEXT_SIZES.find(c => c.id === ctx)!.tokens;
  if (m.contextWindow < ctxTokens) return -1; // hard filter: can't fit
  if (m.contextWindow >= ctxTokens * 5) score += 2; // bonus for headroom

  // Budget fit
  if (budget === "oss" && !m.openSource) return -1;
  if (budget !== "oss" && budget !== "high" && m.inputPrice !== null) {
    const maxPrice = BUDGETS.find(b => b.id === budget)!.max;
    if (m.inputPrice > maxPrice) return -1;
    if (m.inputPrice <= maxPrice * 0.3) score += 3; // well under budget
  }

  // Task fit
  if (task === "coding") {
    score += (m.sweBench ?? 0) / 10;
    if (m.codeExecution) score += 3;
  }
  if (task === "math") {
    score += (m.mathAime ?? 0) / 10;
    if (m.extendedThinking) score += 4;
  }
  if (task === "research") {
    score += (m.gpqa ?? 0) / 15;
    if (m.contextWindow >= 200) score += 3;
    if (m.webSearch) score += 2;
  }
  if (task === "vision") {
    if (!m.multimodal) return -1;
    score += 5;
  }
  if (task === "writing") {
    score += (m.mmlu ?? 0) / 15;
    if (m.speed === "fast") score += 2;
  }
  if (task === "volume") {
    if (m.speed === "fast") score += 5;
    if (m.speed === "slow") score -= 3;
    // Reward cheap models
    if (m.inputPrice !== null && m.inputPrice < 1) score += 4;
    if (m.inputPrice !== null && m.inputPrice < 0.3) score += 3;
  }

  // General quality signal
  score += (m.mmlu ?? 0) / 30;
  score += (m.gpqa ?? 0) / 40;

  return score;
}

function explainChoice(m: ModelEntry, task: Task, ctx: ContextSize): string {
  const reasons: string[] = [];

  if (task === "coding" && m.sweBench) reasons.push(`${m.sweBench}% SWE-bench score`);
  if (task === "math" && m.mathAime) reasons.push(`${m.mathAime}% on AIME math`);
  if (task === "vision" && m.multimodal) reasons.push("native vision capability");
  if (task === "research" && m.gpqa) reasons.push(`${m.gpqa}% GPQA graduate-science`);
  if (m.contextWindow >= 1000) reasons.push(`${m.contextWindow >= 10000 ? "10M" : "1M"}-token context`);
  if (m.extendedThinking) reasons.push("extended thinking mode");
  if (m.webSearch) reasons.push("built-in web search");
  if (m.openSource) reasons.push("open weights — self-hostable");
  if (m.inputPrice !== null && m.inputPrice < 0.5) reasons.push(`$${m.inputPrice}/1M tokens`);

  return reasons.slice(0, 3).join(" · ") || m.highlight;
}

// ── UI ─────────────────────────────────────────────────────────────────────

function Chip({
  selected, onClick, icon, label, desc,
}: { selected: boolean; onClick: () => void; icon?: string; label: string; desc: string }) {
  return (
    <button
      onClick={onClick}
      className={[
        "text-left p-3 rounded-xl border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright",
        selected
          ? "border-violet/60 bg-violet/[0.12] text-fg-1"
          : "border-white/[0.08] bg-white/[0.02] text-fg-3 hover:border-white/20 hover:text-fg-1",
      ].join(" ")}
    >
      {icon && <span className="block text-lg mb-1" style={{ color: selected ? "#B6A6FF" : undefined }}>{icon}</span>}
      <span className="block text-sm font-medium">{label}</span>
      <span className="block text-[11px] text-fg-4 mt-0.5">{desc}</span>
    </button>
  );
}

export default function ModelWizard() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [task, setTask] = useState<Task | null>(null);
  const [ctx, setCtx] = useState<ContextSize | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);

  const results = useMemo<ModelEntry[]>(() => {
    if (!task || !ctx || !budget) return [];
    return AI_MODELS
      .map(m => ({ m, s: scoreModel(m, task, ctx, budget) }))
      .filter(x => x.s >= 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 3)
      .map(x => x.m);
  }, [task, ctx, budget]);

  function reset() { setStep(0); setTask(null); setCtx(null); setBudget(null); }

  const MEDAL = ["🥇", "🥈", "🥉"];

  return (
    <div className="mb-10 p-6 rounded-2xl border border-violet/[0.15] bg-violet/[0.03]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-fg-1">Which model should I use?</h2>
          <p className="text-xs text-fg-3 mt-0.5">Answer 3 questions — get a personalised recommendation</p>
        </div>
        {step > 0 && (
          <button onClick={reset} className="flex items-center gap-1 font-mono text-[10px] text-fg-4 hover:text-fg-2 transition-colors">
            <RotateCcw size={11} /> Reset
          </button>
        )}
      </div>

      {/* Progress bar */}
      {step < 3 && (
        <div className="flex gap-1 mb-6">
          {[0, 1, 2].map(i => (
            <div key={i} className="h-0.5 flex-1 rounded-full transition-all duration-300"
              style={{ background: i < step ? "#9F8CFF" : i === step ? "#9F8CFF66" : "#ffffff14" }} />
          ))}
        </div>
      )}

      {/* Step 0 — Task */}
      {step === 0 && (
        <div>
          <p className="text-sm text-fg-2 mb-4">What's your primary task?</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TASKS.map(t => (
              <Chip key={t.id} selected={task === t.id} icon={t.icon} label={t.label} desc={t.desc}
                onClick={() => { setTask(t.id); setStep(1); }} />
            ))}
          </div>
        </div>
      )}

      {/* Step 1 — Context */}
      {step === 1 && (
        <div>
          <p className="text-sm text-fg-2 mb-4">How much context do you need?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CONTEXT_SIZES.map(c => (
              <Chip key={c.id} selected={ctx === c.id} label={c.label} desc={c.desc}
                onClick={() => { setCtx(c.id); setStep(2); }} />
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Budget */}
      {step === 2 && (
        <div>
          <p className="text-sm text-fg-2 mb-4">What's your budget priority?</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {BUDGETS.map(b => (
              <Chip key={b.id} selected={budget === b.id} label={b.label} desc={b.desc}
                onClick={() => { setBudget(b.id); setStep(3); }} />
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — Results */}
      {step === 3 && results.length > 0 && (
        <div>
          <p className="text-sm text-fg-2 mb-4">
            Top picks for <strong className="text-fg-1">{TASKS.find(t => t.id === task)?.label}</strong> ·{" "}
            <strong className="text-fg-1">{CONTEXT_SIZES.find(c => c.id === ctx)?.label}</strong> context ·{" "}
            <strong className="text-fg-1">{BUDGETS.find(b => b.id === budget)?.label}</strong>
          </p>
          <div className="space-y-2">
            {results.map((m, i) => (
              <div key={m.id}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${i === 0 ? "border-violet/30 bg-violet/[0.06]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                <span className="text-xl shrink-0 mt-0.5">{MEDAL[i]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-medium text-fg-1">{m.name}</span>
                    <span className="font-mono text-[10px]" style={{ color: m.providerColor }}>{m.provider}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
                      style={{ color: TIER_META[m.tier].color, borderColor: TIER_META[m.tier].color + "44", background: TIER_META[m.tier].color + "14" }}>
                      {TIER_META[m.tier].label}
                    </span>
                  </div>
                  <p className="text-xs text-fg-3">{explainChoice(m, task!, ctx!)}</p>
                </div>
                <div className="text-right shrink-0">
                  {m.inputPrice !== null
                    ? <p className="font-mono text-xs text-fg-2">${m.inputPrice}/1M in</p>
                    : <p className="font-mono text-xs text-fg-4">self-host</p>}
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: SPEED_META[m.speed].color }}>
                    {SPEED_META[m.speed].label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button onClick={reset}
              className="font-mono text-[11px] text-fg-3 hover:text-fg-1 transition-colors flex items-center gap-1">
              <RotateCcw size={11} /> Try different answers
            </button>
            <a href={`${BASE_PATH}/models/`}
              className="font-mono text-[11px] text-violet-bright hover:underline flex items-center gap-1">
              Full comparison table <ArrowRight size={11} />
            </a>
          </div>
        </div>
      )}

      {step === 3 && results.length === 0 && (
        <div className="text-center py-6">
          <p className="text-fg-3 text-sm mb-3">No model matches all constraints — try relaxing the budget filter.</p>
          <button onClick={reset} className="font-mono text-[11px] text-violet-bright hover:underline">Start over</button>
        </div>
      )}
    </div>
  );
}
