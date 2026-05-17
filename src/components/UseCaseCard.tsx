"use client";

import { UseCase, DIFF_COLOR } from "@/lib/data";

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
      <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-fg-3 font-medium">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        {item.difficulty}
        <span className="text-fg-4">·</span>
        {item.category}
      </span>

      <h3 className="font-serif font-normal text-[22px] leading-[1.15] tracking-[-0.01em] text-fg-1 m-0 text-left transition-colors duration-140 ease-out-custom group-hover:text-violet-bright">
        {item.title}
      </h3>

      <p className="font-sans text-[13.5px] leading-[1.5] text-fg-2 m-0 text-left line-clamp-3">
        {item.desc}
      </p>

      <div className="mt-auto flex gap-1.5 items-center flex-wrap pt-2">
        {item.tags.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </button>
  );
}
