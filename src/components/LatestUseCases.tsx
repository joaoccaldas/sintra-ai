"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { USE_CASES } from "@/lib/data";
import type { UseCase } from "@/lib/data";
import UseCaseCard from "./UseCaseCard";
import ExpandedCard from "./ExpandedCard";

// USE_CASES is already sorted newest-first by data.ts
const LATEST = USE_CASES.slice(0, 3);

export default function LatestUseCases() {
  const [expanded, setExpanded] = useState<UseCase | null>(null);

  const scrollToExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="bg-void border-t border-violet/[0.08]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16">

          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-bright opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-bright" />
              </span>
              <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-violet-bright">
                Latest Use Cases
              </h2>
            </div>
            <a
              href="#explore"
              onClick={scrollToExplore}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-fg-4 hover:text-violet-bright transition-colors group"
            >
              Browse all
              <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* 3-up card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LATEST.map(item => (
              <UseCaseCard
                key={item.id}
                item={item}
                onOpen={setExpanded}
              />
            ))}
          </div>

        </div>
      </section>

      {expanded && (
        <ExpandedCard item={expanded} onClose={() => setExpanded(null)} />
      )}
    </>
  );
}
