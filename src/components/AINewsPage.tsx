"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { NEWS_ITEMS, NEWS_TAGS, type NewsItem } from "@/lib/newsData";
import { BASE_PATH } from "@/lib/data";

const SIG_STYLE = {
  landmark: { label: "Landmark",  bg: "#9F8CFF22", border: "#9F8CFF66", text: "#B6A6FF" },
  major:    { label: "Major",     bg: "#5EEAD422", border: "#5EEAD466", text: "#5EEAD4" },
  notable:  { label: "Notable",   bg: "#ffffff0a", border: "#ffffff22", text: "#8b8aad"  },
};

function NewsCard({ item }: { item: NewsItem }) {
  const sig = SIG_STYLE[item.significance];
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-5 py-7 border-b border-hairline/60 last:border-0"
    >
      {/* Left: date + significance */}
      <div className="w-[96px] shrink-0 pt-0.5">
        <p className="font-mono text-[11px] text-fg-4 mb-2">
          {item.dateDay ? `${item.dateDay} ${item.date}` : item.date}
        </p>
        <span className="inline-flex font-mono text-[9px] tracking-[0.10em] uppercase px-2 py-0.5 rounded-full border"
          style={{ background: sig.bg, borderColor: sig.border, color: sig.text }}>
          {sig.label}
        </span>
      </div>

      {/* Right: content */}
      <div className="flex-1 min-w-0">
        {/* Provider tag */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.providerColor }} />
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: item.providerColor }}>
            {item.provider}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-[18px] md:text-[22px] leading-[1.2] tracking-[-0.01em] text-fg-1 mb-3">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="font-sans text-[14px] leading-[1.65] text-fg-2 mb-4">{item.summary}</p>

        {/* Footer: tags + source link */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-1.5 flex-1">
            {item.tags.map(tag => (
              <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-violet/[0.08] text-fg-3 border border-violet/[0.12]">
                {tag}
              </span>
            ))}
          </div>
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

export default function AINewsPage() {
  const [activeSig, setActiveSig]     = useState<string>("all");
  const [activeTag, setActiveTag]     = useState<string>("all");
  const [activeProvider, setProvider] = useState<string>("all");

  const providers = useMemo(() => {
    const ps = [...new Set(NEWS_ITEMS.map((n: NewsItem) => n.provider))].sort();
    return ps;
  }, []);

  const filtered = useMemo(() => {
    return NEWS_ITEMS
      .filter((n: NewsItem) => activeSig === "all" || n.significance === activeSig)
      .filter((n: NewsItem) => activeTag === "all" || n.tags.includes(activeTag))
      .filter((n: NewsItem) => activeProvider === "all" || n.provider === activeProvider)
      .sort((a: NewsItem, b: NewsItem) => {
        if (b.dateNum !== a.dateNum) return b.dateNum - a.dateNum;
        return (b.dateDay ?? 1) - (a.dateDay ?? 1);
      });
  }, [activeSig, activeTag, activeProvider]);

  // Group by year for visual breaks
  const grouped = useMemo(() => {
    const groups: Record<string, NewsItem[]> = {};
    filtered.forEach((item: NewsItem) => {
      const year = String(item.dateNum).slice(0, 4);
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
    });
    return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-abyss text-fg-1">
      {/* Ambient */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #9F8CFF, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[860px] mx-auto px-6 md:px-8">
        {/* Back */}
        <div className="pt-10 pb-6">
          <a href={`${BASE_PATH}/`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Sintra
          </a>
        </div>

        {/* Hero */}
        <motion.header className="pt-6 pb-12 border-b border-violet/[0.12]"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex gap-3.5 items-center mb-6">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="eyebrow violet">AI Intelligence</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(40px,6vw,80px)] leading-[1.04] tracking-[-0.025em] text-fg-1 mb-5">
            The AI{" "}
            <em className="italic" style={{
              backgroundImage: "linear-gradient(180deg, #F4F2EA 0%, #9F8CFF 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>digest.</em>
          </h1>
          <p className="font-sans text-[17px] text-fg-2 max-w-xl leading-[1.55]">
            Landmark releases, model launches, and paradigm shifts — curated for signal, not noise.
          </p>
          <div className="flex items-center gap-4 mt-6 font-mono text-[11px] text-fg-3 tracking-[0.06em]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-bright" />
              {NEWS_ITEMS.length} events documented
            </span>
            <span className="text-fg-4">·</span>
            <span>2023 – present</span>
          </div>
        </motion.header>

        {/* Filters */}
        <div className="sticky top-16 z-40 bg-abyss/95 backdrop-blur-md border-b border-violet/[0.08] py-3 -mx-6 md:-mx-8 px-6 md:px-8">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Significance */}
            <div className="flex gap-1.5">
              {(["all", "landmark", "major", "notable"] as const).map(s => (
                <button key={s} onClick={() => setActiveSig(s)}
                  className="font-mono text-[10px] tracking-[0.06em] px-2.5 py-1 rounded-full border transition-all capitalize"
                  style={{
                    background:  activeSig === s ? "#9F8CFF22" : "transparent",
                    borderColor: activeSig === s ? "#9F8CFF88" : "#ffffff18",
                    color:       activeSig === s ? "#B6A6FF"   : "#6b6a8a",
                  }}>
                  {s === "all" ? "All" : SIG_STYLE[s].label}
                </button>
              ))}
            </div>

            {/* Provider filter */}
            <select
              value={activeProvider}
              onChange={e => setProvider(e.target.value)}
              className="font-mono text-[11px] bg-white/[0.04] border border-hairline rounded-lg px-3 py-1.5 text-fg-2 outline-none focus:border-violet/60 transition-colors"
            >
              <option value="all">All providers</option>
              {providers.map((p: string) => <option key={p} value={p}>{p}</option>)}
            </select>

            {filtered.length !== NEWS_ITEMS.length && (
              <span className="font-mono text-[11px] text-fg-4 ml-auto">{filtered.length} events</span>
            )}
          </div>
        </div>

        {/* News feed */}
        <div className="pt-6 pb-24">
          {grouped.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-[22px] text-fg-3">No events match this filter.</p>
            </div>
          ) : (
            grouped.map(([year, items]) => (
              <div key={year}>
                <div className="flex items-center gap-4 py-5">
                  <span className="font-mono text-[13px] font-medium text-fg-3 tracking-[0.08em]">{year}</span>
                  <div className="flex-1 h-px bg-violet/[0.12]" />
                  <span className="font-mono text-[11px] text-fg-4">{items.length} events</span>
                </div>
                {items.map(item => <NewsCard key={item.id} item={item} />)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
