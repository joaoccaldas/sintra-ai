"use client";

import { ArrowUpRight, Globe2, MapPin, Newspaper } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BRAZIL_FEED, BRAZIL_NEWS_SIGNALS, brazilSnapshotIsFresh } from "@/lib/brNewsData";
import { BASE_PATH } from "@/lib/constants";
import styles from "./BrazilRadar.module.css";

/** Publisher RSS signals, with Brazil-first attention and explicit limitations. */
export default function BrazilRadar() {
  const { locale } = useLanguage();
  const pt = locale === "pt";
  const featured = BRAZIL_NEWS_SIGNALS.slice(0, 5);
  const actualBrazil = featured.filter(item => item.brazilImpact).length;
  const fresh = brazilSnapshotIsFresh();

  return (
    <section id="radar-brasil" className={styles.section} aria-labelledby="br-radar-heading">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <span className={styles.kicker}><MapPin size={14} aria-hidden="true" />{pt ? "PRIMEIRO: BRASIL" : "BRAZIL FIRST"}</span>
            <h2 id="br-radar-heading">{pt ? "IA no Brasil, sem ruído." : "AI through a Brazilian lens."}</h2>
            <p>{pt
              ? "O que merece sua atenção na cobertura brasileira. Fontes abertas, contexto local e links originais."
              : "Worthwhile AI coverage from Brazilian publishers, with original links and transparent sourcing."}</p>
          </div>
          <a href={`${BASE_PATH}/news/`} className={styles.global}>
            <Globe2 size={16} aria-hidden="true" />
            {pt ? "Depois: mundo" : "Then: world"}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </header>

        {featured.length ? (
          <div className={styles.grid}>
            {featured.map((item, index) => (
              <a className={styles.story} key={item.id} href={item.url} rel="noopener noreferrer" target="_blank">
                <span className={styles.storyTop}>
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.source}>{item.source}</span>
                  {item.brazilImpact && <span className={styles.brazilMark}>{pt ? "Impacto no Brasil" : "Brazil impact"}</span>}
                  <ArrowUpRight className={styles.external} size={17} aria-hidden="true" />
                </span>
                <strong lang="pt-BR">{item.title}</strong>
                {item.providerExcerpt && <span lang="pt-BR" className={styles.excerpt}>{item.providerExcerpt}</span>}
                <span className={styles.date}>
                  {new Intl.DateTimeFormat(pt ? "pt-BR" : "en-US", { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(item.publishedAt))}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Newspaper size={20} aria-hidden="true"/>
            <p>{pt
              ? "O radar brasileiro ainda não encontrou manchetes de IA verificáveis nos feeds disponíveis. Não inventamos notícias para preencher a página."
              : "The Brazilian radar has no eligible AI headlines from available feeds. We don't invent stories to fill the screen."}</p>
            <a href={`${BASE_PATH}/news/`}>{pt ? "Explorar o radar mundial" : "Browse world news"} <ArrowUpRight size={15} aria-hidden="true"/></a>
          </div>
        )}
        <footer className={styles.sourceNote}>
          <span>{pt ? "SINAIS DE FONTES EXTERNAS · NÃO REVISADOS PELA REDAÇÃO" : "PUBLISHER SIGNALS · NOT EDITORIALLY VERIFIED"}</span>
          <span>{pt ? (fresh ? "Atualização recente" : "Fonte desatualizada ou indisponível") : (fresh ? "Recently refreshed" : "Stale or unavailable source")}</span>
          {actualBrazil > 0 && <span>{pt ? "Cobertura local identificada no título" : "Local impact inferred from headline"}</span>}
        </footer>
      </div>
    </section>
  );
}
