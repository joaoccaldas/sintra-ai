"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Search, Copy, Check, X } from "lucide-react";
import rawData from "@/data/useCases.json";

const Tesseract3D = dynamic(() => import("@/components/Tesseract3D"), { ssr: false });

// ── Types ──────────────────────────────────────────────────────────────────────

type Category = "all" | "marketing" | "engineering" | "operations" | "research" | "design" | "leadership";
type Difficulty = "all" | "beginner" | "intermediate" | "advanced" | "expert";

interface UseCase {
  id: number;
  title: string;
  desc: string;
  category: Exclude<Category, "all">;
  difficulty: Exclude<Difficulty, "all">;
  tags: string[];
  prompt: string;
  source?: string;
}

// ── Data adapter ───────────────────────────────────────────────────────────────

const DOMAIN_MAP: Record<string, Exclude<Category, "all">> = {
  "Business Intelligence":   "operations",
  "Personal Productivity":   "operations",
  "Design & Creative":       "design",
  "Software Development":    "engineering",
  "Research & Analysis":     "research",
  "Communication & Writing": "marketing",
};

const adapted: UseCase[] = (rawData as any[]).map((item, idx) => ({
  id: idx + 1,
  title: item.title,
  desc: item.best_for,
  category: DOMAIN_MAP[item.domain] ?? "operations",
  difficulty: (item.skill_level as string).toLowerCase() as UseCase["difficulty"],
  tags: (item.tags as string[]).slice(0, 4),
  prompt: item.prompt,
  source: item.source,
}));

// ── Constants ──────────────────────────────────────────────────────────────────

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all",         label: "All" },
  { id: "marketing",   label: "Marketing" },
  { id: "engineering", label: "Engineering" },
  { id: "operations",  label: "Operations" },
  { id: "research",    label: "Research" },
  { id: "design",      label: "Design" },
  { id: "leadership",  label: "Leadership" },
];

const DIFFICULTIES: { id: Difficulty; label: string; color: string }[] = [
  { id: "all",          label: "All",          color: "" },
  { id: "beginner",     label: "Beginner",     color: "#F26D6D" },
  { id: "intermediate", label: "Intermediate", color: "#F2C46D" },
  { id: "advanced",     label: "Advanced",     color: "#8FE3D2" },
  { id: "expert",       label: "Expert",       color: "#9F8CFF" },
];

const DIFF_COLOR: Record<string, string> = {
  beginner: "#F26D6D",
  intermediate: "#F2C46D",
  advanced: "#8FE3D2",
  expert: "#9F8CFF",
};

const DISCIPLINES = [
  { id: "marketing",   label: "Marketing",   essence: "Voice, copy, outreach, growth experiments." },
  { id: "engineering", label: "Engineering", essence: "Code review, migration, debugging at scale." },
  { id: "operations",  label: "Operations",  essence: "Meetings, planning, finance, the unglamorous middle." },
  { id: "research",    label: "Research",    essence: "Triangulating papers, synthesising interviews." },
  { id: "design",      label: "Design",      essence: "Critique, tokens, empty states, audits." },
  { id: "leadership",  label: "Leadership",  essence: "Memos, steelmans, hiring loops, updates." },
] as const;

const DISC_COUNTS = Object.fromEntries(
  DISCIPLINES.map(d => [
    d.id,
    adapted.filter(u => u.category === d.id).length,
  ])
);

// ── Sub-components ─────────────────────────────────────────────────────────────

function TesseractMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6"  y="14" width="36" height="36" />
      <rect x="22" y="6"  width="36" height="36" />
      <line x1="6"  y1="14" x2="22" y2="6"  />
      <line x1="42" y1="14" x2="58" y2="6"  />
      <line x1="6"  y1="50" x2="22" y2="42" />
      <line x1="42" y1="50" x2="58" y2="42" />
    </svg>
  );
}

