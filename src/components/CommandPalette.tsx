"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const groups = useMemo(() => (query.trim() ? searchAll(query) : []), [query]);
  const flatDocs = useMemo(() => groups.flatMap(group => group.docs.slice(0, MAX_PER_GROUP)), [groups]);

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setQuery("");
      setSelectedIdx(0);
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
    returnFocusRef.current?.focus();
  }, [open]);

  useEffect(() => setSelectedIdx(0), [query]);

  const copyPrompt = useCallback((doc: SearchDocument) => {
    const useCase = USE_CASES.find(item => item.id === doc.useCaseId);
    if (!useCase) return;
    void navigator.clipboard?.writeText(useCase.prompt);
    setCopiedId(doc.id);
    window.setTimeout(() => setCopiedId(null), 1600);
  }, []);

  const activateDoc = useCallback((doc: SearchDocument) => {
    onClose();
    window.location.assign(doc.href);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIdx(index => Math.min(index + 1, Math.max(flatDocs.length - 1, 0)));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIdx(index => Math.max(index - 1, 0));
        return;
      }
      if (event.key === "Enter" && flatDocs[selectedIdx]) {
        event.preventDefault();
        activateDoc(flatDocs[selectedIdx]);
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        )].filter(element => !element.hasAttribute("hidden"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activateDoc, flatDocs, onClose, open, selectedIdx]);

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
            aria-hidden="true"
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
            aria-label="Search Sintra AI"
          >
            <div
              ref={dialogRef}
              className="rounded-2xl border border-violet/20 bg-[#0C0E1A] shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(159,140,255,0.08)] overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-hairline">
                <Search size={15} className="text-fg-4 shrink-0" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder="Search prompts, tools, concepts, news…"
                  aria-label="Search prompts, tools, concepts and news"
                  className="flex-1 bg-transparent font-mono text-[14px] text-fg-1 placeholder:text-fg-4 outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-fg-4 hover:text-fg-2 transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={13} />
                  </button>
                )}
                <kbd className="font-mono text-[10px] text-fg-4 px-1.5 py-0.5 rounded border border-hairline bg-white/[0.04] leading-none">esc</kbd>
              </div>

              <div className="max-h-[55vh] overflow-y-auto" role="listbox" aria-label="Search results">
                {!query.trim() ? (
                  <div className="px-4 py-8 text-center">
                    <p className="font-mono text-[12px] text-fg-4 leading-relaxed">
                      Search across <span className="text-fg-2">{SEARCH_INDEX.length} documents</span> including prompts, tools, concepts, news, labs and models.
                    </p>
                    <p className="font-mono text-[10px] text-fg-4 mt-2 opacity-70">
                      Enter opens the selected result. Prompt results also include a separate copy action.
                    </p>
                  </div>
                ) : groups.length === 0 ? (
                  <div className="px-4 py-8 text-center" role="status">
                    <p className="font-mono text-[12px] text-fg-4">No results for <span className="text-fg-2">“{query}”</span></p>
                  </div>
                ) : (
                  <div className="py-1.5">
                    {(() => {
                      let index = 0;
                      return groups.map(({ kind, docs }) => {
                        const meta = KIND_META[kind];
                        const shown = docs.slice(0, MAX_PER_GROUP);
                        return (
                          <div key={kind}>
                            <div className="px-4 py-1.5">
                              <span className="font-mono text-[9px] tracking-[0.14em] uppercase" style={{ color: meta.color }}>
                                {meta.pluralLabel}
                              </span>
                              <span className="font-mono text-[9px] text-fg-4 ml-1.5">{docs.length}</span>
                            </div>
                            {shown.map(doc => {
                              const currentIndex = index++;
                              return (
                                <PaletteRow
                                  key={doc.id}
                                  doc={doc}
                                  kind={kind}
                                  isSelected={currentIndex === selectedIdx}
                                  isCopied={copiedId === doc.id}
                                  onSelect={() => setSelectedIdx(currentIndex)}
                                  onActivate={() => activateDoc(doc)}
                                  onCopy={() => copyPrompt(doc)}
                                />
                              );
                            })}
                            {docs.length > MAX_PER_GROUP && (
                              <p className="px-4 py-1.5 font-mono text-[10px] text-fg-4">
                                +{docs.length - MAX_PER_GROUP} more matching {meta.pluralLabel.toLowerCase()}
                              </p>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>

              <div className="px-4 py-2 border-t border-hairline flex items-center gap-5 font-mono text-[10px] text-fg-4">
                <span className="flex items-center gap-1.5"><Kbd>↑↓</Kbd> navigate</span>
                <span className="flex items-center gap-1.5"><Kbd>↵</Kbd> open</span>
                <span className="flex items-center gap-1.5"><Kbd>esc</Kbd> close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-hairline bg-white/[0.04] leading-none text-fg-3">{children}</kbd>;
}

function PaletteRow({
  doc,
  kind,
  isSelected,
  isCopied,
  onSelect,
  onActivate,
  onCopy,
}: {
  doc: SearchDocument;
  kind: EntityKind;
  isSelected: boolean;
  isCopied: boolean;
  onSelect: () => void;
  onActivate: () => void;
  onCopy: () => void;
}) {
  const isUseCase = kind === "use_case";
  const meta = KIND_META[kind];

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onMouseEnter={onSelect}
      className={`flex items-center gap-2 px-2 py-1 transition-colors ${isSelected ? "bg-violet/[0.12]" : "hover:bg-white/[0.03]"}`}
    >
      <button
        type="button"
        onClick={onActivate}
        className="flex flex-1 min-w-0 items-center gap-3 px-2 py-1.5 text-left rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright"
      >
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: meta.color, opacity: 0.7 }} />
        <span className="flex-1 min-w-0">
          <span className="block font-sans text-[13px] text-fg-1 truncate leading-snug">{doc.title}</span>
          <span className="block font-mono text-[10px] text-fg-4 truncate mt-0.5">{doc.summary}</span>
        </span>
        {!isUseCase && <ArrowRight size={11} className="text-fg-4 shrink-0" />}
      </button>
      {isUseCase && (
        <button
          type="button"
          onClick={onCopy}
          title="Copy prompt"
          aria-label={`Copy prompt: ${doc.title}`}
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded border border-violet/20 text-violet-bright hover:bg-violet/10 hover:border-violet/40 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright"
        >
          {isCopied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      )}
    </div>
  );
}
