"use client";

import { useState, useMemo } from "react";
import { ExternalLink, ChevronUp, ChevronDown, Info } from "lucide-react";
import { BASE_PATH } from "@/lib/data";
import {
  AI_MODELS, MODEL_PROVIDERS, TIER_META, SPEED_META,
  type ModelEntry, type ModelTier,
} from "@/lib/modelsData";

// ── Helpers ────────────────────────────────────────────────────────────────

function fmt(n: number | null, suffix = ""): string {
  if (n === null) return "—";
  return `${n}${suffix}`;
}

function fmtCtx(k: number): string {
  return k >= 1000 ? `${k / 1000}M` : `${k}k`;
}

function fmtPrice(n: number | null): string {
  if (n === null) return "—";
  if (n < 1) return `$${n.toFixed(2)}`;
  return `$${n}`;
}

function Score({ value, warn = 60 }: { value: number | null; warn?: number }) {
  if (value === null) return <span className="text-fg-4 text-xs">—</span>;
  const color = value >= 80 ? "#10b981" : value >= warn ? "#f59e0b" : "#ef4444";
  return <span className="text-xs font-mono font-medium" style={{ color }}>{value}%</span>;
}

function BoolChip({ val }: { val: boolean }) {
  return val
    ? <span className="text-[10px] text-emerald-400">✓</span>
    : <span className="text-[10px] text-fg-4">—</span>;
}

type SortKey = "name" | "contextWindow" | "inputPrice" | "mmlu" | "gpqa" | "sweBench" | "mathAime";

// ── Main component ─────────────────────────────────────────────────────────

