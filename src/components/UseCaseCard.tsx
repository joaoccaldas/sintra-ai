"use client";

import { useCallback, useRef, useState } from "react";
import { Copy, Check, Bookmark, BookmarkCheck } from "lucide-react";
import { UseCase, CAT_ACCENT, BASE_PATH } from "@/lib/constants";
import { useSavedPrompts } from "@/context/SavedPromptsContext";

interface Props {
  item: UseCase;
  onOpen: (item: UseCase) => void;
  onTagFilter?: (tag: string) => void;
  isFeatured?: boolean;
}

export default function UseCaseCard({ item, onOpen, isFeatured = false }: Props) {
  const catColor = CAT_ACCENT[item.category] || "#9F8CFF";
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
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 6}deg) translateZ(4px)`;
    el.style.setProperty("--sx", `${x * 100}%`);
    el.style.setProperty("--sy", `${y * 100}%`);
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "border-color 200ms, box-shadow 200ms, transform 500ms cubic-bezier(0.22,1,0.36,1)";
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
      className="card group focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright focus-visible:-outline-offset-[3px]"
      aria-label={item.title}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ "--cat-color": catColor } as React.CSSProperties}
    >
      <span className="card-shimmer" aria-hidden="true" />

      {/* Hover actions */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150">
        <button
          onClick={e => { e.stopPropagation(); toggle(item.id); }}
          aria-label={isSaved(item.id) ? "Remove" : "Save"}
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0D0F1E]/80 border border-violet/25 text-fg-4 hover:text-violet-bright hover:border-violet/55 backdrop-blur-sm transition-colors"
        >
          {isSaved(item.id) ? <BookmarkCheck size={9} className="text-violet-bright" /> : <Bookmark size={9} />}
        </button>
        <button
          onClick={quickCopy}
          aria-label="Copy prompt"
          className="inline-flex items-center gap-1 px-1.5 h-6 rounded-full bg-[#0D0F1E]/80 border border-violet/25 font-mono text-[9px] text-fg-4 hover:text-violet-bright hover:border-violet/55 backdrop-blur-sm transition-colors"
        >
          {copied ? <><Check size={9} />Copied</> : <><Copy size={9} />Copy</>}
        </button>
      </div>

      {/* Category */}
      <span
        className="font-mono text-[9px] tracking-[0.14em] uppercase font-medium"
        style={{ color: catColor, opacity: 0.8 }}
      >
        {item.category}
      </span>

      {/* Title */}
      <h3 className={`font-serif font-normal leading-[1.18] tracking-[-0.01em] text-fg-1 m-0 text-left transition-colors duration-150 group-hover:text-violet-bright${isFeatured ? " text-[26px]" : " text-[20px]"}`}>
        {item.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-[13px] leading-[1.55] text-fg-3 m-0 text-left line-clamp-2 mt-auto">
        {item.outcome || item.desc}
      </p>

      {/* Tags */}
      <div className="flex gap-1.5 flex-wrap">
        {item.tags.slice(0, 2).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </a>
  );
}
