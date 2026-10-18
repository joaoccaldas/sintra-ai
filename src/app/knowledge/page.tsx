import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KnowledgeBrowser from "@/components/KnowledgeBrowser";
import { BASE_PATH } from "@/lib/constants";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export const metadata: Metadata = {
  title: "Workflows, skills & evidence — Sintra AI",
  description: "Replicable Claude, Microsoft 365, Excel and PowerPoint workflows, customer examples and finance guides with dated primary sources.",
  alternates: { canonical: "https://joaoccaldas.github.io/sintra-ai/knowledge/" },
};

export default function KnowledgePage() {
  return <><Header total={USE_CASES_COUNT} /><main id="main-content" className="pt-16 min-h-screen bg-void"><div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
    <header className="max-w-3xl mb-10"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-violet-bright mb-5">Research into practice</p><h1 className="font-serif text-[clamp(40px,6vw,68px)] leading-[1.05] text-fg-1 mb-5">Know what’s possible.<br /><em className="text-violet-bright">Choose what’s useful.</em></h1><p className="text-lg leading-relaxed text-fg-2 mb-5">Claude, Microsoft 365, Excel and PowerPoint — with practical skills, source-backed customer examples and clear steps to try them yourself.</p><p className="text-sm leading-relaxed text-fg-3">Each skill includes inputs, setup, a procedure, a practice case and checks. Provider customer stories are attributed reports. Source checks and suggested test cases are kept separate from actual execution evidence.</p><div className="flex flex-wrap gap-x-5 gap-y-3 mt-6 text-sm"><a href={`${BASE_PATH}/knowledge/power-bi-variance-review/#worked-example`} className="text-violet-bright underline underline-offset-4">Try the variance example →</a><a href={`${BASE_PATH}/agents/`} className="text-violet-bright underline underline-offset-4">Use this knowledge with an LLM →</a><a href={`${BASE_PATH}/news/`} className="text-fg-3 underline underline-offset-4">Follow the news</a><a href={`${BASE_PATH}/library/?cat=finance`} className="text-fg-3 underline underline-offset-4">Browse finance prompts</a></div></header>
    <KnowledgeBrowser />
  </div></main><Footer /></>;
}
