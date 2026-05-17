"use client";

import { UseCase, DIFF_COLOR } from "@/lib/data";
import OutputKindIcon, { outputKindLabel } from "./OutputKindIcon";

interface Props {
  item: UseCase;
  onOpen: (item: UseCase) => void;
}

export default function UseCaseCard({ item, onOpen }: Props) {
  const color = DIFF_COLOR[item.difficulty];

  return (
    <button
      className="card group focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright focus-visible:-outline-offset-[3px]"
      onClick={() => onOpen(item)}
      aria-label={`Open use case: ${item.title}`}
    >
      {/* Top: difficulty · category */}
      <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-fg-3 font-medium">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        {item.difficulty}
        <span className="text-fg-4">·</span>
        {item.category}
      </span>

      {/* Title */}
      <h3 className="font-serif font-normal text-[22px] leading-[1.15] tracking-[-0.01em] text-fg-1 m-0 text-left transition-colors duration-140 ease-out-custom group-hover:text-violet-bright">
        {item.title}
      </h3>

      {/* Outcome — the new "what you get" sentence */}
      <p className="font-sans text-[13.5px] leading-[1.55] text-fg-2 m-0 text-left line-clamp-3">
        {item.outcome || item.desc}
      </p>

      {/* Meta row: output kind · time · tools */}
      <div className="flex items-center gap-2 flex-wrap font-mono text-[10px] text-fg-3 tracking-[0.04em]">
        <span className="inline-flex items-center gap-1.5 text-violet-bright">
          <OutputKindIcon kind={item.output_kind} size={13} />
          {outputKindLabel(item.output_kind)}
        </span>
        {item.est_time && (
          <>
            <span className="text-fg-4">·</span>
            <span>{item.est_time}</span>
          </>
        )}
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

      {/* Tags */}
      <div className="mt-auto flex gap-1.5 items-center flex-wrap pt-2">
        {item.tags.slice(0, 3).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </button>
  );
}
