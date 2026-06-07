"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { MILESTONES } from "@/lib/timelineData";
import { BASE_PATH } from "@/lib/data";

export default function TodayInHistory() {
  const milestone = useMemo(() => {
    // Pick deterministically by day-of-year so it rotates daily
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
    return MILESTONES[dayOfYear % MILESTONES.length];
  }, []);

  if (!milestone) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16"
    >
      {/* Section head */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet/60" />
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 flex items-center gap-1.5">
          <Clock size={10} />
          Today in AI History
        </span>
        <span className="flex-1 h-px bg-hairline" />
        <a
          href={`${BASE_PATH}/ai-history/`}
          className="font-mono text-[10px] text-fg-4 hover:text-violet-bright transition-colors flex items-center gap-1"
        >
          Full timeline <ArrowRight size={10} />
        </a>
      </div>

      <a
        href={`${BASE_PATH}/ai-history/`}
        className="group flex items-start gap-5 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200"
      >
        {/* Emoji + year badge */}
        <div className="flex flex-col items-center gap-2 pt-0.5 shrink-0">
          <span className="text-3xl leading-none">{milestone.emoji}</span>
          <span className="font-mono text-[9px] tracking-[0.08em] text-fg-4 whitespace-nowrap">
            {milestone.year}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-serif text-[16px] md:text-[18px] text-fg-1 leading-[1.3] group-hover:text-white transition-colors mb-2">
            {milestone.title}
          </p>
          <p className="font-sans text-[13px] text-fg-3 leading-[1.55] line-clamp-2">
            {milestone.significance}
          </p>
          {milestone.by && (
            <p className="font-mono text-[10px] text-fg-4 mt-2 flex items-center gap-1">
              <span className="opacity-50">by</span> {milestone.by}
            </p>
          )}
        </div>

        {/* Arrow */}
        <ArrowRight
          size={14}
          className="shrink-0 mt-1 text-fg-4 group-hover:text-violet-bright group-hover:translate-x-0.5 transition-all"
        />
      </a>
    </motion.div>
  );
}
