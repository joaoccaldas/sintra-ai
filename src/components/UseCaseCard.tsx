"use client";

import { useCallback, useRef } from "react";
import { UseCase, DIFF_COLOR } from "@/lib/data";
import OutputKindIcon, { outputKindLabel } from "./OutputKindIcon";
import CardVisual from "./CardVisual";

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

interface Props {
  item: UseCase;
  onOpen: (item: UseCase) => void;
  onTagFilter?: (tag: string) => void;
  isFeatured?: boolean;
}

export default function UseCaseCard({ item, onOpen, onTagFilter, isFeatured = false }: Props) {
  const diffColor = DIFF_COLOR[item.difficulty];
  const catColor  = CAT_ACCENT[item.category] || "#9F8CFF";
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
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

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "border-color 200ms, box-shadow 200ms, transform 520ms cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }, []);

  return (
    <button
      ref={ref}
      className={`card group focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright focus-visible:-outline-offset-[3px]${isFeatured ? " card--featured" : ""}`}
      onClick={() => onOpen(item)}
      aria-label={`Open use case: ${item.title}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ "--cat-color": catColor } as React.CSSProperties}
    >
      <span className="card-shimmer" aria-hidden="true" />

      {/* Output-kind abstract visual */}
      <CardVisual kind={item.output_kind} difficulty={item.difficulty} isFeatured={isFeatured} />

      {/* Difficulty · category eyebrow */}
      <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-fg-3 font-medium">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: diffColor, boxShadow: `0 0 8px ${diffColor}` }}
        />
        {item.difficulty}
        <span className="text-fg-4">·</span>
        <span style={{ color: catColor, opacity: 0.85 }}>{item.category}</span>
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
        {/* LLM recommendation */}
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
    </button>
  );
}
