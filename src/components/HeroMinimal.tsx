"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const Tesseract3D = dynamic(() => import("./Tesseract3D"), { ssr: false });

interface Props {
  total: number;
}

const line = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroMinimal({ total }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.55], [0, -56]);
  const orbitScale  = useTransform(scrollYProgress, [0, 0.45], [1, 1.18]);
  const orbitOpacity= useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-void"
    >
      {/* ── Tesseract hero orb ───────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{ scale: orbitScale, opacity: orbitOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          style={{ width: "clamp(320px, 62vw, 620px)", height: "clamp(320px, 62vw, 620px)" }}
        >
          <Tesseract3D />
        </div>
      </motion.div>

      {/* ── Radial vignette so text stays readable ───────────────────── */}
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

      {/* ── Text content ─────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 max-w-3xl mx-auto"
      >
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
          className="font-serif font-light text-[clamp(44px,7.5vw,108px)] leading-[1.02] tracking-[-0.025em] text-fg-1 mb-6"
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
          custom={2} variants={line} initial="hidden" animate="show"
          className="font-sans text-[17px] leading-[1.65] text-fg-3 max-w-[420px] mx-auto mb-10"
        >
          Pick a discipline. Explore its use cases. Copy a prompt. Ship the work.
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
      </motion.div>

      {/* ── Scroll cue ───────────────────────────────────────────────── */}
      <motion.div
        custom={4} variants={line} initial="hidden" animate="show"
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.24em] uppercase text-fg-4"
      >
        <span>Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-violet/50 to-transparent animate-cue-pulse" />
      </motion.div>
    </section>
  );
}
