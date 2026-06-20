import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BASE_PATH, USE_CASES } from "@/lib/data";
import { AI_TOOLS, TOOL_CATEGORIES } from "@/lib/toolsData";
import ToolPageClient from "./ToolPageClient";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

const PRICING_LABEL: Record<string, string> = {
  free: "Free", freemium: "Freemium", paid: "Paid", enterprise: "Enterprise",
};

export function generateStaticParams() {
  return AI_TOOLS.map(t => ({ slug: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = AI_TOOLS.find(t => t.id === slug);
  if (!tool) return { title: "Not Found" };

  const cat = TOOL_CATEGORIES.find(c => c.id === tool.category);
  const desc = `${tool.tagline} ${tool.highlight} — ${PRICING_LABEL[tool.pricing]} · ${tool.provider}`;

  return {
    title: `${tool.name} — AI ${cat?.label ?? "Tool"} | Sintra Tesseract`,
    description: desc,
    keywords: [...tool.tags, tool.category, tool.provider, "AI tool", cat?.label ?? ""],
    openGraph: {
      title: `${tool.name} — ${tool.provider}`,
      description: tool.tagline,
      url: `${SITE_URL}/tools/${tool.id}/`,
      type: "website",
      images: [{ url: `${SITE_URL}/tesseract-hero.webp`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: tool.name, description: tool.tagline, images: [`${SITE_URL}/tesseract-hero.webp`] },
    alternates: { canonical: `${SITE_URL}/tools/${tool.id}/` },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = AI_TOOLS.find(t => t.id === slug);
  if (!tool) notFound();

  const cat = TOOL_CATEGORIES.find(c => c.id === tool.category);

  // Related tools: same category, up to 3
  const related = AI_TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  // Related prompts: use cases that list this tool in related_tools, up to 4
  const relatedPrompts = USE_CASES
    .filter(u => u.related_tools?.includes(tool.id))
    .slice(0, 4);

  // JSON-LD: SoftwareApplication + BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        applicationCategory: cat?.label ?? "AIApplication",
        offers: {
          "@type": "Offer",
          price: tool.pricing === "free" ? "0" : undefined,
          priceCurrency: "USD",
          availability: "https://schema.org/OnlineOnly",
          description: tool.priceNote,
        },
        url: tool.url,
        provider: { "@type": "Organization", name: tool.provider },
        keywords: tool.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Tools", item: `${SITE_URL}/tools/` },
          { "@type": "ListItem", position: 3, name: tool.name, item: `${SITE_URL}/tools/${tool.id}/` },
        ],
      },
    ],
  };

  const PRICING_COLOR: Record<string, string> = {
    free: "#10b981", freemium: "#6ee7a0", paid: "#9F8CFF", enterprise: "#e8c089",
  };
  const priceColor = PRICING_COLOR[tool.pricing];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-abyss text-fg-1">
        <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background: `radial-gradient(circle, ${priceColor}, transparent 70%)` }} />
        </div>

        <div className="relative z-10 max-w-[860px] mx-auto px-6 md:px-8 pt-10 pb-24">
          {/* Back nav */}
          <div className="flex items-center gap-4 mb-10">
            <Link
              href="/tools/"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              All tools
            </Link>
            {cat && (
              <>
                <span className="text-fg-4">/</span>
                <span className="font-mono text-[11px] text-fg-4">{cat.icon} {cat.label}</span>
              </>
            )}
          </div>

          <div className="h-[3px] w-20 rounded-full mb-8"
            style={{ background: `linear-gradient(90deg, ${priceColor}, transparent)` }} />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <h1 className="font-serif font-light text-[clamp(28px,4vw,52px)] leading-[1.06] tracking-[-0.02em] text-fg-1">
                  {tool.name}
                </h1>
                {tool.status === "beta" && (
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-400 bg-amber-500/10 uppercase tracking-[0.08em] self-end mb-1">Beta</span>
                )}
              </div>
              <p className="font-sans text-[15px] text-fg-4">{tool.provider}</p>
            </div>
            <span className="font-mono text-[11px] px-3 py-1.5 rounded-full border uppercase tracking-[0.08em] shrink-0 mt-2"
              style={{ color: priceColor, borderColor: priceColor + "44", background: priceColor + "12" }}>
              {PRICING_LABEL[tool.pricing]}
            </span>
          </div>

          {/* Tagline */}
          <p className="font-serif italic text-[18px] md:text-[20px] leading-[1.5] text-fg-2 mb-8 border-l-2 pl-5"
            style={{ borderColor: priceColor }}>
            {tool.tagline}
          </p>

          {/* About */}
          <div className="mb-8">
            <h2 className="eyebrow block mb-3">About</h2>
            <p className="font-sans text-[15px] leading-[1.65] text-fg-2">{tool.description}</p>
          </div>

          {/* Key differentiator */}
          {tool.highlight && (
            <div className="flex items-start gap-3 rounded-xl px-4 py-3 mb-8 border border-violet/20 bg-violet/[0.06]">
              <span className="text-violet-bright text-[16px] leading-none mt-0.5">★</span>
              <div>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 block mb-1">Key differentiator</span>
                <p className="font-sans text-[14px] text-fg-1 leading-[1.55]">{tool.highlight}</p>
              </div>
            </div>
          )}

          {/* Pricing note */}
          {tool.priceNote && (
            <p className="font-mono text-[12px] text-fg-4 mb-8">{tool.priceNote}</p>
          )}

          {/* Tags */}
          {tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-8">
              {tool.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}

          {/* CTA */}
          <ToolPageClient tool={tool} />

          {/* Related prompts */}
          {relatedPrompts.length > 0 && (
            <div className="border-t border-hairline pt-10 mb-10">
              <h2 className="eyebrow block mb-5">Prompts that work great with {tool.name}</h2>
              <div className="flex flex-col gap-3">
                {relatedPrompts.map(p => (
                  <Link
                    key={p.id}
                    href={`/prompts/${p.slug}/`}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] hover:border-violet/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[15px] text-fg-1 group-hover:text-violet-bright transition-colors">{p.title}</p>
                      <p className="font-sans text-[12px] text-fg-3 mt-0.5 line-clamp-1">{p.outcome || p.desc}</p>
                    </div>
                    <span className="font-mono text-[10px] text-fg-4 capitalize shrink-0 pt-1">{p.difficulty}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related tools */}
          {related.length > 0 && (
            <div className="border-t border-hairline pt-10">
              <h2 className="eyebrow block mb-5">More {cat?.label ?? ""} tools</h2>
              <div className="flex flex-col gap-3">
                {related.map(r => (
                  <Link
                    key={r.id}
                    href={`/tools/${r.id}/`}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] hover:border-violet/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[15px] text-fg-1 group-hover:text-violet-bright transition-colors">{r.name}</p>
                      <p className="font-sans text-[12px] text-fg-3 mt-0.5 line-clamp-1">{r.tagline}</p>
                    </div>
                    <span className="font-mono text-[10px] shrink-0 pt-1" style={{ color: PRICING_COLOR[r.pricing] }}>
                      {PRICING_LABEL[r.pricing]}
                    </span>
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
