"use client";

import { useMemo } from "react";
import { AI_NEWS } from "@/lib/newsData";
import { BASE_PATH } from "@/lib/data";

export default function NewsTicker() {
  const items = useMemo(() =>
    [...AI_NEWS]
      .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
      .slice(0, 14),
  []);

  if (items.length === 0) return null;

  const ticker = [...items, ...items]; // duplicate for seamless loop

  return (
    <div className="absolute bottom-0 left-0 right-0 h-9 overflow-hidden pointer-events-none z-20">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--void), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--void), transparent)" }} />

      <div className="absolute inset-0 border-t border-white/[0.06]" />

      <div className="flex items-center h-full animate-ticker" style={{ width: "max-content" }}>
        {ticker.map((item, i) => (
          <a
            key={`${item.id}-${i}`}
            href={item.url ?? `${BASE_PATH}/news/`}
            target={item.url ? "_blank" : undefined}
            rel={item.url ? "noopener noreferrer" : undefined}
            className="pointer-events-auto flex items-center gap-3 px-5 shrink-0 hover:opacity-70 transition-opacity"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: item.providerColor ?? "#9F8CFF" }}
            />
            <span className="font-mono text-[10px] tracking-[0.05em] text-fg-4 whitespace-nowrap">
              <span className="text-fg-3 mr-2"
                style={{ color: item.providerColor ?? "#9F8CFF" }}>
                {item.provider}
              </span>
              {item.title}
            </span>
            <span className="font-mono text-[9px] text-fg-4 opacity-40 whitespace-nowrap">
              {item.dateDay ? `${item.dateDay} ` : ""}{item.date}
            </span>
            <span className="text-fg-4 opacity-20 ml-2">·</span>
          </a>
        ))}
      </div>
    </div>
  );
}
