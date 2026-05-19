"use client";

import { useState } from "react";
import { X, Copy, Check, Trash2, Bookmark, BookmarkX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSavedPrompts } from "@/context/SavedPromptsContext";
import { USE_CASES } from "@/lib/data";

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SavedPanel({ open, onClose }: Props) {
  const { saved, toggle, clear } = useSavedPrompts();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const savedItems = USE_CASES.filter(u => saved.has(u.id));

  const copyPrompt = (id: number, prompt: string) => {
    navigator.clipboard?.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[80] bg-void/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            key="panel"
            className="fixed top-0 right-0 bottom-0 z-[90] w-full max-w-[420px] bg-[#0C0E1A] border-l border-hairline flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.5)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            role="dialog"
            aria-modal="true"
            aria-label="Saved prompts"
            onKeyDown={e => {
              if (e.key === "Escape") onClose();
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-hairline shrink-0">
              <div className="flex items-center gap-2.5">
                <Bookmark size={14} className="text-violet-bright" />
                <span className="font-serif text-[16px] text-fg-1">Saved</span>
                {savedItems.length > 0 && (
                  <span className="font-mono text-[11px] text-fg-4">
                    {savedItems.length} prompt{savedItems.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {savedItems.length > 0 && (
                  <button
                    onClick={clear}
                    className="font-mono text-[10px] text-fg-4 hover:text-red-400 transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 size={11} /> Clear all
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-fg-3 hover:text-fg-1 transition-colors"
                  aria-label="Close saved prompts"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
              {savedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 pt-20">
                  <Bookmark size={36} className="text-fg-4 opacity-40" />
                  <div>
                    <p className="font-serif text-[17px] text-fg-2 mb-2">No saved prompts yet</p>
                    <p className="font-mono text-[11px] text-fg-4 leading-relaxed max-w-[240px] mx-auto">
                      Click the bookmark icon on any use-case card to save it here.
                    </p>
                  </div>
                </div>
              ) : (
                savedItems.map(item => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-hairline bg-white/[0.025] hover:bg-white/[0.04] transition-colors p-4"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-[14px] text-fg-1 leading-snug">{item.title}</h3>
                      <button
                        onClick={() => toggle(item.id)}
                        className="shrink-0 text-violet/60 hover:text-red-400 transition-colors mt-0.5"
                        aria-label="Remove from saved"
                        title="Remove"
                      >
                        <BookmarkX size={14} />
                      </button>
                    </div>
                    <p className="font-sans text-[11px] text-fg-4 mb-3 line-clamp-2 leading-relaxed">
                      {item.outcome || item.desc}
                    </p>
                    <div className="prompt-block text-[11px] leading-relaxed line-clamp-3 mb-3">
                      {item.prompt}
                    </div>
                    <button
                      onClick={() => copyPrompt(item.id, item.prompt)}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-lg bg-violet/15 border border-violet/30 text-violet-bright hover:bg-violet/25 transition-all"
                    >
                      {copiedId === item.id
                        ? <><Check size={11} /> Copied!</>
                        : <><Copy size={11} /> Copy prompt</>}
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
