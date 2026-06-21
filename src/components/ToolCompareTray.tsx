"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Scale } from "lucide-react";
import { AITool, TOOL_CATEGORIES } from "@/lib/toolsData";

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

interface TrayProps {
  tools: AITool[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpenCompare: () => void;
}

/** Sticky bottom bar showing the 1-4 tools currently queued for comparison. */
export function ToolCompareBar({ tools, onRemove, onClear, onOpenCompare }: TrayProps) {
  return (
    <AnimatePresence>
      {tools.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-[80] flex justify-center px-4 pb-4"
        >
          <div className="flex items-center gap-3 max-w-xl w-full rounded-2xl border border-violet/25 bg-[#0C0A1A]/95 backdrop-blur-md shadow-2xl px-4 py-3">
            <Scale size={14} className="text-violet-bright shrink-0" />
            <div className="flex items-center gap-1.5 flex-1 overflow-x-auto scrollbar-none">
              {tools.map(t => (
                <span key={t.id} className="inline-flex items-center gap-1 shrink-0 font-mono text-[10px] px-2 py-1 rounded-full border border-violet/25 bg-violet/[0.08] text-fg-2 whitespace-nowrap">
                  {t.name}
                  <button onClick={() => onRemove(t.id)} aria-label={`Remove ${t.name} from comparison`} className="text-fg-4 hover:text-fg-1 transition-colors">
                    <X size={9} />
                  </button>
                </span>
              ))}
            </div>
            <button
              onClick={onClear}
              className="font-mono text-[10px] text-fg-4 hover:text-fg-2 transition-colors shrink-0"
            >
              Clear
            </button>
            <button
              onClick={onOpenCompare}
              disabled={tools.length < 2}
              className="shrink-0 font-mono text-[10px] tracking-[0.06em] uppercase px-3.5 py-2 rounded-lg bg-violet text-fg-on-violet disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
            >
              Compare ({tools.length})
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ModalProps {
  tools: AITool[];
  open: boolean;
  onClose: () => void;
}

const ROWS: { label: string; render: (t: AITool) => React.ReactNode }[] = [
  {
    label: "Pricing",
    render: t => (
      <span className="font-mono text-[11px] px-2 py-0.5 rounded-full border uppercase tracking-[0.06em]"
        style={{ color: PRICING_COLOR[t.pricing], borderColor: PRICING_COLOR[t.pricing] + "44", background: PRICING_COLOR[t.pricing] + "12" }}>
        {PRICING_LABEL[t.pricing]}
      </span>
    ),
  },
  { label: "Price note", render: t => <span className="font-mono text-[11px] text-fg-3">{t.priceNote || "—"}</span> },
  {
    label: "Category",
    render: t => {
      const cat = TOOL_CATEGORIES.find(c => c.id === t.category);
      return <span className="font-mono text-[11px] text-fg-3">{cat ? `${cat.icon} ${cat.label}` : "—"}</span>;
    },
  },
  { label: "Provider", render: t => <span className="font-mono text-[11px] text-fg-3">{t.provider}</span> },
  { label: "Status", render: t => <span className="font-mono text-[11px] text-fg-3 capitalize">{t.status}</span> },
  { label: "Highlight", render: t => <span className="font-sans text-[12px] text-fg-2 leading-[1.5]">{t.highlight}</span> },
];

/** Side-by-side comparison modal for 2-4 tools selected via the compare tray. */
export function ToolCompareModal({ tools, open, onClose }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && tools.length >= 2 && (
        <>
          <motion.div
            key="compare-scrim"
            className="fixed inset-0 z-[90] bg-void/80 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            key="compare-panel"
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-0 bottom-0 z-[100] max-h-[88vh] overflow-y-auto rounded-t-2xl bg-[#0C0A1A] border-t border-violet/20 shadow-2xl"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            <div className="h-[3px] w-full rounded-t-[inherit] bg-gradient-to-r from-violet-bright to-transparent" />

            <div className="max-w-4xl mx-auto px-6 py-8 pb-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <h2 className="font-serif text-[24px] leading-none text-fg-1">Compare tools</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-fg-3 hover:text-fg-1 hover:bg-white/8 transition-all shrink-0"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/[0.07]">
                      <th className="px-4 py-3 w-32 sticky left-0 bg-[#0C0A1A]" />
                      {tools.map(t => (
                        <th key={t.id} className="px-4 py-3 min-w-[180px]">
                          <p className="font-serif text-[15px] text-fg-1 leading-none mb-1">{t.name}</p>
                          <a href={t.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[9px] text-violet-bright hover:underline">
                            Visit <ExternalLink size={9} />
                          </a>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map(row => (
                      <tr key={row.label} className="border-b border-white/[0.04] last:border-0">
                        <td className="px-4 py-3 sticky left-0 bg-[#0C0A1A] font-mono text-[10px] tracking-[0.08em] uppercase text-fg-4 align-top">
                          {row.label}
                        </td>
                        {tools.map(t => (
                          <td key={t.id} className="px-4 py-3 align-top">{row.render(t)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
