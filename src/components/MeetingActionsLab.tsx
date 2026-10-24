"use client";

import { useState } from "react";
import { ArrowRight, Check, ClipboardCopy, RotateCcw, ShieldCheck, WandSparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { extractMeetingActions, MAX_NOTES_CHARS, type ActionCandidate, type ExtractionResult } from "@/lib/meetingActions";
import styles from "./MeetingActionsLab.module.css";

const SAMPLE = `Reunião do projeto, exemplo fictício

- Enviar o resumo para a equipe | Responsável: Ana | Prazo: 30/10/2026
- Revisar a proposta comercial | Responsável: Pedro
- Confirmar a reunião com o cliente
- Não enviar o orçamento antigo
Discutimos opções para o próximo trimestre.`;

type DraftAction = ActionCandidate & { draftTitle: string; draftOwner: string; draftDeadline: string };

export default function MeetingActionsLab() {
  const { locale } = useLanguage();
  const pt = locale === "pt";
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [rows, setRows] = useState<DraftAction[]>([]);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  function clearResults() {
    setResult(null);
    setRows([]);
    setReviewed([]);
    setCopyStatus("idle");
  }

  function generate() {
    const next = extractMeetingActions(notes);
    setResult(next);
    setRows(next.actions.map(action => ({
      ...action,
      draftTitle: action.title,
      draftOwner: action.explicitOwner ?? "",
      draftDeadline: action.explicitDeadline ?? "",
    })));
    setReviewed([]);
    setCopyStatus("idle");
  }

  function update(id: string, field: "draftTitle" | "draftOwner" | "draftDeadline", value: string) {
    setRows(previous => previous.map(row => row.id === id ? { ...row, [field]: value } : row));
    // Editing requires reviewing the amended result again.
    setReviewed(previous => previous.filter(key => key !== id));
    setCopyStatus("idle");
  }

  function toggleReviewed(id: string, checked: boolean) {
    setReviewed(previous => checked ? [...previous.filter(key => key !== id), id] : previous.filter(key => key !== id));
    setCopyStatus("idle");
  }

  async function copyReviewed() {
    const selected = rows.filter(row => reviewed.includes(row.id) && row.draftTitle.trim());
    if (!selected.length) return;
    const text = selected.map((row, index) => {
      const fields = [`${index + 1}. ${row.draftTitle.trim()}`];
      if (row.draftOwner.trim()) fields.push(`Responsável: ${row.draftOwner.trim()}`);
      if (row.draftDeadline.trim()) fields.push(`Prazo informado: ${row.draftDeadline.trim()}`);
      return fields.join(" | ");
    }).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  const usable = rows.filter(row => reviewed.includes(row.id) && row.draftTitle.trim()).length;

  return (
    <div className={styles.canvas}>
      <div className={styles.columns}>
        <section className={styles.inputPane} aria-labelledby="notes-heading">
          <div className={styles.sectionTitle}>
            <span className={styles.step}>01</span>
            <div>
              <h2 id="notes-heading">{pt ? "Suas anotações" : "Your notes"}</h2>
              <p>{pt ? "Uma ação por linha funciona melhor." : "Use one action per line for best results."}</p>
            </div>
          </div>
          <label className={styles.inputLabel} htmlFor="sintra-notes">
            {pt ? "Cole o texto da reunião" : "Paste your meeting notes"}
          </label>
          <textarea id="sintra-notes" className={styles.textarea} spellCheck
            value={notes}
            maxLength={MAX_NOTES_CHARS + 1}
            onChange={event => { setNotes(event.target.value); clearResults(); }}
            rows={11}
            placeholder={pt
              ? "Ex.: Enviar proposta ao cliente | Responsável: Ana | Prazo: sexta-feira"
              : "Example: Send the proposal | Owner: Ana | Deadline: Friday"}
            aria-describedby="notes-privacy notes-limit"
          />
          <div className={styles.inputMeta}>
            <span id="notes-limit">{notes.length.toLocaleString(pt ? "pt-BR" : "en-US")}/{MAX_NOTES_CHARS.toLocaleString()}</span>
            <button className={styles.textButton} type="button" onClick={() => { setNotes(SAMPLE); clearResults(); }}>
              {pt ? "Usar exemplo fictício" : "Load fictional sample"}
            </button>
          </div>

          <div className={styles.actions}>
            <button className={styles.primary} type="button" onClick={generate} disabled={!notes.trim() || notes.length > MAX_NOTES_CHARS}>
              <WandSparkles size={18} aria-hidden="true" />
              {pt ? "Identificar tarefas" : "Find action items"}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            <button className={styles.reset} type="button" disabled={!notes && !result}
              onClick={() => { setNotes(""); clearResults(); }}>
              <RotateCcw size={16} aria-hidden="true" />
              {pt ? "Limpar" : "Clear"}
            </button>
          </div>

          <p id="notes-privacy" className={styles.privacy}>
            <ShieldCheck size={18} aria-hidden="true" />
            {pt
              ? "Este exercício processa o texto no próprio navegador. Não envia as anotações ao Sintra, não cria conta e não as salva. Evite dados sensíveis em dispositivos compartilhados."
              : "This exercise processes text in your browser. Notes are not sent to Sintra, saved or associated with an account. Avoid sensitive information on shared devices."}
          </p>
        </section>

        <section className={styles.outputPane} aria-labelledby="output-heading" aria-live="polite">
          <div className={styles.sectionTitle}>
            <span className={styles.step}>02</span>
            <div>
              <h2 id="output-heading">{pt ? "Revise o resultado" : "Review your results"}</h2>
              <p>{pt ? "Somente itens identificados explicitamente." : "Only explicitly recognized action items."}</p>
            </div>
          </div>
          {!result && (
            <div className={styles.empty}>
              <div className={styles.emptyGlyph}><Check size={25} aria-hidden="true" /></div>
              <strong>{pt ? "O resultado aparecerá aqui." : "Your result will appear here."}</strong>
              <p>{pt
                ? "Comece pelo exemplo fictício. Depois edite o texto para ver o que a ferramenta reconhece e o que ela deixa de fora."
                : "Try the fictional example first, then change the text to see what the rules recognize and where they abstain."}</p>
            </div>
          )}
          {result?.status === "too-long" && (
            <p role="alert" className={styles.warning}>{pt ? "Texto muito longo. Limite de 4.000 caracteres." : "Too much text. Limit: 4,000 characters."}</p>
          )}
          {result?.status === "no-actions" && (
            <p role="status" className={styles.warning}>{pt
              ? "Nenhuma ação explícita foi identificada. Tente começar as linhas com verbos como Enviar, Revisar ou Confirmar."
              : "No explicit task was recognized. Try lines beginning with Send, Review or Confirm."}</p>
          )}
          {result?.status === "ready" && (
            <>
              <div className={styles.receipt}>
                <strong>{result.actions.length} {pt ? "candidatas" : "candidates"}</strong>
                <span>{result.skippedLines} {pt ? "linhas ignoradas" : "lines skipped"}</span>
                <span>{pt ? "Método: regras locais" : "Method: local rules"}</span>
              </div>
              {result.truncated && (
                <p role="alert" className={styles.warning}>{pt
                  ? "Há mais de 15 tarefas candidatas. Algumas foram ignoradas. Divida as anotações."
                  : "More than 15 candidate tasks. Some were skipped. Split the notes."}</p>
              )}
              <div className={styles.results}>
                {rows.map((row, index) => (
                  <article key={row.id} className={styles.resultCard}>
                    <div className={styles.resultHead}>
                      <span className={styles.resultNumber}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={styles.reviewRequired}>{pt ? "REVISÃO NECESSÁRIA" : "REVIEW REQUIRED"}</span>
                    </div>
                    <label className={styles.fieldLabel} htmlFor={`task-${row.id}`}>{pt ? "Tarefa" : "Action"}</label>
                    <input id={`task-${row.id}`} className={styles.taskInput} value={row.draftTitle}
                      maxLength={280}
                      onChange={event => update(row.id, "draftTitle", event.target.value)}/>
                    <div className={styles.fields}>
                      <label>{pt ? "Responsável (se informado)" : "Owner (if stated)"}
                        <input value={row.draftOwner} maxLength={80}
                          onChange={event => update(row.id, "draftOwner", event.target.value)}
                          placeholder={pt ? "Não identificado" : "Not identified"}/>
                      </label>
                      <label>{pt ? "Prazo (texto original)" : "Deadline (original wording)"}
                        <input value={row.draftDeadline} maxLength={80}
                          onChange={event => update(row.id, "draftDeadline", event.target.value)}
                          placeholder={pt ? "Não identificado" : "Not identified"}/>
                      </label>
                    </div>
                    <div className={styles.evidence}>
                      <span>{pt ? `FONTE · LINHA ${row.lineNumber}` : `SOURCE · LINE ${row.lineNumber}`}</span>
                      <blockquote>{row.originalLine}</blockquote>
                    </div>
                    <label className={styles.reviewBox}>
                      <input type="checkbox" checked={reviewed.includes(row.id)}
                        disabled={!row.draftTitle.trim()}
                        onChange={event => toggleReviewed(row.id, event.target.checked)}/>
                      <span>{pt ? "Revisei esta tarefa" : "I reviewed this action"}</span>
                    </label>
                  </article>
                ))}
              </div>
              <div className={styles.export}>
                <button type="button" className={styles.primary} disabled={usable === 0} onClick={copyReviewed}>
                  <ClipboardCopy size={16} aria-hidden="true"/>
                  {pt ? `Copiar tarefas revisadas (${usable})` : `Copy reviewed actions (${usable})`}
                </button>
                <span role="status">{copyStatus === "copied"
                  ? (pt ? "Copiado." : "Copied.")
                  : copyStatus === "error" ? (pt ? "Cópia bloqueada pelo navegador." : "Browser blocked clipboard access.") : ""}</span>
              </div>
            </>
          )}
        </section>
      </div>
      <div className={styles.method}>
        <strong>{pt ? "O que aprendemos aqui?" : "What does this demonstrate?"}</strong>
        <p>{pt
          ? "Este é um primeiro exercício de extração por regras, não um modelo de linguagem. Ele reconhece verbos e metadados declarados explicitamente, preserva a fonte e deixa linhas ambíguas de fora. Uma versão com IA precisará mostrar ganhos de precisão e custos medidos antes de receber textos reais."
          : "This is a first deterministic extraction exercise, not a language model. It recognizes explicitly stated verbs and fields, preserves source evidence and skips ambiguous lines. A model-powered version must first demonstrate measurable quality and cost improvements."}</p>
      </div>
    </div>
  );
}
