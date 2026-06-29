"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, ExternalLink, Check, ChevronDown } from "lucide-react";
import { FREE_AI_RUNNERS, runnerUrl, type FreeAiRunner } from "@/lib/freeAiRunners";

/**
 * "Try free — no login" control. Opens a small menu of free, no-login AI tools.
 * Selecting one copies the (filled) prompt to the clipboard, then opens the tool
 * in a new tab — prefilled where the tool supports it, paste-ready otherwise.
 *
 * Pure client UI, no backend / API key / account required.
 */
export default function PromptRunner({
  prompt,
  onRun,
  className = "",
}: {
  prompt: string;
  /** Optional callback (e.g. analytics / copy count) when a runner is launched. */
  onRun?: (runnerId: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [justRan, setJustRan] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); setOpen(false); }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const run = (runner: FreeAiRunner) => {
    try { navigator.clipboard?.writeText(prompt); } catch { /* clipboard may be blocked; URL prefill still works */ }
    window.open(runnerUrl(runner, prompt), "_blank", "noopener,noreferrer");
    onRun?.(runner.id);
    setJustRan(runner.id);
    setOpen(false);
    setTimeout(() => setJustRan(null), 2000);
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        className="btn"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        title="Run this prompt in a free AI tool — no login or API key"
      >
        <Sparkles size={14} /> Try free <ChevronDown size={13} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Free no-login AI tools"
          className="absolute left-0 bottom-full mb-2 z-50 w-[280px] rounded-xl border border-violet/20 bg-abyss/95 backdrop-blur-md shadow-xl p-1.5"
        >
          <p className="px-2.5 pt-1.5 pb-2 text-[11px] leading-snug text-fg-4">
            Runs in a free AI — <strong className="text-fg-3">no login or API key</strong>. The
            prompt is copied to your clipboard; paste it if the tool doesn&apos;t prefill.
          </p>
          {FREE_AI_RUNNERS.map(runner => (
            <button
              key={runner.id}
              role="menuitem"
              type="button"
              onClick={() => run(runner)}
              className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-violet/[0.10] transition-colors flex items-start gap-2.5 group"
            >
              <ExternalLink size={14} className="mt-0.5 shrink-0 text-fg-4 group-hover:text-violet-bright transition-colors" />
              <span className="min-w-0">
                <span className="block text-[13px] text-fg-1 font-medium">
                  {runner.name}
                  {justRan === runner.id && <Check size={12} className="inline ml-1.5 text-emerald-400" />}
                </span>
                <span className="block text-[11px] text-fg-4">{runner.blurb}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
