"use client";

import { useEffect, useState } from "react";
import { Copy, Check, X } from "lucide-react";
import { UseCase, DIFF_COLOR } from "@/lib/data";
import { useFocusTrap, useKeyShortcut } from "@/lib/hooks";

interface Props {
  item: UseCase;
  onClose: () => void;
}

export default function UseCaseModal({ item, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const color = DIFF_COLOR[item.difficulty];
  const trapRef = useFocusTrap<HTMLDivElement>(true);

  useKeyShortcut(["Escape"], onClose);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const copy = () => {
    navigator.clipboard?.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={trapRef}
        className="modal-box max-h-[86vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-start gap-4 mb-4">
          <span className="flex gap-2.5 items-center flex-wrap font-mono text-[11px] tracking-[0.18em] uppercase text-fg-3">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            />
            {item.difficulty}
            <span className="text-fg-4">·</span>
            {item.category}
          </span>
          <button
            onClick={onClose}
            aria-label="Close use case"
            className="bg-transparent border-0 text-fg-3 hover:text-fg-1 hover:bg-white/5 rounded-sm w-9 h-9 flex items-center justify-center transition-colors duration-140"
          >
            <X size={16} />
          </button>
        </div>

        <h2
          id="modal-title"
          className="font-serif font-normal text-[28px] md:text-[38px] leading-[1.08] tracking-[-0.015em] text-fg-1 mb-3.5"
        >
          {item.title}
        </h2>
        <p className="font-sans text-base leading-[1.6] text-fg-2 mb-7">
          {item.desc}
        </p>

        <div className="mb-7">
          <span className="eyebrow block mb-2.5">The prompt</span>
          <div className="prompt-block">{item.prompt}</div>
        </div>

        {item.tags.length > 0 && (
          <div className="mb-7">
            <span className="eyebrow block mb-2.5">Tags</span>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        )}

        {item.source && (
          <div className="mb-7 pt-4 border-t border-hairline">
            <span className="font-mono text-[11px] text-fg-4 tracking-[0.04em]">
              Source: {item.source}
            </span>
          </div>
        )}

        <div className="flex gap-2.5 flex-wrap">
          <button className="btn flex items-center gap-2" onClick={copy}>
            {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy prompt</>}
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
