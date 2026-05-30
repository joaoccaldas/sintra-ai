"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { AITool, TOOL_CATEGORIES } from "@/lib/toolsData";

interface Props {
  tool: AITool | null;
  onClose: () => void;
}

const PRICING_COLOR: Record<string, string> = {
  free:       "#10b981",
  freemium:   "#6ee7a0",
  paid:       "#9F8CFF",
  enterprise: "#e8c089",
};

const PRICING_LABEL: Record<string, string> = {
  free:       "Free",
  freemium:   "Freemium",
  paid:       "Paid",
  enterprise: "Enterprise",
};

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export default function ToolModal({ tool, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!tool) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [tool]);

  useEffect(() => {
    if (!tool) return;
    triggerRef.current = document.activeElement;
    const panel = panelRef.current;
    if (panel) panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => { (triggerRef.current as HTMLElement | null)?.focus(); };
  }, [tool]);

  useEffect(() => {
    if (!tool) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [tool, onClose]);

  const cat = tool ? TOOL_CATEGORIES.find(c => c.id === tool.category) : null;

  return (
    <AnimatePresence>
      {tool && (
        <>
          <motion.div
            key="tool-scrim"
            className="fixed inset-0 z-[90] bg-void/80 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            key="tool-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tm-title"
            className="fixed inset-x-0 bottom-0 z-[100] max-h-[88vh] overflow-y-auto rounded-t-2xl bg-[#0C0A1A] border-t border-violet/20 shadow-2xl"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            {/* Accent bar */}
            <div className="h-[3px] w-full rounded-t-[inherit]"
              style={{ background: `linear-gradient(90deg, ${PRICING_COLOR[tool.pricing]}, transparent)` }} />

            <div className="max-w-2xl mx-auto px-6 py-8 pb-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <h2 id="tm-title" className="font-serif text-[28px] leading-none text-fg-1">{tool.name}</h2>
                    {tool.status === "beta" && (
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-400 bg-amber-500/10 uppercase tracking-[0.08em]">Beta</span>
                    )}
                  </div>
                  <p className="font-sans text-[14px] text-fg-4">{tool.provider}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-fg-3 hover:text-fg-1 hover:bg-white/8 transition-all shrink-0"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Tagline */}
              <p className="font-serif italic text-[18px] leading-[1.45] text-fg-2 mb-6 border-l-2 pl-5"
                style={{ borderColor: PRICING_COLOR[tool.pricing] }}>
                {tool.tagline}
              </p>

              {/* Meta chips */}
              <div className="flex items-center gap-2 flex-wrap mb-6">
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-full border uppercase tracking-[0.08em]"
                  style={{ color: PRICING_COLOR[tool.pricing], borderColor: PRICING_COLOR[tool.pricing] + "44", background: PRICING_COLOR[tool.pricing] + "12" }}>
                  {PRICING_LABEL[tool.pricing]}
                </span>
                {tool.priceNote && (
                  <span className="font-mono text-[10px] text-fg-4">{tool.priceNote}</span>
                )}
                {cat && (
                  <span className="font-mono text-[10px] text-fg-3 px-2.5 py-1 rounded-full border border-white/10">
                    {cat.icon} {cat.label}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <span className="eyebrow block mb-3">About</span>
                <p className="font-sans text-[14.5px] leading-[1.65] text-fg-2">{tool.description}</p>
              </div>

              {/* Highlight */}
              {tool.highlight && (
                <div className="rounded-lg px-4 py-3 mb-6 border border-violet/20 bg-violet/[0.06]">
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 block mb-1">Key differentiator</span>
                  <p className="font-sans text-[14px] text-fg-1 leading-[1.55]">{tool.highlight}</p>
                </div>
              )}

              {/* Tags */}
              {tool.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {tool.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-violet/[0.08] text-fg-3 border border-violet/[0.12]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="flex items-center gap-3">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <ExternalLink size={14} /> Open {tool.name}
                </a>
                <button className="btn btn-ghost" onClick={onClose}>Close</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
