"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import NewsTicker from "./NewsTicker";

interface Props { total: number; }

const line = {
  hidden: { opacity: 0, y: 18 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroMinimal({ total }: Props) {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const bloomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax — moves bloom faster than content
  useEffect(() => {
    if (prefersReducedMotion) return;
    function onScroll() {
      const y = window.scrollY;
      if (bloomRef.current) {
        bloomRef.current.style.transform = `translateY(${y * 0.45}px)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.18}px)`;
        contentRef.current.style.opacity   = String(Math.max(0, 1 - y / 320));
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : line;

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-28 md:pt-32 md:pb-32 overflow-hidden bg-void min-h-[50vh]">

      {/* Violet bloom — parallaxes faster */}
      <div
        ref={bloomRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(159,140,255,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Fade bridge into content below */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--abyss))",
        }}
      />

      {/* Content — parallaxes slightly + fades on scroll */}
      <div ref={contentRef} className="relative z-10 w-full max-w-xl mx-auto will-change-transform">

        {/* Eyebrow */}
        <motion.div
          custom={0} variants={variants} initial="hidden" animate="show"
          className="flex items-center justify-center gap-3 mb-7"
        >
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet-bright" />
          <span className="eyebrow violet">{t.hero_eyebrow(total)}</span>
          <span className="w-6 h-px bg-gradient-to-l from-transparent to-violet-bright" />
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1} variants={variants} initial="hidden" animate="show"
          className="font-serif font-light text-[clamp(52px,9vw,96px)] leading-[1.0] tracking-[-0.03em] text-fg-1 mb-4"
        >
          libr
          <em
            className="italic not-italic"
            style={{
              backgroundImage: "linear-gradient(150deg, #E8E4FA 0%, var(--violet-bright) 50%, var(--violet) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI
          </em>
          ry
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2} variants={variants} initial="hidden" animate="show"
          className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg-4 mb-8"
        >
          {total.toLocaleString()} prompts · news · tools · models · research
        </motion.p>

        {/* CTA */}
        <motion.div custom={3} variants={variants} initial="hidden" animate="show">
          <a
            href="#library"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn"
          >
            {t.hero_cta}
          </a>
        </motion.div>

      </div>

      {/* News ticker pinned to bottom of hero */}
      <NewsTicker />
    </section>
  );
}
