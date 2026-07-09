"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Radio, ShieldCheck, Workflow } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import { LIVE_FEED, LIVE_ITEMS } from "@/lib/liveFeedData";
import { AUTOMATION_WORKFLOWS } from "@/lib/automationData";
import NewsTicker from "./NewsTicker";

interface Props { total: number; }

const line = {
  hidden: { opacity: 0, y: 18 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function feedFreshnessLabel(): string {
  const generated = new Date(LIVE_FEED.generatedAt).getTime();
  if (Number.isNaN(generated)) return "feed timestamp checked";
  const hours = Math.max(0, Math.floor((Date.now() - generated) / 3.6e6));
  if (hours < 1) return "feed fresh · just updated";
  if (hours < 24) return `feed fresh · ${hours}h old`;
  return `feed snapshot · ${Math.floor(hours / 24)}d old`;
}

export default function HeroMinimal({ total }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const bloomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Scroll-driven downward movement: the hero opens like a surface layer, then
  // the content descends into the AI stack section below.
  useEffect(() => {
    if (prefersReducedMotion) return;
    function onScroll() {
      const y = window.scrollY;
      if (bloomRef.current) {
        bloomRef.current.style.transform = `translateY(${y * 0.48}px)`;
      }
      if (railRef.current) {
        railRef.current.style.transform = `translateY(${y * 0.3}px)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.14}px)`;
        contentRef.current.style.opacity   = String(Math.max(0, 1 - y / 420));
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : line;

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-32 md:pt-36 md:pb-40 overflow-hidden bg-void min-h-[72vh]">
      <div
        ref={bloomRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse 80% 58% at 50% -8%, rgba(159,140,255,0.19) 0%, transparent 70%)",
        }}
      />

      <div
        ref={railRef}
        aria-hidden="true"
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet/25 to-transparent pointer-events-none will-change-transform hidden md:block"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,.65) 1px, transparent 1px)", backgroundSize: "100% 80px" }}
      />

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--abyss))" }}
      />

      <div ref={contentRef} className="relative z-10 w-full max-w-4xl mx-auto will-change-transform">
        <motion.div
          custom={0} variants={variants} initial="hidden" animate="show"
          className="flex items-center justify-center gap-3 mb-7"
        >
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet-bright" />
          <span className="eyebrow violet">AI command center · live intelligence · automation</span>
          <span className="w-6 h-px bg-gradient-to-l from-transparent to-violet-bright" />
        </motion.div>

        <motion.h1
          custom={1} variants={variants} initial="hidden" animate="show"
          className="font-serif font-light text-[clamp(52px,9vw,112px)] leading-[0.94] tracking-[-0.055em] text-fg-1 mb-6"
        >
          The operating map for <em className="italic text-violet-bright">AI work</em>.
        </motion.h1>

        <motion.p
          custom={2} variants={variants} initial="hidden" animate="show"
          className="text-[16px] md:text-[20px] leading-relaxed text-fg-3 mb-7 max-w-2xl mx-auto"
        >
          Track what is changing, understand what matters, compare tools and models, then turn it into prompts, workflows and automation systems.
        </motion.p>

        <motion.div
          custom={3} variants={variants} initial="hidden" animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl mx-auto mb-8"
        >
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
            <p className="font-mono text-[15px] text-fg-1 tabular-nums">{LIVE_ITEMS.length}</p>
            <p className="font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4">live signals</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
            <p className="font-mono text-[15px] text-fg-1 tabular-nums">{AUTOMATION_WORKFLOWS.length}</p>
            <p className="font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4">workflow blueprints</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
            <p className="font-mono text-[15px] text-fg-1 tabular-nums">{total.toLocaleString()}</p>
            <p className="font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4">AI use cases</p>
          </div>
        </motion.div>

        <motion.div
          custom={4} variants={variants} initial="hidden" animate="show"
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <a href={`${BASE_PATH}/live/`} className="btn inline-flex items-center gap-2">
            <Radio size={13} /> Explore live AI
          </a>
          <a href={`${BASE_PATH}/automate/`} className="btn btn-ghost inline-flex items-center gap-2">
            <Workflow size={13} /> Build an automation
          </a>
          <a
            href="#explore"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn btn-ghost inline-flex items-center gap-2"
          >
            Browse the map <ArrowRight size={13} />
          </a>
        </motion.div>

        <motion.div
          custom={5} variants={variants} initial="hidden" animate="show"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4"
        >
          <span className="inline-flex items-center gap-1.5 text-emerald-400"><ShieldCheck size={12} /> {feedFreshnessLabel()}</span>
          <span>{LIVE_FEED.sourceCount} sources</span>
          <span>RSS + JSON feed</span>
          <span>static, auditable, source-backed</span>
        </motion.div>
      </div>

      <NewsTicker />
    </section>
  );
}
