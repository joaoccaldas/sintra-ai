"use client";

import { useEffect, useState } from "react";
import { Copy, Check, X, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { UseCase, DIFF_COLOR } from "@/lib/constants";
import { useFocusTrap, useKeyShortcut } from "@/lib/hooks";
import OutputKindIcon, { outputKindLabel } from "./OutputKindIcon";

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
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        ref={trapRef}
        className="modal-box max-h-[88vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Eyebrow + close */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <span className="flex gap-2.5 items-center flex-wrap font-mono text-[11px] tracking-[0.18em] uppercase text-fg-3">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            />
            {item.difficulty}
            <span className="text-fg-4">·</span>
            {item.category}
            {item.est_time && (
              <>
                <span className="text-fg-4">·</span>
                <span className="inline-flex items-center gap-1 normal-case tracking-normal">
                  <Clock size={12} /> {item.est_time}
                </span>
              </>
            )}
          </span>
          <button
            onClick={onClose}
            aria-label="Close use case"
            className="bg-transparent border-0 text-fg-3 hover:text-fg-1 hover:bg-white/5 rounded-sm w-9 h-9 flex items-center justify-center transition-colors duration-140 shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Title */}
        <h2
          id="modal-title"
          className="font-serif font-normal text-[28px] md:text-[38px] leading-[1.08] tracking-[-0.015em] text-fg-1 mb-4"
        >
          {item.title}
        </h2>

        {/* Outcome — the "what you'd get" headline */}
        {item.outcome && (
          <p className="font-serif italic text-[19px] md:text-[21px] leading-[1.45] text-fg-2 mb-8 border-l-2 border-violet/40 pl-5">
            {item.outcome}
          </p>
        )}

        {/* Meta strip: output kind + tools */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-hairline">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-violet-bright">
            <OutputKindIcon kind={item.output_kind} size={14} />
            <span>You get: {outputKindLabel(item.output_kind)}</span>
          </span>
          {item.tools.length > 0 && (
            <span className="flex items-center gap-1.5 flex-wrap">
              {item.tools.map(t => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-1 rounded-sm bg-violet/[0.08] text-fg-2 border border-violet/20"
                >
                  {t}
                </span>
              ))}
            </span>
          )}
        </div>

        {/* Inputs */}
        {item.inputs.length > 0 && (
          <div className="mb-8">
            <span className="eyebrow block mb-3">What you'll need</span>
            <div className="flex flex-wrap gap-2">
              {item.inputs.map(inp => (
                <span
                  key={inp.label}
                  className="font-mono text-[12px] px-2.5 py-1.5 rounded-sm bg-steel border border-hairline text-cyan-ice"
                >
                  [{inp.label}]
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Prompt */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 gap-3">
            <span className="eyebrow">The prompt</span>
            <button
              onClick={copy}
              className="font-mono text-[11px] tracking-[0.06em] uppercase text-fg-3 hover:text-violet-bright inline-flex items-center gap-1.5 transition-colors"
            >
              {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>
          <div className="prompt-block">{item.prompt}</div>
        </div>

        {/* Sample output — what the model would actually generate */}
        {item.sample_output && (
          <div className="mb-8">
            <span className="eyebrow block mb-3">What you&rsquo;d get back</span>
            <div className="sample-output">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {item.sample_output}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Tags + source */}
        {item.tags.length > 0 && (
          <div className="mb-6">
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

        {/* Actions */}
        <div className="flex gap-2.5 flex-wrap sticky bottom-0 bg-gradient-to-t from-night via-night/95 to-transparent pt-4 -mx-9 px-9 pb-1">
          <button className="btn flex items-center gap-2" onClick={copy}>
            {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy prompt</>}
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
