"use client";

import { motion } from "framer-motion";
import TesseractMark from "./TesseractMark";

interface Props {
  total: number;
}

const line = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroMinimal({ total }: Props) {
  return (
    <section className="relative min-h-[52vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-void pt-24 pb-4">

      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(159,140,255,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Thin grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(159,140,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(159,140,255,0.06) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          custom={0} variants={line} initial="hidden" animate="show"
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-violet-bright" />
          <span className="eyebrow violet">{total} curated use cases</span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-violet-bright" />
        </motion.div>

        <motion.h1
          custom={1} variants={line} initial="hidden" animate="show"
          className="font-serif font-light text-[clamp(42px,7vw,100px)] leading-[1.03] tracking-[-0.025em] text-fg-1 mb-6"
        >
          Think with{" "}
          <em
            className="italic"
            style={{
              backgroundImage: "linear-gradient(160deg, #F4F2EA 0%, #B6A6FF 60%, #9F8CFF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 40px rgba(159,140,255,0.3))",
            }}
          >
            a machine.
          </em>
        </motion.h1>

        <motion.p
          custom={2} variants={line} initial="hidden" animate="show"
          className="font-sans text-[17px] leading-[1.6] text-fg-3 max-w-md mx-auto mb-10"
        >
          Pick a discipline below. Explore its use cases. Copy a prompt. Ship the work.
        </motion.p>

        <motion.div custom={3} variants={line} initial="hidden" animate="show">
          <a
            href="#explore"
            className="btn"
            onClick={e => {
              e.preventDefault();
              document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore disciplines →
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        custom={4} variants={line} initial="hidden" animate="show"
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.22em] uppercase text-fg-4"
      >
        <span>Scroll</span>
        <span className="w-px h-7 bg-gradient-to-b from-violet/50 to-transparent animate-cue-pulse" />
      </motion.div>
    </section>
  );
}
