"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BASE_PATH, DIFF_COLOR } from "@/lib/constants";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

// Hand-picked, one per major category — mirrors the featuredData.ts pattern
// (small, manually maintained) rather than importing the full 455 kB
// useCases.json just to read six titles. Update alongside notable additions.
const FEATURED = [
  { slug: "meeting-notes-to-action-items", title: "Meeting Notes to Action Items", category: "quick-wins", difficulty: "beginner", outcome: "A clean, scannable action item list extracted from raw meeting notes in under a minute." },
  { slug: "case-study-writer", title: "Case Study Writer", category: "writing", difficulty: "intermediate", outcome: "A 600–800 word case study with headline, challenge/solution/results structure, pull quote, and CTA." },
  { slug: "ai-industry-weekly-briefing", title: "AI Industry Weekly Briefing", category: "research", difficulty: "intermediate", outcome: "A 400-word executive briefing with 5 structured sections ready to share with a leadership team." },
  { slug: "headcount-workforce-cost-planning-model", title: "Headcount & Workforce Cost Planning Model", category: "finance", difficulty: "advanced", outcome: "A driver-based headcount plan: FTE roster logic, fully-loaded cost, hiring ramp, and scenario toggles." },
  { slug: "fp-a-kpi-dictionary-standardiser", title: "FP&A KPI Dictionary Standardiser", category: "data-analytics", difficulty: "intermediate", outcome: "A single KPI dictionary: definition, formula, source system, owner, and refresh cadence per metric." },
  { slug: "write-unit-tests", title: "Write Unit Tests", category: "coding", difficulty: "intermediate", outcome: "A complete runnable test file with happy-path, edge-case, and error tests covering 90%+ of branches." },
] as const;

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function LibraryTeaser() {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet/60" />
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4">Prompt Library</span>
        <span className="flex-1 h-px bg-hairline" />
        <a href={`${BASE_PATH}/library/`}
          className="font-mono text-[10px] text-fg-4 hover:text-violet-bright transition-colors flex items-center gap-1">
          Browse all {USE_CASES_COUNT} <ArrowRight size={10} />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FEATURED.map((item, i) => (
          <motion.a
            key={item.slug}
            href={`${BASE_PATH}/prompts/${item.slug}/`}
            custom={i} variants={fade} initial="hidden" animate="show"
            whileHover={{ y: -1 }}
            className="group flex flex-col gap-3 p-4 rounded-xl border border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.14] transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-fg-4 truncate">{item.category}</span>
              <span className="font-mono text-[9px] tracking-[0.08em] uppercase px-1.5 py-0.5 rounded-full border shrink-0"
                style={{ color: DIFF_COLOR[item.difficulty], borderColor: DIFF_COLOR[item.difficulty] + "44", background: DIFF_COLOR[item.difficulty] + "12" }}>
                {item.difficulty}
              </span>
            </div>
            <p className="font-serif text-[14px] text-fg-1 leading-[1.35] group-hover:text-white transition-colors line-clamp-2">
              {item.title}
            </p>
            <p className="font-mono text-[10px] text-fg-4 leading-[1.5] line-clamp-2">{item.outcome}</p>
            <span className="mt-auto flex items-center gap-1 font-mono text-[9px] tracking-[0.10em] uppercase text-fg-4 group-hover:text-violet-bright transition-colors">
              Open <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
