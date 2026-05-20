"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Zap, Globe, ChevronDown } from "lucide-react";
import { AI_LABS, LAB_TYPES, type AILab, type LabModel } from "@/lib/aiLabsData";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const TYPE_LABEL: Record<string, string> = {
  frontier:     "Frontier AI",
  "open-source": "Open Source",
  enterprise:   "Enterprise",
  specialized:  "Specialized",
};

const SPEED_LABEL: Record<string, string> = { fast: "⚡ Fast", medium: "◐ Balanced", slow: "🧠 Deep" };

const MODEL_TYPE_COLOR: Record<string, string> = {
  text:      "#9F8CFF",
  multimodal: "#5EEAD4",
  image:     "#F08CA8",
  code:      "#8FE3D2",
  embedding:  "#E8C089",
  reasoning: "#B6A6FF",
};

// ─── Frontier model matrix data ───────────────────────────────────────────────
interface MatrixModel {
  name: string;
  provider: string;
  providerColor: string;
  providerEmoji: string;
  context: string;
  inputPrice: string;
  outputPrice: string;
  speed: "fast" | "medium" | "slow";
  bestFor: string;
  freeAccess?: boolean;
  preview?: boolean;
  openWeight?: boolean;
}

const FRONTIER_MODELS: MatrixModel[] = [
  {
    name: "GPT-5.5 Pro",
    provider: "OpenAI",
    providerColor: "#10a37f",
    providerEmoji: "🤖",
    context: "1M tokens",
    inputPrice: "$30/M",
    outputPrice: "$180/M",
    speed: "slow",
    bestFor: "Highest-stakes reasoning & research",
  },
  {
    name: "Claude Opus 4.7",
    provider: "Anthropic",
    providerColor: "#d97706",
    providerEmoji: "🔬",
    context: "200K tokens",
    inputPrice: "$5/M",
    outputPrice: "$25/M",
    speed: "slow",
    bestFor: "Long-horizon agentic tasks & code",
  },
  {
    name: "Gemini 3.1 Pro",
    provider: "Google",
    providerColor: "#4285f4",
    providerEmoji: "🧠",
    context: "1M tokens",
    inputPrice: "—",
    outputPrice: "—",
    speed: "medium",
    bestFor: "Science, math & benchmark tasks",
  },
  {
    name: "GPT-5.5",
    provider: "OpenAI",
    providerColor: "#10a37f",
    providerEmoji: "🤖",
    context: "1M tokens",
    inputPrice: "$5/M",
    outputPrice: "$30/M",
    speed: "medium",
    bestFor: "Agentic workflows & long-context",
  },
  {
    name: "Claude Sonnet 4.6",
    provider: "Anthropic",
    providerColor: "#d97706",
    providerEmoji: "🔬",
    context: "200K tokens",
    inputPrice: "$3/M",
    outputPrice: "$15/M",
    speed: "medium",
    bestFor: "Balanced intelligence & throughput",
  },
  {
    name: "Gemini 3.5 Flash",
    provider: "Google",
    providerColor: "#4285f4",
    providerEmoji: "🧠",
    context: "1M tokens",
    inputPrice: "$1.50/M",
    outputPrice: "$9/M",
    speed: "fast",
    bestFor: "Coding, agents & low-latency at scale",
    freeAccess: true,
  },
  {
    name: "Mistral Medium 3.5",
    provider: "Mistral AI",
    providerColor: "#ff7000",
    providerEmoji: "💨",
    context: "256K tokens",
    inputPrice: "$1.50/M",
    outputPrice: "$7.50/M",
    speed: "medium",
    bestFor: "Open-weight coding & agentic work",
    openWeight: true,
  },
  {
    name: "GPT-5.5 Instant",
    provider: "OpenAI",
    providerColor: "#10a37f",
    providerEmoji: "🤖",
    context: "1M tokens",
    inputPrice: "Free",
    outputPrice: "Free",
    speed: "fast",
    bestFor: "Default ChatGPT — everyday tasks",
    freeAccess: true,
  },
  {
    name: "Llama 4 Scout",
    provider: "Meta AI",
    providerColor: "#0866ff",
    providerEmoji: "🦙",
    context: "10M tokens",
    inputPrice: "Free",
    outputPrice: "Free",
    speed: "fast",
    bestFor: "Longest context, self-hosted deployments",
    openWeight: true,
  },
  {
    name: "Grok 3",
    provider: "xAI",
    providerColor: "#000000",
    providerEmoji: "⚡",
    context: "131K tokens",
    inputPrice: "$5/M",
    outputPrice: "$15/M",
    speed: "medium",
    bestFor: "Real-time X/Twitter data & social intel",
  },
  {
    name: "Claude Haiku 4.5",
    provider: "Anthropic",
    providerColor: "#d97706",
    providerEmoji: "🔬",
    context: "200K tokens",
    inputPrice: "$0.80/M",
    outputPrice: "$4/M",
    speed: "fast",
    bestFor: "High-volume latency-sensitive tasks",
  },
  {
    name: "o4-mini",
    provider: "OpenAI",
    providerColor: "#10a37f",
    providerEmoji: "🤖",
    context: "200K tokens",
    inputPrice: "$0.55/M",
    outputPrice: "$2.20/M",
    speed: "medium",
    bestFor: "Cost-efficient STEM reasoning",
  },
];

