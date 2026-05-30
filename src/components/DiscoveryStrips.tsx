"use client";

import { ExternalLink, ArrowRight, Clock } from "lucide-react";
import { AI_NEWS } from "@/lib/newsData";
import { LEARNING_PATHS } from "@/lib/learningPathsData";
import { BASE_PATH } from "@/lib/data";

const SIG_COLOR: Record<string, string> = {
  landmark: "#B6A6FF",
  major:    "#5EEAD4",
  notable:  "#6b6a8a",
};

const LEVEL_COLOR: Record<string, string> = {
  beginner:     "#10b981",
  intermediate: "#9F8CFF",
  advanced:     "#ef4444",
};

// Top 3 most recent news
const RECENT_NEWS = [...AI_NEWS]
  .sort((a, b) => {
    if (b.dateNum !== a.dateNum) return b.dateNum - a.dateNum;
    return (b.dateDay ?? 1) - (a.dateDay ?? 1);
  })
  .slice(0, 3);

// First 2 learning paths
const FEATURED_PATHS = LEARNING_PATHS.slice(0, 2);

export default function DiscoveryStrips() {
  return (
    <div className="bg-void border-t border-violet/[0.08]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

        {/* ── Latest in AI ─────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-bright animate-pulse" />
              <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-violet-bright">Latest in AI</h2>
            </div>
            <a
              href={`${BASE_PATH}/news/`}
              className="inline-flex items-center gap-1 font-mono text-[11px] text-fg-4 hover:text-violet-bright transition-colors group"
            >
              View all <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="flex flex-col gap-0">
            {RECENT_NEWS.map((item, i) => (
              <a
                key={item.id}
                href={item.url ?? `${BASE_PATH}/news/`}
                target={item.url ? "_blank" : undefined}
                rel={item.url ? "noopener noreferrer" : undefined}
                className={[
                  "group flex gap-4 py-4 transition-all hover:bg-white/[0.02] -mx-3 px-3 rounded-lg",
                  i < RECENT_NEWS.length - 1 ? "border-b border-hairline/40" : "",
                ].join(" ")}
              >
                {/* Date column */}
                <div className="w-16 shrink-0 pt-0.5">
                  <p className="font-mono text-[10px] text-fg-4 leading-none">
                    {item.dateDay ? `${item.dateDay} ${item.date.replace(/\d{4}/, "").trim()}` : item.date}
                  </p>
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2"
                    style={{ background: item.providerColor }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span
                    className="font-mono text-[9px] tracking-[0.10em] uppercase mb-1 block"
                    style={{ color: SIG_COLOR[item.significance] }}
                  >
                    {item.significance}
                  </span>
                  <h3 className="font-serif text-[15px] leading-[1.25] text-fg-1 group-hover:text-white transition-colors line-clamp-2">
                    {item.country === "BR" && <span title="Brazil" className="mr-1.5 text-[11px]">🇧🇷</span>}
                    {item.title}
                  </h3>
                </div>

                {item.url && (
                  <ExternalLink size={11} className="text-fg-4 group-hover:text-fg-2 transition-colors shrink-0 mt-1" />
                )}
              </a>
            ))}
          </div>
        </section>

        {/* ── Start Learning ───────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-green-400">Start Learning</h2>
            </div>
            <a
              href={`${BASE_PATH}/learn/`}
              className="inline-flex items-center gap-1 font-mono text-[11px] text-fg-4 hover:text-green-400 transition-colors group"
            >
              All paths <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="flex flex-col gap-3">
            {FEATURED_PATHS.map(path => (
              <a
                key={path.id}
                href={`${BASE_PATH}/learn/`}
                className="group flex gap-4 p-4 rounded-xl border transition-all hover:scale-[1.01] bg-[#0d0a1c]"
                style={{ borderColor: path.color + "28" }}
              >
                <span className="text-3xl leading-none mt-0.5 shrink-0">{path.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-[16px] text-fg-1 group-hover:text-white transition-colors leading-none">
                      {path.title}
                    </h3>
                    <span
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded-full border uppercase tracking-[0.08em]"
                      style={{ color: LEVEL_COLOR[path.level], borderColor: LEVEL_COLOR[path.level] + "44", background: LEVEL_COLOR[path.level] + "12" }}
                    >
                      {path.level}
                    </span>
                  </div>
                  <p className="font-sans text-[12px] text-fg-3 leading-[1.45] line-clamp-2 mb-2">{path.tagline}</p>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-fg-4">
                    <Clock size={10} />
                    <span>{path.totalDuration}</span>
                    <span className="text-fg-4">·</span>
                    <span>{path.steps.length} steps</span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-fg-4 group-hover:text-fg-2 transition-colors shrink-0 mt-1 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
