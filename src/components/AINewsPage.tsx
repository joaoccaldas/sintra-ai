"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { CURRENT_MONTH_NEWS, CURRENT_MONTH_LABEL, ARCHIVE_MONTHS, getLatestNewsDate, type NewsItem } from "@/lib/newsData";
import { BASE_PATH } from "@/lib/constants";
import { NewsCard, SIG_STYLE } from "@/components/NewsCard";

type PresetId = "all" | "landmark" | "deals" | "policy" | "models" | "brazil" | "sweden";

const PRESETS: { id: PresetId; emoji: string; label: string; filter?: (n: NewsItem) => boolean }[] = [
  { id: "all",      emoji: "",   label: "All" },
  { id: "landmark", emoji: "🔥", label: "Landmark", filter: n => n.significance === "landmark" },
  { id: "deals",    emoji: "💰", label: "Deals",    filter: n => n.tags.some(t => ["Funding","IPO","Acquisition","Markets","Finance"].includes(t)) },
  { id: "policy",   emoji: "🏛", label: "Policy",   filter: n => n.tags.some(t => ["Policy","Regulation","AI Act","EU","Government","GDPR","LGPD"].includes(t)) },
  { id: "models",   emoji: "🤖", label: "Models",   filter: n => n.tags.some(t => ["Model Release","Benchmark","GPT","Claude","Gemini","Llama","Mistral","Reasoning"].includes(t)) },
  { id: "brazil",   emoji: "🇧🇷", label: "Brazil",  filter: n => n.country === "BR" },
  { id: "sweden",   emoji: "🇸🇪", label: "Sweden",  filter: n => n.country === "SE" },
];

