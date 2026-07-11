"use client";

import { useState } from "react";
import TesseractMark from "./TesseractMark";
import { BASE_PATH } from "@/lib/constants";

const NAV_COLS = [
  {
    head: "Discover",
    links: [
      ["Use Cases",            "#explore"],
      ["Collections",          `${BASE_PATH}/collections/`],
      ["AI Tools Directory",   `${BASE_PATH}/tools/`],
      ["AI News",              `${BASE_PATH}/news/`],
      ["Learning Paths",       `${BASE_PATH}/learn/`],
      ["Resources & Links",    `${BASE_PATH}/resources/`],
    ],
  },
  {
    head: "Reference",
    links: [
      ["Claude & Anthropic",   `${BASE_PATH}/claude/`],
      ["AI Concepts",          `${BASE_PATH}/concepts/`],
      ["AI History",           `${BASE_PATH}/ai-history/`],
      ["AI Labs",              `${BASE_PATH}/ai-labs/`],
      ["Google AI Tools",      `${BASE_PATH}/google-ai-tools/`],
    ],
  },
  {
    head: "Elsewhere",
    links: [
      ["AI Keynote ↗",         `${BASE_PATH}/keynote/`],
      ["GitHub ↗",             "https://github.com/joaoccaldas/sintra-ai"],
      ["RSS Feed ↗",           `${BASE_PATH}/feed.xml`],
    ],
  },
];

function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    window.location.href = `mailto:joaoccaldas@gmail.com?subject=Subscribe%20me&body=Please%20add%20${encodeURIComponent(email.trim())}%20to%20the%20Sintra%20newsletter.`;
    setStatus("done");
  };

  return (
    <div className="border-b border-violet/[0.12] py-10 mb-10">
      <div className="max-w-md">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-violet-bright mb-2">Stay current</p>
        <h3 className="font-serif font-light text-[22px] text-fg-1 mb-1">New prompts &amp; AI news, weekly</h3>
        <p className="font-sans text-[13px] text-fg-3 mb-4">No noise. Curated highlights from the library dropped to your inbox.</p>
        {status === "done" ? (
          <p className="font-mono text-[13px] text-emerald-400">✓ Opening your mail app — send to subscribe.</p>
        ) : (
          <form onSubmit={submit} className="flex gap-2 max-w-sm">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-white/[0.05] border border-hairline rounded-lg px-3 py-2 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/50 focus:bg-white/[0.07] transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-violet/20 border border-violet/40 font-mono text-[11px] text-violet-bright hover:bg-violet/30 hover:border-violet/70 transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-violet/[0.12] pt-14 pb-8 bg-abyss">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <NewsletterCapture />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}>
          {/* Branding */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2.5">
            <a href={`${BASE_PATH}/`} className="flex items-center gap-2.5 text-violet-bright">
              <TesseractMark size={18} />
              <span className="font-serif font-normal text-base text-fg-1">
                Sintra <em className="italic text-violet-bright">Tesseract</em>
              </span>
            </a>
            <p className="font-sans text-[13px] leading-[1.55] text-fg-3 max-w-[280px] mt-1">
              A curated library of AI use cases, mapped across every way to think with a machine.
            </p>
            <p className="font-mono text-[11px] text-fg-4 mt-1">Open source · Free forever</p>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(col => (
            <div key={col.head} className="flex flex-col gap-2.5">
              <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-3 m-0 mb-2">
                {col.head}
              </h4>
              {col.links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="font-sans text-[13px] text-fg-2 hover:text-fg-1 transition-colors duration-140"
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-5 pt-6 border-t border-violet/[0.12] font-mono text-[11px] text-fg-4 tracking-[0.04em] flex-wrap">
          <span>© 2026 Sintra · Curated in the open.</span>
          <span>Built on the void.</span>
        </div>
      </div>
    </footer>
  );
}
