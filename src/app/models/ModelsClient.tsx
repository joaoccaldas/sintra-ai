"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Calculator, ChevronDown, ChevronUp, ExternalLink, Info } from "lucide-react";
import ModelWizard from "@/components/ModelWizard";
import ModelCompare from "@/components/ModelCompare";
import {
  AI_MODELS,
  MODEL_PROVIDERS,
  SPEED_META,
  TIER_META,
  type ModelEntry,
  type ModelTier,
} from "@/lib/modelsData";

function formatContext(thousands: number): string {
  return thousands >= 1000 ? `${thousands / 1000}M` : `${thousands}k`;
}

function formatPrice(value: number | null): string {
  if (value === null) return "—";
  return value < 1 ? `$${value.toFixed(2)}` : `$${value}`;
}

function Score({ value, warningThreshold = 60 }: { value: number | null; warningThreshold?: number }) {
  if (value === null) return <span className="text-fg-4 text-xs">—</span>;
  const color = value >= 80 ? "#10b981" : value >= warningThreshold ? "#f59e0b" : "#ef4444";
  return <span className="text-xs font-mono font-medium" style={{ color }}>{value}%</span>;
}

function BooleanMark({ value }: { value: boolean }) {
  return value
    ? <span className="text-[11px] text-emerald-400" aria-label="Yes">✓</span>
    : <span className="text-[11px] text-fg-4" aria-label="No">—</span>;
}

type SortKey = "name" | "contextWindow" | "inputPrice" | "mmlu" | "gpqa" | "sweBench" | "mathAime";

