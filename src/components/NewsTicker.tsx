"use client";

import { AI_NEWS } from "@/lib/newsData";
import { BASE_PATH } from "@/lib/data";

const ITEMS = [...AI_NEWS]
  .sort((a, b) => {
    if (b.dateNum !== a.dateNum) return b.dateNum - a.dateNum;
    return (b.dateDay ?? 1) - (a.dateDay ?? 1);
  })
  .slice(0, 14);

const LOOP = [...ITEMS, ...ITEMS];

export default function NewsTicker() {
  return (
    <a
      href={`${BASE_PATH}/news`}
      aria-label="View AI news feed"
      className="block overflow-hidden h-14 flex items-center group cursor-pointer transition-colors"
      style={{
        background: "linear-gradient(to top, rgba(9,11,20,0.98) 0%, rgba(9,11,20,0.82) 100%)",
        borderTop: "1px solid rgba(159,140,255,0.18)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Label */}
      <div className="shrink-0 flex items-center gap-2.5 px-5 border-r border-violet/[0.20] h-full"
        style={{ background: "rgba(159,140,255,0.06)" }}>
        <span className="w-2 h-2 rounded-full bg-violet-bright animate-pulse shrink-0" />
        <span className="font-mono text-[10px] tracking-[0.20em] uppercase text-violet-bright select-none whitespace-nowrap">
          AI News
        </span>
      </div>

      {/* Scrolling track */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(9,11,20,0.95), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(9,11,20,0.95), transparent)" }} />

        <div className="flex items-center animate-ticker group-hover:[animation-play-state:paused] whitespace-nowrap">
          {LOOP.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-8">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: item.providerColor, boxShadow: `0 0 6px ${item.providerColor}88` }}
              />
              <span
                className="font-mono text-[10px] tracking-[0.14em] uppercase shrink-0 font-medium"
                style={{ color: item.providerColor }}
              >
                {item.provider}
              </span>
              <span className="font-sans text-[13px] text-fg-2 group-hover:text-fg-1 transition-colors font-light">
                {item.title}
              </span>
              <span className="text-violet/40 text-[14px] shrink-0">·</span>
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
