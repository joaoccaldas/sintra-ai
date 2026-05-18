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

// ─── Model pricing row ───────────────────────────────────────────────────────
function ModelRow({ model, color }: { model: LabModel; color: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-hairline last:border-0">
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-serif text-[14px] text-fg-1">{model.name}</span>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border uppercase tracking-[0.10em]"
            style={{ color: MODEL_TYPE_COLOR[model.type], borderColor: MODEL_TYPE_COLOR[model.type] + "44", background: MODEL_TYPE_COLOR[model.type] + "12" }}>
            {model.type}
          </span>
          {model.speed && (
            <span className="font-mono text-[9px] text-fg-4">{SPEED_LABEL[model.speed]}</span>
          )}
          {model.freeAccess && (
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border border-green-500/40 text-green-400 bg-green-500/10 uppercase tracking-[0.10em]">Free / OSS</span>
          )}
        </div>
        {model.contextWindow && (
          <span className="font-mono text-[10px] text-fg-4">{model.contextWindow} context</span>
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

// ─── Main page ───────────────────────────────────────────────────────────────
export default function AILabsPage() {
  const [activeType, setActiveType]   = useState<string>("all");
  const [activeLab,  setActiveLab]    = useState<AILab | null>(null);

  const filtered = activeType === "all"
    ? AI_LABS
    : AI_LABS.filter(l => l.type === activeType);

  return (
    <div className="min-h-screen bg-void pb-24">

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-28 pb-12">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-3 mb-3">
          {AI_LABS.length} labs · Updated 2025
        </p>
        <h1 className="font-serif text-[clamp(36px,6vw,72px)] font-normal tracking-[-0.02em] text-fg-1 leading-[1.04] mb-4">
          Major <em className="italic text-violet-bright">AI Labs</em>
        </h1>
        <p className="font-sans text-[16px] text-fg-3 max-w-2xl leading-[1.65]">
          The organizations defining the frontier of artificial intelligence — their models, pricing, products, and what they do best.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-16 z-40 bg-void/90 backdrop-blur-md border-b border-violet/[0.08]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {LAB_TYPES.map(t => (
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
        </div>
      </div>

      {/* Lab grid */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
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
        </AnimatePresence>

        {filtered.length === 0 && (
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