function NavHeader({ total }: { total: number }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 64, display: "flex", alignItems: "center",
        transition: "background 240ms var(--ease-out), border-color 240ms var(--ease-out), backdrop-filter 240ms var(--ease-out)",
        ...(scrolled ? {
          background: "rgba(9,11,20,0.72)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--hairline-soft)",
        } : {}),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28, width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--violet-bright)", filter: "drop-shadow(0 0 12px rgba(159,140,255,0.25))", textDecoration: "none" }}>
          <TesseractMark size={20} />
          <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 17, color: "var(--fg-1)", letterSpacing: "0.005em" }}>
            Sintra <em style={{ color: "var(--violet-bright)", fontStyle: "italic" }}>Tesseract</em>
          </span>
        </a>
        <nav style={{ display: "flex", gap: 24, marginLeft: 28 }}>
          {["Library", "By difficulty", "About"].map(link => (
            <a key={link}
               href={`#${link.toLowerCase().replace(/ /g, "-")}`}
               style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-3)", transition: "color 140ms var(--ease-out)", textDecoration: "none", whiteSpace: "nowrap" }}
               onMouseEnter={e => (e.currentTarget.style.color = "var(--fg-1)")}
               onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-3)")}>
              {link}
            </a>
          ))}
        </nav>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.06em", marginRight: 4, whiteSpace: "nowrap" }}>
          <b style={{ color: "var(--fg-1)", fontWeight: 500 }}>{total}</b> use cases
        </span>
        <a href="#library" className="btn" style={{ textDecoration: "none" }}>Enter library →</a>
      </div>
    </header>
  );
}

function HeroSection({ total, onEnter }: { total: number; onEnter: () => void }) {
  const diveRef = useRef<(() => void) | null>(null);

  const handleEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    if (diveRef.current) diveRef.current();
    setTimeout(() => {
      document.getElementById("library")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 700);
    onEnter();
  };

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
      {/* Background hero image */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/tesseract-hero.png')",
        backgroundPosition: "center 35%",
        backgroundSize: "cover",
        transform: "scale(1.06)",
        animation: "hero-drift 32s cubic-bezier(0.22,1,0.36,1) infinite alternate",
        opacity: 0.28,
        filter: "blur(1px) saturate(0.8)",
        mixBlendMode: "screen",
      }} />

      {/* Grid overlay */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, opacity: 0.35,
        backgroundImage: "linear-gradient(to right, rgba(159,140,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(159,140,255,0.045) 1px, transparent 1px)",
        backgroundSize: "88px 88px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 75%)",
      }} />

      {/* 3D Tesseract */}
      <Tesseract3D onDive={fn => { diveRef.current = fn; }} />

      {/* Veil */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(50% 40% at 50% -5%, rgba(159,140,255,0.18) 0%, rgba(159,140,255,0) 60%), radial-gradient(40% 40% at 85% 100%, rgba(143,227,210,0.10) 0%, rgba(143,227,210,0) 60%), linear-gradient(180deg, rgba(5,6,11,0.5) 0%, rgba(5,6,11,0.15) 35%, rgba(5,6,11,0.75) 85%, rgba(5,6,11,1) 100%)",
      }} />

      {/* Hero content */}
      <div style={{ position: "relative", zIndex: 3, padding: "0 0 96px", maxWidth: 1040, width: "100%", margin: "0 auto", paddingLeft: 32, paddingRight: 32 }}>
        <div style={{ display: "inline-flex", gap: 14, alignItems: "center", marginBottom: 24 }}>
          <span style={{ width: 36, height: 1, background: "linear-gradient(90deg, rgba(159,140,255,0), var(--violet-bright))" }} />
          <span className="eyebrow violet">The use-case library · {total} curated</span>
        </div>
        <h1 className="t-display" style={{ fontSize: "clamp(42px, 6.4vw, 92px)", margin: "0 0 28px" }}>
          A library of{" "}
          <span style={{
            background: "linear-gradient(180deg, #F4F2EA 0%, #B6A6FF 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 32px rgba(159,140,255,0.35))",
            fontStyle: "italic",
          }}>every</span>{" "}
          way<br />to think with a machine.
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.55, color: "var(--fg-2)", maxWidth: 560, margin: "0 0 40px" }}>
          Browse {total} curated AI use cases by difficulty, domain, and what you want to do.
          Open a card, lift the prompt, ship the work.
        </p>
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <a href="#library" className="btn" onClick={handleEnter}>Enter the library →</a>
          <a href="#disciplines" className="btn btn-ghost" style={{ textDecoration: "none" }}>Six disciplines</a>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", bottom: 32, transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "var(--fg-3)", zIndex: 3,
      }}>
        <span>Scroll</span>
        <span style={{
          width: 1, height: 36,
          background: "linear-gradient(180deg, var(--violet-bright), transparent)",
          animation: "cue-pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        }} />
      </div>
    </section>
  );
}