const SPEED_COLOR: Record<string, string> = {
  fast:   "#4ade80",
  medium: "#facc15",
  slow:   "#c084fc",
};

// ─── Model pricing row ───────────────────────────────────────────────────────
function ModelRow({ model, color }: { model: LabModel; color: string }) {
  return (
    <div className={`flex items-start gap-3 py-3 border-b border-hairline last:border-0 ${model.status === "legacy" ? "opacity-60" : ""}`}>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-serif text-[14px] ${model.status === "legacy" ? "text-fg-3 line-through decoration-fg-4" : "text-fg-1"}`}>{model.name}</span>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border uppercase tracking-[0.10em]"
            style={{ color: MODEL_TYPE_COLOR[model.type], borderColor: MODEL_TYPE_COLOR[model.type] + "44", background: MODEL_TYPE_COLOR[model.type] + "12" }}>
            {model.type}
          </span>
          {model.speed && model.status !== "legacy" && (
            <span className="font-mono text-[9px] text-fg-4">{SPEED_LABEL[model.speed]}</span>
          )}
          {model.freeAccess && (
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border border-green-500/40 text-green-400 bg-green-500/10 uppercase tracking-[0.10em]">Free / OSS</span>
          )}
          {model.status === "legacy" && (
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border border-amber-500/40 text-amber-400 bg-amber-500/10 uppercase tracking-[0.10em]">Legacy</span>
          )}
          {model.status === "preview" && (
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border border-blue-400/40 text-blue-300 bg-blue-500/10 uppercase tracking-[0.10em]">Preview</span>
          )}
        </div>
        {model.contextWindow && (
          <span className="font-mono text-[10px] text-fg-4">{model.contextWindow} context</span>
        )}
        {model.releaseDate && (
          <span className="font-mono text-[9px] text-fg-4">
            Released {model.releaseDate}{model.discontinuedDate ? ` · Retired ${model.discontinuedDate}` : ""}
          </span>
        )}
        {model.highlight && (
          <span className="font-sans text-[12px] text-fg-3 leading-[1.4]">{model.highlight}</span>
        )}
      </div>
      <div className="shrink-0 text-right">
        {model.inputPrice && !model.freeAccess ? (
          <div className="flex flex-col items-end gap-0.5">
            <span className="font-mono text-[11px] font-medium" style={{ color }}>In: {model.inputPrice}</span>
            {model.outputPrice && (
              <span className="font-mono text-[11px] text-fg-3">Out: {model.outputPrice}</span>
            )}
          </div>
        ) : model.freeAccess ? (
          <span className="font-mono text-[11px] text-green-400">Free</span>
        ) : null}
      </div>
    </div>
  );
}

// ─── Model matrix ─────────────────────────────────────────────────────────────
function ModelMatrix() {
  const [sortBy, setSortBy] = useState<"speed" | "price" | "context">("speed");

  const sorted = [...FRONTIER_MODELS].sort((a, b) => {
    if (sortBy === "price") {
      const pa = parseFloat(a.inputPrice.replace(/[^0-9.]/g, "") || "999999");
      const pb = parseFloat(b.inputPrice.replace(/[^0-9.]/g, "") || "999999");
      return pa - pb;
    }
    if (sortBy === "context") {
      const ctxVal = (s: string) => {
        const m = s.match(/([\d.]+)(M|K)/i);
        if (!m) return 0;
        return parseFloat(m[1]) * (m[2].toUpperCase() === "M" ? 1000 : 1);
      };
      return ctxVal(b.context) - ctxVal(a.context);
    }
    // speed: fast → medium → slow
    const order = { fast: 0, medium: 1, slow: 2 };
    return order[a.speed] - order[b.speed];
  });

  return (
    <div>
      {/* Sort controls */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-[10px] text-fg-4 tracking-[0.12em] uppercase mr-1">Sort by</span>
        {(["speed", "price", "context"] as const).map(key => (
          <button key={key} onClick={() => setSortBy(key)}
            className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 rounded-full border transition-all duration-150"
            style={{
              background:  sortBy === key ? "#9F8CFF22" : "transparent",
              borderColor: sortBy === key ? "#9F8CFF88" : "#ffffff18",
              color:       sortBy === key ? "#B6A6FF"   : "#6b6a8a",
            }}>
            {key === "speed" ? "Speed" : key === "price" ? "Cheapest first" : "Largest context"}
          </button>
        ))}
      </div>

      {/* Matrix table */}
      <div className="overflow-x-auto rounded-xl border border-violet/[0.12]">
        <table className="w-full min-w-[720px] text-left border-collapse">
          <thead>
            <tr className="border-b border-violet/[0.12] bg-violet/[0.04]">
              <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Model</th>
              <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Provider</th>
              <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Context</th>
              <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Input / M</th>
              <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Output / M</th>
              <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Speed</th>
              <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal hidden lg:table-cell">Best For</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(m => (
              <tr key={m.name}
                className="border-b border-violet/[0.05] hover:bg-white/[0.02] transition-colors"
                style={{ borderLeft: `2px solid ${m.providerColor}44` }}>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-serif text-[13px] text-fg-1 leading-none">{m.name}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {m.freeAccess && !m.openWeight && (
                        <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-sm border border-green-500/40 text-green-400 bg-green-500/10 uppercase tracking-[0.08em]">Free</span>
                      )}
                      {m.openWeight && (
                        <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-sm border border-sky-400/40 text-sky-300 bg-sky-500/10 uppercase tracking-[0.08em]">Open</span>
                      )}
                      {m.preview && (
                        <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-sm border border-blue-400/40 text-blue-300 bg-blue-500/10 uppercase tracking-[0.08em]">Preview</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{m.providerEmoji}</span>
                    <span className="font-sans text-[12px]" style={{ color: m.providerColor }}>{m.provider}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-fg-2">{m.context}</td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[12px] font-medium" style={{ color: m.providerColor }}>
                    {m.inputPrice}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-fg-3">{m.outputPrice}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: SPEED_COLOR[m.speed] }} />
                    <span className="font-mono text-[10px] text-fg-3 capitalize">{m.speed}</span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="font-sans text-[12px] text-fg-3 leading-[1.4]">{m.bestFor}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-mono text-[9px] text-fg-4 mt-2">Prices as of May 2026 · API pricing per 1M tokens · Free = free tier or open-weight</p>
    </div>
  );
}

// ─── Lab detail panel ────────────────────────────────────────────────────────
function LabPanel({ lab, onClose }: { lab: AILab; onClose: () => void }) {
  return (
    <AnimatePresence>
      <>
        <motion.div key="scrim" className="fixed inset-0 z-[90] bg-void/75 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }} onClick={onClose} />

        <motion.div key="panel"
          className="fixed inset-y-0 right-0 z-[100] w-full max-w-[640px] overflow-y-auto bg-[#0d0a1c] border-l border-violet/15 shadow-2xl"
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}>

          {/* Accent top bar */}
          <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${lab.color}, transparent)` }} />

          <div className="px-6 pt-6 pb-12">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: lab.color + "18", border: `1px solid ${lab.color}44` }}>
                  {lab.emoji}
                </div>
                <div>
                  <h2 className="font-serif text-[26px] font-normal text-fg-1 leading-none">{lab.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border"
                      style={{ color: lab.color, borderColor: lab.color + "44", background: lab.color + "14" }}>
                      {TYPE_LABEL[lab.type]}
                    </span>
                    <span className="font-mono text-[10px] text-fg-4">Est. {lab.founded}</span>
                    <span className="font-mono text-[10px] text-fg-4">· {lab.hq}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose}
                className="shrink-0 w-9 h-9 rounded-full bg-violet/[0.10] border border-violet/20 flex items-center justify-center text-fg-3 hover:text-fg-1 hover:bg-violet/20 transition-all mt-1">
                <X size={15} />
              </button>
            </div>

            {/* Tagline */}
            <p className="font-serif italic text-[16px] leading-[1.5] text-fg-2 mb-5 pl-4 border-l-2"
              style={{ borderColor: lab.color }}>
              {lab.tagline}
            </p>

            {/* Description */}
            <p className="font-sans text-[14px] leading-[1.65] text-fg-2 mb-6">{lab.description}</p>

            {/* Focus tags */}
            <div className="flex flex-wrap gap-1.5 mb-7">
              {lab.focus.map(f => (
                <span key={f} className="font-mono text-[10px] px-2.5 py-1 rounded-full border"
                  style={{ color: lab.color, borderColor: lab.color + "44", background: lab.color + "0e" }}>
                  {f}
                </span>
              ))}
            </div>

            {/* Models */}
            <div className="mb-7">
              <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-3">Models & Pricing</h3>
              <div className="rounded-xl border border-hairline overflow-hidden bg-[#0a0714]">
                <div className="px-4">
                  {lab.models.map(m => <ModelRow key={m.name} model={m} color={lab.color} />)}
                </div>
              </div>
              <p className="font-mono text-[9px] text-fg-4 mt-2">* Prices per 1M tokens, approximate as of 2025. Verify at provider.</p>
            </div>

            {/* Products */}
            <div className="mb-7">
              <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-3">Key Products</h3>
              <div className="flex flex-wrap gap-2">
                {lab.products.map(p => (
                  <span key={p} className="font-sans text-[12px] px-3 py-1.5 rounded-lg bg-steel border border-hairline text-fg-2">{p}</span>
                ))}
              </div>
            </div>

            {/* Two-col: strengths + use cases */}
            <div className="grid md:grid-cols-2 gap-5 mb-7">
              <div>
                <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-3">Strengths</h3>
                <ul className="flex flex-col gap-2">
                  {lab.strengths.map(s => (
                    <li key={s} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: lab.color }} />
                      <span className="font-sans text-[13px] text-fg-2 leading-[1.5]">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-3">Best For</h3>
                <ul className="flex flex-col gap-2">
                  {lab.useCases.map(u => (
                    <li key={u} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: lab.color + "88" }} />
                      <span className="font-sans text-[13px] text-fg-2 leading-[1.5]">{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* API + links */}
            <div className="flex flex-wrap gap-3">
              {lab.api.available && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet/[0.08] border border-violet/20">
                  <Zap size={12} className="text-violet-bright" />
                  <span className="font-mono text-[11px] text-fg-2">API: {lab.api.endpoint}</span>
                  {lab.api.sdks && (
                    <span className="font-mono text-[10px] text-fg-4">({lab.api.sdks.join(", ")})</span>
                  )}
                </div>
              )}
              <a href={lab.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors"
                style={{ color: lab.color, borderColor: lab.color + "44", background: lab.color + "0e" }}>
                <Globe size={12} />
                <span className="font-mono text-[11px]">{lab.website.replace("https://", "")}</span>
                <ExternalLink size={10} className="opacity-60" />
              </a>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

// ─── Lab card (grid) ─────────────────────────────────────────────────────────
function LabCard({ lab, onClick }: { lab: AILab; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-2xl border p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.99] bg-[#0d0a1c]"
      style={{ borderColor: lab.color + "28" }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: lab.color + "18", border: `1px solid ${lab.color}44` }}>
            {lab.emoji}
          </div>
          <div>
            <p className="font-serif text-[18px] font-normal text-fg-1 leading-none">{lab.name}</p>
            <p className="font-mono text-[9px] tracking-[0.10em] uppercase mt-1" style={{ color: lab.color }}>
              {TYPE_LABEL[lab.type]}
            </p>
          </div>
        </div>
        <ChevronDown size={14} className="text-fg-4 group-hover:text-fg-2 rotate-[-90deg] transition-colors mt-1 shrink-0" />
      </div>

      {/* Tagline */}
      <p className="font-sans text-[12px] text-fg-3 leading-[1.5] mb-4 line-clamp-2">{lab.tagline}</p>

      {/* Focus chips */}
      <div className="flex flex-wrap gap-1 mb-4">
        {lab.focus.slice(0, 3).map(f => (
          <span key={f} className="font-mono text-[9px] px-2 py-0.5 rounded-full border"
            style={{ color: lab.color, borderColor: lab.color + "33", background: lab.color + "0c" }}>
            {f}
          </span>
        ))}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: lab.color + "20" }}>
        <span className="font-mono text-[10px] text-fg-4">Est. {lab.founded}</span>
        <span className="text-fg-4 text-[10px]">·</span>
        <span className="font-mono text-[10px] text-fg-4">{lab.models.length} models</span>
        <span className="text-fg-4 text-[10px]">·</span>
        <span className="font-mono text-[10px] text-fg-4 truncate">{lab.hq}</span>
      </div>
    </button>
  );
}

