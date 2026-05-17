"use client";

import { motion } from "framer-motion";
import { DISCIPLINES, DISC_COUNTS } from "@/lib/data";

interface Props {
  onSelect: (cat: string) => void;
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Disciplines({ onSelect }: Props) {
  return (
    <section id="disciplines" className="relative pt-24 md:pt-32 pb-20 md:pb-24 bg-abyss">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        <motion.div
          className="max-w-2xl mb-12 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow block mb-3.5">The disciplines · 02</span>
          <h2 className="font-serif font-light text-[clamp(34px,5vw,64px)] leading-[1.02] tracking-[-0.02em] text-fg-1">
            Six faces. <em className="italic text-violet-bright">One library.</em>
          </h2>
          <p className="font-sans text-[17px] text-fg-2 max-w-lg mt-4 leading-[1.55]">
            A tesseract has six outer faces — one for every kind of work you might ask a machine to help with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-violet/[0.12] border border-violet/[0.12]">
          {DISCIPLINES.map((d, i) => (
            <motion.a
              key={d.id}
              href="#library"
              className="disc-card group focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright focus-visible:-outline-offset-2"
              custom={i}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              onClick={e => {
                e.preventDefault();
                onSelect(d.id);
                document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-fg-4 font-medium">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif font-normal text-[28px] md:text-[32px] tracking-[-0.01em] text-fg-1 mt-1">
                {d.label}
              </h3>
              <p className="font-sans text-sm leading-[1.5] text-fg-2 m-0">
                {d.essence}
              </p>
              <div className="mt-auto flex items-baseline justify-between pt-4">
                <span className="font-mono text-[11px] text-fg-3 tracking-[0.04em] inline-flex items-baseline gap-2">
                  <em className="font-serif italic font-light text-[26px] text-fg-1 leading-none">
                    {DISC_COUNTS[d.id] ?? 0}
                  </em>
                  <span>use cases</span>
                </span>
                <span className="disc-arrow">→</span>
              </div>
              <svg
                className="disc-glyph"
                viewBox="0 0 80 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="10" y="22" width="44" height="44" />
                <rect x="26" y="14" width="44" height="44" />
                <line x1="10" y1="22" x2="26" y2="14" />
                <line x1="54" y1="22" x2="70" y2="14" />
                <line x1="10" y1="66" x2="26" y2="58" />
                <line x1="54" y1="66" x2="70" y2="58" />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