export default function ModelsClient() {
  const [tierFilter, setTierFilter] = useState<ModelTier | "all">("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<ModelEntry | null>(null);

  const tiers: ModelTier[] = ["flagship", "balanced", "efficient", "reasoning", "open"];

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  const filtered = useMemo(() => {
    let list = [...AI_MODELS];
    if (tierFilter !== "all") list = list.filter(m => m.tier === tierFilter);
    if (providerFilter !== "all") list = list.filter(m => m.provider === providerFilter);
    list.sort((a, b) => {
      const av = a[sortKey] ?? (sortDir === "asc" ? Infinity : -Infinity);
      const bv = b[sortKey] ?? (sortDir === "asc" ? Infinity : -Infinity);
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc"
        ? (av as number) - (bv as number)
        : (bv as number) - (av as number);
    });
    return list;
  }, [tierFilter, providerFilter, sortKey, sortDir]);

  function SortBtn({ col, label }: { col: SortKey; label: string }) {
    const active = sortKey === col;
    return (
      <button
        onClick={() => handleSort(col)}
        className={`flex items-center gap-0.5 font-mono text-[10px] tracking-[0.08em] uppercase whitespace-nowrap transition-colors ${active ? "text-violet-bright" : "text-fg-4 hover:text-fg-2"}`}
      >
        {label}
        {active
          ? sortDir === "asc" ? <ChevronUp size={10} /> : <ChevronDown size={10} />
          : <ChevronDown size={10} className="opacity-30" />}
      </button>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-4">Reference</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-fg-1 mb-3">AI Model Comparison</h1>
        <p className="text-fg-2 text-lg max-w-2xl mb-6">
          API pricing, context windows, and benchmark scores for {AI_MODELS.length} frontier models — side by side.
        </p>
        <p className="text-xs text-fg-4 flex items-center gap-1.5">
          <Info size={11} />
          Pricing and benchmarks are approximate and change frequently. Always verify at provider docs before production use. Last verified May 2026.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setTierFilter("all")}
            className={`px-2.5 py-1 rounded-full border font-mono text-[10px] tracking-[0.06em] transition-all ${tierFilter === "all" ? "bg-violet/20 border-violet/60 text-violet-bright" : "border-white/10 text-fg-3 hover:border-white/20"}`}
          >All tiers</button>
          {tiers.map(t => (
            <button key={t} onClick={() => setTierFilter(t === tierFilter ? "all" : t)}
              className={`px-2.5 py-1 rounded-full border font-mono text-[10px] tracking-[0.06em] transition-all ${tierFilter === t ? "border-current" : "border-white/10 text-fg-3 hover:border-white/20"}`}
              style={tierFilter === t ? { color: TIER_META[t].color, borderColor: TIER_META[t].color + "88", background: TIER_META[t].color + "18" } : {}}
            >
              {TIER_META[t].label}
            </button>
          ))}
        </div>

        <select
          value={providerFilter}
          onChange={e => setProviderFilter(e.target.value)}
          className="font-mono text-[11px] bg-white/[0.04] border border-hairline rounded-lg px-3 py-1.5 text-fg-2 outline-none focus:border-violet/60 transition-colors"
        >
          <option value="all">All providers</option>
          {MODEL_PROVIDERS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <span className="font-mono text-[11px] text-fg-4 ml-auto">{filtered.length} models</span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl border border-white/[0.07] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/[0.07]">
                <th className="px-4 py-3 w-52 sticky left-0 bg-[#0d0a1c]">
                  <SortBtn col="name" label="Model" />
                </th>
                <th className="px-3 py-3 w-28">Tier</th>
                <th className="px-3 py-3 w-24">
                  <SortBtn col="contextWindow" label="Context" />
                </th>
                <th className="px-3 py-3 w-28">
                  <SortBtn col="inputPrice" label="Price in/out" />
                </th>
                <th className="px-3 py-3 w-20">
                  <SortBtn col="mmlu" label="MMLU" />
                </th>
                <th className="px-3 py-3 w-20">
                  <SortBtn col="gpqa" label="GPQA" />
                </th>
                <th className="px-3 py-3 w-20">
                  <SortBtn col="sweBench" label="SWE" />
                </th>
                <th className="px-3 py-3 w-20">
                  <SortBtn col="mathAime" label="AIME" />
                </th>
                <th className="px-3 py-3 w-12 text-center">
                  <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-fg-4">MM</span>
                </th>
                <th className="px-3 py-3 w-12 text-center">
                  <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-fg-4">OS</span>
                </th>
                <th className="px-3 py-3 w-20">
                  <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-fg-4">Speed</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => {
                const tier = TIER_META[m.tier];
                const speed = SPEED_META[m.speed];
                return (
                  <tr
                    key={m.id}
                    onClick={() => setSelected(m === selected ? null : m)}
                    className={`border-b border-white/[0.04] cursor-pointer transition-colors ${
                      selected?.id === m.id ? "bg-violet/[0.06]" : i % 2 === 0 ? "hover:bg-white/[0.02]" : "bg-white/[0.015] hover:bg-white/[0.03]"
                    }`}
                  >
                    <td className="px-4 py-3 sticky left-0 bg-inherit">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-fg-1">{m.name}</span>
                        <span className="font-mono text-[10px]" style={{ color: m.providerColor }}>{m.provider}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
                        style={{ color: tier.color, borderColor: tier.color + "44", background: tier.color + "14" }}>
                        {tier.label}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-mono text-xs text-fg-2">{fmtCtx(m.contextWindow)}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[11px] text-fg-1">{fmtPrice(m.inputPrice)}</span>
                        <span className="font-mono text-[10px] text-fg-4">{fmtPrice(m.outputPrice)} out</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center"><Score value={m.mmlu} /></td>
                    <td className="px-3 py-3 text-center"><Score value={m.gpqa} /></td>
                    <td className="px-3 py-3 text-center"><Score value={m.sweBench} warn={40} /></td>
                    <td className="px-3 py-3 text-center"><Score value={m.mathAime} warn={50} /></td>
                    <td className="px-3 py-3 text-center"><BoolChip val={m.multimodal} /></td>
                    <td className="px-3 py-3 text-center"><BoolChip val={m.openSource} /></td>
                    <td className="px-3 py-3">
                      <span className="font-mono text-[10px]" style={{ color: speed.color }}>{speed.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(m => {
          const tier = TIER_META[m.tier];
          return (
            <button
              key={m.id}
              onClick={() => setSelected(m === selected ? null : m)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selected?.id === m.id ? "border-violet/40 bg-violet/[0.06]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-fg-1 text-sm">{m.name}</p>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: m.providerColor }}>{m.provider}</p>
                </div>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border shrink-0"
                  style={{ color: tier.color, borderColor: tier.color + "44", background: tier.color + "14" }}>
                  {tier.label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="font-mono text-[9px] text-fg-4 uppercase tracking-wide">Context</p>
                  <p className="font-mono text-xs text-fg-2 mt-0.5">{fmtCtx(m.contextWindow)}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-fg-4 uppercase tracking-wide">Price/1M</p>
                  <p className="font-mono text-xs text-fg-2 mt-0.5">{fmtPrice(m.inputPrice)}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-fg-4 uppercase tracking-wide">MMLU</p>
                  <div className="mt-0.5"><Score value={m.mmlu} /></div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="mt-6 p-6 rounded-2xl border border-violet/20 bg-violet/[0.04]">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold text-fg-1">{selected.name}</h2>
              <p className="font-mono text-[11px] mt-1" style={{ color: selected.providerColor }}>{selected.provider} · {selected.releaseDate}</p>
            </div>
            <a
              href={selected.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-lg border border-violet/30 text-violet-bright hover:bg-violet/10 transition-colors"
            >
              Docs <ExternalLink size={11} />
            </a>
          </div>

          <p className="text-sm text-fg-2 mb-5">{selected.highlight}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <Stat label="Context window" value={fmtCtx(selected.contextWindow)} />
            <Stat label="Input price" value={selected.inputPrice !== null ? `${fmtPrice(selected.inputPrice)}/1M` : "No public API"} note={selected.priceNote} />
            <Stat label="Output price" value={selected.outputPrice !== null ? `${fmtPrice(selected.outputPrice)}/1M` : "—"} />
            <Stat label="Speed" value={SPEED_META[selected.speed].label} color={SPEED_META[selected.speed].color} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-2">Benchmarks</p>
              <div className="space-y-1.5">
                {([
                  ["MMLU (general knowledge)", selected.mmlu],
                  ["GPQA (graduate science)", selected.gpqa],
                  ["SWE-bench Verified (coding)", selected.sweBench],
                  ["AIME 2024 (math)", selected.mathAime],
                ] as [string, number | null][]).map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-fg-3">{label}</span>
                    <Score value={val} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-2">Capabilities</p>
              <div className="space-y-1.5">
                {([
                  ["Multimodal (vision/image)", selected.multimodal],
                  ["Extended thinking", selected.extendedThinking],
                  ["Web search", selected.webSearch],
                  ["Code execution", selected.codeExecution],
                  ["Open source weights", selected.openSource],
                ] as [string, boolean][]).map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-fg-3">{label}</span>
                    <BoolChip val={val} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-2">Best for</p>
            <div className="flex flex-wrap gap-1.5">
              {selected.bestFor.map(s => (
                <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-fg-2">{s}</span>
              ))}
            </div>
          </div>

          {selected.apiId && (
            <p className="mt-4 font-mono text-[10px] text-fg-4">API identifier: <code className="text-fg-2">{selected.apiId}</code></p>
          )}
        </div>
      )}

      {/* Column legend */}
      <div className="mt-8 pt-6 border-t border-white/[0.05] grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "MMLU", desc: "Massive Multitask Language Understanding — general knowledge across 57 subjects" },
          { label: "GPQA", desc: "Graduate-level science questions — PhD-level biology, chemistry, physics" },
          { label: "SWE", desc: "SWE-bench Verified — % of real GitHub issues resolved end-to-end" },
          { label: "AIME", desc: "American Invitational Mathematics Exam 2024 — competition math accuracy" },
        ].map(({ label, desc }) => (
          <div key={label}>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-violet-bright mb-1">{label}</p>
            <p className="text-[11px] text-fg-4 leading-snug">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, note, color }: { label: string; value: string; note?: string; color?: string }) {
  return (
    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-fg-4 mb-1">{label}</p>
      <p className="font-mono text-sm font-medium" style={{ color: color || "var(--fg-1)" }}>{value}</p>
      {note && <p className="text-[10px] text-fg-4 mt-0.5">{note}</p>}
    </div>
  );
}
