"use client";

import { useCallback, useRef, useState } from "react";
import { Copy, Check, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { UseCase, DIFF_COLOR, CAT_ACCENT, BASE_PATH } from "@/lib/data";
import { formatDate, isNew } from "@/lib/dateUtils";
import { getLaunchUrl, getLaunchLabel } from "@/lib/launchInAI";
import OutputKindIcon, { outputKindLabel } from "./OutputKindIcon";
import CardVisual from "./CardVisual";
import { useSavedPrompts } from "@/context/SavedPromptsContext";

interface Props {
  item: UseCase;
  onOpen: (item: UseCase) => void;
  onTagFilter?: (tag: string) => void;
  isFeatured?: boolean;
}

export default function UseCaseCard({ item, onOpen, onTagFilter, isFeatured = false }: Props) {
  const diffColor = DIFF_COLOR[item.difficulty];
  const catColor  = CAT_ACCENT[item.category] || "#9F8CFF";
  const ref = useRef<HTMLAnchorElement>(null);
  const [copied, setCopied] = useState(false);
  const { isSaved, toggle } = useSavedPrompts();

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transition = "border-color 200ms, box-shadow 200ms, transform 0ms";
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 7}deg) translateZ(6px)`;
    el.style.setProperty("--sx", `${x * 100}%`);
    el.style.setProperty("--sy", `${y * 100}%`);
  }, []);

  const onMouseLeave = useCallback((_e?: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "border-color 200ms, box-shadow 200ms, transform 520ms cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }, []);

  const quickCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <a
      ref={ref}
      href={`${BASE_PATH}/prompts/${item.slug}/`}
      onClick={e => { e.preventDefault(); onOpen(item); }}
      className={`card group focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright focus-visible:-outline-offset-[3px]${isFeatured ? " card--featured" : ""}`}
      aria-label={`Open use case: ${item.title}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ "--cat-color": catColor } as React.CSSProperties}
    >
      <span className="card-shimmer" aria-hidden="true" />

      {/* Difficulty left-border accent */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, bottom: 0,
          width: 3, borderRadius: "7px 0 0 7px",
          background: diffColor, pointerEvents: "none", zIndex: 2,
        }}
      />

      {/* Subtle difficulty bg tint */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, borderRadius: "inherit",
          background: `${diffColor}07`, pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* Action buttons — always visible on touch, hover-only on desktop */}
      <div
        style={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}
        className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150"
      >
        <button
          onClick={e => { e.stopPropagation(); toggle(item.id); }}
          aria-label={isSaved(item.id) ? "Remove from saved" : "Save prompt"}
          title={isSaved(item.id) ? "Remove from saved" : "Save"}
          className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0E1120]/90 border border-violet/30 text-fg-3 hover:text-violet-bright hover:border-violet/60 backdrop-blur-sm transition-colors"
        >
          {isSaved(item.id)
            ? <BookmarkCheck size={10} className="text-violet-bright" />
            : <Bookmark size={10} />}
        </button>
        <button
          onClick={quickCopy}
          aria-label="Copy prompt"
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#0E1120]/90 border border-violet/30 font-mono text-[10px] text-fg-3 hover:text-violet-bright hover:border-violet/60 backdrop-blur-sm transition-colors"
        >
          {copied ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy</>}
        </button>
        <a
          href={getLaunchUrl(item.best_llm, item.prompt)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          aria-label={`Open prompt in ${getLaunchLabel(item.best_llm)}`}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#0E1120]/90 border border-violet/30 font-mono text-[10px] text-fg-3 hover:text-violet-bright hover:border-violet/60 backdrop-blur-sm transition-colors"
        >
          <ExternalLink size={10} /> {getLaunchLabel(item.best_llm)}
        </a>
      </div>

      {/* Output-kind abstract visual */}
      <CardVisual kind={item.output_kind} difficulty={item.difficulty} isFeatured={isFeatured} />

      {/* Difficulty · category · date eyebrow */}
      <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-fg-3 font-medium flex-wrap">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: diffColor, boxShadow: `0 0 8px ${diffColor}` }}
        />
        {item.difficulty}
        <span className="text-fg-4">·</span>
        <span style={{ color: catColor, opacity: 0.85 }}>{item.category}</span>
        <span className="text-fg-4">·</span>
        <span className="text-fg-4 normal-case tracking-normal">{formatDate(item.dateAdded)}</span>
        {isNew(item.dateAdded) && (
          <span className="px-1.5 py-0.5 rounded-sm bg-violet/20 border border-violet/40 text-violet-bright text-[9px] tracking-[0.12em] uppercase font-mono normal-case">
            New
          </span>
        )}
        {item.confidence === "high" && (
          <span className="px-1.5 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[9px] tracking-[0.12em] uppercase font-mono normal-case">
            ✓ Verified
          </span>
        )}
      </span>

      {/* Title */}
      <h3 className={`font-serif font-normal leading-[1.15] tracking-[-0.01em] text-fg-1 m-0 text-left transition-colors duration-140 group-hover:text-violet-bright${isFeatured ? " text-[28px]" : " text-[22px]"}`}>
        {item.title}
      </h3>

      {/* Outcome */}
      <p className={`font-sans text-[13.5px] leading-[1.55] text-fg-2 m-0 text-left${isFeatured ? "" : " line-clamp-3"}`}>
        {item.outcome || item.desc}
      </p>

      {/* Meta row: output kind · tools */}
      <div className="flex items-center gap-2 flex-wrap font-mono text-[10px] text-fg-3 tracking-[0.04em]">
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-fg-4 bg-violet/[0.07] border border-violet/[0.18] rounded px-1.5 py-0.5 whitespace-nowrap">
          <span className="text-violet-bright">⬡</span>
          {item.best_llm}
        </span>
        <span className="text-fg-4">·</span>
        <span className="inline-flex items-center gap-1.5 text-violet-bright">
          <OutputKindIcon kind={item.output_kind} size={13} />
          {outputKindLabel(item.output_kind)}
        </span>
        {item.tools.length > 0 && (
          <>
            <span className="text-fg-4">·</span>
            <span className="truncate max-w-[14ch]" title={item.tools.join(", ")}>
              {item.tools.slice(0, 2).join(" · ")}
              {item.tools.length > 2 && ` +${item.tools.length - 2}`}
            </span>
          </>
        )}
      </div>

      {/* Tags — clickable to filter */}
      <div className="mt-auto flex gap-1.5 items-center flex-wrap pt-2">
        {item.tags.slice(0, isFeatured ? 4 : 3).map(t => (
          onTagFilter ? (
            <button
              key={t}
              className="tag tag-btn"
              onClick={e => { e.stopPropagation(); onTagFilter(t); }}
              aria-label={`Filter by tag: ${t}`}
            >
              {t}
            </button>
          ) : (
            <span key={t} className="tag">{t}</span>
          )
        ))}
      </div>
    </a>
  );
}
