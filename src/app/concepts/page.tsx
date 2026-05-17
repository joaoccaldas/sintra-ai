"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  CONCEPTS, CAT_META, DIFF_HEX, DIFF_LABEL,
  ConceptCategory, Concept,
} from "@/lib/concepts";
import { BASE_PATH } from "@/lib/data";

const ALL_CATS = ["all", "fundamentals", "models", "tools", "protocols"] as const;
type Filter = (typeof ALL_CATS)[number];

// ── Card ─────────────────────────────────────────────────────────────────────

function ConceptCard({
  concept,
  onClick,
}: {
  concept: Concept;
  onClick: (c: Concept) => void;
}) {
  const cat = CAT_META[concept.category];
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(concept)}
      className="group text-left w-full rounded-2xl border border-hairline bg-steel/40 hover:bg-steel/70 transition-all duration-240 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/60"
    >
      {/* Accent bar */}
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${cat.hex}, transparent)` }} />

      <div className="p-6">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-5 transition-transform duration-240 group-hover:scale-110"
          style={{ background: `${cat.hex}14`, boxShadow: `0 0 24px ${cat.hex}18` }}
        >
          {concept.icon}
        </div>

        {/* Term */}
        <div className="flex items-start gap-2 flex-wrap mb-1">
          <h3 className="font-serif font-normal text-[20px] leading-[1.15] text-fg-1">
            {concept.term}
          </h3>
          {concept.shortTerm && (
            <span
              className="font-mono text-[10px] px-1.5 py-0.5 rounded border self-center shrink-0"
              style={{ color: cat.hex, borderColor: `${cat.hex}50`, background: `${cat.hex}10` }}
            >
              {concept.shortTerm}
            </span>
          )}
        </div>

        {/* Category + difficulty */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: cat.hex }}>
            {cat.label}
          </span>
          <span className="text-fg-4">·</span>
          <span
            className="font-mono text-[10px] tracking-[0.08em] uppercase"
            style={{ color: DIFF_HEX[concept.difficulty] }}
          >
            {DIFF_LABEL[concept.difficulty]}
          </span>
        </div>

        {/* Tagline */}
        <p className="font-sans text-[13px] text-fg-3 leading-[1.55] mb-4">
          {concept.tagline}
        </p>

        {/* Related chips */}
        {concept.related.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {concept.related.slice(0, 3).map(id => {
              const rel = CONCEPTS.find(c => c.id === id);
              return rel ? (
                <span
                  key={id}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-night border border-hairline text-fg-4"
                >
                  {rel.shortTerm ?? rel.term}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
    </motion.button>
  );
}

// ── Expanded Drawer ───────────────────────────────────────────────────────────

function ConceptDrawer({
  concept,
  onClose,
  onNavigate,
}: {
  concept: Concept | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  useEffect(() => {
    if (!concept) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [concept]);

  useEffect(() => {
    if (!concept) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [concept, onClose]);

  return (
    <AnimatePresence>
      {concept && (
        <>
          {/* Scrim */}
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[90] bg-void/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            className="expanded-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cd-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            {/* Accent bar */}
            <div
              className="h-[3px] w-full rounded-t-[inherit] shrink-0"
              style={{
                background: `linear-gradient(90deg, ${CAT_META[concept.category].hex}, transparent)`,
              }}
            />

            <div className="expanded-card__inner">
              {/* ── Left column ── */}
              <div className="expanded-card__left">
                {/* Icon */}
                <div
                  className="w-full aspect-square max-h-[220px] rounded-2xl flex items-center justify-center text-[80px] mb-6"
                  style={{
                    background: `radial-gradient(ellipse at center, ${CAT_META[concept.category].hex}18 0%, transparent 72%)`,
                    boxShadow: `0 0 60px ${CAT_META[concept.category].hex}22`,
                  }}
                >
                  {concept.icon}
                </div>

                {/* Category + difficulty */}
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[11px] tracking-[0.14em] uppercase px-2 py-1 rounded border"
                      style={{
                        color: CAT_META[concept.category].hex,
                        borderColor: `${CAT_META[concept.category].hex}50`,
                        background: `${CAT_META[concept.category].hex}10`,
                      }}
                    >
                      {CAT_META[concept.category].label}
                    </span>
                    <span
                      className="font-mono text-[11px] tracking-[0.1em] uppercase px-2 py-1 rounded border border-hairline"
                      style={{ color: DIFF_HEX[concept.difficulty] }}
                    >
                      {DIFF_LABEL[concept.difficulty]}
                    </span>
                  </div>
                </div>

                {/* Related concepts */}
                {concept.related.length > 0 && (
                  <div>
                    <span className="eyebrow block mb-3">Related concepts</span>
                    <div className="flex flex-wrap gap-2">
                      {concept.related.map(id => {
                        const rel = CONCEPTS.find(c => c.id === id);
                        return rel ? (
                          <button
                            key={id}
                            onClick={() => onNavigate(id)}
                            className="font-mono text-[11px] px-2.5 py-1.5 rounded-sm border border-hairline text-fg-2 bg-night hover:border-violet/40 hover:text-violet-bright transition-colors"
                          >
                            {rel.icon} {rel.shortTerm ?? rel.term}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Learn more */}
                {concept.learnMore && (
                  <a
                    href={concept.learnMore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] uppercase text-cyan-ice/70 hover:text-cyan-ice transition-colors"
                  >
                    <ExternalLink size={11} />
                    Learn more
                  </a>
                )}
              </div>

              {/* ── Right column ── */}
              <div className="expanded-card__right">
                {/* Eyebrow */}
                <span className="flex gap-2 items-center font-mono text-[11px] tracking-[0.18em] uppercase text-fg-3 mb-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: DIFF_HEX[concept.difficulty],
                      boxShadow: `0 0 8px ${DIFF_HEX[concept.difficulty]}`,
                    }}
                  />
                  {DIFF_LABEL[concept.difficulty]}
                  <span className="text-fg-4">·</span>
                  <span style={{ color: CAT_META[concept.category].hex }}>
                    {CAT_META[concept.category].label}
                  </span>
                </span>

                {/* Title */}
                <div className="flex items-start gap-3 flex-wrap mb-2">
                  <h2
                    id="cd-title"
                    className="font-serif font-normal text-[clamp(26px,3.5vw,44px)] leading-[1.06] tracking-[-0.015em] text-fg-1"
                  >
                    {concept.term}
                  </h2>
                  {concept.shortTerm && (
                    <span
                      className="font-mono text-[13px] px-2 py-1 rounded border self-center"
                      style={{
                        color: CAT_META[concept.category].hex,
                        borderColor: `${CAT_META[concept.category].hex}50`,
                        background: `${CAT_META[concept.category].hex}10`,
                      }}
                    >
                      {concept.shortTerm}
                    </span>
                  )}
                </div>

                {/* Tagline */}
                <p
                  className="font-serif italic text-[18px] md:text-[20px] leading-[1.45] text-fg-2 mb-7 border-l-2 pl-5"
                  style={{ borderColor: CAT_META[concept.category].hex }}
                >
                  {concept.tagline}
                </p>

                {/* Body */}
                <div className="sample-output mb-8">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {concept.body}
                  </ReactMarkdown>
                </div>

                {/* Analogy */}
                <div className="rounded-xl border border-violet/20 bg-violet/[0.05] px-5 py-4">
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 block mb-2">
                    ⬡ Analogy
                  </span>
                  <p className="font-serif text-[16px] leading-[1.6] text-fg-2 italic">
                    {concept.analogy}
                  </p>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="expanded-card__close"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Bottom bar */}
            <div className="expanded-card__bar">
              {concept.learnMore && (
                <a
                  href={concept.learnMore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <ExternalLink size={14} /> Learn more
                </a>
              )}
              <button className="btn btn-ghost" onClick={onClose}>Close</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ConceptsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [expanded, setExpanded]         = useState<Concept | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return CONCEPTS;
    return CONCEPTS.filter(c => c.category === activeFilter);
  }, [activeFilter]);

  const openConcept = useCallback((c: Concept) => setExpanded(c), []);

  const navigateTo = useCallback((id: string) => {
    const target = CONCEPTS.find(c => c.id === id);
    if (target) setExpanded(target);
  }, []);

  const totalByCategory = useMemo(
    () => Object.fromEntries(
      ALL_CATS.filter(c => c !== "all").map(c => [
        c,
        CONCEPTS.filter(x => x.category === c).length,
      ])
    ),
    []
  );

  return (
    <main className="min-h-screen bg-void text-fg-1">
      {/* ── Header bar ───────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 h-14 flex items-center px-6 md:px-8 border-b border-hairline bg-void/90 backdrop-blur-md">
        <a
          href={`${BASE_PATH}/`}
          className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-fg-3 hover:text-fg-1 transition-colors"
        >
          <ArrowLeft size={14} /> librAIry
        </a>
        <div className="flex-1" />
        <span className="font-mono text-[11px] text-fg-4 tracking-[0.06em]">
          {CONCEPTS.length} concepts
        </span>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-16 pb-12 px-6 md:px-8 text-center">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(159,140,255,0.10) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <p className="eyebrow violet mb-4">Concepts & Definitions</p>
          <h1 className="font-serif font-light text-[clamp(36px,6vw,80px)] leading-[1.03] tracking-[-0.02em] text-fg-1 mb-5">
            AI, decod
            <em
              className="italic"
              style={{
                backgroundImage: "linear-gradient(160deg, #F4F2EA 0%, #B6A6FF 55%, #9F8CFF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ed
            </em>
            .
          </h1>
          <p className="font-sans text-[16px] leading-[1.65] text-fg-3 max-w-md mx-auto">
            Plain-English definitions for every AI term you&rsquo;ll encounter — from tokens to agents, APIs to MCP.
          </p>
        </motion.div>
      </div>

      {/* ── Category filter ───────────────────────────────────────────── */}
      <div className="px-6 md:px-8 pb-10 max-w-[1200px] mx-auto">
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveFilter("all")}
            className={[
              "font-mono text-[11px] tracking-[0.1em] uppercase px-4 py-2 rounded-full border transition-all duration-200",
              activeFilter === "all"
                ? "border-violet/60 bg-violet/10 text-violet-bright"
                : "border-hairline text-fg-3 hover:border-violet/30 hover:text-fg-2",
            ].join(" ")}
          >
            All · {CONCEPTS.length}
          </button>
          {(["fundamentals", "models", "tools", "protocols"] as ConceptCategory[]).map(cat => {
            const meta    = CAT_META[cat];
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={[
                  "font-mono text-[11px] tracking-[0.1em] uppercase px-4 py-2 rounded-full border transition-all duration-200",
                  isActive ? "font-medium" : "border-hairline text-fg-3 hover:text-fg-2",
                ].join(" ")}
                style={
                  isActive
                    ? { borderColor: `${meta.hex}60`, background: `${meta.hex}10`, color: meta.hex }
                    : {}
                }
              >
                {meta.label} · {totalByCategory[cat]}
              </button>
            );
          })}
        </div>

        {/* ── Card grid ─────────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(concept => (
              <ConceptCard
                key={concept.id}
                concept={concept}
                onClick={openConcept}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Schema callout ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 rounded-2xl border border-hairline bg-steel/20 px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="text-3xl">⬡</div>
          <div className="flex-1">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-violet-bright mb-1">
              Add a concept
            </p>
            <p className="font-sans text-[13px] text-fg-3 leading-[1.5]">
              Every concept follows a fixed schema in{" "}
              <code className="font-mono text-[12px] text-cyan-ice bg-night px-1.5 py-0.5 rounded">
                src/lib/concepts.ts
              </code>
              . Add an entry to the{" "}
              <code className="font-mono text-[12px] text-cyan-ice bg-night px-1.5 py-0.5 rounded">
                CONCEPTS
              </code>{" "}
              array with: <em>id, term, category, tagline, body, analogy, icon, difficulty, related</em>.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Expanded drawer ───────────────────────────────────────────── */}
      <ConceptDrawer
        concept={expanded}
        onClose={() => setExpanded(null)}
        onNavigate={navigateTo}
      />
    </main>
  );
}
