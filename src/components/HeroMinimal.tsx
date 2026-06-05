"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  total: number;
}

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

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : line;

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-14 pb-16 md:pt-20 md:pb-20 overflow-hidden bg-void">

      {/* Violet bloom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(159,140,255,0.13) 0%, transparent 70%)",
        }}
      />

      {/* Fade bridge into content below */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(10,10,20,0.6))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl mx-auto">

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
              backgroundImage: "linear-gradient(150deg, #E8E4FA 0%, #B6A6FF 50%, #9F8CFF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI
          </em>
          ry
        </motion.h1>

        {/* Subtitle — more purposeful */}
        <motion.p
          custom={2} variants={variants} initial="hidden" animate="show"
          className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg-4"
        >
          {total.toLocaleString()} prompts · news · tools · models · research
        </motion.p>

      </div>
    </section>
  );
}
