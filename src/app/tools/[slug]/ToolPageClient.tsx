"use client";

import { ExternalLink } from "lucide-react";
import { AITool } from "@/lib/toolsData";

export default function ToolPageClient({ tool }: { tool: AITool }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        <ExternalLink size={14} /> Open {tool.name}
      </a>
    </div>
  );
}
