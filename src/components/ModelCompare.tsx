"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Trophy, Minus } from "lucide-react";
import { AI_MODELS, TIER_META, SPEED_META, type ModelEntry } from "@/lib/modelsData";

// ── Types ─────────────────────────────────────────────────────────────────

type Winner = "a" | "b" | "tie";

interface CompareRow {
  label: string;
  /** Extract a comparable value from a model (higher = better unless lowerBetter=true) */
  getValue: (m: ModelEntry) => number | string | boolean | null;
  /** Format value for display */
  format: (v: ReturnType<CompareRow["getValue"]>) => string;
  /** If true, lower numeric value wins */
  lowerBetter?: boolean;
  /** Group separator label */
  group?: string;
}

// ── Row definitions ────────────────────────────────────────────────────────

const ROWS: CompareRow[] = [
  // Pricing
  {
    group: "Pricing (per 1M tokens)",
    label: "Input price",
    getValue: m => m.inputPrice,
    format: v => v === null ? "—" : `$${v as number}`,
    lowerBetter: true,
  },
  {
    label: "Output price",
    getValue: m => m.outputPrice,
    format: v => v === null ? "—" : `$${v as number}`,
    lowerBetter: true,
  },

  // Context
  {
    group: "Context",
    label: "Context window",
    getValue: m => m.contextWindow,
    format: v => v === null ? "—" : `${(v as number) >= 1000 ? `${(v as number) / 1000}M` : `${v}k`}`,
  },
  {
    label: "Output limit",
    getValue: m => m.outputLimit,
    format: v => v === null ? "—" : `${v}k`,
  },

  // Benchmarks
  {
    group: "Benchmarks",
    label: "MMLU",
    getValue: m => m.mmlu,
    format: v => v === null ? "—" : `${v}%`,
  },
  {
    label: "GPQA (grad-level science)",
    getValue: m => m.gpqa,
    format: v => v === null ? "—" : `${v}%`,
  },
  {
    label: "SWE-Bench (coding)",
    getValue: m => m.sweBench,
    format: v => v === null ? "—" : `${v}%`,
  },
  {
    label: "AIME (math)",
    getValue: m => m.mathAime,
    format: v => v === null ? "—" : `${v}%`,
  },

  // Capabilities
  {
    group: "Capabilities",
    label: "Multimodal",
    getValue: m => m.multimodal,
    format: v => v ? "Yes" : "No",
  },
  {
    label: "Extended thinking",
    getValue: m => m.extendedThinking,
    format: v => v ? "Yes" : "No",
  },
  {
    label: "Web search",
    getValue: m => m.webSearch,
    format: v => v ? "Yes" : "No",
  },
  {
    label: "Open weights",
    getValue: m => m.openSource,
    format: v => v ? "Yes" : "No",
  },

  // Speed / tier
  {
    group: "Classification",
    label: "Tier",
    getValue: m => m.tier,
    format: v => TIER_META[v as ModelEntry["tier"]].label,
  },
  {
    label: "Speed",
    getValue: m => m.speed,
    format: v => SPEED_META[v as ModelEntry["speed"]].label,
  },
];

// ── Comparison logic ───────────────────────────────────────────────────────

function getWinner(row: CompareRow, a: ModelEntry, b: ModelEntry): Winner {
  const av = row.getValue(a);
  const bv = row.getValue(b);

  if (av === null && bv === null) return "tie";
  if (av === null) return "b";
  if (bv === null) return "a";

  // Numeric comparison
  if (typeof av === "number" && typeof bv === "number") {
    if (av === bv) return "tie";
    return (row.lowerBetter ? av < bv : av > bv) ? "a" : "b";
  }

  // Boolean comparison (true wins)
  if (typeof av === "boolean" && typeof bv === "boolean") {
    if (av === bv) return "tie";
    return av ? "a" : "b";
  }

  return "tie";
}

