"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Share2, Check } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import { tagToTopicSlug } from "@/lib/topicHubs";
import { relativeDate } from "@/lib/dateUtils";
import type { NewsItem } from "@/lib/newsData";

export const SIG_STYLE = {
  landmark: { label: "Landmark",  bg: "#9F8CFF22", border: "#9F8CFF66", text: "#B6A6FF" },
  major:    { label: "Major",     bg: "#5EEAD422", border: "#5EEAD466", text: "#5EEAD4" },
  notable:  { label: "Notable",   bg: "#ffffff0a", border: "#ffffff22", text: "#8b8aad"  },
};

/** ISO date for an item, derived from dateNum (YYYYMM) + optional dateDay. */
function itemIso(item: NewsItem): string {
  const year = Math.floor(item.dateNum / 100);
  const month = item.dateNum % 100;
  const day = item.dateDay ?? 1;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function NewsCard({ item, onTagFilter, isNew }: { item: NewsItem; onTagFilter?: (tag: string) => void; isNew?: boolean }) {
  const sig = SIG_STYLE[item.significance];
  const [shared, setShared] = useState(false);
  // Relative time is computed after mount to avoid a hydration mismatch
  // (the server has no stable "now"); falls back to the absolute date.
  const [rel, setRel] = useState<string | null>(null);
  useEffect(() => {
    const days = Math.floor((Date.now() - new Date(itemIso(item)).getTime()) / 86_400_000);
    if (days >= 0 && days < 30) setRel(relativeDate(itemIso(item)));
  }, [item]);

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${item.id}`;
    const text = item.title;
    if (typeof navigator.share === "function") {
      try { await navigator.share({ title: item.title, text, url }); return; } catch { /* cancelled */ }
    }
    try { await navigator.clipboard?.writeText(url); } catch { /* ignore */ }
    setShared(true);
    setTimeout(() => setShared(false), 1600);
  };

  return (
    <motion.article
      id={item.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-5 py-7 border-b border-hairline/60 last:border-0 scroll-mt-24"
    >
      {/* Left: date + significance */}
      <div className="w-[96px] shrink-0 pt-0.5">
        <p className="font-mono text-[11px] text-fg-4 mb-0.5">
          {item.dateDay ? `${item.dateDay} ${item.date}` : item.date}
        </p>
        {rel && <p className="font-mono text-[10px] text-fg-4/70 mb-1.5">{rel}</p>}
        <div className="flex flex-col items-start gap-1.5">
          {isNew && (
            <span className="inline-flex font-mono text-[9px] tracking-[0.10em] uppercase px-2 py-0.5 rounded-full border border-amber-400/50 bg-amber-400/10 text-amber-300">
              New
            </span>
          )}
          <span className="inline-flex font-mono text-[9px] tracking-[0.10em] uppercase px-2 py-0.5 rounded-full border"
            style={{ background: sig.bg, borderColor: sig.border, color: sig.text }}>
            {sig.label}
          </span>
        </div>
      </div>

      {/* Right: content */}
      <div className="flex-1 min-w-0">
        {/* Provider tag + country flag */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.providerColor }} />
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: item.providerColor }}>
            {item.provider}
          </span>
          {item.country === "BR" && (
            <span title="Brazil" className="text-[13px] leading-none" aria-label="Brazil">🇧🇷</span>
          )}
          {item.country === "SE" && (
            <span title="Sweden" className="text-[13px] leading-none" aria-label="Sweden">🇸🇪</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif font-medium text-[18px] md:text-[22px] leading-[1.2] tracking-[-0.01em] text-fg-1 mb-3">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="font-sans text-[14px] leading-[1.65] text-fg-2 mb-4">{item.summary}</p>

        {/* Why it matters + What to try */}
        {(item.why_it_matters || item.what_to_try) && (
          <div className="flex flex-col gap-2 mb-4 rounded-lg border border-violet/[0.14] bg-violet/[0.04] px-4 py-3">
            {item.why_it_matters && (
              <p className="font-sans text-[13px] leading-[1.55] text-fg-2">
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-violet-bright mr-2">Why it matters</span>
                {item.why_it_matters}
              </p>
            )}
            {item.what_to_try && (
              <p className="font-sans text-[13px] leading-[1.55] text-fg-2">
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-cyan-ice mr-2">Try it</span>
                {item.what_to_try}
              </p>
            )}
          </div>
        )}

        {/* Footer: tags + source link */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-1.5 flex-1">
            {item.tags.map(tag => {
              const topicSlug = tagToTopicSlug(tag);
              if (topicSlug) {
                return (
                  <a
                    key={tag}
                    href={`${BASE_PATH}/topics/${topicSlug}/`}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-violet/[0.08] text-fg-3 border border-violet/[0.12] hover:text-violet-bright hover:border-violet/40 transition-colors"
                  >
                    {tag}
                  </a>
                );
              }
              if (onTagFilter) {
                return (
                  <button
                    key={tag}
                    onClick={() => onTagFilter(tag)}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-violet/[0.08] text-fg-3 border border-violet/[0.12] hover:text-fg-1 hover:border-white/25 transition-colors"
                  >
                    {tag}
                  </button>
                );
              }
              return (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-violet/[0.08] text-fg-3 border border-violet/[0.12]"
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <button
            onClick={share}
            title="Share this story"
            aria-label="Share this story"
            className="shrink-0 inline-flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1.5 rounded-md border border-white/[0.1] text-fg-4 hover:text-fg-1 hover:border-white/25 transition-all duration-150"
          >
            {shared ? <><Check size={11} /> Link copied</> : <><Share2 size={11} /> Share</>}
          </button>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 font-mono text-[11px] font-medium px-3 py-1.5 rounded-md bg-violet/10 border border-violet/30 text-violet-bright hover:bg-violet/20 hover:border-violet/60 transition-all duration-150"
            >
              Read source <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
