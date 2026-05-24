"use client";

import Link from "next/link";
import { USE_CASES, BASE_PATH } from "@/lib/data";
import { relativeDate } from "@/lib/dateUtils";

const CUTOFF_DAYS = 14;

function isRecent(iso: string): boolean {
  return Date.now() - new Date(iso).getTime() < CUTOFF_DAYS * 24 * 60 * 60 * 1000;
}

export default function NewThisWeek() {
  const recent = USE_CASES.filter(u => isRecent(u.dateAdded)).slice(0, 8);
  if (recent.length === 0) return null;

  return (
    <div className="w-full max-w-[860px] mx-auto px-6 md:px-8 mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg-4">New this week</span>
        <span className="flex-1 h-px bg-hairline" />
        <span className="font-mono text-[10px] text-fg-4">{recent.length} added</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {recent.map(u => (
          <Link
            key={u.id}
            href={`${BASE_PATH}/prompts/${u.slug}/`}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] hover:border-violet/40 hover:bg-violet/[0.06] transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-bright shrink-0 opacity-70 group-hover:opacity-100" />
            <span className="font-sans text-[12px] text-fg-2 group-hover:text-fg-1 line-clamp-1 max-w-[200px]">
              {u.title}
            </span>
            <span className="font-mono text-[10px] text-fg-4 shrink-0">{relativeDate(u.dateAdded)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
