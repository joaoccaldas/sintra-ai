"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

const Tesseract3D = dynamic(() => import("./Tesseract3D"), { ssr: false });

interface Props {
  total: number;
  onSearch: (query: string) => void;
}

const HERO_TASKS = [
  "variance analysis", "meeting notes", "Python script",
  "executive summary", "forecast model", "cold email",
];

const line = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroMinimal({ total, onSearch }: Props) {
  const { t } = useLanguage();
  const heroRef  = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textOpacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY        = useTransform(scrollYProgress, [0, 0.55], [0, -56]);
  const orbitScale   = useTransform(scrollYProgress, [0, 0.45], [1, 1.18]);
  const orbitOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;
    const delay = prefersReducedMotion ? 300 : 1500;
    const t = setTimeout(() => inputRef.current?.focus(), delay);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    document.getElementById("explore")?.scrollIntoView({ behavior: prefersReducedMotion ? "instant" : "smooth" } as ScrollIntoViewOptions);
  };

  const lineVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.15 } } }
    : line;

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-void"
    >
      {/* ── Tesseract hero orb ───────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? {} : { scale: orbitScale, opacity: orbitOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div style={{ width: "clamp(320px, 62vw, 620px)", height: "clamp(320px, 62vw, 620px)" }}>
          <Tesseract3D />
        </div>
      </motion.div>

      {/* ── Radial vignette ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 68% 68% at 50% 50%, transparent 28%, rgba(5,6,15,0.88) 76%, rgba(5,6,15,1) 100%)",
        }}
      />

      {/* ── Grid overlay ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(159,140,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(159,140,255,0.06) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      {/* ── Text + search content ─────────────────────────────────────── */}
      <motion.div
        style={prefersReducedMotion ? {} : { opacity: textOpacity, y: textY }}
        className="relative z-10 max-w-2xl mx-auto w-full"
      >
        <motion.div
          custom={0} variants={lineVariants} initial="hidden" animate="show"
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-violet-bright" />
          <span className="eyebrow violet">{t.hero_eyebrow(total)}</span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-violet-bright" />
        </motion.div>

        <motion.h1
          custom={1} variants={lineVariants} initial="hidden" animate="show"
          className="font-serif font-light text-[clamp(44px,7.5vw,108px)] leading-[1.02] tracking-[-0.025em] text-fg-1 mb-4"
        >
          libr
          <em
            className="italic"
            style={{
              backgroundImage: "linear-gradient(160deg, #F4F2EA 0%, #B6A6FF 55%, #9F8CFF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 48px rgba(159,140,255,0.35))",
            }}
          >
            AI
          </em>
          ry
        </motion.h1>

        <motion.p
          custom={2} variants={lineVariants} initial="hidden" animate="show"
          className="font-sans text-[17px] leading-[1.65] text-fg-3 max-w-[420px] mx-auto mb-5 whitespace-pre-line"
        >
          {t.hero_tagline}
        </motion.p>

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <motion.p
          custom={3} variants={lineVariants} initial="hidden" animate="show"
          className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-4 max-w-[380px] mx-auto mb-8"
        >
          {total} prompts &nbsp;·&nbsp; finance · data · code · writing &nbsp;·&nbsp; copy-ready
        </motion.p>

        {/* ── Hero search ────────────────────────────────────────────── */}
        <motion.div
          custom={4} variants={lineVariants} initial="hidden" animate="show"
          className="w-full max-w-md mx-auto mb-3"
        >
          <form
            onSubmit={e => { e.preventDefault(); submit(query); }}
            className="relative"
          >
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search prompts, tools, concepts, news…"
              aria-label="Search all AI knowledge"
              className="w-full bg-white/[0.06] border border-hairline rounded-xl pl-10 pr-24 py-3 font-mono text-[13px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/60 focus:bg-white/[0.08] transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-violet/20 border border-violet/40 font-mono text-[11px] text-violet-bright hover:bg-violet/30 hover:border-violet/70 transition-all"
            >
              Search
            </button>
          </form>
        </motion.div>

        {/* ── Popular task chips ────────────────────────────────────── */}
        <motion.div
          custom={5} variants={lineVariants} initial="hidden" animate="show"
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <span className="font-mono text-[10px] text-fg-4 tracking-[0.08em] uppercase self-center">Try:</span>
          {HERO_TASKS.map(task => (
            <button
              key={task}
              type="button"
              onClick={() => { setQuery(task); submit(task); }}
              className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/[0.1] text-fg-3 hover:text-fg-1 hover:border-violet/40 hover:bg-violet/[0.07] transition-all capitalize"
            >
              {task}
            </button>
          ))}
        </motion.div>

        {/* ── Primary CTA ──────────────────────────────────────────────── */}
        <motion.div custom={6} variants={lineVariants} initial="hidden" animate="show">
          <a
            href="#explore"
            className="btn"
            onClick={e => {
              e.preventDefault();
              document.getElementById("explore")?.scrollIntoView({ behavior: prefersReducedMotion ? "instant" : "smooth" } as ScrollIntoViewOptions);
            }}
          >
            {t.hero_cta}
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ───────────────────────────────────────────────── */}
      <motion.div
        custom={7} variants={lineVariants} initial="hidden" animate="show"
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.24em] uppercase text-fg-4"
      >
        <span>{t.hero_scroll}</span>
        <span className="w-px h-8 bg-gradient-to-b from-violet/50 to-transparent animate-cue-pulse" />
      </motion.div>
    </section>
  );
}