// ─── Compare table ───────────────────────────────────────────────────────────
function CompareTable({ labs }: { labs: AILab[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-violet/[0.12] mt-2">
      <table className="w-full min-w-[640px] text-left border-collapse">
        <thead>
          <tr className="border-b border-violet/[0.12] bg-violet/[0.04]">
            <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Lab</th>
            <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Type</th>
            <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Founded</th>
            <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Models</th>
            <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Top model</th>
            <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">Free tier</th>
            <th className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 px-4 py-3 font-normal">API</th>
          </tr>
        </thead>
        <tbody>
          {labs.map((lab, i) => {
            const topModel = lab.models.find(m => !m.freeAccess) ?? lab.models[0];
            const hasFree  = lab.models.some(m => m.freeAccess);
            return (
              <tr
                key={lab.id}
                className="border-b border-violet/[0.06] hover:bg-white/[0.02] transition-colors"
                style={{ borderLeft: `2px solid ${lab.color}44` }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">{lab.emoji}</span>
                    <span className="font-serif text-[14px] text-fg-1">{lab.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[9px] tracking-[0.10em] uppercase px-1.5 py-0.5 rounded-full border"
                    style={{ color: lab.color, borderColor: lab.color + "44", background: lab.color + "12" }}>
                    {TYPE_LABEL[lab.type]}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-fg-3">{lab.founded}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-fg-2">{lab.models.length}</td>
                <td className="px-4 py-3">
                  <div className="font-sans text-[12px] text-fg-1">{topModel?.name ?? "—"}</div>
                  {topModel?.inputPrice && !topModel.freeAccess && (
                    <div className="font-mono text-[10px] text-fg-4">In: {topModel.inputPrice}</div>
                  )}
                </td>
                <td className="px-4 py-3">
                  {hasFree ? (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-green-500/40 text-green-400 bg-green-500/10">Yes</span>
                  ) : (
                    <span className="font-mono text-[10px] text-fg-4">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {lab.api.available ? (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-violet/40 text-violet-bright bg-violet/10">Available</span>
                  ) : (
                    <span className="font-mono text-[10px] text-fg-4">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function AILabsPage() {
  const [activeType, setActiveType]   = useState<string>("all");
  const [activeLab,  setActiveLab]    = useState<AILab | null>(null);
  const [viewMode,   setViewMode]     = useState<"gallery" | "compare" | "models">("gallery");

  const filtered = activeType === "all"
    ? AI_LABS
    : AI_LABS.filter(l => l.type === activeType);

  return (
    <div className="min-h-screen bg-void pb-24">

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-28 pb-12">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-3 mb-3">
          {AI_LABS.length} labs · Updated May 2026
        </p>
        <h1 className="font-serif text-[clamp(36px,6vw,72px)] font-normal tracking-[-0.02em] text-fg-1 leading-[1.04] mb-4">
          Major <em className="italic text-violet-bright">AI Labs</em>
        </h1>
        <p className="font-sans text-[16px] text-fg-3 max-w-2xl leading-[1.65]">
          The organizations defining the frontier of artificial intelligence — their models, pricing, products, and what they do best.
        </p>
      </div>

      {/* Filter tabs + view toggle */}
      <div className="sticky top-16 z-40 bg-void/90 backdrop-blur-md border-b border-violet/[0.08]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {viewMode !== "models" && LAB_TYPES.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveType(t.id)}
              className="flex-shrink-0 font-mono text-[11px] tracking-[0.08em] px-4 py-1.5 rounded-full border transition-all duration-150"
              style={{
                background:  activeType === t.id ? "#9F8CFF22" : "transparent",
                borderColor: activeType === t.id ? "#9F8CFF88" : "#ffffff18",
                color:       activeType === t.id ? "#B6A6FF"   : "#6b6a8a",
              }}
            >
              {t.label}
            </button>
          ))}
          {viewMode === "models" && (
            <span className="font-mono text-[11px] text-fg-4 tracking-[0.12em] uppercase">
              {FRONTIER_MODELS.length} frontier models · May 2026
            </span>
          )}

          <div className="ml-auto flex-shrink-0 flex items-center gap-1 bg-void border border-violet/[0.12] rounded-full p-0.5">
            {(["gallery", "compare", "models"] as const).map(mode => (
              <button key={mode}
                onClick={() => setViewMode(mode)}
                className="font-mono text-[10px] tracking-[0.08em] px-3 py-1 rounded-full transition-all duration-150"
                style={{
                  background: viewMode === mode ? "#9F8CFF22" : "transparent",
                  color:      viewMode === mode ? "#B6A6FF" : "#6b6a8a",
                }}>
                {mode === "gallery" ? "Gallery" : mode === "compare" ? "Compare" : "Models"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <AnimatePresence mode="wait">
          {viewMode === "gallery" ? (
            <motion.div
              key={`gallery-${activeType}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map(lab => (
                <LabCard key={lab.id} lab={lab} onClick={() => setActiveLab(lab)} />
              ))}
            </motion.div>
          ) : viewMode === "compare" ? (
            <motion.div
              key={`compare-${activeType}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <CompareTable labs={filtered} />
            </motion.div>
          ) : (
            <motion.div
              key="models"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <div className="mb-5">
                <h2 className="font-serif text-[22px] font-normal text-fg-1 mb-1">Frontier Model Matrix</h2>
                <p className="font-sans text-[13px] text-fg-3 leading-[1.5]">
                  Side-by-side comparison of the most capable models available today — sorted by speed, price, or context window.
                </p>
              </div>
              <ModelMatrix />
            </motion.div>
          )}
        </AnimatePresence>

        {viewMode !== "models" && filtered.length === 0 && (
          <p className="font-mono text-[13px] text-fg-4 text-center py-16">No labs in this category yet.</p>
        )}
      </div>

      {/* Detail panel */}
      {activeLab && (
        <LabPanel key={activeLab.id} lab={activeLab} onClose={() => setActiveLab(null)} />
      )}
    </div>
  );
}
