"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { BASE_PATH } from "@/lib/data";
import { AI_NEWS } from "@/lib/newsData";

const SITE = BASE_PATH;

export default function ThePulse() {
  const items = useMemo(() =>
    [...AI_NEWS]
      .filter(n => n.significance === "landmark" || n.significance === "major")
      .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
      .slice(0, 6),
  []);

  return (
    <section className="w-full max-w-[860px] mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg-4">The Pulse</span>
        </div>
        <span className="flex-1 h-px bg-hairline" />
        <a
          href={`${SITE}/news/`}
          className="font-mono text-[10px] tracking-[0.06em] text-fg-4 hover:text-violet-bright transition-colors"
        >
          All news →
        </a>
      </div>

      {/* News cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.url ?? `${SITE}/news/`}
            target={item.url ? "_blank" : undefined}
            rel={item.url ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col gap-3 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-violet/25 hover:bg-violet/[0.04] transition-all"
          >
            {/* Date + landmark indicator */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[9px] text-fg-4">
                {item.dateDay ? `${item.dateDay} ` : ""}{item.date}
              </span>
              {item.significance === "landmark" && (
                <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-amber-400/80">
                  landmark
                </span>
              )}
            </div>

            {/* Title */}
            <p className="font-sans text-[13px] font-medium text-fg-2 leading-[1.45] line-clamp-3 group-hover:text-fg-1 transition-colors">
              {item.country === "BR" && <span className="mr-1 text-[10px]">🇧🇷</span>}
              {item.country === "SE" && <span className="mr-1 text-[10px]">🇸🇪</span>}
              {item.title}
            </p>

            {/* Provider */}
            <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-white/[0.05]">
              <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-white/20" />
              <span className="font-mono text-[9px] text-fg-4 truncate flex-1">{item.provider}</span>
              {item.url && <ExternalLink size={9} className="text-fg-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
