"use client";

import { useMemo, useState } from "react";
import { AI_MODELS, type ModelEntry } from "@/lib/modelsData";
import { LIVE_FEED, LIVE_ITEMS } from "@/lib/liveFeedData";
import { withBasePath } from "@/lib/constants";
import { ArrowUpRight, ArrowDownUp, Info, Search, SlidersHorizontal } from "lucide-react";

type Sort = "release" | "price" | "context" | "name";
type Status = "all" | "available" | "preview" | "deprecated";

function usd(x: number | null, digits = 2) {
  return x === null || !Number.isFinite(x) ? "Unknown" : "$" + x.toFixed(digits);
}
function dateOnly(s: string | undefined) {
  return s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}
function ageDays(s: string) {
  const t = Date.parse(s);
  return Number.isFinite(t) ? Math.floor((Date.now() - t) / 86400000) : null;
}
function verification(model: ModelEntry) {
  const days = ageDays(model.lastVerified);
  return days === null ? "Unverified" : days < 0 ? "Date inconsistent" : days <= 14 ? "Checked recently" : days <= 45 ? "Review advised" : "Historical";
}
const triggers = /\b(model|gpt|claude|gemini|mistral|llama|grok|api|release|pricing|price|inference|open.weight|reasoning)\b/i;

export default function ModelWatchClient() {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("all");
  const [status, setStatus] = useState<Status>("all");
  const [sort, setSort] = useState<Sort>("release");
  const [showUnknown, setShowUnknown] = useState(true);
  const [inputM, setInputM] = useState(1);
  const [outputM, setOutputM] = useState(0.25);
  const [focused, setFocused] = useState<string | null>(null);

  const providers = useMemo(() => [...new Set(AI_MODELS.map(m => m.provider))].sort(), []);
  const sortedModels = useMemo(() => AI_MODELS
    .filter(m => (provider === "all" || m.provider === provider) && (status === "all" || m.status === status))
    .filter(m => showUnknown || (m.inputPrice !== null && m.outputPrice !== null))
    .filter(m => [m.name, m.provider, ...(m.bestFor ?? [])].join(" ").toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price") return (a.inputPrice ?? Infinity) - (b.inputPrice ?? Infinity);
      if (sort === "context") return b.contextWindow - a.contextWindow;
      if (sort === "name") return a.name.localeCompare(b.name);
      const aa = dateOnly(a.releaseDateIso) ?? dateOnly(a.lastVerified) ?? "0000";
      const bb = dateOnly(b.releaseDateIso) ?? dateOnly(b.lastVerified) ?? "0000";
      return bb.localeCompare(aa);
    }), [query, provider, status, sort, showUnknown]);
  const selected = useMemo(() => AI_MODELS.find(m => m.id === focused) ?? sortedModels[0], [focused, sortedModels]);
  const costs = selected && selected.inputPrice !== null && selected.outputPrice !== null
    ? (inputM * selected.inputPrice + outputM * selected.outputPrice)
    : null;
  const signals = useMemo(() => LIVE_ITEMS
    .filter(i => i.category === "Labs" && triggers.test(i.title))
    .filter(i => i.url.startsWith("https://"))
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 10), []);
  const snapshotAge = ageDays(LIVE_FEED.generatedAt);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-7 py-10 text-fg-1">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-4 mb-2">Sintra intelligence / separate model tracker</p>
          <h1 className="font-serif text-4xl sm:text-5xl mb-3">Model Watch</h1>
          <p className="text-fg-3 max-w-2xl leading-relaxed">Compare documented models and indicative API prices, inspect primary-source release signals, and see exactly when each claim was last checked.</p>
        </div>
        <a href={withBasePath("/models/")} className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10">Full model comparison <ArrowUpRight size={14} className="inline" /></a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
        <div className="rounded-2xl bg-white/[0.035] border border-white/10 p-4"><p className="text-xs text-fg-4">Catalogued models</p><p className="font-serif text-3xl mt-2">{AI_MODELS.length}</p><p className="text-xs text-fg-4">Published records, not live API entitlements</p></div>
        <div className="rounded-2xl bg-white/[0.035] border border-white/10 p-4"><p className="text-xs text-fg-4">Primary-source feed snapshot</p><p className="font-serif text-3xl mt-2">{snapshotAge === null ? "Unknown" : snapshotAge === 0 ? "Today" : snapshotAge + "d ago"}</p><p className="text-xs text-fg-4">Refreshed on site builds, not continuous streaming</p></div>
        <div className="rounded-2xl bg-white/[0.035] border border-white/10 p-4"><p className="text-xs text-fg-4">Official lab release signals</p><p className="font-serif text-3xl mt-2">{signals.length}</p><p className="text-xs text-fg-4">Headline candidates, not independently validated specs</p></div>
      </div>

      <div className="rounded-xl border border-amber-400/25 bg-amber-400/[0.035] p-4 mb-7 text-sm">
        <Info size={16} className="inline mr-2 text-amber-300" />
        <strong>Evidence boundary:</strong> Price and capability entries are dated, manually maintained records, not live vendor billing. Unknown is not free; different benchmark versions cannot be ranked fairly. The news feed detects releases but does not automatically certify pricing changes.
      </div>

      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal size={16} className="text-fg-4" />
        <h2 className="font-serif text-2xl">Model catalogue</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <label className="flex items-center gap-2 rounded-xl border border-white/10 p-3 text-sm">
          <Search size={14} className="text-fg-4" />
          <input aria-label="Search models" placeholder="Search model, provider, use case" value={query} onChange={e => setQuery(e.target.value)} className="w-full bg-transparent outline-none text-fg-1 placeholder:text-fg-4" />
        </label>
        <select aria-label="Filter provider" value={provider} onChange={e => setProvider(e.target.value)} className="rounded-xl border border-white/10 bg-void p-3 text-sm">
          <option value="all">All providers</option>{providers.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select aria-label="Filter model status" value={status} onChange={e => setStatus(e.target.value as Status)} className="rounded-xl border border-white/10 bg-void p-3 text-sm">
          <option value="all">All availability states</option><option value="available">Available</option><option value="preview">Preview</option><option value="deprecated">Deprecated</option>
        </select>
        <select aria-label="Sort models" value={sort} onChange={e => setSort(e.target.value as Sort)} className="rounded-xl border border-white/10 bg-void p-3 text-sm">
          <option value="release">Newest release/verification</option><option value="price">Lowest listed input price</option><option value="context">Largest context</option><option value="name">Alphabetical</option>
        </select>
      </div>
      <label className="flex items-center gap-2 text-xs text-fg-3 mb-4"><input type="checkbox" checked={showUnknown} onChange={e => setShowUnknown(e.target.checked)} /> Include unknown API prices</label>
      <div className="overflow-x-auto rounded-2xl border border-white/10 mb-8">
        <table className="min-w-[750px] w-full text-left">
          <thead className="bg-white/[0.04] font-mono text-[11px] uppercase tracking-wide text-fg-4"><tr><th className="p-3">Model</th><th>Provider / status</th><th>Context</th><th>Input / 1M</th><th>Output / 1M</th><th>Evidence age</th><th className="p-3">Details</th></tr></thead>
          <tbody>
          {sortedModels.map(m => <tr key={m.id} className={"border-t border-white/[0.06] text-xs hover:bg-white/[0.03] " + (selected?.id === m.id ? "bg-white/[0.035]" : "")}>
            <td className="p-3 font-medium">{m.name}<div className="font-mono text-[10px] text-fg-4">{m.apiId ?? m.id}</div></td>
            <td>{m.provider}<div className="text-fg-4">{m.status}</div></td>
            <td>{m.contextWindow ? m.contextWindow.toLocaleString() + "k" : "Unknown"}</td>
            <td>{usd(m.inputPrice)}</td><td>{usd(m.outputPrice)}</td>
            <td title={"Last checked: " + m.lastVerified} className="text-fg-3">{verification(m)}<div className="text-fg-4">{m.lastVerified}</div></td>
            <td className="p-3"><button type="button" className="underline underline-offset-4 hover:text-white" onClick={() => setFocused(m.id)}>Inspect</button></td>
          </tr>)}
          </tbody>
        </table>
        {!sortedModels.length && <p className="p-4 text-fg-3">No models match these filters. Try including unknown prices.</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
        <section className="rounded-2xl border border-white/10 p-5 bg-white/[0.02]">
          <h2 className="font-serif text-2xl mb-2">Selected model and source</h2>
          {selected ? <>
            <p className="text-lg font-semibold">{selected.name}</p><p className="text-fg-3 text-sm">{selected.provider} · {selected.status} · verified {selected.lastVerified}</p>
            <p className="text-sm my-3 text-fg-3">{selected.highlight}</p>
            <p className="text-xs text-fg-4 mb-3">Best for (publisher description, not our evaluated recommendation): {selected.bestFor.join(", ") || "Unspecified"}</p>
            <a target="_blank" rel="noopener noreferrer" href={selected.docsUrl} className="text-sm underline underline-offset-4">View original model documentation <ArrowUpRight size={13} className="inline" /></a>
          </> : <p className="text-sm">No model selected.</p>}
        </section>
        <section className="rounded-2xl border border-white/10 p-5 bg-white/[0.02]">
          <h2 className="font-serif text-2xl mb-1">API cost sandbox</h2>
          <p className="text-xs text-fg-4 mb-4">Monthly volume, USD. Excludes discounts, tools, caching, taxes, enterprise terms and fixed subscriptions.</p>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs">Input tokens (millions)<input type="number" min="0" step="0.1" value={inputM} onChange={e => setInputM(Math.max(0, Number(e.target.value) || 0))} className="block w-full mt-2 rounded-lg p-2 bg-white/[0.05] border border-white/10" /></label>
            <label className="text-xs">Output tokens (millions)<input type="number" min="0" step="0.1" value={outputM} onChange={e => setOutputM(Math.max(0, Number(e.target.value) || 0))} className="block w-full mt-2 rounded-lg p-2 bg-white/[0.05] border border-white/10" /></label>
          </div>
          <p className="font-serif text-3xl mt-4">{costs === null ? "Unknown cost" : usd(costs)}</p>
          <p className="text-xs text-fg-4">For {selected?.name ?? "selected model"} using listed prices last checked {selected?.lastVerified ?? "unknown"}.</p>
        </section>
      </div>

      <div className="flex items-center gap-2 mb-3"><ArrowDownUp size={16} className="text-fg-4" /><h2 className="font-serif text-2xl">Recent primary-source signals</h2></div>
      <p className="text-sm text-fg-3 mb-4">These are official feed headlines matching model/API topics. They are not independently validated model specifications or pricing updates.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {signals.map(s => <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/10 hover:bg-white/[0.035] p-4">
          <div className="flex justify-between items-start gap-2"><p className="text-xs text-fg-4">{s.source} · {s.publishedAt?.slice(0, 10) ?? "Undated"}</p><ArrowUpRight size={14} className="text-fg-4" /></div>
          <p className="mt-2 font-medium group-hover:underline underline-offset-4">{s.title}</p>
        </a>)}
        {!signals.length && <p className="text-sm text-fg-3">No qualifying official release signals in this build snapshot.</p>}
      </div>
      <p className="text-xs text-fg-4 border-t border-white/10 pt-4">Last feed build: {LIVE_FEED.generatedAt}. Public catalog only. Private subscription entitlements, invoice data and evaluation results are deliberately excluded.</p>
    </div>
  );
}
