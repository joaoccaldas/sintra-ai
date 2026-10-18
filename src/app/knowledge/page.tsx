import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KnowledgeBrowser from "@/components/KnowledgeBrowser";
import { BASE_PATH } from "@/lib/constants";
import { KNOWLEDGE } from "@/lib/knowledgeData";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export const metadata: Metadata = {
  title: "Workflows, skills & evidence — Sintra AI",
  description: "A source-backed AI knowledge repository: ChatGPT, Claude Code, Claude Cowork, cloud tools, skills, workflows and real customer examples for personal and corporate use.",
  alternates: { canonical: "https://joaoccaldas.github.io/sintra-ai/knowledge/" },
};

export default function KnowledgePage() {
  const skillCount = KNOWLEDGE.filter(item => item.replication).length;
  const updates = KNOWLEDGE.filter(item => item.news && item.news.publishedAt >= "2026-10-01").sort((a, b) => b.news!.publishedAt.localeCompare(a.news!.publishedAt));
  return <><Header total={USE_CASES_COUNT} /><main id="main-content" className="pt-16 min-h-screen bg-void"><div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
    <header className="max-w-3xl mb-10"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-violet-bright mb-5">The AI knowledge repository</p><h1 className="font-serif text-[clamp(40px,6vw,68px)] leading-[1.05] text-fg-1 mb-5">Know what’s possible.<br /><em className="text-violet-bright">Choose what’s useful.</em></h1><p className="text-lg leading-relaxed text-fg-2 mb-5">Learn what people use AI for, choose a workflow, and make it work for you. Start with ChatGPT, Claude Code or Claude Cowork; explore cloud tools, connectors, Office and finance alongside them.</p><p className="text-sm leading-relaxed text-fg-3">Each skill includes inputs, setup, a procedure, a practice case and checks. Provider customer stories are attributed reports. Source checks and suggested test cases are kept separate from actual execution evidence.</p><div className="flex flex-wrap gap-x-5 gap-y-3 mt-6 text-sm"><a href={`${BASE_PATH}/knowledge/power-bi-variance-review/#worked-example`} className="text-violet-bright underline underline-offset-4">Try the variance example →</a><a href={`${BASE_PATH}/agents/`} className="text-violet-bright underline underline-offset-4">Use this knowledge with an LLM →</a><a href={`${BASE_PATH}/news/`} className="text-fg-3 underline underline-offset-4">Follow the news</a><a href={`${BASE_PATH}/library/?cat=finance`} className="text-fg-3 underline underline-offset-4">Browse finance prompts</a></div></header>
    <nav aria-label="Choose a starting point" className="grid sm:grid-cols-3 gap-3 mb-8">
      {[
        { name: "ChatGPT", tag: "ChatGPT", detail: "Research, files, learning and reusable skills" },
        { name: "Claude Code", tag: "Claude Code", detail: "Understand, debug and improve a repository" },
        { name: "Claude Cowork", tag: "Claude Cowork", detail: "Files, team updates, accounts and personal admin" },
      ].map(path => <a key={path.name} href={`${BASE_PATH}/knowledge/?tag=${encodeURIComponent(path.tag)}`} className="rounded-xl border border-hairline p-5 hover:border-violet-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright"><h2 className="font-serif text-xl text-fg-1 mb-2">{path.name} →</h2><p className="text-xs leading-relaxed text-fg-3">{path.detail}</p></a>)}
    </nav>
    <details className="rounded-xl border border-hairline p-5 mb-8">
      <summary className="cursor-pointer text-sm text-fg-1">What’s here, how it’s checked, and where to begin</summary>
      <div className="mt-4 text-sm leading-relaxed text-fg-3 space-y-4">
        <p>{KNOWLEDGE.length} cited briefs · {skillCount} downloadable replication skills · {USE_CASES_COUNT} existing prompts. Skills and full briefs are two formats of the same knowledge.</p>
        <ul className="list-disc pl-5 space-y-2"><li><a href={`${BASE_PATH}/library/`} className="text-violet-bright underline">Prompt library</a>: starting prompts and sample outputs.</li><li><a href={`${BASE_PATH}/automate/`} className="text-violet-bright underline">Automation playbooks</a>: recurring patterns to adapt.</li><li><a href={`${BASE_PATH}/guides/`} className="text-violet-bright underline">Guides</a>, <a href={`${BASE_PATH}/learn/`} className="text-violet-bright underline">learning paths</a> and <a href={`${BASE_PATH}/concepts/`} className="text-violet-bright underline">concepts</a>: foundations and deeper explanations.</li><li><a href={`${BASE_PATH}/tools/`} className="text-violet-bright underline">Tools</a>, <a href={`${BASE_PATH}/models/`} className="text-violet-bright underline">models</a> and <a href={`${BASE_PATH}/news/`} className="text-violet-bright underline">news</a>: reference and discovery; check individual provenance and dates.</li></ul>
        <p>Source-checked means an editor read the cited primary material. Customer stories remain attributed reports. Practice cases describe expected results; only an explicit execution receipt establishes a completed test. Older reference collections may lack review metadata.</p>
        <p>Daily builds refresh discovery feeds and validate the release. They do not automatically verify an announcement, test a new provider workflow or renew a source-check date.</p>
        <a href={`${BASE_PATH}/knowledge/connector-access-review/`} className="inline-block text-violet-bright underline">Learn how to check tools and access →</a>
      </div>
    </details>
    <details className="rounded-xl border border-hairline p-5 mb-8"><summary className="cursor-pointer text-sm text-fg-1">Recent source-checked updates</summary><ul className="divide-y divide-hairline">{updates.map(item => <li key={item.id} className="py-3"><a href={`${BASE_PATH}/knowledge/${item.id}/`} className="text-sm text-fg-2 hover:text-violet-bright">{item.title} →</a><p className="text-xs text-fg-4 mt-1">Published <time dateTime={item.news!.publishedAt}>{item.news!.publishedAt}</time> · Sources checked {item.reviewedAt}</p></li>)}</ul></details>
    <KnowledgeBrowser />
  </div></main><Footer /></>;
}
