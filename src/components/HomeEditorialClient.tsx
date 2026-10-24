"use client";

import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Globe2, Rss, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BASE_PATH } from "@/lib/constants";
import styles from "./HomeEditorialSections.module.css";

interface WorldSignal { id:string; title:string; url:string; source:string; category:string; }
interface ExercisePreview { slug:string; title:string; }
interface Props { world:WorldSignal[]; exercises:ExercisePreview[]; refreshedAt:string; }

/**
 * Only tiny selected records cross into the client. Switching EN/PT updates
 * the whole homepage without shipping the underlying large data registries.
 */
export default function HomeEditorialClient({ world, exercises, refreshedAt }: Props) {
  const { locale } = useLanguage();
  const pt = locale === "pt";
  const refreshed = Date.parse(refreshedAt);
  const lastUpdate = Number.isFinite(refreshed) ?
    new Intl.DateTimeFormat(pt ? "pt-BR" : "en-US", {
      day:"2-digit", month:"short", year:"numeric", timeZone:"UTC"
    }).format(new Date(refreshed)) : (pt ? "indisponível" : "unavailable");

  return (
    <section className={styles.shell} aria-label={pt ? "Mundo e prática" : "World news and practical AI"}>
      <div className={styles.sectionTitle}>
        <div>
          <p className={styles.kicker}><Globe2 size={15} aria-hidden="true" /> {pt ? "DEPOIS: O MUNDO" : "THEN: WORLD NEWS"}</p>
          <h2>{pt ? "O que está acontecendo lá fora." : "What’s happening around the world."}</h2>
          <p className={styles.description}>{pt
            ? "Sinais internacionais, direto das fontes. Uma manchete não é uma análise."
            : "International signals from their original publishers. A headline isn't a verified analysis."}</p>
        </div>
        <a className={styles.more} href={`${BASE_PATH}/live/`}>
          {pt ? "Radar mundial" : "World radar"} <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      <div className={styles.globalList}>
        {world.length ? world.map((item, index) => (
          <a className={styles.globalItem} key={item.id} href={item.url}
            target="_blank" rel="noopener noreferrer">
            <span className={styles.counter}>{String(index + 1).padStart(2,"0")}</span>
            <span className={styles.globalCopy}>
              <span className={styles.meta}>{item.source} · {item.category}</span>
              <strong lang="en">{item.title}</strong>
            </span>
            <ArrowUpRight size={19} className={styles.arrow} aria-hidden="true" />
          </a>
        )) : <p className={styles.empty}>{pt
          ? "Os feeds internacionais estão indisponíveis. Consulte o histórico no radar."
          : "International sources are unavailable. Explore past signals in the radar."}</p>}
      </div>

      <p className={styles.disclosure}>
        <Rss size={14} aria-hidden="true" />
        {pt
          ? `Sinais externos agregados automaticamente. Feed de ${lastUpdate}. Sem verificação editorial independente.`
          : `Automatically aggregated publisher signals. Feed: ${lastUpdate}. Not independently verified.`}
      </p>

      <div id="pratique" className={styles.practice}>
        <div className={styles.practiceIntro}>
          <p className={styles.kicker}><Sparkles size={15} aria-hidden="true"/> {pt ? "AGORA: COLOQUE EM PRÁTICA" : "NOW: PUT IT TO WORK"}</p>
          <h2>{pt ? "Uma ideia. Um resultado." : "One idea. One useful result."}</h2>
          <p>{pt
            ? "Você não precisa de uma aula enorme para experimentar IA. Escolha uma tarefa e consulte o exemplo original."
            : "You don't need a long course to try something useful. Pick one task and open its original example."}</p>
          <a href={`${BASE_PATH}/library/`} className={styles.browse}>
            {pt ? "Todos os casos" : "Browse all use cases"} <ArrowRight size={16} aria-hidden="true"/>
          </a>
        </div>
        <div className={styles.practiceCards}>
          {exercises.map((exercise, index) => (
            <a key={exercise.slug} className={styles.practiceCard} href={index === 0 ? `${BASE_PATH}/laboratorio/` : `${BASE_PATH}/prompts/${exercise.slug}/`}>
              <span className={styles.exerciseLabel}>
                <BookOpen size={15} aria-hidden="true" /> {index === 0
                  ? (pt ? "PARA COMEÇAR" : "FIRST STEP")
                  : (pt ? "TRABALHO E PLANILHAS" : "WORK & SPREADSHEETS")}
              </span>
              <strong>{index === 0
                ? (pt ? "Transforme anotações em tarefas." : "Turn meeting notes into action items.")
                : (pt ? "Encontre tendências em uma planilha." : "Find trends in a spreadsheet.")}</strong>
              <span className={styles.original}>
                {pt ? "Caso original: " : "Original case: "}
                <span lang="en">{exercise.title}</span>
              </span>
              <span className={styles.notTested}>
                <CheckCircle2 size={14} aria-hidden="true" />
                {pt ? "Exemplo de prompt · execução não verificada" : "Example prompt · execution not verified"}
              </span>
              <span className={styles.practiceAction}>
                {pt ? "Abrir exercício" : "Open exercise"} <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </a>
          ))}
          {!exercises.length && <p className={styles.empty}>{pt
            ? "Casos em revisão. Explore a biblioteca completa."
            : "Cases under review. Explore the full catalog."}</p>}
        </div>
      </div>

      <div className={styles.contribution}>
        <div>
          <span className={styles.kicker}>{pt ? "A COMUNIDADE É O PRÓXIMO CAPÍTULO" : "COMMUNITY IS OUR NEXT CHAPTER"}</span>
          <h2>{pt ? "Fez algo útil com IA? Compartilhe o aprendizado." : "Built something useful? Share what you learned."}</h2>
          <p>{pt
            ? "Em breve, membros poderão publicar projetos e ajudar quem está começando. Cadastro e moderação estão em desenvolvimento."
            : "Members will be able to publish projects and support beginners. Registration and moderation are under development."}</p>
        </div>
        <a href="mailto:konamundo@gmail.com?subject=Sintra%20Brasil%20-%20proposta%20de%20contribui%C3%A7%C3%A3o" className={styles.contact}>
          {pt ? "Fale com a equipe" : "Contact the team"} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
