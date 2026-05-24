import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { USE_CASES, DIFF_COLOR, CAT_ACCENT, BASE_PATH } from "@/lib/data";
import { CATEGORIES } from "@/lib/data";
import { getLaunchUrl, getLaunchLabel } from "@/lib/launchInAI";
import PromptPageClient from "./PromptPageClient";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

export function generateStaticParams() {
  return USE_CASES.map(u => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = USE_CASES.find(u => u.slug === slug);
  if (!item) return { title: "Not Found" };

  const catLabel = CATEGORIES.find(c => c.id === item.category)?.label ?? item.category;
  const desc = item.outcome || item.desc;

  return {
    title: `${item.title} — ${catLabel} AI Prompt | Sintra Tesseract`,
    description: `${desc} Best model: ${item.best_llm}. Difficulty: ${item.difficulty}. Est. time: ${item.est_time}.`,
    keywords: [...item.tags, item.category, item.difficulty, "AI prompt", "ChatGPT prompt", "Claude prompt"],
    openGraph: {
      title: item.title,
      description: desc,
      url: `${SITE_URL}/prompts/${item.slug}/`,
      type: "article",
      images: [{ url: `${SITE_URL}/tesseract-hero.webp`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: desc,
    },
    alternates: { canonical: `${SITE_URL}/prompts/${item.slug}/` },
  };
}

export default async function PromptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = USE_CASES.find(u => u.slug === slug);
  if (!item) notFound();

  const catColor  = CAT_ACCENT[item.category] || "#9F8CFF";
  const diffColor = DIFF_COLOR[item.difficulty];
  const catLabel  = CATEGORIES.find(c => c.id === item.category)?.label ?? item.category;

  // Related: same category, different item, up to 3
  const related = USE_CASES
    .filter(u => u.category === item.category && u.id !== item.id)
    .slice(0, 3);

  // JSON-LD HowTo structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: item.title,
    description: item.outcome || item.desc,
    step: item.inputs.length > 0
      ? item.inputs.map((inp, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: inp.label,
          text: `Provide: ${inp.label}`,
        }))
      : [{ "@type": "HowToStep", position: 1, name: "Copy prompt", text: "Copy the prompt and paste it into your AI assistant." }],
    tool: item.tools.map(t => ({ "@type": "HowToTool", name: t })),
    totalTime: item.est_time ? `PT${item.est_time.replace(/\D/g, "")}M` : undefined,
    supply: [{ "@type": "HowToSupply", name: item.best_llm }],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-abyss text-fg-1">
        {/* Ambient */}
        <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background: `radial-gradient(circle, ${catColor}, transparent 70%)` }} />
        </div>

        <div className="relative z-10 max-w-[860px] mx-auto px-6 md:px-8 pt-10 pb-24">
          {/* Back nav */}
          <div className="flex items-center gap-4 mb-10">
            <Link
              href={`${BASE_PATH}/`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Sintra
            </Link>
            <span className="text-fg-4">/</span>
            <span className="font-mono text-[11px] text-fg-4" style={{ color: catColor }}>{catLabel}</span>
          </div>

          {/* Accent top bar */}
          <div className="h-[3px] w-20 rounded-full mb-8"
            style={{ background: `linear-gradient(90deg, ${catColor}, transparent)` }} />

          {/* Eyebrow */}
          <div className="flex items-center gap-3 flex-wrap font-mono text-[11px] tracking-[0.14em] uppercase mb-4">
            <span className="w-2 h-2 rounded-full" style={{ background: diffColor, boxShadow: `0 0 8px ${diffColor}` }} />
            <span style={{ color: diffColor }}>{item.difficulty}</span>
            <span className="text-fg-4">·</span>
            <span style={{ color: catColor }}>{catLabel}</span>
            {item.est_time && (
              <>
                <span className="text-fg-4">·</span>
                <span className="text-fg-4 normal-case tracking-normal">{item.est_time}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="font-serif font-light text-[clamp(32px,5vw,60px)] leading-[1.06] tracking-[-0.02em] text-fg-1 mb-5">
            {item.title}
          </h1>

          {/* Outcome */}
          {item.outcome && (
            <p className="font-serif italic text-[18px] md:text-[20px] leading-[1.5] text-fg-2 mb-8 border-l-2 pl-5"
              style={{ borderColor: catColor }}>
              {item.outcome}
            </p>
          )}

          {/* Trust badges */}
          {(item.confidence || (item.region && item.region !== "global") || item.last_verified) && (
            <div className="flex flex-wrap gap-2 mb-8">
              {item.confidence && (
                <span className={`font-mono text-[10px] px-2.5 py-1 rounded-full border tracking-[0.08em] uppercase ${
                  item.confidence === "high" ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" :
                  item.confidence === "medium" ? "border-amber-500/40 text-amber-400 bg-amber-500/10" :
                  "border-red-500/40 text-red-400 bg-red-500/10"
                }`}>
                  {item.confidence === "high" ? "✓" : item.confidence === "medium" ? "~" : "?"} {item.confidence} confidence
                </span>
              )}
              {item.region && item.region !== "global" && (
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-blue-500/40 text-blue-300 bg-blue-500/10 tracking-[0.08em] uppercase">
                  {item.region === "brazil" ? "🇧🇷" : item.region === "latam" ? "🌎" : item.region === "us" ? "🇺🇸" : "🇪🇺"} {item.region}
                </span>
              )}
              {item.last_verified && (
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/[0.12] text-fg-4 bg-white/[0.04] tracking-[0.06em]">
                  verified {item.last_verified}
                </span>
              )}
            </div>
          )}

          {/* LLM recommendation */}
          <div className="flex items-start gap-3 rounded-xl px-4 py-3 mb-8 border border-violet/20 bg-violet/[0.06]">
            <span className="font-mono text-[18px] text-violet-bright leading-none mt-0.5">⬡</span>
            <div>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 block mb-1">Recommended model</span>
              <span className="font-serif text-[15px] text-fg-1 font-medium">{item.best_llm}</span>
              <p className="font-sans text-[13px] text-fg-3 mt-0.5 leading-[1.45]">{item.llm_reason}</p>
            </div>
          </div>

          {/* What you'll need */}
          {item.inputs.length > 0 && (
            <div className="mb-8">
              <h2 className="eyebrow block mb-3">What you need to fill in</h2>
              <div className="flex flex-wrap gap-2">
                {item.inputs.map(inp => (
                  <span key={inp.label} className="font-mono text-[12px] px-2.5 py-1.5 rounded-sm bg-steel border border-hairline text-cyan-ice">
                    [{inp.label}]
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {item.tools.length > 0 && (
            <div className="mb-8">
              <h2 className="eyebrow block mb-3">Tools used</h2>
              <div className="flex flex-wrap gap-1.5">
                {item.tools.map(t => (
                  <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-sm bg-violet/[0.08] text-fg-2 border border-violet/20">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* The prompt — copy/open handled client-side */}
          <PromptPageClient item={item} catColor={catColor} />

          {/* Sample output */}
          {item.sample_output && (
            <div className="mb-10">
              <h2 className="eyebrow block mb-3">Sample output</h2>
              <div className="sample-output rounded-xl border border-hairline bg-white/[0.02] p-5 font-mono text-[12px] text-fg-2 leading-[1.7] whitespace-pre-wrap">
                {item.sample_output}
              </div>
            </div>
          )}

          {/* Related tools */}
          {item.related_tools && item.related_tools.length > 0 && (
            <div className="mb-10">
              <h2 className="eyebrow block mb-3">Try with these tools</h2>
              <div className="flex flex-wrap gap-2">
                {item.related_tools.map(toolId => (
                  <Link
                    key={toolId}
                    href={`${BASE_PATH}/tools/${toolId}/`}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-full border border-violet/30 text-violet-bright bg-violet/[0.06] hover:bg-violet/[0.14] transition-colors capitalize"
                  >
                    {toolId.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-10">
              {item.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}

          {/* Related prompts */}
          {related.length > 0 && (
            <div className="border-t border-hairline pt-10">
              <h2 className="eyebrow block mb-5">More in {catLabel}</h2>
              <div className="flex flex-col gap-3">
                {related.map(r => (
                  <Link
                    key={r.id}
                    href={`${BASE_PATH}/prompts/${r.slug}/`}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] hover:border-violet/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: catColor }} />
                    <div>
                      <p className="font-serif text-[15px] text-fg-1 group-hover:text-violet-bright transition-colors">{r.title}</p>
                      <p className="font-sans text-[12px] text-fg-3 mt-0.5 line-clamp-1">{r.outcome || r.desc}</p>
                    </div>
                    <span className="ml-auto font-mono text-[10px] text-fg-4 capitalize shrink-0 pt-1">{r.difficulty}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