/** Count wins for summary verdict */
function tallyWins(modelA: ModelEntry, modelB: ModelEntry) {
  let winsA = 0, winsB = 0;
  ROWS.forEach(row => {
    if (row.group) return; // skip group headers
    const w = getWinner(row, modelA, modelB);
    if (w === "a") winsA++;
    if (w === "b") winsB++;
  });
  return { winsA, winsB };
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ModelSelect({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (id: string) => void;
  label: string;
}) {
  const model = AI_MODELS.find(m => m.id === value);
  return (
    <div className="flex-1 min-w-0">
      <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-fg-4 mb-1.5">{label}</p>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 pr-8 font-mono text-[12px] text-fg-1 outline-none focus:border-violet/50 transition-colors cursor-pointer"
        >
          {AI_MODELS.map(m => (
            <option key={m.id} value={m.id}>
              {m.provider} — {m.name}
            </option>
          ))}
        </select>
        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
      </div>
      {model && (
        <p className="font-mono text-[10px] text-fg-4 mt-1.5 truncate">
          <span style={{ color: model.providerColor }}>●</span>{" "}
          {TIER_META[model.tier].label} · {model.highlight}
        </p>
      )}
    </div>
  );
}

function WinIcon({ winner, side }: { winner: Winner; side: "a" | "b" }) {
  if (winner === side)
    return <Trophy size={10} className="text-amber-400 shrink-0" />;
  if (winner === "tie")
    return <Minus size={10} className="text-fg-4 shrink-0 opacity-50" />;
  return null;
}

// ── Main component ─────────────────────────────────────────────────────────

/** Default pair: Claude Opus 4.8 vs GPT-5.5 (most-searched comparison) */
const DEFAULT_A = "claude-opus-4-8";
const DEFAULT_B = "gpt-5-5";

/**
 * ModelCompare — side-by-side comparison of any two models.
 * All data comes from src/lib/modelsData.ts.
 */
export default function ModelCompare() {
  const [idA, setIdA] = useState(DEFAULT_A);
  const [idB, setIdB] = useState(DEFAULT_B);
  const [open, setOpen] = useState(false);

  const modelA = useMemo(() => AI_MODELS.find(m => m.id === idA) ?? AI_MODELS[0], [idA]);
  const modelB = useMemo(() => AI_MODELS.find(m => m.id === idB) ?? AI_MODELS[1], [idB]);
  const { winsA, winsB } = useMemo(() => tallyWins(modelA, modelB), [modelA, modelB]);

  const verdictWinner = winsA > winsB ? modelA : winsB > winsA ? modelB : null;

  return (
    <div className="mb-10 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">

      {/* Header — always visible, click to expand */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet/15 shrink-0">
            <Trophy size={13} className="text-violet-bright" />
          </span>
          <div>
            <p className="font-mono text-[11px] font-medium text-fg-1">Model vs. Model</p>
            <p className="font-mono text-[10px] text-fg-4">
              {open
                ? `${modelA.name} vs ${modelB.name}`
                : "Pick any two models and compare pricing, benchmarks & capabilities"}
            </p>
          </div>
        </div>
        <ChevronDown
          size={14}
          className={`text-fg-4 transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expanded panel */}
      {open && (
        <div className="border-t border-white/8 px-5 pb-6 pt-5">

          {/* Model selectors */}
          <div className="flex gap-4 mb-6">
            <ModelSelect value={idA} onChange={setIdA} label="Model A" />
            <div className="flex items-center justify-center shrink-0 mt-6">
              <span className="font-mono text-[11px] text-fg-4 px-2">vs</span>
            </div>
            <ModelSelect value={idB} onChange={setIdB} label="Model B" />
          </div>

          {/* Comparison table */}
          <div className="rounded-xl border border-white/8 overflow-hidden mb-5">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02]">
                  <th className="font-mono text-[9px] tracking-[0.12em] uppercase text-fg-4 px-4 py-2.5 w-[40%]">Metric</th>
                  <th className="font-mono text-[9px] tracking-[0.12em] uppercase px-4 py-2.5" style={{ color: modelA.providerColor }}>
                    {modelA.name}
                  </th>
                  <th className="font-mono text-[9px] tracking-[0.12em] uppercase px-4 py-2.5" style={{ color: modelB.providerColor }}>
                    {modelB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => {
                  // Group separator row
                  if (row.group) {
                    return (
                      <tr key={`group-${i}`} className="bg-white/[0.015] border-t border-white/8">
                        <td
                          colSpan={3}
                          className="font-mono text-[9px] tracking-[0.12em] uppercase text-fg-4 px-4 py-2"
                        >
                          {row.group}
                        </td>
                      </tr>
                    );
                  }

                  const vA = row.getValue(modelA);
                  const vB = row.getValue(modelB);
                  const winner = getWinner(row, modelA, modelB);

                  return (
                    <tr key={row.label} className="border-t border-white/[0.04] hover:bg-white/[0.015] transition-colors">
                      <td className="font-mono text-[10px] text-fg-3 px-4 py-2.5">{row.label}</td>
                      <td className="px-4 py-2.5">
                        <span className="flex items-center gap-1.5">
                          <WinIcon winner={winner} side="a" />
                          <span
                            className="font-mono text-[11px]"
                            style={{ color: winner === "a" ? "#10b981" : winner === "tie" ? undefined : "rgba(255,255,255,0.35)" }}
                          >
                            {row.format(vA)}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="flex items-center gap-1.5">
                          <WinIcon winner={winner} side="b" />
                          <span
                            className="font-mono text-[11px]"
                            style={{ color: winner === "b" ? "#10b981" : winner === "tie" ? undefined : "rgba(255,255,255,0.35)" }}
                          >
                            {row.format(vB)}
                          </span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Win tally + verdict */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Win counts */}
            <div className="flex gap-3 flex-1">
              <div className="flex-1 rounded-lg border border-white/8 bg-white/[0.02] px-4 py-3 text-center">
                <p className="font-mono text-[22px] font-medium" style={{ color: modelA.providerColor }}>
                  {winsA}
                </p>
                <p className="font-mono text-[9px] text-fg-4 truncate">{modelA.name}</p>
              </div>
              <div className="flex-1 rounded-lg border border-white/8 bg-white/[0.02] px-4 py-3 text-center">
                <p className="font-mono text-[22px] font-medium" style={{ color: modelB.providerColor }}>
                  {winsB}
                </p>
                <p className="font-mono text-[9px] text-fg-4 truncate">{modelB.name}</p>
              </div>
            </div>

            {/* Verdict */}
            <div className="flex-[2] rounded-lg border border-violet/20 bg-violet/[0.05] px-4 py-3">
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-fg-4 mb-1">Verdict</p>
              {verdictWinner ? (
                <>
                  <p className="font-mono text-[12px] text-fg-1 mb-1">
                    <span style={{ color: verdictWinner.providerColor }}>{verdictWinner.name}</span>{" "}
                    wins on {verdictWinner.id === modelA.id ? winsA : winsB} of{" "}
                    {winsA + winsB} measured metrics.
                  </p>
                  <p className="font-mono text-[10px] text-fg-4 leading-[1.5]">
                    Best for: {verdictWinner.bestFor.slice(0, 3).join(" · ")}
                  </p>
                </>
              ) : (
                <p className="font-mono text-[12px] text-fg-2">
                  Too close to call — choose based on your primary use case.
                </p>
              )}
            </div>
          </div>

          {/* Best-for lists */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[modelA, modelB].map((m) => (
              <div key={m.id} className="rounded-lg border border-white/[0.06] bg-white/[0.01] px-4 py-3">
                <p
                  className="font-mono text-[9px] tracking-[0.12em] uppercase mb-2"
                  style={{ color: m.providerColor }}
                >
                  {m.name} — best for
                </p>
                <ul className="space-y-0.5">
                  {m.bestFor.map(bf => (
                    <li key={bf} className="font-mono text-[10px] text-fg-3 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                      {bf}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