function latestVerificationLabel(): string {
  const latest = AI_MODELS.map(model => model.lastVerified).sort((a, b) => b.localeCompare(a))[0];
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${latest}T00:00:00Z`));
}

function QuickPicks({ onSelect }: { onSelect: (model: ModelEntry) => void }) {
  const fastValue = useMemo(
    () => [...AI_MODELS]
      .filter(model => model.speed === "fast" && model.inputPrice !== null)
      .sort((a, b) => (a.inputPrice ?? Infinity) - (b.inputPrice ?? Infinity))[0],
    [],
  );
  const cheapest = useMemo(
    () => [...AI_MODELS]
      .filter(model => model.inputPrice !== null)
      .sort((a, b) => (a.inputPrice ?? Infinity) - (b.inputPrice ?? Infinity))[0],
    [],
  );
  const reportedCodingLeader = useMemo(
    () => [...AI_MODELS]
      .filter(model => model.sweBench !== null)
      .sort((a, b) => (b.sweBench ?? 0) - (a.sweBench ?? 0))[0],
    [],
  );

  const picks = [
    { label: "Lowest-cost fast model", model: fastValue, detail: fastValue ? `${formatPrice(fastValue.inputPrice)}/1M input` : "", accent: "#5EEAD4" },
    { label: "Cheapest listed API", model: cheapest, detail: cheapest ? `${formatPrice(cheapest.inputPrice)}/1M input` : "", accent: "#10b981" },
    { label: "Highest reported coding score", model: reportedCodingLeader, detail: reportedCodingLeader ? `SWE ${reportedCodingLeader.sweBench}%` : "", accent: "#9F8CFF" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
      {picks.map(pick => pick.model && (
        <button
          type="button"
          key={pick.label}
          onClick={() => onSelect(pick.model!)}
          className="group flex flex-col gap-2 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-200 text-left"
        >
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4">{pick.label}</span>
          <span>
            <span className="block font-serif text-[17px] text-fg-1 leading-snug group-hover:text-white transition-colors">{pick.model.name}</span>
            <span className="block font-mono text-[10px] mt-0.5" style={{ color: pick.model.providerColor }}>{pick.model.provider}</span>
          </span>
          <span className="mt-auto font-mono text-[11px]" style={{ color: pick.accent }}>{pick.detail}</span>
        </button>
      ))}
    </div>
  );
}

export default function ModelsClient() {
  const [tierFilter, setTierFilter] = useState<ModelTier | "all">("all");
  const [providerFilter, setProviderFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("model");
  });

  const selected = useMemo(() => AI_MODELS.find(model => model.id === selectedId) ?? null, [selectedId]);
  const tiers: ModelTier[] = ["flagship", "balanced", "efficient", "reasoning", "open"];

  useEffect(() => {
    const url = new URL(window.location.href);
    selectedId ? url.searchParams.set("model", selectedId) : url.searchParams.delete("model");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    if (selectedId) {
      window.setTimeout(() => document.getElementById(`model-${selectedId}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    }
  }, [selectedId]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDirection(direction => direction === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDirection(key === "name" ? "asc" : "desc");
    }
  }

  const filtered = useMemo(() => {
    const list = AI_MODELS.filter(model =>
      (tierFilter === "all" || model.tier === tierFilter) &&
      (providerFilter === "all" || model.provider === providerFilter),
    );

    return list.sort((a, b) => {
      const aValue = sortKey === "name" ? a.name : a[sortKey];
      const bValue = sortKey === "name" ? b.name : b[sortKey];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      const left = aValue ?? (sortDirection === "asc" ? Infinity : -Infinity);
      const right = bValue ?? (sortDirection === "asc" ? Infinity : -Infinity);
      return sortDirection === "asc" ? Number(left) - Number(right) : Number(right) - Number(left);
    });
  }, [providerFilter, sortDirection, sortKey, tierFilter]);

  const selectModel = useCallback((model: ModelEntry) => {
    setSelectedId(current => current === model.id ? null : model.id);
  }, []);

  function SortButton({ column, label }: { column: SortKey; label: string }) {
    const active = sortKey === column;
    return (
      <button
        type="button"
        onClick={() => handleSort(column)}
        className={`flex items-center gap-0.5 font-mono text-[10px] tracking-[0.08em] uppercase whitespace-nowrap transition-colors ${active ? "text-violet-bright" : "text-fg-4 hover:text-fg-2"}`}
        aria-label={`Sort by ${label}`}
      >
        {label}
        {active
          ? sortDirection === "asc" ? <ChevronUp size={10} /> : <ChevronDown size={10} />
          : <ChevronDown size={10} className="opacity-30" />}
      </button>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-4">Reference</span>
        </div>
        <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-light text-fg-1 mb-3">AI model comparison</h1>
        <p className="text-fg-2 text-[17px] max-w-2xl mb-6">
          Compare listed API pricing, context windows, capabilities, and reported benchmark scores across {AI_MODELS.length} models.
        </p>
        <p className="text-[12px] text-fg-4 flex items-start gap-1.5 max-w-3xl">
          <Info size={12} className="mt-0.5 shrink-0" />
          Pricing and benchmarks change frequently and may use different evaluation settings. Verify provider documentation before production decisions. Latest item verification: {latestVerificationLabel()}.
        </p>
      </header>

      <QuickPicks onSelect={selectModel} />
      <ModelWizard />
      <ModelCompare />

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Model tier filter">
          <button
            type="button"
            onClick={() => setTierFilter("all")}
            aria-pressed={tierFilter === "all"}
            className={`px-3 py-1.5 rounded-full border font-mono text-[10px] tracking-[0.06em] transition-all ${tierFilter === "all" ? "bg-violet/20 border-violet/60 text-violet-bright" : "border-white/10 text-fg-3 hover:border-white/20"}`}
          >All tiers</button>
          {tiers.map(tier => (
            <button
              type="button"
              key={tier}
              onClick={() => setTierFilter(tier === tierFilter ? "all" : tier)}
              aria-pressed={tierFilter === tier}
              className={`px-3 py-1.5 rounded-full border font-mono text-[10px] tracking-[0.06em] transition-all ${tierFilter === tier ? "border-current" : "border-white/10 text-fg-3 hover:border-white/20"}`}
              style={tierFilter === tier ? { color: TIER_META[tier].color, borderColor: `${TIER_META[tier].color}88`, background: `${TIER_META[tier].color}18` } : undefined}
            >
              {TIER_META[tier].label}
            </button>
          ))}
        </div>

        <select
          value={providerFilter}
          onChange={event => setProviderFilter(event.target.value)}
          className="font-mono text-[11px] bg-white/[0.04] border border-hairline rounded-lg px-3 py-1.5 text-fg-2 outline-none focus:border-violet/60 transition-colors"
          aria-label="Filter by provider"
        >
          <option value="all">All providers</option>
          {MODEL_PROVIDERS.map(provider => <option key={provider} value={provider}>{provider}</option>)}
        </select>

        <span className="font-mono text-[11px] text-fg-4 ml-auto" role="status">{filtered.length} models</span>
      </div>

      <div className="hidden md:block rounded-2xl border border-white/[0.07] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/[0.07]">
                <th className="px-4 py-3 w-52 sticky left-0 bg-[#0d0a1c]"><SortButton column="name" label="Model" /></th>
                <th className="px-3 py-3 w-28"><span className="font-mono text-[10px] uppercase text-fg-4">Tier</span></th>
                <th className="px-3 py-3 w-24"><SortButton column="contextWindow" label="Context" /></th>
                <th className="px-3 py-3 w-28"><SortButton column="inputPrice" label="Price in/out" /></th>
                <th className="px-3 py-3 w-20"><SortButton column="mmlu" label="MMLU" /></th>
                <th className="px-3 py-3 w-20"><SortButton column="gpqa" label="GPQA" /></th>
                <th className="px-3 py-3 w-20"><SortButton column="sweBench" label="SWE" /></th>
                <th className="px-3 py-3 w-20"><SortButton column="mathAime" label="AIME" /></th>
                <th className="px-3 py-3 w-12 text-center"><span className="font-mono text-[10px] uppercase text-fg-4">MM</span></th>
                <th className="px-3 py-3 w-12 text-center"><span className="font-mono text-[10px] uppercase text-fg-4">OS</span></th>
                <th className="px-3 py-3 w-20"><span className="font-mono text-[10px] uppercase text-fg-4">Speed</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((model, index) => {
                const tier = TIER_META[model.tier];
                const speed = SPEED_META[model.speed];
                const active = selectedId === model.id;
                return (
                  <tr
                    id={`model-${model.id}`}
                    key={model.id}
                    tabIndex={0}
                    onClick={() => selectModel(model)}
                    onKeyDown={event => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectModel(model);
                      }
                    }}
                    aria-selected={active}
                    className={`border-b border-white/[0.04] cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-bright ${active ? "bg-violet/[0.06]" : index % 2 === 0 ? "hover:bg-white/[0.02]" : "bg-white/[0.015] hover:bg-white/[0.03]"}`}
                  >
                    <td className="px-4 py-3 sticky left-0 bg-inherit">
                      <span className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-fg-1">{model.name}</span>
                        <span className="font-mono text-[10px]" style={{ color: model.providerColor }}>{model.provider}</span>
                      </span>
                    </td>
                    <td className="px-3 py-3"><span className="font-mono text-[10px] px-1.5 py-0.5 rounded border" style={{ color: tier.color, borderColor: `${tier.color}44`, background: `${tier.color}14` }}>{tier.label}</span></td>
                    <td className="px-3 py-3 font-mono text-xs text-fg-2">{formatContext(model.contextWindow)}</td>
                    <td className="px-3 py-3"><span className="flex flex-col gap-0.5"><span className="font-mono text-[11px] text-fg-1">{formatPrice(model.inputPrice)}</span><span className="font-mono text-[10px] text-fg-4">{formatPrice(model.outputPrice)} out</span></span></td>
                    <td className="px-3 py-3 text-center"><Score value={model.mmlu} /></td>
                    <td className="px-3 py-3 text-center"><Score value={model.gpqa} /></td>
                    <td className="px-3 py-3 text-center"><Score value={model.sweBench} warningThreshold={40} /></td>
                    <td className="px-3 py-3 text-center"><Score value={model.mathAime} warningThreshold={50} /></td>
                    <td className="px-3 py-3 text-center"><BooleanMark value={model.multimodal} /></td>
                    <td className="px-3 py-3 text-center"><BooleanMark value={model.openSource} /></td>
                    <td className="px-3 py-3"><span className="font-mono text-[10px]" style={{ color: speed.color }}>{speed.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {filtered.map(model => {
          const tier = TIER_META[model.tier];
          const active = selectedId === model.id;
          return (
            <button
              type="button"
              id={`model-${model.id}`}
              key={model.id}
              onClick={() => selectModel(model)}
              aria-pressed={active}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${active ? "border-violet/40 bg-violet/[0.06]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"}`}
            >
              <span className="flex items-start justify-between mb-2">
                <span><span className="block font-medium text-fg-1 text-sm">{model.name}</span><span className="block font-mono text-[10px] mt-0.5" style={{ color: model.providerColor }}>{model.provider}</span></span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border shrink-0" style={{ color: tier.color, borderColor: `${tier.color}44`, background: `${tier.color}14` }}>{tier.label}</span>
              </span>
              <span className="grid grid-cols-3 gap-2 text-center">
                <span><span className="block font-mono text-[9px] text-fg-4 uppercase">Context</span><span className="block font-mono text-xs text-fg-2 mt-0.5">{formatContext(model.contextWindow)}</span></span>
                <span><span className="block font-mono text-[9px] text-fg-4 uppercase">Price/1M</span><span className="block font-mono text-xs text-fg-2 mt-0.5">{formatPrice(model.inputPrice)}</span></span>
                <span><span className="block font-mono text-[9px] text-fg-4 uppercase">MMLU</span><span className="block mt-0.5"><Score value={model.mmlu} /></span></span>
              </span>
            </button>
          );
        })}
      </div>

      {selected && <ModelDetail model={selected} />}

      <div className="mt-8 pt-6 border-t border-white/[0.05] grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "MMLU", description: "General knowledge across many academic subjects" },
          { label: "GPQA", description: "Graduate-level science questions" },
          { label: "SWE", description: "Reported SWE-bench Verified issue-resolution rate" },
          { label: "AIME", description: "Competition mathematics accuracy" },
        ].map(item => (
          <div key={item.label}>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-violet-bright mb-1">{item.label}</p>
            <p className="text-[12px] text-fg-4 leading-snug">{item.description}</p>
          </div>
        ))}
      </div>

      <CostCalculator />
    </div>
  );
}

function ModelDetail({ model }: { model: ModelEntry }) {
  return (
    <section className="mt-6 p-6 rounded-2xl border border-violet/20 bg-violet/[0.04]" aria-labelledby={`model-detail-${model.id}`}>
      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <div>
          <h2 id={`model-detail-${model.id}`} className="text-xl font-bold text-fg-1">{model.name}</h2>
          <p className="font-mono text-[11px] mt-1" style={{ color: model.providerColor }}>{model.provider} · {model.releaseDate} · verified {model.lastVerified}</p>
        </div>
        <a href={model.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-lg border border-violet/30 text-violet-bright hover:bg-violet/10 transition-colors">
          Provider docs <ExternalLink size={11} />
        </a>
      </div>

      <p className="text-sm text-fg-2 mb-5">{model.highlight}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <Stat label="Context window" value={formatContext(model.contextWindow)} />
        <Stat label="Input price" value={model.inputPrice !== null ? `${formatPrice(model.inputPrice)}/1M` : "No public API"} note={model.priceNote} />
        <Stat label="Output price" value={model.outputPrice !== null ? `${formatPrice(model.outputPrice)}/1M` : "—"} />
        <Stat label="Speed category" value={SPEED_META[model.speed].label} color={SPEED_META[model.speed].color} />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-5">
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-2">Reported benchmarks</p>
          <div className="space-y-1.5">
            {([
              ["MMLU", model.mmlu],
              ["GPQA", model.gpqa],
              ["SWE-bench Verified", model.sweBench],
              ["AIME", model.mathAime],
            ] as [string, number | null][]).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between"><span className="text-xs text-fg-3">{label}</span><Score value={value} /></div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-2">Capabilities</p>
          <div className="space-y-1.5">
            {([
              ["Multimodal", model.multimodal],
              ["Extended thinking", model.extendedThinking],
              ["Web search", model.webSearch],
              ["Code execution", model.codeExecution],
              ["Open weights", model.openSource],
            ] as [string, boolean][]).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between"><span className="text-xs text-fg-3">{label}</span><BooleanMark value={value} /></div>
            ))}
          </div>
        </div>
      </div>

      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-2">Best for</p>
      <div className="flex flex-wrap gap-1.5">
        {model.bestFor.map(item => <span key={item} className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-fg-2">{item}</span>)}
      </div>
      {model.apiId && <p className="mt-4 font-mono text-[10px] text-fg-4">API identifier: <code className="text-fg-2">{model.apiId}</code></p>}
    </section>
  );
}

function CostCalculator() {
  const [inputTokens, setInputTokens] = useState(500);
  const [outputTokens, setOutputTokens] = useState(800);
  const [requestsPerDay, setRequestsPerDay] = useState(1000);
  const monthlyRequests = requestsPerDay * 30;

  const priceable = useMemo(() => AI_MODELS
    .filter(model => model.inputPrice !== null && model.outputPrice !== null)
    .sort((a, b) => {
      const aCost = (a.inputPrice! * inputTokens + a.outputPrice! * outputTokens) / 1_000_000;
      const bCost = (b.inputPrice! * inputTokens + b.outputPrice! * outputTokens) / 1_000_000;
      return aCost - bCost;
    }), [inputTokens, outputTokens]);

  const monthlyCost = useCallback((model: ModelEntry) => {
    if (model.inputPrice === null || model.outputPrice === null) return "—";
    const requestCost = (model.inputPrice * inputTokens + model.outputPrice * outputTokens) / 1_000_000;
    const total = requestCost * monthlyRequests;
    if (total < 0.01) return "< $0.01";
    if (total < 1) return `$${total.toFixed(3)}`;
    if (total < 1000) return `$${total.toFixed(2)}`;
    return `$${(total / 1000).toFixed(1)}k`;
  }, [inputTokens, monthlyRequests, outputTokens]);

  const cheapest = priceable[0];

  return (
    <section className="mt-12 pt-10 border-t border-white/[0.06]" aria-labelledby="cost-calculator-title">
      <div className="flex items-center gap-2 mb-3">
        <Calculator size={16} className="text-violet-bright" />
        <h2 id="cost-calculator-title" className="font-serif text-[22px] text-fg-1">Cost calculator</h2>
      </div>
      <p className="font-sans text-[14px] text-fg-3 mb-8 max-w-2xl">Estimate monthly API spend using the listed token prices. Discounts, caching, free tiers, and batch pricing are not included.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-5 rounded-2xl border border-violet/[0.12] bg-violet/[0.03]">
        <NumberInput label="Input tokens per request" value={inputTokens} onChange={setInputTokens} min={1} max={500000} step={100} />
        <NumberInput label="Output tokens per request" value={outputTokens} onChange={setOutputTokens} min={1} max={100000} step={100} />
        <NumberInput label="Requests per day" value={requestsPerDay} onChange={setRequestsPerDay} min={1} max={10000000} step={100} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <Stat label="Tokens per request" value={(inputTokens + outputTokens).toLocaleString()} />
        <Stat label="Requests per month" value={monthlyRequests.toLocaleString()} />
        <Stat label="Cheapest listed option" value={cheapest ? `${cheapest.name} · ${monthlyCost(cheapest)}/mo` : "—"} />
      </div>

      <div className="rounded-xl border border-white/[0.07] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-white/[0.03] border-b border-white/[0.07]"><th className="px-4 py-2.5 font-mono text-[10px] uppercase text-fg-4">Model</th><th className="px-4 py-2.5 font-mono text-[10px] uppercase text-fg-4">Provider</th><th className="px-4 py-2.5 font-mono text-[10px] uppercase text-fg-4 text-right">Per request</th><th className="px-4 py-2.5 font-mono text-[10px] uppercase text-fg-4 text-right">Monthly</th></tr></thead>
            <tbody>
              {priceable.map((model, index) => {
                const perRequest = (model.inputPrice! * inputTokens + model.outputPrice! * outputTokens) / 1_000_000;
                return (
                  <tr key={model.id} className={`border-b border-white/[0.04] ${index === 0 ? "bg-emerald-500/[0.06]" : index % 2 ? "bg-white/[0.015]" : ""}`}>
                    <td className="px-4 py-2.5 text-sm text-fg-1">{model.name}{index === 0 && <span className="ml-2 font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">cheapest</span>}</td>
                    <td className="px-4 py-2.5 font-mono text-[11px]" style={{ color: model.providerColor }}>{model.provider}</td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-fg-3 text-right">{perRequest < 0.0001 ? `$${perRequest.toExponential(1)}` : `$${perRequest.toFixed(4)}`}</td>
                    <td className="px-4 py-2.5 font-mono text-[13px] text-fg-2 text-right">{monthlyCost(model)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function NumberInput({ label, value, onChange, min, max, step }: { label: string; value: number; onChange: (value: number) => void; min: number; max: number; step: number }) {
  return (
    <label className="font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4">
      {label}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={event => onChange(Math.min(max, Math.max(min, Number(event.target.value) || min)))}
        className="mt-1.5 w-full bg-white/[0.04] border border-hairline rounded-lg px-3 py-2 font-mono text-[13px] text-fg-1 outline-none focus:border-violet/50 transition-colors"
      />
    </label>
  );
}

function Stat({ label, value, note, color }: { label: string; value: string; note?: string; color?: string }) {
  return (
    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-fg-4 mb-1">{label}</p>
      <p className="font-mono text-sm font-medium" style={{ color: color ?? "var(--fg-1)" }}>{value}</p>
      {note && <p className="text-[10px] text-fg-4 mt-0.5">{note}</p>}
    </div>
  );
}
