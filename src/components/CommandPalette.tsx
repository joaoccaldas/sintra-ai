"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Search, Copy, Check, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchAll, KIND_META, SEARCH_INDEX, type SearchDocument, type EntityKind } from "@/lib/searchIndex";
import { USE_CASES } from "@/lib/data";

const MAX_PER_GROUP = 3;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const groups = useMemo(
    () => (query.trim() ? searchAll(query) : []),
    [query]
  );

  const flatDocs = useMemo(
    () => groups.flatMap(g => g.docs.slice(0, MAX_PER_GROUP)),
    [groups]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => { setSelectedIdx(0); }, [query]);

  const copyPrompt = useCallback((doc: SearchDocument) => {
    const uc = USE_CASES.find(u => u.id === doc.useCaseId);
    if (!uc) return;
    navigator.clipboard?.writeText(uc.prompt);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 1600);
  }, []);

  const activateDoc = useCallback((doc: SearchDocument) => {
    if (doc.kind === "use_case" && doc.useCaseId != null) {
      copyPrompt(doc);
    } else {
      window.location.href = doc.href;
      onClose();
    }
  }, [copyPrompt, onClose]);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx(i => Math.min(i + 1, flatDocs.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx(i => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && flatDocs[selectedIdx]) {
        e.preventDefault();
        activateDoc(flatDocs[selectedIdx]);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, flatDocs, selectedIdx, activateDoc, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[95] bg-void/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          <motion.div
            key="palette"
            className="fixed z-[100] top-[14vh] left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="rounded-2xl border border-violet/20 bg-[#0C0E1A] shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(159,140,255,0.08)] overflow-hidden">

              {/* Input row */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-hairline">
                <Search size={15} className="text-fg-4 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search prompts, tools, concepts, news…"
                  className="flex-1 bg-transparent font-mono text-[14px] text-fg-1 placeholder:text-fg-4 outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-fg-4 hover:text-fg-2 transition-colors"
                    aria-label="Clear"
                  >
                    <X size={13} />
                  </button>
                )}
                <kbd className="font-mono text-[10px] text-fg-4 px-1.5 py-0.5 rounded border border-hairline bg-white/[0.04] leading-none">esc</kbd>
              </div>

              {/* Results */}
              <div className="max-h-[55vh] overflow-y-auto">
                {!query.trim() ? (
                  <div className="px-4 py-8 text-center">
                    <p className="font-mono text-[12px] text-fg-4 leading-relaxed">
                      Search across <span className="text-fg-2">{SEARCH_INDEX.length} documents</span> — prompts, tools, concepts, news, labs &amp; more.
                    </p>
                    <p className="font-mono text-[10px] text-fg-4 mt-2 opacity-60">
                      For use-case results, Enter or Copy copies the prompt instantly.
                    </p>
                  </div>
                ) : groups.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="font-mono text-[12px] text-fg-4">No results for <span className="text-fg-2">"{query}"</span></p>
                  </div>
                ) : (
                  <div className="py-1.5">
                    {(() => {
                      let idx = 0;
                      return groups.map(({ kind, docs }) => {
                        const meta = KIND_META[kind];
                        const shown = docs.slice(0, MAX_PER_GROUP);
                        return (
                          <div key={kind}>
                            <div className="px-4 py-1.5">
                              <span
                                className="font-mono text-[9px] tracking-[0.14em] uppercase"
                                style={{ color: meta.color }}
                              >
                                {meta.pluralLabel}
                              </span>
                              <span className="font-mono text-[9px] text-fg-4 ml-1.5">{docs.length}</span>
                            </div>
                            {shown.map(doc => {
                              const thisIdx = idx++;
                              return (
                                <PaletteRow
                                  key={doc.id}
                                  doc={doc}
                                  kind={kind}
                                  isSelected={thisIdx === selectedIdx}
                                  isCopied={copiedId === doc.id}
                                  onActivate={() => activateDoc(doc)}
                                  onCopy={() => copyPrompt(doc)}
                                />
                              );
                            })}
                            {docs.length > MAX_PER_GROUP && (
                              <a
                                href={docs[0].href}
                                onClick={onClose}
                                className="flex items-center gap-1.5 px-4 py-1.5 font-mono text-[10px] text-violet-bright hover:bg-violet/[0.06] transition-colors"
                              >
                                +{docs.length - MAX_PER_GROUP} more in {meta.pluralLabel} <ArrowRight size={10} />
                              </a>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>

              {/* Footer shortcuts hint */}
              <div className="px-4 py-2 border-t border-hairline flex items-center gap-5 font-mono text-[10px] text-fg-4">
                <span className="flex items-center gap-1.5">
                  <Kbd>↑↓</Kbd> navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd>↵</Kbd> copy / go
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd>esc</Kbd> close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-hairline bg-white/[0.04] leading-none text-fg-3">
      {children}
    </kbd>
  );
}

function PaletteRow({
  doc, kind, isSelected, isCopied, onActivate, onCopy,
}: {
  doc: SearchDocument;
  kind: EntityKind;
  isSelected: boolean;
  isCopied: boolean;
  onActivate: () => void;
  onCopy: () => void;
}) {
  const isUseCase = kind === "use_case";
  const meta = KIND_META[kind];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
        isSelected ? "bg-violet/[0.12]" : "hover:bg-white/[0.03]"
      }`}
      onClick={onActivate}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: meta.color, opacity: 0.7 }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-sans text-[13px] text-fg-1 truncate leading-snug">{doc.title}</p>
        <p className="font-mono text-[10px] text-fg-4 truncate mt-0.5">{doc.summary}</p>
      </div>
      {isUseCase ? (
        <button
          onClick={e => { e.stopPropagation(); onCopy(); }}
          title="Copy prompt"
          className="shrink-0 flex items-center justify-center w-7 h-7 rounded border border-violet/20 text-violet-bright hover:bg-violet/10 hover:border-violet/40 transition-all"
        >
          {isCopied ? <Check size={11} /> : <Copy size={11} />}
        </button>
      ) : (
        <ArrowRight size={11} className="text-fg-4 shrink-0" />
      )}
    </div>
  );
}
