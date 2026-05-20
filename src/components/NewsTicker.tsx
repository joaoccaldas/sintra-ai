"use client";

import { AI_NEWS } from "@/lib/newsData";
import { BASE_PATH } from "@/lib/data";

const ITEMS = [...AI_NEWS]
  .sort((a, b) => {
    if (b.dateNum !== a.dateNum) return b.dateNum - a.dateNum;
    return (b.dateDay ?? 1) - (a.dateDay ?? 1);
  })
  .slice(0, 14);

// Duplicate for seamless loop
const LOOP = [...ITEMS, ...ITEMS];

export default function NewsTicker() {
  return (
    <a
      href={`${BASE_PATH}/news`}
      aria-label="View AI news feed"
      className="block border-y border-violet/[0.08] bg-white/[0.015] overflow-hidden h-9 flex items-center group cursor-pointer hover:bg-white/[0.03] transition-colors"
    >
      {/* Label */}
      <div className="shrink-0 flex items-center gap-2 px-4 border-r border-violet/[0.10] h-full z-10 bg-void">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-bright animate-pulse" />
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-violet-bright select-none">
          AI News
        </span>
      </div>

      {/* Scrolling track */}
      <div className="flex-1 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(5,6,11,1), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(5,6,11,1), transparent)" }} />

        <div className="flex items-center animate-ticker group-hover:[animation-play-state:paused] whitespace-nowrap">
          {LOOP.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2.5 px-7">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: item.providerColor }}
              />
              <span
                className="font-mono text-[9px] tracking-[0.12em] uppercase shrink-0"
                style={{ color: item.providerColor }}
              >
                {item.provider}
              </span>
              <span className="font-sans text-[12px] text-fg-3 group-hover:text-fg-2 transition-colors">
                {item.title}
              </span>
              <span className="font-mono text-[10px] text-fg-4 shrink-0">·</span>
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
