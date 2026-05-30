"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { USE_CASES, BASE_PATH } from "@/lib/data";
import { AI_NEWS } from "@/lib/newsData";
import { AI_TOOLS } from "@/lib/toolsData";
import { CONCEPTS } from "@/lib/concepts";
import { LEARNING_PATHS } from "@/lib/learningPathsData";
import { RESOURCES } from "@/lib/resourcesData";
import { MILESTONES } from "@/lib/timelineData";
import { TOPIC_HUBS } from "@/lib/topicsData";
import { AI_MODELS } from "@/lib/modelsData";

const ITEMS = [
  {
    id: "prompts",
    label: "Prompts",
    tagline: "Copy-ready AI templates for every workflow",
    color: "#9F8CFF",
    symbol: "✦",
    anchor: "#explore",
    internal: true,
  },
  {
    id: "news",
    label: "AI News",
    tagline: "Curated global timeline of what matters",
    color: "#6EE7A0",
    symbol: "◈",
    anchor: `${BASE_PATH}/news/`,
    internal: false,
  },
  {
    id: "tools",
    label: "Tools",
    tagline: "Searchable directory of AI tools & pricing",
    color: "#8FE3D2",
    symbol: "⬡",
    anchor: `${BASE_PATH}/tools/`,
    internal: false,
  },
  {
    id: "concepts",
    label: "Concepts",
    tagline: "Plain-English explanations, filterable by level",
    color: "#F4D06F",
    symbol: "◇",
    anchor: `${BASE_PATH}/concepts/`,
    internal: false,
  },
  {
    id: "learn",
    label: "Learn",
    tagline: "Structured paths from beginner to advanced",
    color: "#E8C089",
    symbol: "△",
    anchor: `${BASE_PATH}/learn/`,
    internal: false,
  },
  {
    id: "history",
    label: "AI History",
    tagline: "Interactive timeline of 70 years of AI",
    color: "#F08CA8",
    symbol: "◎",
    anchor: `${BASE_PATH}/ai-history/`,
    internal: false,
  },
  {
    id: "resources",
    label: "Resources",
    tagline: "APIs, frameworks, datasets, and videos",
    color: "#B6A6FF",
    symbol: "⊞",
    anchor: `${BASE_PATH}/resources/`,
    internal: false,
  },
  {
    id: "topics",
    label: "Topics",
    tagline: "Cross-silo views by theme — agents, coding, safety…",
    color: "#FDA4AF",
    symbol: "◈",
    anchor: `${BASE_PATH}/topics/`,
    internal: false,
  },
  {
    id: "models",
    label: "Models",
    tagline: "Pricing, benchmarks & capabilities side-by-side",
    color: "#E879F9",
    symbol: "◎",
    anchor: `${BASE_PATH}/models/`,
    internal: false,
  },
] as const;

function getCount(id: string, counts: Record<string, number>) {
  return counts[id] ?? 0;
}

export default function SiteHub() {
  const counts = useMemo(() => ({
    prompts:  USE_CASES.length,
    news:     AI_NEWS.length,
    tools:    AI_TOOLS.length,
    concepts: CONCEPTS.length,
    learn:    LEARNING_PATHS.length,
    history:  MILESTONES.length,
    resources: RESOURCES.length,
    topics:   TOPIC_HUBS.length,
    models:   AI_MODELS.length,
  }), []);

  return (
    <section className="w-full max-w-[1100px] mx-auto px-6 md:px-8 py-14 md:py-20">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-4">Everything in one place</span>
        <span className="flex-1 h-px bg-hairline" />
      </div>

      {/* Hub grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-3">
        {ITEMS.map((item, i) => {
          const count = getCount(item.id, counts);
          return (
            <motion.a
              key={item.id}
              href={item.anchor}
              onClick={item.internal ? (e) => {
                e.preventDefault();
                document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
              } : undefined}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.025]"
              style={{
                background: "rgba(255,255,255,0.018)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = item.color + "50";
                el.style.background = item.color + "0d";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.background = "rgba(255,255,255,0.018)";
              }}
            >
              {/* Symbol + count */}
              <div className="flex items-start justify-between gap-1">
                <span
                  className="font-mono text-[18px] leading-none opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ color: item.color }}
                >
                  {item.symbol}
                </span>
                <span
                  className="font-mono text-[11px] font-bold tabular-nums leading-none mt-0.5"
                  style={{ color: item.color }}
                >
                  {count}
                </span>
              </div>

              {/* Label */}
              <div>
                <p className="font-serif text-[14px] text-fg-1 leading-tight mb-1 group-hover:text-white transition-colors">
                  {item.label}
                </p>
                <p className="font-sans text-[11px] text-fg-4 leading-[1.4] line-clamp-2">
                  {item.tagline}
                </p>
              </div>

              {/* Arrow */}
              <div className="mt-auto flex items-center gap-1 font-mono text-[10px] text-fg-4 group-hover:text-fg-2 transition-colors">
                <span>Explore</span>
                <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
