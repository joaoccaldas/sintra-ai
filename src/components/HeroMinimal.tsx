"use client";

import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

const ParticleVortex = dynamic(() => import("./ParticleVortex"), { ssr: false });

function useIsMobile() {
  return useSyncExternalStore(
    cb => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
}

interface Props {
  total: number;
  onSearch: (query: string) => void;
}

const line = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroMinimal({ total, onSearch }: Props) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
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
  const orbitOpacity = useTransform(scrollYProgress, [0, 0.50], [1, 0]);

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
      className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black"
    >
      {/* ── Background: particle vortex on desktop, clean gradient on mobile ── */}
      {!isMobile && !prefersReducedMotion ? (
        <>
          <motion.div
            aria-hidden="true"
            style={{ opacity: orbitOpacity }}
            className="absolute inset-0 pointer-events-none"
          >
            <ParticleVortex />
          </motion.div>
          {/* Vignette — darken edges so text stays readable */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 38%, rgba(0,0,0,0.62) 72%, rgba(0,0,0,0.96) 100%)",
            }}
          />
        </>
      ) : (
        /* Mobile / reduced-motion: simple atmospheric glow, no animation */
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 140% 55% at 50% 0%, rgba(159,140,255,0.13) 0%, transparent 65%), " +
              "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(159,140,255,0.06) 0%, transparent 60%)",
          }}
        />
      )}

      {/* ── Centre text-readability scrim (always) ───────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,0,0,0.32) 0%, transparent 100%)",
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
          className="font-serif font-light text-[clamp(44px,7.5vw,108px)] leading-[1.02] tracking-[-0.025em] text-fg-1 mb-2"
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
          custom={1.5} variants={lineVariants} initial="hidden" animate="show"
          className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-4 whitespace-nowrap"
        >
          Prompts · Tools · News · Models
        </motion.p>

        <motion.p
          custom={2} variants={lineVariants} initial="hidden" animate="show"
          className="font-sans text-[16px] leading-[1.6] text-fg-3 max-w-[380px] mx-auto mb-6"
        >
          {t.hero_tagline}
        </motion.p>

        {/* ── Hero search ────────────────────────────────────────────── */}
        <motion.div
          custom={3} variants={lineVariants} initial="hidden" animate="show"
          className="w-full max-w-sm mx-auto mb-5"
        >
          <form
            onSubmit={e => { e.preventDefault(); submit(query); }}
            className="relative"
          >
            <Search
              size={13}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-4 pointer-events-none"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search prompts, tools, news…"
              aria-label="Search all AI knowledge"
              className="w-full bg-white/[0.06] border border-hairline rounded-full pl-9 pr-4 py-2.5 font-mono text-[13px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/60 focus:bg-white/[0.08] transition-all"
            />
          </form>
        </motion.div>

        {/* ── Primary CTA ──────────────────────────────────────────────── */}
        <motion.div custom={4} variants={lineVariants} initial="hidden" animate="show">
          <a
            href="#explore"
            className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] text-violet-bright hover:text-fg-1 transition-colors"
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
        custom={5} variants={lineVariants} initial="hidden" animate="show"
        aria-hidden="true"
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.24em] uppercase text-fg-4"
      >
        <span>{t.hero_scroll}</span>
        <span className="w-px h-8 bg-gradient-to-b from-violet/50 to-transparent animate-cue-pulse" />
      </motion.div>

    </section>
  );
}
