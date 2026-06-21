"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Calculator, RotateCcw } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import { MODEL_PRICES, PRICING_UPDATED, estimateTokens, type ModelPrice } from "@/lib/pricingData";

function fmtUSD(n: number): string {
  if (n === 0) return "$0";
  if (n < 0.01) return `$${n.toFixed(4)}`;
  if (n < 1) return `$${n.toFixed(3)}`;
  if (n < 100) return `$${n.toFixed(2)}`;
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

const SAMPLE = `You are a senior FP&A analyst. Write a concise, professional variance commentary for the following data: Revenue was $4.2M vs. $3.8M budget (+10.5%). The beat was driven by stronger enterprise renewals and one large new logo. Keep it to three sentences, no jargon.`;

export default function TokenCalculator() {
  const [text, setText] = useState("");
  const [outTokens, setOutTokens] = useState(500);
  const [callsPerMonth, setCallsPerMonth] = useState(10_000);
  const [prices, setPrices] = useState<ModelPrice[]>(() => MODEL_PRICES.map(m => ({ ...m })));

  const inTokens = useMemo(() => estimateTokens(text), [text]);

  const rows = useMemo(() => {
    return prices
      .map(m => {
        const perCall = (inTokens / 1e6) * m.input + (outTokens / 1e6) * m.output;
        const monthly = perCall * callsPerMonth;
        return { ...m, perCall, monthly };
      })
      .sort((a, b) => a.monthly - b.monthly);
  }, [prices, inTokens, outTokens, callsPerMonth]);

  const cheapest = rows[0]?.monthly ?? 0;

  const setPrice = (id: string, field: "input" | "output", value: number) => {
    setPrices(p => p.map(m => (m.id === id ? { ...m, [field]: isNaN(value) ? 0 : value } : m)));
  };

  const reset = () => {
    setText("");
    setOutTokens(500);
    setCallsPerMonth(10_000);
    setPrices(MODEL_PRICES.map(m => ({ ...m })));
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 md:px-8 py-12">
      <a
        href={`${BASE_PATH}/`}
        className="inline-flex items-center gap-2 font-mono text-[11px] text-fg-4 hover:text-violet-bright transition-colors mb-8"
      >
        <ArrowLeft size={13} /> Back to Sintra
      </a>

      <div className="flex items-center gap-3 mb-3">
        <Calculator size={22} className="text-violet-bright" />
        <h1 className="font-serif font-medium text-[clamp(30px,5vw,52px)] leading-[1.04] tracking-[-0.02em] text-fg-1">
          Token &amp; Cost Calculator
        </h1>
      </div>
      <p className="font-sans text-[15px] leading-[1.6] text-fg-3 max-w-2xl mb-10">
        Estimate token usage for any prompt and compare what it would cost to run across the
        major model APIs. Set your expected output length and monthly volume to project spend.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8">
        {/* ── Inputs ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="prompt-text" className="font-mono text-[11px] tracking-[0.1em] uppercase text-fg-3">
                Your prompt / input
              </label>
              <button
                onClick={() => setText(SAMPLE)}
                className="font-mono text-[10px] text-violet-bright/80 hover:text-violet-bright transition-colors"
              >
                Load sample
              </button>
            </div>
            <textarea
              id="prompt-text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your prompt, system message, or any text to estimate its token count…"
              rows={9}
              className="w-full bg-void border border-hairline rounded-lg px-4 py-3 font-mono text-[13px] leading-[1.6] text-cyan-ice placeholder:text-fg-4 outline-none focus:border-violet/50 transition-colors resize-y"
            />
            <div className="flex items-center gap-4 mt-2 font-mono text-[11px] text-fg-4">
              <span>{text.length.toLocaleString()} chars</span>
              <span className="text-violet-bright">≈ {inTokens.toLocaleString()} input tokens</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-fg-3">Output tokens / call</span>
              <input
                type="number" min={0} value={outTokens}
                onChange={e => setOutTokens(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-void border border-hairline rounded-lg px-3 py-2 font-mono text-[13px] text-fg-1 outline-none focus:border-violet/50 transition-colors"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-fg-3">Calls / month</span>
              <input
                type="number" min={0} value={callsPerMonth}
                onChange={e => setCallsPerMonth(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-void border border-hairline rounded-lg px-3 py-2 font-mono text-[13px] text-fg-1 outline-none focus:border-violet/50 transition-colors"
              />
            </label>
          </div>

          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase px-4 py-2.5 rounded-full border border-white/[0.1] text-fg-3 hover:border-violet/40 hover:text-violet-bright transition-all self-start"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        {/* ── Results ────────────────────────────────────────────── */}
        <div className="rounded-xl border border-hairline bg-white/[0.015] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="font-mono text-[10px] tracking-[0.08em] uppercase text-fg-3 font-medium px-4 py-3">Model</th>
                  <th className="font-mono text-[10px] tracking-[0.08em] uppercase text-fg-3 font-medium px-2 py-3 text-right">$/1M in</th>
                  <th className="font-mono text-[10px] tracking-[0.08em] uppercase text-fg-3 font-medium px-2 py-3 text-right">$/1M out</th>
                  <th className="font-mono text-[10px] tracking-[0.08em] uppercase text-fg-3 font-medium px-2 py-3 text-right">/ call</th>
                  <th className="font-mono text-[10px] tracking-[0.08em] uppercase text-fg-3 font-medium px-4 py-3 text-right">/ month</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className="border-b border-hairline/50 last:border-0 hover:bg-violet/[0.03] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: r.providerColor }} />
                        <div className="min-w-0">
                          <div className="font-sans text-[13px] text-fg-1 leading-tight truncate">{r.name}</div>
                          <div className="font-mono text-[9px] text-fg-4 uppercase tracking-[0.06em]">{r.provider}</div>
                        </div>
                        {i === 0 && (
                          <span className="font-mono text-[8px] tracking-[0.1em] uppercase px-1.5 py-0.5 rounded-full border border-cyan-ice/40 text-cyan-ice shrink-0">Cheapest</span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-right">
                      <input
                        type="number" step="0.01" min={0} value={r.input}
                        onChange={e => setPrice(r.id, "input", parseFloat(e.target.value))}
                        aria-label={`${r.name} input price per million tokens`}
                        className="w-14 bg-transparent border border-transparent hover:border-hairline focus:border-violet/50 rounded px-1.5 py-1 font-mono text-[12px] text-fg-2 text-right outline-none transition-colors"
                      />
                    </td>
                    <td className="px-2 py-3 text-right">
                      <input
                        type="number" step="0.01" min={0} value={r.output}
                        onChange={e => setPrice(r.id, "output", parseFloat(e.target.value))}
                        aria-label={`${r.name} output price per million tokens`}
                        className="w-14 bg-transparent border border-transparent hover:border-hairline focus:border-violet/50 rounded px-1.5 py-1 font-mono text-[12px] text-fg-2 text-right outline-none transition-colors"
                      />
                    </td>
                    <td className="px-2 py-3 text-right font-mono text-[12px] text-fg-3">{fmtUSD(r.perCall)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono text-[13px] text-fg-1">{fmtUSD(r.monthly)}</span>
                      {i > 0 && cheapest > 0 && r.monthly > 0 && (
                        <div className="font-mono text-[9px] text-fg-4">{(r.monthly / cheapest).toFixed(1)}× cheapest</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-mono text-[10px] leading-[1.5] text-fg-4 px-4 py-3 border-t border-hairline">
            Indicative list prices ({PRICING_UPDATED}) — click any price to override with your negotiated
            or current rate. Token counts are estimated (~4 chars/token); true counts depend on each
            model&apos;s tokenizer. Batch, cached, and volume tiers can lower cost substantially.
          </p>
        </div>
      </div>
    </div>
  );
}
