"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Newspaper, Lightbulb, BookOpen, FlaskConical } from "lucide-react";
import { AI_NEWS, type NewsItem } from "@/lib/newsData";
import { THIS_WEEK, type FeaturedItem } from "@/lib/featuredData";
import { BASE_PATH } from "@/lib/data";

// ── Helpers ────────────────────────────────────────────────────────────────

function sevenDaysAgo(): number {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return Number(
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}`
  );
}

function isRecent(item: NewsItem): boolean {
  // Include items from this month and last month (dateNum-based approximation)
  const cutoff = sevenDaysAgo();
  if (item.dateNum > cutoff) return true;
  // Also include same-month items older than 7 days if landmark
  if (item.dateNum === cutoff && item.significance === "landmark") return true;
  return false;
}

function sortDesc(a: NewsItem, b: NewsItem) {
  if (b.dateNum !== a.dateNum) return b.dateNum - a.dateNum;
  return (b.dateDay ?? 1) - (a.dateDay ?? 1);
}

// ── Section components ─────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet/60" />
      <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg-4">{children}</span>
      <span className="flex-1 h-px bg-hairline" />
    </div>
  );
}

function NewsRow({ item }: { item: NewsItem }) {
  const sigColor = item.significance === "landmark" ? "#B6A6FF" : item.significance === "major" ? "#5EEAD4" : "#8b8aad";
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 py-5 border-b border-hairline/50 last:border-0"
    >
      <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: item.providerColor }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-[10px] tracking-[0.10em] uppercase" style={{ color: item.providerColor }}>
            {item.provider}
          </span>
          {item.country === "BR" && <span className="text-[12px]" title="Brazil">🇧🇷</span>}
          {item.country === "SE" && <span className="text-[12px]" title="Sweden">🇸🇪</span>}
          <span className="font-mono text-[9px] tracking-[0.08em] uppercase ml-auto" style={{ color: sigColor }}>
            {item.significance}
          </span>
        </div>
        <h3 className="font-serif text-[16px] md:text-[18px] leading-[1.25] text-fg-1 mb-2">{item.title}</h3>
        <p className="font-sans text-[13px] text-fg-3 leading-[1.55] mb-3">{item.summary}</p>
        {item.why_it_matters && (
          <p className="font-sans text-[12px] text-fg-3 leading-[1.5] mb-2">
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-violet-bright mr-2">Why it matters</span>
            {item.why_it_matters}
          </p>
        )}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-fg-4">
            {item.dateDay ? `${item.dateDay} ` : ""}{item.date}
          </span>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] text-violet-bright hover:underline"
            >
              Source <ExternalLink size={9} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const PICK_ICON: Record<string, React.ElementType> = {
  news: Newspaper, prompt: Lightbulb, guide: BookOpen, paper: FlaskConical, tool: Lightbulb,
};
const PICK_LABEL: Record<string, string> = {
  news: "Story", prompt: "Prompt", guide: "Guide", paper: "Paper", tool: "Tool",
};

function PickRow({ item, index }: { item: FeaturedItem; index: number }) {
  const Icon = PICK_ICON[item.type] ?? Lightbulb;
  const href = item.href.startsWith("http") || item.href.startsWith("#")
    ? item.href
    : `${BASE_PATH}${item.href}`;
  const isExternal = item.href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="group flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-200"
    >
      <div className="w-8 h-8 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-violet-bright" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-fg-4 mb-1 block">
          {PICK_LABEL[item.type]}
          {item.badge && (
            <span className="ml-2 px-1.5 py-0.5 rounded border font-mono text-[8px]"
              style={{ color: item.badgeColor ?? "#9F8CFF", borderColor: (item.badgeColor ?? "#9F8CFF") + "44", background: (item.badgeColor ?? "#9F8CFF") + "12" }}>
              {item.badge}
            </span>
          )}
        </span>
        <p className="font-serif text-[14px] text-fg-1 leading-[1.35] group-hover:text-white transition-colors mb-1">
          {item.title}
        </p>
        <p className="font-mono text-[10px] text-fg-4 leading-[1.5]">{item.why}</p>
      </div>
      <ArrowRight size={12} className="text-fg-4 group-hover:text-violet-bright group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
    </motion.a>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export default function WeeklyClient() {
  const recent = useMemo(() => {
    // Get last 30 days of items (2 months of dateNum covers it safely)
    const now = AI_NEWS[0]?.dateNum ?? 202606;
    const cutoff = now - 1; // previous month as floor
    return [...AI_NEWS]
      .filter(n => n.dateNum >= cutoff)
      .sort(sortDesc);
  }, []);

  const topStories = useMemo(
    () => recent.filter(n => n.significance === "landmark" || n.significance === "major").slice(0, 5),
    [recent]
  );

  const modelWatch = useMemo(
    () => recent.filter(n =>
      n.tags.some(t => ["Model Release", "Benchmark", "GPT", "Claude", "Gemini", "Llama", "Mistral", "Reasoning", "Open Source"].includes(t))
    ).slice(0, 4),
    [recent]
  );

  const deals = useMemo(
    () => recent.filter(n =>
      n.tags.some(t => ["Funding", "IPO", "Acquisition", "Markets", "Finance", "Investment"].includes(t))
    ).slice(0, 4),
    [recent]
  );

  const policy = useMemo(
    () => recent.filter(n =>
      n.tags.some(t => ["Policy", "Regulation", "AI Act", "EU", "Government", "GDPR", "LGPD", "Safety"].includes(t))
    ).slice(0, 4),
    [recent]
  );

  const brazil = useMemo(() => recent.filter(n => n.country === "BR").slice(0, 3), [recent]);
  const sweden = useMemo(() => recent.filter(n => n.country === "SE").slice(0, 3), [recent]);

  return (
    <div className="min-h-screen bg-abyss text-fg-1">
      {/* Ambient */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #9F8CFF, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #5EEAD4, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[760px] mx-auto px-6 md:px-8">
        {/* Back */}
        <div className="pt-10 pb-6">
          <a href={`${BASE_PATH}/`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Sintra
          </a>
        </div>

        {/* Hero header */}
        <motion.header
          className="pt-6 pb-10 border-b border-violet/[0.12]"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex gap-3.5 items-center mb-5">
            <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-4">Weekly Digest · {THIS_WEEK.weekOf}</span>
          </div>
          <h1 className="font-serif font-light text-[clamp(36px,5.5vw,72px)] leading-[1.06] tracking-[-0.025em] text-fg-1 mb-4">
            This week{" "}
            <em className="italic" style={{
              backgroundImage: "linear-gradient(180deg, #F4F2EA 0%, #9F8CFF 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>in AI.</em>
          </h1>
          <p className="font-sans text-[16px] text-fg-2 max-w-xl leading-[1.6] mb-5">
            {THIS_WEEK.editorial}
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px] text-fg-3 tracking-[0.06em]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-bright animate-pulse" />
              Auto-generated from {AI_NEWS.length} curated events
            </span>
            <span className="text-fg-4">·</span>
            <a href={`${BASE_PATH}/news/`} className="hover:text-violet-bright transition-colors">
              Full archive →
            </a>
          </div>
        </motion.header>

        {/* Editorial picks (from THIS_WEEK) */}
        <section className="pt-12 pb-10 border-b border-hairline">
          <SectionLabel>Editor&apos;s Picks this Week</SectionLabel>
          <div className="flex flex-col gap-3">
            {THIS_WEEK.items.map((item, i) => (
              <PickRow key={i} item={item} index={i} />
            ))}
          </div>
        </section>

        {/* Top Stories */}
        {topStories.length > 0 && (
          <section className="pt-10 pb-10 border-b border-hairline">
            <SectionLabel>Top Stories</SectionLabel>
            {topStories.map(item => <NewsRow key={item.id} item={item} />)}
          </section>
        )}

        {/* Model Watch */}
        {modelWatch.length > 0 && (
          <section className="pt-10 pb-10 border-b border-hairline">
            <SectionLabel>Model Watch</SectionLabel>
            {modelWatch.map(item => <NewsRow key={item.id} item={item} />)}
            <a
              href={`${BASE_PATH}/models/`}
              className="inline-flex items-center gap-1.5 mt-4 font-mono text-[11px] tracking-[0.08em] text-fg-4 hover:text-violet-bright transition-colors"
            >
              Compare all models <ArrowRight size={10} />
            </a>
          </section>
        )}

        {/* Deals & Funding */}
        {deals.length > 0 && (
          <section className="pt-10 pb-10 border-b border-hairline">
            <SectionLabel>Deals &amp; Funding</SectionLabel>
            {deals.map(item => <NewsRow key={item.id} item={item} />)}
          </section>
        )}

        {/* Policy Radar */}
        {policy.length > 0 && (
          <section className="pt-10 pb-10 border-b border-hairline">
            <SectionLabel>Policy Radar</SectionLabel>
            {policy.map(item => <NewsRow key={item.id} item={item} />)}
          </section>
        )}

        {/* By Region */}
        {(brazil.length > 0 || sweden.length > 0) && (
          <section className="pt-10 pb-10 border-b border-hairline">
            <SectionLabel>By Region</SectionLabel>
            {brazil.length > 0 && (
              <div className="mb-8">
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-4 mb-4">🇧🇷 Brazil</p>
                {brazil.map(item => <NewsRow key={item.id} item={item} />)}
              </div>
            )}
            {sweden.length > 0 && (
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-4 mb-4">🇸🇪 Sweden</p>
                {sweden.map(item => <NewsRow key={item.id} item={item} />)}
              </div>
            )}
          </section>
        )}

        {/* Footer CTA */}
        <section className="pt-12 pb-24">
          <div className="rounded-2xl border border-violet/[0.15] bg-violet/[0.04] p-8 text-center">
            <h2 className="font-serif text-[24px] text-fg-1 mb-3">Explore the full archive</h2>
            <p className="font-sans text-[14px] text-fg-3 max-w-sm mx-auto mb-6">
              {AI_NEWS.length} events documented since 2023. Filter by significance, provider, region, or topic.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`${BASE_PATH}/news/`}
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-2.5 rounded-lg bg-violet/20 border border-violet/40 text-violet-bright hover:bg-violet/30 transition-colors"
              >
                AI News Archive <ArrowRight size={12} />
              </a>
              <a
                href={`${BASE_PATH}/`}
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-2.5 rounded-lg border border-white/[0.10] text-fg-3 hover:text-fg-1 hover:border-white/20 transition-colors"
              >
                Back to Sintra
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
