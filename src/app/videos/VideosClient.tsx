"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink, Search, Clock, ArrowLeft } from "lucide-react";
import { YOUTUBE_VIDEOS, type YouTubeVideo } from "@/lib/videoData";
import { BASE_PATH } from "@/lib/constants";

const ALL_TAGS = Array.from(new Set(YOUTUBE_VIDEOS.flatMap(v => v.tags))).sort();

const TAG_GROUPS = [
  { label: "Foundational", tags: ["LLM", "Neural Networks", "Transformer", "Backpropagation", "Attention", "Fundamentals"] },
  { label: "Industry", tags: ["AI market", "IPO", "policy", "podcast", "2026", "Keynote"] },
  { label: "Hands-on", tags: ["Code", "Hands-on", "PyTorch", "Practical", "DAX"] },
  { label: "Products", tags: ["Gemini", "AI Agents", "Anthropic", "OpenAI", "Google I/O"] },
];

function VideoModal({ video, onClose }: { video: YouTubeVideo; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        aria-modal="true"
        role="dialog"
        aria-label={video.title}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-abyss rounded-2xl border border-white/[0.08] overflow-hidden shadow-sh-3"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-fg-3 hover:text-fg-1 transition-colors"
            aria-label="Close video"
          >
            <X size={15} />
          </button>

          {/* Embed */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Meta */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] text-violet-bright tracking-[0.12em] uppercase mb-1">
                  {video.channel}
                  {video.duration && <span className="text-fg-4 ml-2">· {video.duration}</span>}
                  {video.year && <span className="text-fg-4 ml-2">· {video.year}</span>}
                </p>
                <h2 className="font-serif text-[18px] text-fg-1 leading-[1.25] mb-2">{video.title}</h2>
                <p className="font-sans text-[13px] text-fg-3 leading-[1.55]">{video.summary}</p>
              </div>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase text-fg-4 hover:text-violet-bright transition-colors"
              >
                YouTube <ExternalLink size={10} />
              </a>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {video.tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.08em] uppercase px-2 py-0.5 rounded-full bg-violet/[0.10] border border-violet/[0.20] text-fg-3"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function VideoCard({ video, onPlay }: { video: YouTubeVideo; onPlay: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl border border-white/[0.07] bg-white/[0.015] overflow-hidden hover:border-white/[0.14] transition-all duration-200"
    >
      {/* Thumbnail */}
      <div
        className="relative w-full cursor-pointer overflow-hidden"
        style={{ paddingBottom: "56.25%" }}
        onClick={onPlay}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPlay(); }
        }}
        aria-label={`Play ${video.title}`}
      >
        <img
          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
          alt={video.title}
          width={320}
          height={180}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-violet/90 shadow-glow">
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
        {/* Duration badge */}
        {video.duration && (
          <span className="absolute bottom-2 right-2 font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/70 text-white/80 flex items-center gap-1">
            <Clock size={8} /> {video.duration}
          </span>
        )}
        {/* Year badge */}
        {video.year && (
          <span className="absolute top-2 left-2 font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/70 text-white/60">
            {video.year}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-violet-bright mb-1">{video.channel}</p>
        <h3
          className="font-serif text-[15px] text-fg-1 leading-[1.3] mb-2 cursor-pointer hover:text-white transition-colors line-clamp-2"
          onClick={onPlay}
        >
          {video.title}
        </h3>
        <p className="font-sans text-[12px] text-fg-4 leading-[1.5] line-clamp-2 mb-3">{video.summary}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {video.tags.slice(0, 3).map(tag => (
            <span key={tag} className="font-mono text-[8px] tracking-[0.06em] uppercase px-1.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-fg-4">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function VideosClient() {
  const [search, setSearch]     = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [playing, setPlaying]   = useState<YouTubeVideo | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return YOUTUBE_VIDEOS.filter(v => {
      const matchTag = !activeTag || v.tags.includes(activeTag);
      const matchQ   = !q || v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q) || v.tags.some(t => t.toLowerCase().includes(q));
      return matchTag && matchQ;
    });
  }, [search, activeTag]);

  return (
    <div className="min-h-screen bg-abyss">
      {/* Ambient */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #F08CA8, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-8">
        {/* Back */}
        <div className="pt-10 pb-6">
          <a href={`${BASE_PATH}/`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Sintra
          </a>
        </div>

        {/* Hero */}
        <motion.header className="pt-4 pb-10 border-b border-violet/[0.10]"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex gap-3.5 items-center mb-5">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="eyebrow violet">Video Library</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(36px,5.5vw,72px)] leading-[1.04] tracking-[-0.025em] text-fg-1 mb-4">
            Learn AI by{" "}
            <em className="italic" style={{
              backgroundImage: "linear-gradient(180deg, #F4F2EA 0%, #F08CA8 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>watching.</em>
          </h1>
          <p className="font-sans text-[16px] text-fg-2 max-w-2xl leading-[1.55]">
            {YOUTUBE_VIDEOS.length} curated talks, tutorials, and keynotes — from Karpathy building GPT from scratch to the Google I/O 2026 announcements that defined the year.
          </p>
        </motion.header>

        {/* Filters */}
        <div className="py-6 border-b border-hairline/40">
          {/* Search */}
          <div className="relative mb-4 max-w-sm">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${YOUTUBE_VIDEOS.length} videos…`}
              className="w-full bg-white/[0.04] border border-hairline rounded-lg pl-8 pr-3 py-2 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/50 transition-colors"
            />
          </div>

          {/* Tag groups */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveTag(null)}
              className="font-mono text-[10px] tracking-[0.06em] px-3 py-1.5 rounded-full border transition-all"
              style={{
                background: !activeTag ? "#9F8CFF22" : "transparent",
                borderColor: !activeTag ? "#9F8CFF88" : "#ffffff18",
                color: !activeTag ? "#B6A6FF" : "#6b6a8a",
              }}
            >
              All
            </button>
            {TAG_GROUPS.map(group => (
              <span key={group.label} className="flex items-center gap-1">
                <span className="font-mono text-[9px] text-fg-4 px-1">{group.label}:</span>
                {group.tags.filter(t => ALL_TAGS.includes(t)).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className="font-mono text-[10px] tracking-[0.06em] px-2.5 py-1 rounded-full border transition-all"
                    style={{
                      background: activeTag === tag ? "#9F8CFF22" : "transparent",
                      borderColor: activeTag === tag ? "#9F8CFF88" : "#ffffff18",
                      color: activeTag === tag ? "#B6A6FF" : "#6b6a8a",
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="py-10">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-mono text-[13px] text-fg-4">No videos match.</p>
              <button onClick={() => { setSearch(""); setActiveTag(null); }}
                className="mt-3 font-mono text-[11px] text-violet-bright hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <p className="font-mono text-[11px] text-fg-4 mb-6">
                {filtered.length} video{filtered.length !== 1 ? "s" : ""}
                {activeTag && <span className="text-fg-3"> · {activeTag}</span>}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(v => (
                  <VideoCard key={v.id} video={v} onPlay={() => setPlaying(v)} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {playing && <VideoModal video={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
}
