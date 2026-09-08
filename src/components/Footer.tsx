"use client";

import { useState } from "react";
import TesseractMark from "./TesseractMark";
import { BASE_PATH } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import type { Translations } from "@/lib/i18n";

type NavCol = {
  head: keyof Translations;
  links: [labelKey: keyof Translations, href: string][];
};

const NAV_COLS: NavCol[] = [
  {
    head: "footer_col_discover",
    links: [
      ["footer_link_use_cases", "#explore"],
      ["footer_link_collections", `${BASE_PATH}/collections/`],
      ["footer_link_tools", `${BASE_PATH}/tools/`],
      ["footer_link_news", `${BASE_PATH}/news/`],
      ["footer_link_learn", `${BASE_PATH}/learn/`],
      ["footer_link_resources", `${BASE_PATH}/resources/`],
    ],
  },
  {
    head: "footer_col_reference",
    links: [
      ["footer_link_claude", `${BASE_PATH}/claude/`],
      ["footer_link_concepts", `${BASE_PATH}/concepts/`],
      ["footer_link_history", `${BASE_PATH}/ai-history/`],
      ["footer_link_labs", `${BASE_PATH}/ai-labs/`],
      ["footer_link_google", `${BASE_PATH}/google-ai-tools/`],
    ],
  },
  {
    head: "footer_col_elsewhere",
    links: [
      ["footer_link_keynote", `${BASE_PATH}/keynote/`],
      ["footer_link_github", "https://github.com/joaoccaldas/sintra-ai"],
      ["footer_link_rss", `${BASE_PATH}/feed.xml`],
    ],
  },
];

function NewsletterCapture() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || !endpoint) return;
    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setEmail("");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="border-b border-violet/[0.12] py-10 mb-10">
      <div className="max-w-md">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-violet-bright mb-2">{t.footer_newsletter_eyebrow}</p>
        <h3 className="font-serif font-light text-[22px] text-fg-1 mb-1">{t.footer_newsletter_title}</h3>
        <p className="font-sans text-[13px] text-fg-3 mb-4">{t.footer_newsletter_sub}</p>
        {!endpoint ? (
          <p className="font-mono text-[12px] text-fg-4">{t.footer_newsletter_disabled}</p>
        ) : status === "done" ? (
          <p className="font-mono text-[13px] text-emerald-400">{t.footer_newsletter_done}</p>
        ) : (
          <form onSubmit={submit} className="flex gap-2 max-w-sm">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="flex-1 bg-white/[0.05] border border-hairline rounded-lg px-3 py-2 font-mono text-[12px] text-fg-1 placeholder:text-fg-4 outline-none focus:border-violet/50 focus:bg-white/[0.07] transition-all"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-4 py-2 rounded-lg bg-violet/20 border border-violet/40 font-mono text-[11px] text-violet-bright hover:bg-violet/30 hover:border-violet/70 transition-all whitespace-nowrap disabled:opacity-50"
            >
              {status === "sending" ? t.footer_sending : t.footer_subscribe}
            </button>
          </form>
        )}
        {status === "error" && <p className="font-mono text-[11px] text-red-300 mt-2">{t.footer_newsletter_error}</p>}
      </div>
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-violet/[0.12] pt-14 pb-8 bg-abyss">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <NewsletterCapture />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}>
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2.5">
            <a href={`${BASE_PATH}/`} className="flex items-center gap-2.5 text-violet-bright">
              <TesseractMark size={18} />
              <span className="font-serif font-normal text-base text-fg-1">
                Sintra <em className="italic text-violet-bright">Tesseract</em>
              </span>
            </a>
            <p className="font-sans text-[13px] leading-[1.55] text-fg-3 max-w-[280px] mt-1">
              {t.footer_tagline}
            </p>
            <p className="font-mono text-[11px] text-fg-4 mt-1">{t.footer_free}</p>
          </div>

          {NAV_COLS.map(col => (
            <div key={col.head} className="flex flex-col gap-2.5">
              <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-3 m-0 mb-2">{t[col.head] as string}</h4>
              {col.links.map(([labelKey, href]) => (
                <a
                  key={labelKey}
                  href={href}
                  className="font-sans text-[13px] text-fg-2 hover:text-fg-1 transition-colors duration-140"
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {t[labelKey] as string}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-5 pt-6 border-t border-violet/[0.12] font-mono text-[11px] text-fg-4 tracking-[0.04em] flex-wrap">
          <span>{t.footer_copyright}</span>
          <span>{t.footer_void}</span>
        </div>
      </div>
    </footer>
  );
}
