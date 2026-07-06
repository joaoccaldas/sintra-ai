"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Radio } from "lucide-react";
import {
  LIVE_FEED,
  LIVE_ITEMS,
  LIVE_CATEGORIES,
  liveAge,
  liveFeedAgeHours,
  type LiveFeedItem,
} from "@/lib/liveFeedData";

/* Freshness label for the header badge. */
function freshnessLabel(): string {
  const h = liveFeedAgeHours();
  if (h <= 0) return "updated just now";
  if (h < 24) return `updated ${h}h ago`;
  return `updated ${Math.floor(h / 24)}d ago`;
}

function SourceDot({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ background: color, boxShadow: `0 0 8px ${color}66` }}
    />
  );
}

function FeedRow({ item, index, reduced }: { item: LiveFeedItem; index: number; reduced: boolean }) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.015] px-5 py-4 hover:border-violet/25 hover:bg-white/[0.035] transition-colors"
    >
      {/* meta row */}
      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.08em] uppercase text-fg-4">
        <SourceDot color={item.color} />
        <span className="text-fg-3">{item.source}</span>
        <span aria-hidden="true" className="opacity-40">·</span>
        <span>{item.category}</span>
        <span className="flex-1" />
        <time dateTime={item.publishedAt ?? undefined}>{liveAge(item.publishedAt)}</time>
      </div>

      {/* title */}
      <h3 className="text-[15px] md:text-[16px] leading-snug text-fg-1 group-hover:text-violet-bright transition-colors flex items-start gap-1.5">
        <span>{item.title}</span>
        <ArrowUpRight
          size={14}
          className="shrink-0 mt-1 text-fg-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
        />
      </h3>

      {/* summary */}
      {item.summary && (
        <p className="text-[13px] leading-relaxed text-fg-3 line-clamp-2">{item.summary}</p>
      )}
    </motion.a>
  );
}

export default function LiveFeedPage() {
  const reduced = useReducedMotion() ?? false;
  const [category, setCategory] = useState<string>("All");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: LIVE_ITEMS.length };
    for (const c of LIVE_CATEGORIES) map[c] = LIVE_ITEMS.filter((i) => i.category === c).length;
    return map;
  }, []);

  const items = useMemo(
    () => (category === "All" ? LIVE_ITEMS : LIVE_ITEMS.filter((i) => i.category === category)),
    [category]
  );

  const filters = ["All", ...LIVE_CATEGORIES];

  return (
    <div className="bg-void min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        {/* eyebrow / freshness */}
        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex h-2 w-2">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-violet-bright opacity-60 animate-ping" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-bright" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-violet-bright">Live</span>
          <span className="w-6 h-px bg-hairline" />
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-fg-4">{freshnessLabel()}</span>
        </div>

        {/* title */}
        <h1 className="font-serif font-light text-[clamp(38px,7vw,64px)] leading-[1.02] tracking-[-0.03em] text-fg-1 mb-4">
          The frontier, <em className="italic text-violet-bright">as it ships</em>
        </h1>
        <p className="text-[15px] md:text-[16px] leading-relaxed text-fg-3 max-w-xl mb-3">
          Every new post from {LIVE_FEED.sourceCount} primary AI sources — labs, research, and the
          highest-signal press — pulled fresh on every build. No editor in the loop, no algorithm,
          just the raw pulse of the field.
        </p>
        <p className="font-mono text-[11px] tracking-[0.06em] text-fg-4 mb-8">
          Aggregated from {LIVE_FEED.sources.join(" · ")}
        </p>

        {/* category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => {
            const active = f === category;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setCategory(f)}
                aria-pressed={active}
                className={[
                  "inline-flex items-center gap-1.5 h-8 px-3 rounded-full font-mono text-[11px] tracking-[0.04em] transition-all border",
                  active
                    ? "bg-violet/15 border-violet/40 text-violet-bright"
                    : "bg-white/[0.03] border-hairline text-fg-4 hover:text-fg-2 hover:border-violet/25",
                ].join(" ")}
              >
                {f}
                <span className="opacity-50">{counts[f] ?? 0}</span>
              </button>
            );
          })}
        </div>

        {/* feed */}
        {items.length === 0 ? (
          <div className="rounded-xl border border-hairline bg-white/[0.02] px-5 py-10 text-center">
            <Radio size={20} className="mx-auto mb-3 text-fg-4" />
            <p className="text-fg-3 text-sm">Nothing in this category right now. Try another, or check back after the next build.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <FeedRow key={item.id} item={item} index={i} reduced={reduced} />
            ))}
          </div>
        )}

        {/* footer note */}
        <p className="mt-10 font-mono text-[10px] tracking-[0.06em] text-fg-4 leading-relaxed">
          Links open on the source&apos;s own site. Sintra does not host or rehost their content — this
          is a reading list, refreshed automatically. Want the same in your reader?{" "}
          <a href="/sintra-ai/feed.xml" className="text-violet-bright hover:underline">
            Subscribe via RSS
          </a>
          .
        </p>
      </div>
    </div>
  );
}
