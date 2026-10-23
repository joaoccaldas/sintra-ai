import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Globe2, Rss, Sparkles } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import { LIVE_FEED, LIVE_ITEMS } from "@/lib/liveFeedData";
import { USE_CASES } from "@/lib/data";
import styles from "./HomeEditorialSections.module.css";

/**
 * Static server-rendered homepage modules. Avoid loading the combined news
 * registry, all tools and every prompt into the mobile CLIENT bundle.
 * Nothing in this component claims that feed excerpts were independently
 * reviewed by Sintra or that a prompt has been executed.
 */
export default function HomeEditorialSections() {
  const news = LIVE_ITEMS
    .filter(item => item.url.startsWith("https://") && item.title.trim().length > 0)
    .sort((a, b) => Date.parse(b.publishedAt ?? "1970-01-01") - Date.parse(a.publishedAt ?? "1970-01-01"))
    .slice(0, 3);

  // Existing canonical use-case records. No copy/paste of sample outcomes or
  // invented execution receipts into a second manually maintained catalog.
  const featuredSlugs = ["meeting-notes-to-action-items", "quick-insights-from-spreadsheets"];
  const exercises = featuredSlugs
    .map(slug => USE_CASES.find(item => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

  return (
    <section className={styles.shell} aria-label="Mundo e prática">
      <div className={styles.sectionTitle}>
        <div>
          <p className={styles.kicker}><Globe2 size={15} aria-hidden="true" /> DEPOIS: O MUNDO</p>
          <h2>O que está acontecendo lá fora.</h2>
          <p className={styles.description}>Sinais internacionais, direto das fontes. Sem fingir que uma manchete é uma análise.</p>
        </div>
        <a className={styles.more} href={`${BASE_PATH}/live/`}>Radar mundial <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>

      <div className={styles.globalList}>
        {news.length ? news.map((item, index) => (
          <a className={styles.globalItem} key={item.id} href={item.url}
            target="_blank" rel="noopener noreferrer" lang="en">
            <span className={styles.counter}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.globalCopy}>
              <span className={styles.meta}>{item.source} · {item.category}</span>
              <strong>{item.title}</strong>
            </span>
            <ArrowUpRight size={19} className={styles.arrow} aria-hidden="true" />
          </a>
        )) : (
          <p className={styles.empty}>Os feeds internacionais estão indisponíveis. Veja o histórico no radar.</p>
        )}
      </div>

      <div className={styles.disclosure}>
        <Rss size={14} aria-hidden="true" />
        Notícias externas agregadas automaticamente. Atualização do feed: {Number.isFinite(Date.parse(LIVE_FEED.generatedAt))
          ? new Intl.DateTimeFormat("pt-BR", { day:"2-digit", month:"short", year:"numeric", timeZone:"UTC" }).format(new Date(LIVE_FEED.generatedAt))
          : "não disponível"}. Sem verificação editorial independente.
      </div>

      <div id="pratique" className={styles.practice}>
        <div className={styles.practiceIntro}>
          <p className={styles.kicker}><Sparkles size={15} aria-hidden="true"/> AGORA: COLOQUE EM PRÁTICA</p>
          <h2>Uma ideia. Um resultado.</h2>
          <p>Você não precisa de uma aula enorme para experimentar uma aplicação de IA. Escolha uma tarefa e veja o exemplo original.</p>
          <a href={`${BASE_PATH}/library/`} className={styles.browse}>Explorar todos os casos <ArrowRight size={16} aria-hidden="true"/></a>
        </div>
        <div className={styles.practiceCards}>
          {exercises.map((exercise, index) => (
            <a key={exercise.slug} className={styles.practiceCard} href={`${BASE_PATH}/prompts/${exercise.slug}/`}>
              <span className={styles.exerciseLabel}><BookOpen size={15} aria-hidden="true" /> {index === 0 ? "PARA COMEÇAR" : "TRABALHO E PLANILHAS"}</span>
              <strong>{index === 0 ? "Transforme anotações em tarefas." : "Encontre tendências em uma planilha."}</strong>
              <span className={styles.original}>Caso real do catálogo: <span lang="en">{exercise.title}</span></span>
              <span className={styles.notTested}><CheckCircle2 size={14} aria-hidden="true" /> Exemplo de prompt · execução não verificada</span>
              <span className={styles.practiceAction}>Abrir exercício <ArrowUpRight size={16} aria-hidden="true"/></span>
            </a>
          ))}
          {exercises.length === 0 && <p className={styles.empty}>Casos em revisão. Explore a biblioteca completa.</p>}
        </div>
      </div>

      <div className={styles.contribution}>
        <div>
          <span className={styles.kicker}>A COMUNIDADE É O PRÓXIMO CAPÍTULO</span>
          <h2>Fez algo útil com IA? Compartilhe o aprendizado.</h2>
          <p>Em breve, membros poderão publicar projetos e ajudar quem está começando. O cadastro e a moderação estão em desenvolvimento.</p>
        </div>
        <a href="mailto:konamundo@gmail.com?subject=Sintra%20Brasil%20-%20proposta%20de%20contribui%C3%A7%C3%A3o" className={styles.contact}>Fale com a equipe <ArrowUpRight size={16} aria-hidden="true"/></a>
      </div>
    </section>
  );
}
