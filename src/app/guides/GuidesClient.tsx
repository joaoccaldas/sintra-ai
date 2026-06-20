"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { GUIDES, type Guide } from "@/lib/guidesData";
import { BASE_PATH } from "@/lib/constants";

const LEVEL_STYLE = {
  beginner:     { label: "Beginner",     color: "#10b981" },
  intermediate: { label: "Intermediate", color: "#9F8CFF" },
  advanced:     { label: "Advanced",     color: "#ef4444" },
};

function GuideCard({ guide }: { guide: Guide }) {
  const lvl = LEVEL_STYLE[guide.level];
  return (
    <motion.a
      href={`${BASE_PATH}/guides/${guide.slug}/`}
      whileHover={{ scale: 1.012 }}
      whileTap={{ scale: 0.99 }}
      className="group block text-left w-full rounded-2xl border p-6 bg-[#0d0a1c] transition-all duration-200 hover:bg-[#110e22]"
      style={{ borderColor: guide.color + "28" }}
    >
      <div className="h-[2px] w-14 rounded-full mb-5" style={{ background: guide.color }} />

      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="text-3xl leading-none">{guide.emoji}</span>
        <span className="font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border shrink-0"
          style={{ color: lvl.color, borderColor: lvl.color + "44", background: lvl.color + "12" }}>
          {lvl.label}
        </span>
      </div>

      <h3 className="font-serif text-[20px] font-normal text-fg-1 leading-[1.15] mb-2 group-hover:text-white transition-colors">
        {guide.title}
      </h3>
      <p className="font-sans text-[13px] text-fg-3 leading-[1.5] mb-5">{guide.tagline}</p>

      <div className="flex items-center justify-between pt-4 border-t border-hairline/40">
        <div className="flex items-center gap-3 text-fg-4">
          <span className="font-mono text-[10px] flex items-center gap-1">
            <Clock size={10} /> {guide.estimatedRead}
          </span>
          <span>·</span>
          <span className="font-mono text-[10px]">{guide.sections.length} sections</span>
        </div>
        <ArrowRight size={14} className="text-fg-4 group-hover:text-violet-bright transition-colors" />
      </div>
    </motion.a>
  );
}

export default function GuidesClient() {
  return (
    <div className="min-h-screen bg-abyss text-fg-1">
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #9F8CFF, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-8">
        {/* Back */}
        <div className="pt-10 pb-6">
          <a href={`${BASE_PATH}/`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Sintra
          </a>
        </div>

        {/* Hero */}
        <motion.header
          className="pt-6 pb-14 border-b border-violet/[0.12]"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex gap-3.5 items-center mb-6">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="eyebrow violet">Practical Guides</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(40px,6vw,80px)] leading-[1.04] tracking-[-0.025em] text-fg-1 mb-5">
            Guides &{" "}
            <em className="italic" style={{
              backgroundImage: "linear-gradient(180deg, #F4F2EA 0%, #9F8CFF 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>playbooks.</em>
          </h1>
          <p className="font-sans text-[17px] text-fg-2 max-w-xl leading-[1.55]">
            Practical, opinionated guides on building with AI — agents, RAG pipelines, model selection, fine-tuning, and cost optimization.
          </p>
        </motion.header>

        {/* Grid */}
        <div className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {GUIDES.map((guide, i) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <GuideCard guide={guide} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="pb-24 border-t border-violet/[0.08] pt-10">
          <p className="font-sans text-[14px] text-fg-4 text-center leading-[1.6] max-w-md mx-auto">
            Each guide links to related prompts, concepts, tools, and models already in the library.
          </p>
        </div>
      </div>
    </div>
  );
}