function StatsBar() {
  const total = adapted.length;
  const tools = [...new Set(adapted.flatMap(u => u.tags))].length;
  const cats  = DISCIPLINES.length;
  return (
    <section style={{ position: "relative", padding: "56px 0", background: "var(--abyss)", borderTop: "1px solid var(--hairline-soft)", borderBottom: "1px solid var(--hairline-soft)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--hairline-soft)" }}>
          {[
            { n: String(total).padStart(2, "0"), em: true, label: "Curated use cases", desc: "From a single prompt to a multi-agent pipeline." },
            { n: cats,  label: "Disciplines", desc: "Marketing, engineering, ops, research, design, leadership." },
            { n: tools, label: "Unique tags",  desc: "Spanning tools, techniques, and domains." },
          ].map(({ n, em, label, desc }) => (
            <div key={label} style={{ padding: "16px 32px", background: "var(--abyss)", display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 64, lineHeight: 1, letterSpacing: "-0.03em", color: "var(--fg-1)" }}>
                {em ? <em style={{ color: "var(--violet-bright)", fontStyle: "italic" }}>{n}</em> : n}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-3)" }}>{label}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-2)", lineHeight: 1.5 }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DisciplinesSection({ onSelect }: { onSelect: (cat: string) => void }) {
  return (
    <section id="disciplines" style={{ position: "relative", padding: "120px 0 96px", background: "var(--abyss)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 14 }}>The disciplines · 02</span>
          <h2 className="t-serif-h2" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: 0 }}>
            Six faces. <em style={{ fontStyle: "italic", color: "var(--violet-bright)" }}>One library.</em>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-2)", maxWidth: 540, margin: "16px 0 0", lineHeight: 1.55 }}>
            A tesseract has six outer faces — one for every kind of work you might ask a machine to help with.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--hairline-soft)", border: "1px solid var(--hairline-soft)" }}>
          {DISCIPLINES.map((d, i) => (
            <a key={d.id} href="#library" className="disc-card"
               onClick={(e) => { e.preventDefault(); onSelect(d.id); document.getElementById("library")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: "var(--fg-4)", fontWeight: 500 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 32, letterSpacing: "-0.01em", color: "var(--fg-1)", margin: "4px 0 0" }}>
                {d.label}
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.5, color: "var(--fg-2)", margin: 0 }}>
                {d.essence}
              </p>
              <div style={{ marginTop: "auto", display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingTop: 16 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.04em", display: "inline-flex", alignItems: "baseline", gap: 8 }}>
                  <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: 26, color: "var(--fg-1)", lineHeight: 1 }}>
                    {DISC_COUNTS[d.id] ?? 0}
                  </em>
                  <span>use cases</span>
                </span>
                <span className="disc-arrow">→</span>
              </div>
              {/* Mini tesseract glyph */}
              <svg className="disc-glyph" viewBox="0 0 80 80" fill="none"
                   stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="10" y="22" width="44" height="44" />
                <rect x="26" y="14" width="44" height="44" />
                <line x1="10" y1="22" x2="26" y2="14" />
                <line x1="54" y1="22" x2="70" y2="14" />
                <line x1="10" y1="66" x2="26" y2="58" />
                <line x1="54" y1="66" x2="70" y2="58" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({ item, onOpen }: { item: UseCase; onOpen: (item: UseCase) => void }) {
  const color = DIFF_COLOR[item.difficulty];
  return (
    <button className="card" onClick={() => onOpen(item)}>
      <span style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-3)", fontWeight: 500 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: color, boxShadow: `0 0 8px ${color}`, flexShrink: 0 }} />
        {item.difficulty} <span style={{ color: "var(--fg-4)" }}>·</span> {item.category}
      </span>
      <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--fg-1)", margin: 0, textAlign: "left" }}>
        {item.title}
      </h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.5, color: "var(--fg-2)", margin: 0, textAlign: "left" }}>
        {item.desc}
      </p>
      <div style={{ marginTop: "auto", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", paddingTop: 8 }}>
        {item.tags.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </button>
  );
}

function UseCaseModal({ item, onClose }: { item: UseCase; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const color = DIFF_COLOR[item.difficulty];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const copy = () => {
    navigator.clipboard?.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
          <span style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-3)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: color, boxShadow: `0 0 8px ${color}` }} />
            {item.difficulty} <span style={{ color: "var(--fg-4)" }}>·</span> {item.category}
          </span>
          <button onClick={onClose} aria-label="Close"
                  style={{ background: "transparent", border: "none", color: "var(--fg-3)", fontSize: 18, padding: "4px 8px", borderRadius: 2, cursor: "pointer", lineHeight: 1 }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--fg-1)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--fg-3)"; e.currentTarget.style.background = "transparent"; }}>
            ✕
          </button>
        </div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 38, lineHeight: 1.08, letterSpacing: "-0.015em", color: "var(--fg-1)", margin: "0 0 14px" }}>
          {item.title}
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.6, color: "var(--fg-2)", margin: "0 0 28px" }}>
          {item.desc}
        </p>
        <div style={{ marginBottom: 28 }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 10 }}>The prompt</span>
          <div className="prompt-block">{item.prompt}</div>
        </div>
        {item.tags.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 10 }}>Tags</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        )}
        {item.source && (
          <div style={{ marginBottom: 28, paddingTop: 16, borderTop: "1px solid var(--hairline)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-4)", letterSpacing: "0.04em" }}>
              Source: {item.source}
            </span>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn" onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy prompt</>}
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function LibraryBrowser({ initialCategory }: { initialCategory: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>(
    (initialCategory as Category) || "all"
  );
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [activeItem, setActiveItem] = useState<UseCase | null>(null);

  useEffect(() => {
    if (initialCategory && initialCategory !== "all") setCategory(initialCategory as Category);
  }, [initialCategory]);

  const filtered = useMemo(() => {
    return adapted.filter(u => {
      if (category !== "all" && u.category !== category) return false;
      if (difficulty !== "all" && u.difficulty !== difficulty) return false;
      if (query.trim()) {
        const hay = `${u.title} ${u.desc} ${u.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(query.toLowerCase())) return false;
      }
      return true;
    });
  }, [query, category, difficulty]);

  return (
    <section id="library" style={{ padding: "96px 0 120px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 32, marginBottom: 48 }}>
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 14 }}>The library · 01</span>
            <h2 className="t-serif-h2" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: 0 }}>
              Every way to think{" "}
              <em style={{ fontStyle: "italic", color: "var(--violet-bright)" }}>with a machine.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-2)", maxWidth: 480, margin: "12px 0 0", lineHeight: 1.55 }}>
              Filter by what you do, by domain, or by how far you want to go.
            </p>
          </div>
          <span className="eyebrow" style={{ alignSelf: "end" }}>
            {filtered.length} / {adapted.length} shown
          </span>
        </div>

        {/* Search */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          <label style={{
            flex: 1, display: "flex", alignItems: "center", gap: 12,
            padding: "13px 18px",
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${query ? "var(--violet)" : "var(--hairline)"}`,
            borderRadius: 4,
            boxShadow: query ? "0 0 0 1px var(--violet), 0 0 32px rgba(159,140,255,0.25)" : "none",
            transition: "all 140ms var(--ease-out)",
          }}>
            <Search size={16} color={query ? "var(--violet-bright)" : "var(--fg-3)"} />
            <input
              type="text"
              placeholder={`Search ${adapted.length} use cases…`}
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-1)" }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ background: "none", border: "none", color: "var(--fg-3)", cursor: "pointer", padding: 0, display: "flex" }}>
                <X size={14} />
              </button>
            )}
          </label>
        </div>

        {/* Filters */}
        <div id="by-difficulty" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-4)", width: 88, flexShrink: 0 }}>
              Category
            </span>
            {CATEGORIES.map(c => (
              <button key={c.id} className={`chip${category === c.id ? " active" : ""}`}
                      onClick={() => setCategory(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-4)", width: 88, flexShrink: 0 }}>
              Difficulty
            </span>
            {DIFFICULTIES.map(d => (
              <button key={d.id} className={`chip${difficulty === d.id ? " active" : ""}`}
                      onClick={() => setDifficulty(d.id)}>
                {d.color && (
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: d.color, boxShadow: `0 0 8px ${d.color}` }} />
                )}
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count + reset */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.04em", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
          Showing <b style={{ color: "var(--fg-1)", fontWeight: 500 }}>{filtered.length}</b> use case{filtered.length !== 1 ? "s" : ""}
          {(category !== "all" || difficulty !== "all" || query) && (
            <button className="chip" style={{ padding: "3px 10px" }}
                    onClick={() => { setCategory("all"); setDifficulty("all"); setQuery(""); }}>
              Reset
            </button>
          )}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", padding: "80px 20px", textAlign: "center", border: "1px dashed var(--hairline)", borderRadius: 8 }}>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: 24, color: "var(--fg-2)", margin: 0 }}>
                "Nothing here yet. The shelf is being assembled."
              </p>
            </div>
          ) : (
            filtered.map(item => (
              <UseCaseCard key={item.id} item={item} onOpen={setActiveItem} />
            ))
          )}
        </div>
      </div>

      {activeItem && (
        <UseCaseModal item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </section>
  );
}

function FooterSection() {
  return (
    <footer style={{ borderTop: "1px solid var(--hairline-soft)", padding: "56px 0 32px", background: "var(--abyss)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 32, paddingBottom: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--violet-bright)", textDecoration: "none" }}>
              <TesseractMark size={18} />
              <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 16, color: "var(--fg-1)" }}>
                Sintra <em style={{ color: "var(--violet-bright)", fontStyle: "italic" }}>Tesseract</em>
              </span>
            </a>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.55, color: "var(--fg-3)", maxWidth: 280, marginTop: 4 }}>
              A curated library of AI use cases, mapped across every way to think with a machine.
            </p>
          </div>
          {[
            { head: "Library", links: [["All use cases", "#library"], ["By difficulty", "#by-difficulty"], ["Browse domains", "#disciplines"]] },
            { head: "About", links: [["The project", "#"], ["Maintainers", "#"], ["Changelog", "#"]] },
            { head: "Elsewhere", links: [["GitHub ↗", "https://github.com/joaoccaldas/sintra-ai"]] },
          ].map(({ head, links }) => (
            <div key={head} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-3)", margin: "0 0 8px" }}>{head}</h4>
              {links.map(([label, href]) => (
                <a key={label} href={href}
                   style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-2)", transition: "color 140ms var(--ease-out)", textDecoration: "none" }}
                   onMouseEnter={e => (e.currentTarget.style.color = "var(--fg-1)")}
                   onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-2)")}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, paddingTop: 24, borderTop: "1px solid var(--hairline-soft)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-4)", letterSpacing: "0.04em" }}>
          <span>© 2026 Sintra · Curated in the open.</span>
          <span>Built on the void.</span>
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Home() {
  const [libCategory, setLibCategory] = useState("all");

  const handleDisciplineSelect = useCallback((cat: string) => {
    setLibCategory(cat);
  }, []);

  return (
    <div style={{ background: "var(--abyss)", minHeight: "100vh" }}>
      <NavHeader total={adapted.length} />
      <HeroSection total={adapted.length} onEnter={() => {}} />
      <StatsBar />
      <DisciplinesSection onSelect={handleDisciplineSelect} />
      <LibraryBrowser initialCategory={libCategory} />
      <FooterSection />
    </div>
  );
}
