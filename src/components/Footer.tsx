"use client";

import SintraBrandLockup from "./SintraBrandLockup";
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
      ["footer_link_use_cases", `${BASE_PATH}/library/`],
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
      ["side_knowledge", `${BASE_PATH}/knowledge/`],
      ["side_agents", `${BASE_PATH}/agents/`],
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

function NewsletterComingSoon() {
  const { locale } = useLanguage();
  const pt = locale === "pt";
  return (
    <div className="border-b border-hairline py-7 mb-9 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="max-w-xl">
        <p className="text-[11px] font-bold tracking-[0.11em] text-[#B65344] mb-1">
          {pt ? "SINTRA / BOLETIM BRASIL" : "SINTRA / BRAZIL DIGEST"}
        </p>
        <h3 className="font-sans font-semibold text-xl tracking-[-0.035em] text-fg-1">
          {pt ? "Uma boa leitura. Em preparação." : "A useful digest. Coming soon."}
        </h3>
        <p className="font-sans text-[13px] text-fg-3 leading-relaxed mt-1">
          {pt
            ? "Notícias com fontes, contexto brasileiro e aplicações que você pode testar. A inscrição ainda não está aberta."
            : "Source-linked news, Brazilian context and practical AI examples. Subscriptions aren't open yet."}
        </p>
      </div>
      <a href="mailto:konamundo@gmail.com?subject=Sintra%20Brasil%20-%20sugest%C3%A3o%20editorial"
         className="inline-flex shrink-0 items-center justify-center min-h-[44px] px-4 border border-hairline rounded-xl bg-white text-[#172238] font-sans font-semibold text-[13px] hover:border-[#5B48D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5B48D9]">
        {pt ? "Sugerir uma pauta" : "Suggest a story"} ↗
      </a>
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-violet/[0.12] pt-14 pb-8 bg-abyss">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <NewsletterComingSoon />
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-5 md:gap-8 pb-8">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2.5">
            <a href={`${BASE_PATH}/`} className="flex items-center gap-2.5 text-fg-1">
              <SintraBrandLockup showEndorsement />
            </a>
            <p className="font-sans text-[13px] leading-[1.55] text-fg-3 max-w-[280px] mt-1">
              {t.footer_tagline}
            </p>
            <p className="font-mono text-[11px] text-fg-4 mt-1">{t.footer_free}</p>
          </div>

          {NAV_COLS.map(col => (
            <details key={col.head} className="group border-b border-hairline pb-2 md:border-b-0 md:pb-0">
              <summary className="font-sans font-semibold text-[13px] text-fg-2 py-3 md:py-0 cursor-pointer">
                {t[col.head] as string}
              </summary>
              <div className="flex flex-col gap-2.5 mt-2 md:mt-4 pb-3 md:pb-0">
                {col.links.map(([labelKey, href]) => (
                  <a key={labelKey} href={href}
                    className="font-sans text-[13px] text-fg-3 hover:text-fg-1 focus-visible:underline"
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {t[labelKey] as string}
                  </a>
                ))}
              </div>
            </details>
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
