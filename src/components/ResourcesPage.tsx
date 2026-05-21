"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Search, Play } from "lucide-react";
import { RESOURCES, RESOURCE_CATEGORIES, type ResourceLink, type ResourceCategory } from "@/lib/resourcesData";
import { YOUTUBE_VIDEOS, type YouTubeVideo } from "@/lib/videoData";
import { BASE_PATH } from "@/lib/data";

function VideoCard({ video }: { video: YouTubeVideo }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl overflow-hidden border border-white/[0.08] hover:border-violet/30 transition-all duration-200 hover:scale-[1.015] bg-[#0d0a1c]"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play size={18} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
        {video.duration && (
          <span className="absolute bottom-2 right-2 font-mono text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-2 p-3.5 flex-1">
        <div>
          <h3 className="font-serif text-[14px] text-fg-1 leading-[1.3] group-hover:text-white transition-colors line-clamp-2">
            {video.title}
          </h3>
          <p className="font-mono text-[10px] text-violet-bright/70 mt-1">{video.channel}</p>
        </div>
        <p className="font-sans text-[12px] text-fg-3 leading-[1.5] line-clamp-3 flex-1">
          {video.summary}
        </p>
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-hairline/40">
          {video.tags.slice(0, 3).map(tag => (
            <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm bg-violet/[0.06] text-fg-4 border border-violet/[0.10]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function ResourceCard({ res }: { res: ResourceLink }) {
  const cat = RESOURCE_CATEGORIES.find(c => c.id === res.category)!;
  return (
    <a
      href={res.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-xl border p-4 transition-all duration-200 hover:scale-[1.015] bg-[#0d0a1c]"
      style={{ borderColor: cat.color + "28" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h3 className="font-serif text-[15px] text-fg-1 leading-none group-hover:text-white transition-colors">
              {res.name}
            </h3>
            {res.free && (
              <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-full border border-green-500/40 text-green-400 bg-green-500/10 uppercase tracking-[0.08em]">Free</span>
            )}
          </div>
          <p className="font-sans text-[11px] text-fg-4 mt-0.5">{res.tagline}</p>
        </div>
        <ExternalLink size={12} className="text-fg-4 group-hover:text-fg-2 transition-colors shrink-0 mt-0.5" />
      </div>

      {res.highlight && (
        <p className="font-sans text-[12px] text-fg-3 leading-[1.5] line-clamp-2">{res.highlight}</p>
      )}

      <div className="flex items-center gap-2 flex-wrap mt-auto pt-2 border-t border-hairline/40">
        <span className="font-mono text-[9px]" style={{ color: cat.color }}>{cat.icon} {cat.label}</span>
        {res.tags.slice(0, 2).map(tag => (
          <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm bg-violet/[0.06] text-fg-4 border border-violet/[0.10]">
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    return RESOURCES.filter(r => {
      if (activeCategory !== "all" && r.category !== activeCategory) return false;
      if (freeOnly && !r.free) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!r.name.toLowerCase().includes(q) &&
            !r.tagline.toLowerCase().includes(q) &&
            !(r.highlight ?? "").toLowerCase().includes(q) &&
            !r.tags.some(t => t.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [activeCategory, search, freeOnly]);

  // Group filtered results by category when showing all
  const grouped = useMemo(() => {
    if (activeCategory !== "all" || search) {
      return [{ cat: null, items: filtered }];
    }
    return RESOURCE_CATEGORIES
      .map(cat => ({ cat, items: filtered.filter(r => r.category === cat.id) }))
      .filter(g => g.items.length > 0);
  }, [activeCategory, filtered, search]);

  return (
    <div className="min-h-screen bg-abyss text-fg-1">
      {/* Ambient */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #5EEAD4, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #9F8CFF, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Back */}
        <div className="pt-10 pb-6">
          <a href={`${BASE_PATH}/`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Sintra
          </a>
        </div>

        {/* Hero */}
        <motion.header className="pt-6 pb-16 border-b border-violet/[0.12]"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex gap-3.5 items-center mb-6">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="eyebrow violet">AI Ecosystem</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(40px,6vw,88px)] leading-[1.04] tracking-[-0.025em] text-fg-1 mb-5">
            Resources &{" "}
            <em className="italic" style={{
              backgroundImage: "linear-gradient(180deg, #F4F2EA 0%, #5EEAD4 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>links.</em>
          </h1>
          <p className="font-sans text-[17px] text-fg-2 max-w-xl leading-[1.55]">
            The full AI developer ecosystem in one place — APIs, frameworks, agents, vector stores, MCP servers, eval tools, communities, and research.
          </p>
          <div className="flex items-center gap-4 mt-8 font-mono text-[11px] text-fg-3 tracking-[0.06em]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {RESOURCES.length} resources curated
            </span>
            <span className="text-fg-4">·</span>
            <span>{RESOURCE_CATEGORIES.length} categories</span>
            <span className="text-fg-4">·</span>
            <span>{RESOURCES.filter(r => r.free).length} free</span>
          </div>
        </motion.header>

        {/* YouTube Videos section */}
        <section className="pt-14 pb-10 border-b border-violet/[0.08]">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-red-400">▶ YouTube</span>
            <div className="flex-1 h-px bg-red-400/20" />
            <span className="font-mono text-[10px] text-fg-4">{YOUTUBE_VIDEOS.length} videos</span>
          </div>
          <h2 className="font-serif font-light text-[clamp(22px,3vw,32px)] text-fg-1 mb-2">
            Video <em className="italic" style={{
              backgroundImage: "linear-gradient(160deg, #F4F2EA 0%, #9F8CFF 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Learning</em>
          </h2>
          <p className="font-sans text-[14px] text-fg-3 mb-8 max-w-xl">
            Curated AI education videos — from foundational neural network theory to hands-on LLM coding tutorials.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {YOUTUBE_VIDEOS.map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        </section>

        {/* Filters bar */}
        <div className="sticky top-16 z-40 bg-abyss/95 backdrop-blur-md border-b border-violet/[0.08] py-3 -mx-6 md:-mx-8 px-6 md:px-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search resources…"
                className="w-full bg-white/[0.04] border border-hairline rounded-lg pl-8 pr-3 py-1.5 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/60 transition-colors"
              />
            </div>
            <button
              onClick={() => setFreeOnly(f => !f)}
              className="font-mono text-[10px] tracking-[0.06em] px-2.5 py-1 rounded-full border transition-all"
              style={{
                background:  freeOnly ? "#10b98122" : "transparent",
                borderColor: freeOnly ? "#10b98188" : "#ffffff18",
                color:       freeOnly ? "#10b981" : "#6b6a8a",
              }}
            >
              Free only
            </button>
            {(search || freeOnly || activeCategory !== "all") && (
              <span className="font-mono text-[11px] text-fg-4 ml-auto">{filtered.length} results</span>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-6 border-b border-violet/[0.06]" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setActiveCategory("all")}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-mono text-[11px] tracking-[0.04em]"
            style={{
              background:  activeCategory === "all" ? "#9F8CFF22" : "transparent",
              borderColor: activeCategory === "all" ? "#9F8CFF88" : "#ffffff12",
              color:       activeCategory === "all" ? "#B6A6FF" : "#6b6a8a",
            }}
          >
            🌐 All
          </button>
          {RESOURCE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              title={cat.desc}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-mono text-[11px] tracking-[0.04em] whitespace-nowrap"
              style={{
                background:  activeCategory === cat.id ? cat.color + "22" : "transparent",
                borderColor: activeCategory === cat.id ? cat.color + "88" : "#ffffff12",
                color:       activeCategory === cat.id ? cat.color : "#6b6a8a",
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="py-10 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${search}-${freeOnly}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <p className="font-serif text-[22px] text-fg-3 mb-3">Nothing found</p>
                  <button onClick={() => { setSearch(""); setActiveCategory("all"); setFreeOnly(false); }}
                    className="font-mono text-[12px] text-violet-bright hover:underline">Clear filters</button>
                </div>
              ) : (
                grouped.map(({ cat, items }) => (
                  <div key={cat?.id ?? "all"} className="mb-12">
                    {cat && (
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: cat.color }}>
                          {cat.icon} {cat.label}
                        </span>
                        <div className="flex-1 h-px" style={{ background: cat.color + "22" }} />
                        <span className="font-mono text-[10px] text-fg-4">{items.length}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {items.map(res => <ResourceCard key={res.id} res={res} />)}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
