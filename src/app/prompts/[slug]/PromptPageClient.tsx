"use client";

import { useState } from "react";
import { Copy, Check, Share2, ExternalLink } from "lucide-react";
import { UseCase } from "@/lib/data";
import { getLaunchUrl, getLaunchLabel } from "@/lib/launchInAI";
import { recordCopy } from "@/lib/copyCountStore";

interface Props {
  item: UseCase;
  catColor: string;
}

export default function PromptPageClient({ item, catColor }: Props) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(item.prompt);
    recordCopy(item.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const share = async () => {
    const url = window.location.href;
    const text = `"${item.title}" — AI prompt`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: item.title, text, url });
        return;
      } catch {
        // user cancelled or API unavailable — fall through
      }
    }
    // Fallback: open Twitter intent
    const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer,width=550,height=420");
    setShared(true);
    setTimeout(() => setShared(false), 1600);
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="eyebrow">The prompt</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={share}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] uppercase text-fg-3 hover:text-fg-1 transition-colors"
          >
            {shared ? <><Check size={11} /> Copied link</> : <><Share2 size={11} /> Share</>}
          </button>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] uppercase text-violet-bright hover:text-fg-1 transition-colors"
          >
            {copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy prompt</>}
          </button>
        </div>
      </div>

      {/* Prompt block */}
      <div
        className="rounded-xl border p-5 font-mono text-[13px] text-fg-2 leading-[1.75] whitespace-pre-wrap select-all bg-white/[0.02]"
        style={{ borderColor: `${catColor}30` }}
      >
        {item.prompt}
      </div>

      {/* Primary CTA */}
      <div className="flex items-center gap-3 mt-4">
        <a
          href={getLaunchUrl(item.best_llm, item.prompt)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          <ExternalLink size={14} /> Open in {getLaunchLabel(item.best_llm)}
        </a>
        <button onClick={copy} className="btn btn-ghost">
          {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy prompt</>}
        </button>
      </div>
    </div>
  );
}