export default function AINewsPage() {
  const [activeSig, setActiveSig] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    return new URLSearchParams(window.location.search).get("sig") || "all";
  });
  const [activeTag, setActiveTag] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    return new URLSearchParams(window.location.search).get("tag") || "all";
  });
  const [activeProvider, setProvider] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    return new URLSearchParams(window.location.search).get("provider") || "all";
  });
  const [brazilOnly, setBrazilOnly] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("brazil") === "1";
  });
  const [swedenOnly, setSwedenOnly] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("sweden") === "1";
  });
  const [search, setSearch] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") || "";
  });
  const [activePreset, setActivePreset] = useState<PresetId>(() => {
    if (typeof window === "undefined") return "all";
    return (new URLSearchParams(window.location.search).get("preset") || "all") as PresetId;
  });

  // "New since your last visit" — read the previous visit's watermark, then
  // bump it to the current latest item so only items added after this visit
  // are highlighted next time.
  const [lastVisitKey, setLastVisitKey] = useState<number | null>(null);
  useEffect(() => {
    const STORAGE_KEY = "sintra:news-last-visit";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setLastVisitKey(stored ? Number(stored) : null);
    const latestKey = Math.max(...CURRENT_MONTH_NEWS.map(n => n.dateNum * 100 + (n.dateDay ?? 1)));
    window.localStorage.setItem(STORAGE_KEY, String(latestKey));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activePreset   !== "all") params.set("preset",   activePreset);
    if (activeSig      !== "all") params.set("sig",      activeSig);
    if (activeTag      !== "all") params.set("tag",      activeTag);
    if (activeProvider !== "all") params.set("provider", activeProvider);
    if (brazilOnly)               params.set("brazil",   "1");
    if (swedenOnly)               params.set("sweden",   "1");
    if (search)                   params.set("q",        search);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [activePreset, activeSig, activeTag, activeProvider, brazilOnly, swedenOnly, search]);

  const providers = useMemo(() => {
    const ps = [...new Set(CURRENT_MONTH_NEWS.map((n: NewsItem) => n.provider))].sort();
    return ps;
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const preset = PRESETS.find(p => p.id === activePreset);
    return [...CURRENT_MONTH_NEWS]
      .filter((n: NewsItem) => !preset?.filter || preset.filter(n))
      .filter((n: NewsItem) => activeSig === "all" || n.significance === activeSig)
      .filter((n: NewsItem) => activeTag === "all" || n.tags.includes(activeTag))
      .filter((n: NewsItem) => activeProvider === "all" || n.provider === activeProvider)
      .filter((n: NewsItem) => !brazilOnly || n.country === "BR")
      .filter((n: NewsItem) => !swedenOnly || n.country === "SE")
      .filter((n: NewsItem) => {
        if (!q) return true;
        return n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.tags.some((t: string) => t.toLowerCase().includes(q)) ||
          n.provider.toLowerCase().includes(q);
      })
      .sort((a: NewsItem, b: NewsItem) => {
        if (b.dateNum !== a.dateNum) return b.dateNum - a.dateNum;
        return (b.dateDay ?? 1) - (a.dateDay ?? 1);
      });
  }, [activePreset, activeSig, activeTag, activeProvider, brazilOnly, swedenOnly, search]);

  // ── Pagination ──────────────────────────────────────────────────────────────
  const BATCH = 30;
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset when filter state changes
  useEffect(() => {
    setVisibleCount(BATCH);
  }, [filtered.length, activePreset, activeSig, activeTag, activeProvider, brazilOnly, swedenOnly, search]);

  // Slice the flat filtered array for the visible feed
  const visibleItems = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  const allLoaded = visibleCount >= filtered.length;

  // Set up / tear down IntersectionObserver on the sentinel
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (allLoaded || !sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount(c => Math.min(c + BATCH, filtered.length));
        }
      },
      { rootMargin: "200px" },
    );
    observerRef.current.observe(sentinelRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [allLoaded, filtered.length]);

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
          <div className="flex items-center gap-4 mt-6 font-mono text-[11px] text-fg-3 tracking-[0.06em] flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-bright" />
              {CURRENT_MONTH_NEWS.length} events this month
            </span>
            <span className="text-fg-4">·</span>
            <span>{CURRENT_MONTH_LABEL}</span>
            <span className="text-fg-4">·</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Updated {getLatestNewsDate()}
            </span>
            <span className="text-fg-4">·</span>
            <a href={`${BASE_PATH}/news/archive/`}
              className="inline-flex items-center gap-1 text-fg-3 hover:text-violet-bright transition-colors">
              Browse archive ({ARCHIVE_MONTHS.reduce((sum, m) => sum + m.count, 0)} earlier events)
              <ArrowRight size={11} />
            </a>
          </div>
        </motion.header>

        {/* Filters */}
        <div className="sticky top-16 z-40 bg-abyss/95 backdrop-blur-md border-b border-violet/[0.08] py-3 -mx-6 md:-mx-8 px-6 md:px-8">
          {/* Preset strip */}
          <div className="flex gap-1.5 overflow-x-auto pb-2.5 mb-2.5 scrollbar-none -mx-1 px-1">
            {PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePreset(p.id)}
                className="flex-shrink-0 font-mono text-[10px] tracking-[0.06em] px-3 py-1.5 rounded-full border transition-all whitespace-nowrap"
                style={{
                  background:  activePreset === p.id ? "#9F8CFF22" : "transparent",
                  borderColor: activePreset === p.id ? "#9F8CFF88" : "#ffffff18",
                  color:       activePreset === p.id ? "#B6A6FF"   : "#6b6a8a",
                }}
              >
                {p.emoji ? `${p.emoji} ${p.label}` : p.label}
              </button>
            ))}
          </div>
          {/* Search row */}
          <div className="relative mb-2.5">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events, models, companies…"
              className="w-full bg-white/[0.04] border border-hairline rounded-lg pl-8 pr-8 py-1.5 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/60 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-4 hover:text-fg-2 transition-colors" aria-label="Clear search">
                <X size={12} />
              </button>
            )}
          </div>
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

            {/* Brazil filter */}
            <button
              onClick={() => { setBrazilOnly(v => !v); setSwedenOnly(false); }}
              title={brazilOnly ? "Show all countries" : "Show Brazil news only"}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] px-2.5 py-1 rounded-full border transition-all"
              style={{
                background:  brazilOnly ? "#009c3b22" : "transparent",
                borderColor: brazilOnly ? "#009c3b88" : "#ffffff18",
                color:       brazilOnly ? "#4ade80"   : "#6b6a8a",
              }}
            >
              🇧🇷 Brazil
            </button>

            {/* Sweden filter */}
            <button
              onClick={() => { setSwedenOnly(v => !v); setBrazilOnly(false); }}
              title={swedenOnly ? "Show all countries" : "Show Sweden news only"}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] px-2.5 py-1 rounded-full border transition-all"
              style={{
                background:  swedenOnly ? "#006AA722" : "transparent",
                borderColor: swedenOnly ? "#006AA788" : "#ffffff18",
                color:       swedenOnly ? "#60a5fa"   : "#6b6a8a",
              }}
            >
              🇸🇪 Sweden
            </button>

            {(search || activePreset !== "all" || activeSig !== "all" || activeTag !== "all" || activeProvider !== "all" || brazilOnly || swedenOnly) && (
              <span className="font-mono text-[11px] text-fg-4 ml-auto">{filtered.length} events</span>
            )}
          </div>
        </div>

        {/* News feed */}
        <div className="pt-6 pb-24">
          {visibleItems.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-[22px] text-fg-3 mb-3">
                No events match this filter in {CURRENT_MONTH_LABEL}.
              </p>
              <p className="font-sans text-[13px] text-fg-4 mb-6">
                {search
                  ? <>&ldquo;{search}&rdquo; might be in an earlier month — </>
                  : <>This filter has no matches this month — </>}
                {ARCHIVE_MONTHS.reduce((sum, m) => sum + m.count, 0)} more events are archived.
              </p>
              <a href={`${BASE_PATH}/news/archive/`}
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.10em] uppercase px-4 py-2 rounded-full border border-violet/40 text-violet-bright hover:bg-violet/10 transition-colors">
                Search the archive <ArrowRight size={12} />
              </a>
            </div>
          ) : (
            <>
              {visibleItems.map(item => (
                <NewsCard
                  key={item.id}
                  item={item}
                  onTagFilter={tag => setActiveTag(tag)}
                  isNew={lastVisitKey !== null && (item.dateNum * 100 + (item.dateDay ?? 1)) > lastVisitKey}
                />
              ))}

              {/* Sentinel for IntersectionObserver */}
              {!allLoaded && (
                <div ref={sentinelRef} className="py-6 flex flex-col items-center gap-3">
                  {/* Pulsing loading line */}
                  <div className="w-32 h-px rounded-full bg-violet/40 animate-pulse" />
                </div>
              )}

              {/* Status line */}
              <div className="pt-4 pb-2 flex justify-center">
                <span className="font-mono text-[11px] text-fg-4 tracking-[0.06em]">
                  Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} events
                </span>
              </div>
            </>
          )}

          {/* Archive link */}
          <div className="pt-10 flex justify-center">
            <a href={`${BASE_PATH}/news/archive/`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.10em] uppercase px-4 py-2 rounded-full border border-violet/[0.18] text-fg-3 hover:text-violet-bright hover:border-violet/40 transition-colors">
              Browse older months <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
