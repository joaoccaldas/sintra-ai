"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bot, Brain, Layers3, Radio, ShieldCheck, Workflow, Wrench } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import { LIVE_ITEMS } from "@/lib/liveFeedData";
import { AUTOMATION_WORKFLOWS } from "@/lib/automationData";
import { AI_MODELS } from "@/lib/modelsData";
import { AI_TOOLS } from "@/lib/toolsData";
import { LEARNING_PATHS } from "@/lib/learningPathsData";

const STACK_LAYERS = [
  {
    id: "signal",
    eyebrow: "Layer 01 · Signal",
    title: "Track the frontier as it moves.",
    copy: "The live layer gathers fresh AI posts, news and research so Sintra starts from the current state of the field, not yesterday's memory.",
    href: `${BASE_PATH}/live/`,
    cta: "Open live feed",
    Icon: Radio,
    color: "#9F8CFF",
    stat: () => `${LIVE_ITEMS.length} live signals`,
  },
  {
    id: "meaning",
    eyebrow: "Layer 02 · Meaning",
    title: "Separate signal from noise.",
    copy: "Curated weekly picks, news significance and topic hubs turn a noisy feed into decisions, context and next actions.",
    href: `${BASE_PATH}/weekly/`,
    cta: "Read this week",
    Icon: Brain,
    color: "#8FE3D2",
    stat: () => "Curated intelligence",
  },
  {
    id: "automation",
    eyebrow: "Layer 03 · Automation",
    title: "Convert insight into workflows.",
    copy: "Automation blueprints connect prompts, models, tools, memory and approval gates so AI becomes a repeatable operating system.",
    href: `${BASE_PATH}/automate/`,
    cta: "Open automation hub",
    Icon: Workflow,
    color: "#F4D06F",
    stat: () => `${AUTOMATION_WORKFLOWS.length} workflow blueprints`,
  },
  {
    id: "decision",
    eyebrow: "Layer 04 · Decision",
    title: "Choose the right tools and models.",
    copy: "Model and tool directories help users compare capability, cost, ecosystem and fit before wiring AI into real work.",
    href: `${BASE_PATH}/models/`,
    cta: "Compare models",
    Icon: Wrench,
    color: "#B6A6FF",
    stat: () => `${AI_MODELS.length} models · ${AI_TOOLS.length} tools`,
  },
  {
    id: "mastery",
    eyebrow: "Layer 05 · Mastery",
    title: "Build skill, not just bookmarks.",
    copy: "Learning paths, concepts and guides move users from curiosity to operating competence, one structured route at a time.",
    href: `${BASE_PATH}/learn/`,
    cta: "Start learning",
    Icon: Layers3,
    color: "#6EE7A0",
    stat: () => `${LEARNING_PATHS.length} learning paths`,
  },
  {
    id: "trust",
    eyebrow: "Layer 06 · Trust",
    title: "Make the system safe to use.",
    copy: "Freshness checks, source links, schema validation and approval patterns make Sintra useful for professional work, not only exploration.",
    href: `${BASE_PATH}/guides/`,
    cta: "Open guides",
    Icon: ShieldCheck,
    color: "#F08CA8",
    stat: () => "Validation + guardrails",
  },
] as const;

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function LayerCard({ layer, index }: { layer: (typeof STACK_LAYERS)[number]; index: number }) {
  const Icon = layer.Icon;
  return (
    <motion.a
      href={layer.href}
      custom={index}
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.018] p-5 md:p-6 hover:bg-white/[0.04] hover:border-white/[0.14] transition-all duration-200"
    >
      <div className="absolute top-0 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${layer.color}77, transparent)` }} />
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.035]" style={{ color: layer.color }}>
          <Icon size={19} />
        </div>
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4">{layer.stat()}</span>
      </div>
      <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-3" style={{ color: layer.color }}>{layer.eyebrow}</p>
      <h3 className="font-serif text-[25px] md:text-[29px] leading-[1.02] tracking-[-0.02em] text-fg-1 mb-4 group-hover:text-white transition-colors">
        {layer.title}
      </h3>
      <p className="text-[13px] md:text-[14px] leading-relaxed text-fg-3 mb-7">{layer.copy}</p>
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4 group-hover:text-violet-bright transition-colors">
        {layer.cta} <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
      </span>
    </motion.a>
  );
}

export default function AIStackJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const railY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-80, 160]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-120, 180]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-abyss px-6 md:px-8 py-24 md:py-32 border-y border-hairline/60">
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="absolute inset-x-0 -top-48 h-[520px] bg-[radial-gradient(circle_at_50%_50%,rgba(159,140,255,0.16),transparent_62%)] pointer-events-none"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: railY }}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet/35 to-transparent hidden lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,.55) 1px, transparent 1px)", backgroundSize: "100% 72px" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-violet-bright">Scroll the AI stack</span>
          </div>
          <h2 className="font-serif font-light text-[clamp(36px,6vw,68px)] leading-[0.98] tracking-[-0.04em] text-fg-1 mb-5">
            A downward journey from <em className="italic text-violet-bright">signal</em> to execution.
          </h2>
          <p className="text-[15px] md:text-[17px] leading-relaxed text-fg-3 max-w-2xl">
            Sintra is structured as an operating system for AI work: first know what changed, then understand why it matters, then automate, compare, learn and build with guardrails.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {STACK_LAYERS.map((layer, i) => (
            <LayerCard key={layer.id} layer={layer} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 rounded-3xl border border-violet/[0.16] bg-gradient-to-br from-violet/[0.075] to-transparent p-5 md:p-6 flex flex-col md:flex-row gap-5 md:items-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet/[0.25] bg-violet/[0.10] text-violet-bright shrink-0">
            <Bot size={21} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-serif text-[21px] text-fg-1 leading-tight mb-1">Professional AI needs a map, not another pile of links.</p>
            <p className="text-[13px] leading-relaxed text-fg-3">
              This structure is the backbone of the one-stop shop: live intelligence, curated meaning, workflow execution, model/tool decisions, learning and trust.
            </p>
          </div>
          <a href={`${BASE_PATH}/automate/`} className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.10em] uppercase rounded-xl border border-violet/35 bg-violet/[0.10] px-4 py-2.5 text-violet-bright hover:bg-violet/[0.18] transition-colors shrink-0">
            Build workflows <ArrowRight size={11} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
