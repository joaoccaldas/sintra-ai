"use client";

import { Check, ExternalLink, Scale } from "lucide-react";
import { TOOL_CATEGORIES, type AITool } from "@/lib/toolsData";

const PRICING_COLOR: Record<AITool["pricing"], string> = {
  free: "#10b981",
  freemium: "#6ee7a0",
  paid: "#9F8CFF",
  enterprise: "#e8c089",
};

const PRICING_LABEL: Record<AITool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  enterprise: "Enterprise",
};

interface Props {
  tool: AITool;
  onOpen: (tool: AITool) => void;
  isComparing: boolean;
  onToggleCompare: () => void;
  compareDisabled: boolean;
}

export default function ToolDirectoryCard({
  tool,
  onOpen,
  isComparing,
  onToggleCompare,
  compareDisabled,
}: Props) {
  const category = TOOL_CATEGORIES.find(item => item.id === tool.category);
  const cannotAdd = compareDisabled && !isComparing;

  return (
    <article
      className={`group relative rounded-xl border transition-all duration-200 hover:scale-[1.015] hover:shadow-lg bg-[#0d0a1c] ${
        isComparing ? "border-violet/60" : "border-violet/[0.12] hover:border-violet/40"
      }`}
    >
      <button
        type="button"
        onClick={onToggleCompare}
        disabled={cannotAdd}
        aria-pressed={isComparing}
        aria-label={isComparing ? `Remove ${tool.name} from comparison` : `Add ${tool.name} to comparison`}
        title={cannotAdd ? "You can compare up to four tools" : isComparing ? "Remove from comparison" : "Add to comparison"}
        className={`absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
          isComparing
            ? "bg-violet border-violet text-fg-on-violet"
            : "bg-[#0d0a1c]/90 border-white/15 text-fg-4 hover:text-violet-bright hover:border-violet/40"
        } disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        {isComparing ? <Check size={12} /> : <Scale size={12} />}
      </button>

      <button
        type="button"
        onClick={() => onOpen(tool)}
        className="flex flex-col gap-3 p-5 pr-12 text-left w-full h-full rounded-xl"
        aria-label={`Open details for ${tool.name}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="font-serif text-[17px] text-fg-1 leading-none">{tool.name}</h2>
              {tool.status === "beta" && (
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full border border-amber-500/40 text-amber-400 bg-amber-500/10 uppercase tracking-[0.08em]">Beta</span>
              )}
              {tool.status === "waitlist" && (
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full border border-violet/30 text-violet-bright bg-violet/10 uppercase tracking-[0.08em]">Waitlist</span>
              )}
            </div>
            <p className="font-sans text-[12px] text-fg-4">{tool.provider}</p>
          </div>
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-[0.08em] shrink-0"
            style={{
              color: PRICING_COLOR[tool.pricing],
              borderColor: `${PRICING_COLOR[tool.pricing]}44`,
              background: `${PRICING_COLOR[tool.pricing]}12`,
            }}
          >
            {PRICING_LABEL[tool.pricing]}
          </span>
        </div>

        <p className="font-sans text-[14px] text-fg-2 leading-[1.5]">{tool.tagline}</p>
        <p className="font-sans text-[13px] text-fg-3 leading-[1.45] line-clamp-2">{tool.highlight}</p>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-hairline/50 mt-auto">
          <span className="font-mono text-[11px] text-fg-4 truncate">{category?.icon} {category?.label}</span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-fg-4 group-hover:text-violet-bright transition-colors shrink-0">
            Details <ExternalLink size={10} />
          </span>
        </div>
      </button>
    </article>
  );
}
