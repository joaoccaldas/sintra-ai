"use client";

import { UseCase, BASE_PATH, CAT_ACCENT } from "@/lib/constants";
import { useRecentlyViewed } from "@/lib/hooks";

interface Props {
  onOpen: (item: UseCase) => void;
  allItems: UseCase[];
}

export default function RecentlyViewed({ onOpen, allItems }: Props) {
  const recent = useRecentlyViewed();
  if (recent.length === 0) return null;

  const resolved = recent
    .map(r => allItems.find(u => u.id === r.id))
    .filter((u): u is UseCase => u !== undefined);

  if (resolved.length === 0) return null;

  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 md:px-8 mb-6">
      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg-4 mb-3">
        Recently viewed
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {resolved.map(item => {
          const color = CAT_ACCENT[item.category] || "#9F8CFF";
          return (
            <button
              key={item.id}
              onClick={() => onOpen(item)}
              className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] transition-all text-left group"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: color }}
              />
              <span className="font-mono text-[11px] text-fg-2 group-hover:text-fg-1 transition-colors whitespace-nowrap max-w-[160px] truncate">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
