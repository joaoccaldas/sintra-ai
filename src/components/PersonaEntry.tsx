"use client";

import { useState } from "react";
import { BASE_PATH } from "@/lib/data";

interface Persona {
  id: string;
  label: string;
  emoji: string;
  desc: string;
  category: string;
  difficulty?: string;
  region?: string;
}

const PERSONAS: Persona[] = [
  {
    id: "developer",
    label: "Developer",
    emoji: "⌨",
    desc: "Code review, architecture, debugging, agentic workflows",
    category: "coding",
  },
  {
    id: "marketer",
    label: "Marketer",
    emoji: "✦",
    desc: "Copy, campaigns, content strategy, social & email",
    category: "writing",
  },
  {
    id: "finance",
    label: "Finance Pro",
    emoji: "◈",
    desc: "FP&A, forecasting, board decks, variance analysis",
    category: "finance",
  },
  {
    id: "researcher",
    label: "Researcher",
    emoji: "◎",
    desc: "Literature review, synthesis, competitive intel, citations",
    category: "research",
  },
  {
    id: "brazil",
    label: "Brasil",
    emoji: "🇧🇷",
    desc: "Pix, MEI, IRPF, CLT, LGPD, B3 — em português",
    category: "finance",
    region: "brazil",
  },
  {
    id: "quick",
    label: "Quick Wins",
    emoji: "⚡",
    desc: "One-liners you can use in the next 5 minutes",
    category: "quick-wins",
  },
];

export default function PersonaEntry() {
  const [active, setActive] = useState<string | null>(null);

  const handleSelect = (persona: Persona) => {
    setActive(persona.id);
    const params = new URLSearchParams();
    params.set("cat", persona.category);
    if (persona.region) params.set("region", persona.region);
    if (persona.difficulty) params.set("diff", persona.difficulty);

    const section = document.getElementById("prompts-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Dispatch a custom event that CategoryBrowser can listen to
    window.dispatchEvent(new CustomEvent("sintra:persona", { detail: persona }));
  };

  return (
    <div className="w-full max-w-[860px] mx-auto px-6 md:px-8 mb-10">
      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg-4 mb-4">
        Start with your role
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {PERSONAS.map(p => (
          <button
            key={p.id}
            onClick={() => handleSelect(p)}
            title={p.desc}
            className={[
              "flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-center",
              active === p.id
                ? "border-violet/60 bg-violet/[0.12] text-fg-1"
                : "border-white/[0.07] bg-white/[0.02] text-fg-3 hover:border-violet/30 hover:bg-white/[0.04] hover:text-fg-1",
            ].join(" ")}
          >
            <span className="text-[18px] leading-none">{p.emoji}</span>
            <span className="font-mono text-[10px] tracking-[0.08em] uppercase leading-tight">{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
