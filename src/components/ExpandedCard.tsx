"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, ChevronLeft, ChevronRight, ExternalLink, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { UseCase, DIFF_COLOR, CAT_ACCENT } from "@/lib/data";
import { formatDate, isNew } from "@/lib/dateUtils";
import { getLaunchUrl, getLaunchLabel } from "@/lib/launchInAI";
import CardVisual from "./CardVisual";
import OutputKindIcon, { outputKindLabel } from "./OutputKindIcon";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  item: UseCase | null;
  onClose: () => void;
  items?: UseCase[];
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ExpandedCard({ item, onClose, items }: Props) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [currentItem, setCurrentItem] = useState<UseCase | null>(item);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  // Sync internal item when parent opens a different card
  useEffect(() => { setCurrentItem(item); setCopied(false); setShared(false); }, [item]);

  const shown = currentItem;
  const shownIdx = items && shown ? items.findIndex(u => u.id === shown.id) : -1;
  const hasPrev = shownIdx > 0;
  const hasNext = items ? shownIdx < items.length - 1 : false;

  useEffect(() => {
    if (!shown) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [shown]);

  // Save trigger element, focus first focusable in panel, restore on close
  useEffect(() => {
    if (!shown) return;
    triggerRef.current = document.activeElement;
    const panel = panelRef.current;
    if (panel) {
      const first = panel.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    }
    return () => {
      (triggerRef.current as HTMLElement | null)?.focus();
    };
  }, [shown]);

  useEffect(() => {
    if (!shown) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!focusable.length) return;
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
        return;
      }
      if (items) {
        if (e.key === "ArrowLeft" && hasPrev) { setCopied(false); setCurrentItem(items[shownIdx - 1]); }
        if (e.key === "ArrowRight" && hasNext) { setCopied(false); setCurrentItem(items[shownIdx + 1]); }
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [shown, onClose, hasPrev, hasNext, items, shownIdx]);

  const copy = () => {
    if (!shown) return;
    navigator.clipboard?.writeText(shown.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const share = () => {
    if (!shown) return;
    const url = `${window.location.origin}${window.location.pathname}#uc-${shown.id}`;
    navigator.clipboard?.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 1600);
  };

  return (
    <AnimatePresence>
      {item && shown && (
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
            ref={panelRef}
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
              style={{ background: `linear-gradient(90deg, ${CAT_ACCENT[shown.category] || "#9F8CFF"}, transparent)` }}
            />

            <div className="expanded-card__inner">
              {/* ── Left column: visual + prompt ── */}
              <div className="expanded-card__left">
                {/* Big visual */}
                <div className="expanded-card__visual">
                  <CardVisual kind={shown.output_kind} difficulty={shown.difficulty} isFeatured />
                </div>

                {/* Output kind badge */}
                <div className="flex items-center gap-2 mt-4 mb-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-violet-bright">
                    <OutputKindIcon kind={shown.output_kind} size={13} />
                    You get: {outputKindLabel(shown.output_kind)}
                  </span>
                </div>

                {/* Tool chips */}
                {shown.tools.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {shown.tools.map(tool => (
                      <span key={tool} className="font-mono text-[10px] px-2 py-1 rounded-sm bg-violet/[0.08] text-fg-2 border border-violet/20">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                {/* What you'll need */}
                {shown.inputs.length > 0 && (
                  <div className="mb-6">
                    <span className="eyebrow block mb-2.5">{t.expanded_inputs}</span>
                    <div className="flex flex-wrap gap-2">
                      {shown.inputs.map(inp => (
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
                    <span className="eyebrow">{t.expanded_prompt}</span>
                    <button
                      onClick={copy}
                      className="font-mono text-[11px] tracking-[0.06em] uppercase text-fg-3 hover:text-violet-bright inline-flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <><Check size={11} /> {t.expanded_copied}</> : <><Copy size={11} /> {t.expanded_copy}</>}
                    </button>
                  </div>
                  <div className="prompt-block">{shown.prompt}</div>
                </div>
              </div>

              {/* ── Right column: title + outcome + output ── */}
              <div className="expanded-card__right">
                {/* Eyebrow */}
                <span className="flex gap-2.5 items-center flex-wrap font-mono text-[11px] tracking-[0.18em] uppercase text-fg-3 mb-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: DIFF_COLOR[shown.difficulty], boxShadow: `0 0 8px ${DIFF_COLOR[shown.difficulty]}` }}
                  />
                  {shown.difficulty}
                  <span className="text-fg-4">·</span>
                  <span style={{ color: CAT_ACCENT[shown.category] || "#9F8CFF" }}>{shown.category}</span>
                  <span className="text-fg-4">·</span>
                  <span className="text-fg-4 normal-case tracking-normal">{formatDate(shown.dateAdded)}</span>
                  {isNew(shown.dateAdded) && (
                    <span className="px-1.5 py-0.5 rounded-sm bg-violet/20 border border-violet/40 text-violet-bright text-[9px] tracking-[0.12em] uppercase font-mono normal-case">
                      New
                    </span>
                  )}
                  {items && shownIdx >= 0 && (
                    <span className="ml-auto font-mono text-[10px] text-fg-4">
                      {shownIdx + 1} / {items.length}
                    </span>
                  )}
                </span>

                {/* Title */}
                <h2
                  id="ec-title"
                  className="font-serif font-normal text-[clamp(26px,3.5vw,44px)] leading-[1.06] tracking-[-0.015em] text-fg-1 mb-5"
                >
                  {shown.title}
                </h2>

                {/* Outcome callout */}
                {shown.outcome && (
                  <p className="font-serif italic text-[18px] md:text-[20px] leading-[1.45] text-fg-2 mb-7 border-l-2 pl-5"
                    style={{ borderColor: CAT_ACCENT[shown.category] || "#9F8CFF" }}>
                    {shown.outcome}
                  </p>
                )}

                {/* LLM recommendation */}
                <div className="flex items-start gap-3 rounded-lg px-4 py-3 mb-6 border border-violet/20 bg-violet/[0.06]">
                  <span className="font-mono text-[18px] text-violet-bright leading-none mt-0.5">⬡</span>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 block mb-1">Suggested model</span>
                    <span className="font-serif text-[15px] text-fg-1 font-medium">{shown.best_llm}</span>
                    <p className="font-sans text-[13px] text-fg-3 mt-0.5 leading-[1.45]">{shown.llm_reason}</p>
                  </div>
                </div>

                {/* Expected output */}
                {shown.sample_output && (
                  <div>
                    <span className="eyebrow block mb-3">{t.expanded_sample}</span>
                    <div className="sample-output">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {shown.sample_output}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {shown.tags.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-hairline flex flex-wrap gap-1.5">
                    {shown.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
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
              {/* Prev/Next navigation */}
              {items && items.length > 1 && (
                <div className="flex items-center gap-1 mr-auto">
                  <button
                    onClick={() => { if (hasPrev) { setCopied(false); setCurrentItem(items[shownIdx - 1]); } }}
                    disabled={!hasPrev}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-violet/20 text-fg-3 hover:text-fg-1 hover:border-violet/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous use case"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    onClick={() => { if (hasNext) { setCopied(false); setCurrentItem(items[shownIdx + 1]); } }}
                    disabled={!hasNext}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-violet/20 text-fg-3 hover:text-fg-1 hover:border-violet/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Next use case"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              )}
              <a
                href={getLaunchUrl(shown.best_llm, shown.prompt)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <ExternalLink size={14} /> Open in {getLaunchLabel(shown.best_llm)}
              </a>
              <button className="btn btn-ghost" onClick={copy}>
                {copied ? <><Check size={14} /> {t.expanded_copied}</> : <><Copy size={14} /> {t.expanded_copy}</>}
              </button>
              <button className="btn btn-ghost" onClick={share} title="Copy link to this prompt">
                {shared ? <><Check size={14} /> Link copied!</> : <><Share2 size={14} /> Share</>}
              </button>
              <button className="btn btn-ghost" onClick={onClose}>{t.expanded_close}</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
