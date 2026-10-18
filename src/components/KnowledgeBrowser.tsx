"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import { KNOWLEDGE, KNOWLEDGE_KIND_LABELS, searchKnowledge } from "@/lib/knowledgeData";

export default function KnowledgeBrowser() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const [kind, setKind] = useState("all");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    const initialTag = params.get("tag");
    const initialKind = params.get("kind");
    if (initialTag && KNOWLEDGE.some(item => item.tags.includes(initialTag))) setTag(initialTag);
    if (initialKind && initialKind in KNOWLEDGE_KIND_LABELS) setKind(initialKind);
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    query ? url.searchParams.set("q", query) : url.searchParams.delete("q");
    tag !== "all" ? url.searchParams.set("tag", tag) : url.searchParams.delete("tag");
    kind !== "all" ? url.searchParams.set("kind", kind) : url.searchParams.delete("kind");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [query, tag, kind, ready]);
  const results = searchKnowledge(query, tag, kind);
  const reset = () => { setQuery(""); setTag("all"); setKind("all"); };
  return (
    <section aria-label="Find knowledge">
      <div className="rounded-2xl border border-hairline bg-steel p-4 sm:p-5 mb-7 space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-hairline bg-void px-4 focus-within:border-violet-bright">
          <Search size={18} className="text-fg-4 shrink-0" />
          <input aria-label="Search knowledge" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try Power BI, earnings, or month-end…" className="w-full min-w-0 bg-transparent py-3 text-fg-1 outline-none text-sm placeholder:text-fg-4" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear knowledge search" className="p-2 text-fg-3"><X size={16} /></button>}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Knowledge topic">
          {["all", "Power BI", "Finance", "Anthropic", "MCP"].map(value => <button key={value} type="button" aria-pressed={tag === value} onClick={() => setTag(value)} className={`rounded-full border px-4 py-2 text-xs transition-colors ${tag === value ? "border-violet-bright bg-violet/10 text-violet-bright" : "border-hairline text-fg-3 hover:text-fg-1"}`}>{value === "all" ? "All topics" : value}</button>)}
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <label className="text-xs text-fg-3">Show <select value={kind} onChange={e => setKind(e.target.value)} className="ml-2 rounded-lg border border-hairline bg-void px-3 py-2 text-fg-1"><option value="all">All evidence types</option>{Object.entries(KNOWLEDGE_KIND_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <p role="status" aria-live="polite" className="text-xs text-fg-4 sm:ml-auto">{results.length} of {KNOWLEDGE.length} briefs</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {results.map(item => <a key={item.id} href={`${BASE_PATH}/knowledge/${item.id}/`} className="group flex flex-col rounded-2xl border border-hairline bg-steel p-6 hover:border-violet-bright transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright">
          <p className="font-mono text-[10px] tracking-wider uppercase text-violet-bright mb-4">{KNOWLEDGE_KIND_LABELS[item.kind]}</p>
          <h2 className="font-serif text-2xl leading-tight text-fg-1 mb-3">{item.title}</h2>
          <p className="text-sm leading-relaxed text-fg-3 mb-5">{item.summary}</p>
          <div className="mt-auto pt-4 border-t border-hairline flex items-center justify-between gap-3 text-xs text-fg-4"><span>Sources checked <time dateTime={item.reviewedAt}>{item.reviewedAt}</time></span><ArrowRight size={17} className="shrink-0 text-violet-bright group-hover:translate-x-1 transition-transform" /></div>
        </a>)}
      </div>
      {!results.length && <div className="rounded-2xl border border-hairline py-16 px-6 text-center"><h2 className="font-serif text-2xl text-fg-1 mb-2">No matching briefs</h2><p className="text-sm text-fg-3 mb-5">Try fewer words or clear the filters.</p><button onClick={reset} className="text-violet-bright underline underline-offset-4">Clear all filters</button></div>}
    </section>
  );
}
