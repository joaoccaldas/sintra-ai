"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { AI_NEWS } from "@/lib/newsData";
import { BASE_PATH } from "@/lib/data";

const SIG_META = {
  landmark: { label: "Landmark", color: "#d97706", bg: "rgba(217,119,6,0.10)", border: "rgba(217,119,6,0.30)" },
  major:    { label: "Major",    color: "#9F8CFF", bg: "rgba(159,140,255,0.08)", border: "rgba(159,140,255,0.22)" },
  notable:  { label: "Notable",  color: "#5EEAD4", bg: "rgba(94,234,212,0.08)", border: "rgba(94,234,212,0.18)" },
};

export default function DisruptiveSignals() {
  const items = useMemo(() => {
    return [...AI_NEWS]
      .filter(n => n.significance === "landmark" || n.significance === "major")
      .sort((a, b) => {
        if (b.dateNum !== a.dateNum) return b.dateNum - a.dateNum;
        return (b.dateDay ?? 0) - (a.dateDay ?? 0);
      })
      .slice(0, 6);
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="w-full max-w-[860px] mx-auto px-6 md:px-8 mb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg-4">
            Disruptive signals
          </span>
        </div>
        <span className="flex-1 h-px bg-hairline" />
        <a
          href={`${BASE_PATH}/news/`}
          className="font-mono text-[10px] tracking-[0.06em] text-fg-4 hover:text-violet-bright transition-colors"
        >
          All signals →
        </a>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {items.map((item, i) => {
          const sig = SIG_META[item.significance];
          return (
            <motion.a
              key={item.id}
              href={item.url ?? `${BASE_PATH}/news/`}
              target={item.url ? "_blank" : undefined}
              rel={item.url ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col gap-2.5 p-3.5 rounded-xl border transition-all duration-200 hover:scale-[1.015]"
              style={{
                background: "rgba(255,255,255,0.018)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = sig.border;
                (e.currentTarget as HTMLElement).style.background = sig.bg;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.018)";
              }}
            >
              {/* Top row: sig badge + date */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className="font-mono text-[8px] tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-full border"
                  style={{ color: sig.color, background: sig.bg, borderColor: sig.border }}
                >
                  {sig.label}
                </span>
                <span className="font-mono text-[9px] text-fg-4 shrink-0">
                  {item.dateDay ? `${item.dateDay} ` : ""}{item.date}
                </span>
              </div>

              {/* Title */}
              <p className="font-sans text-[12.5px] font-medium text-fg-1 leading-[1.4] line-clamp-2 group-hover:text-white transition-colors">
                {item.title}
              </p>

              {/* Summary */}
              <p className="font-sans text-[11.5px] text-fg-3 leading-[1.5] line-clamp-2 flex-1">
                {item.summary}
              </p>

              {/* Provider */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-white/[0.05]">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: item.providerColor }}
                />
                <span className="font-mono text-[9px] text-fg-4 truncate">{item.provider}</span>
                {item.country && (
                  <span className="ml-auto text-[11px]">
                    {item.country === "BR" ? "🇧🇷" : item.country === "SE" ? "🇸🇪" : ""}
                  </span>
                )}
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
