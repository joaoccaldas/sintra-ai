"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { UseCase, DIFF_COLOR } from "@/lib/data";
import CardVisual from "./CardVisual";
import OutputKindIcon, { outputKindLabel } from "./OutputKindIcon";

interface Props {
  item: UseCase | null;
  onClose: () => void;
}

const CAT_ACCENT: Record<string, string> = {
  "quick-wins":    "#F4D06F",
  "productivity":  "#8FE3D2",
  "writing":       "#F08CA8",
  "research":      "#B6A6FF",
  "data-finance":  "#E8C089",
  "coding":        "#9F8CFF",
  "creative-ai":   "#5EEAD4",
  "game-advanced": "#E9D9B6",
};

export default function ExpandedCard({ item, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [item, onClose]);

  const copy = () => {
    if (!item) return;
    navigator.clipboard?.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <AnimatePresence>
      {item && (
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

          {/* Panel — slides up from bottom */}
          <motion.div
            key="panel"
            className="expanded-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ec-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            {/* Accent bar at top */}
            <div
              className="h-[3px] w-full rounded-t-[inherit] shrink-0"
              style={{ background: `linear-gradient(90deg, ${CAT_ACCENT[item.category] || "#9F8CFF"}, transparent)` }}
            />

            <div className="expanded-card__inner">
              {/* ── Left column: visual + prompt ── */}
              <div className="expanded-card__left">
                {/* Big visual */}
                <div className="expanded-card__visual">
                  <CardVisual kind={item.output_kind} difficulty={item.difficulty} isFeatured />
                </div>

                {/* Output kind badge */}
                <div className="flex items-center gap-2 mt-4 mb-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-violet-bright">
                    <OutputKindIcon kind={item.output_kind} size={13} />
                    You get: {outputKindLabel(item.output_kind)}
                  </span>
                </div>

                {/* Tool chips */}
                {item.tools.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.tools.map(t => (
                      <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-sm bg-violet/[0.08] text-fg-2 border border-violet/20">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* What you'll need */}
                {item.inputs.length > 0 && (
                  <div className="mb-6">
                    <span className="eyebrow block mb-2.5">What you&rsquo;ll need</span>
                    <div className="flex flex-wrap gap-2">
                      {item.inputs.map(inp => (
                        <span key={inp.label} className="font-mono text-[12px] px-2.5 py-1.5 rounded-sm bg-steel border border-hairline text-cyan-ice">
                          [{inp.label}]
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prompt */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="eyebrow">The prompt</span>
                    <button
                      onClick={copy}
                      className="font-mono text-[11px] tracking-[0.06em] uppercase text-fg-3 hover:text-violet-bright inline-flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                    </button>
                  </div>
                  <div className="prompt-block">{item.prompt}</div>
                </div>
              </div>

              {/* ── Right column: title + outcome + output ── */}
              <div className="expanded-card__right">
                {/* Eyebrow */}
                <span className="flex gap-2.5 items-center flex-wrap font-mono text-[11px] tracking-[0.18em] uppercase text-fg-3 mb-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: DIFF_COLOR[item.difficulty], boxShadow: `0 0 8px ${DIFF_COLOR[item.difficulty]}` }}
                  />
                  {item.difficulty}
                  <span className="text-fg-4">·</span>
                  <span style={{ color: CAT_ACCENT[item.category] || "#9F8CFF" }}>{item.category}</span>
                </span>

                {/* Title */}
                <h2
                  id="ec-title"
                  className="font-serif font-normal text-[clamp(26px,3.5vw,44px)] leading-[1.06] tracking-[-0.015em] text-fg-1 mb-5"
                >
                  {item.title}
                </h2>

                {/* Outcome callout */}
                {item.outcome && (
                  <p className="font-serif italic text-[18px] md:text-[20px] leading-[1.45] text-fg-2 mb-7 border-l-2 pl-5"
                    style={{ borderColor: CAT_ACCENT[item.category] || "#9F8CFF" }}>
                    {item.outcome}
                  </p>
                )}

                {/* LLM recommendation */}
                <div className="flex items-start gap-3 rounded-lg px-4 py-3 mb-6 border border-violet/20 bg-violet/[0.06]">
                  <span className="font-mono text-[18px] text-violet-bright leading-none mt-0.5">⬡</span>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 block mb-1">Best model</span>
                    <span className="font-serif text-[15px] text-fg-1 font-medium">{item.best_llm}</span>
                    <p className="font-sans text-[13px] text-fg-3 mt-0.5 leading-[1.45]">{item.llm_reason}</p>
                  </div>
                </div>

                {/* Expected output */}
                {item.sample_output && (
                  <div>
                    <span className="eyebrow block mb-3">Expected output</span>
                    <div className="sample-output">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.sample_output}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-hairline flex flex-wrap gap-1.5">
                    {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}
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

            {/* Bottom action bar */}
            <div className="expanded-card__bar">
              <button className="btn" onClick={copy}>
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy prompt</>}
              </button>
              <button className="btn btn-ghost" onClick={onClose}>Close</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
