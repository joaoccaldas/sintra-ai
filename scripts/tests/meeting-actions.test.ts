import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { extractMeetingActions, MAX_ACTIONS, MAX_NOTES_CHARS } from "../../src/lib/meetingActions";

const SAMPLE = `Reunião do projeto, exemplo fictício
- Enviar o resumo para a equipe | Responsável: Ana | Prazo: 30/10/2026
- Revisar a proposta comercial | Responsável: Pedro
- Confirmar a reunião com o cliente
- Não enviar o orçamento antigo
Discutimos opções para o próximo trimestre.`;

test("real fictional sample yields exactly three explicit action candidates with evidence", () => {
  const result = extractMeetingActions(SAMPLE);
  assert.equal(result.status, "ready");
  assert.equal(result.method, "local-rules-v1");
  assert.equal(result.actions.length, 3);
  assert.equal(result.actions[0].title, "Enviar o resumo para a equipe");
  assert.equal(result.actions[0].explicitOwner, "Ana");
  assert.equal(result.actions[0].explicitDeadline, "30/10/2026");
  assert.equal(result.actions[0].lineNumber, 2);
  assert.equal(result.actions[0].originalLine, "- Enviar o resumo para a equipe | Responsável: Ana | Prazo: 30/10/2026");
  assert.equal(result.actions[1].explicitOwner, "Pedro");
  assert.equal(result.actions[1].explicitDeadline, null);
  assert.equal(result.actions[2].explicitOwner, null);
  assert.equal(result.actions[2].explicitDeadline, null);
  assert.ok(result.actions.every(item => item.reviewStatus === "needs-review"));
});

test("does not infer tasks from narrative, conjecture or names without explicit action", () => {
  const notes = [
    "Joana comentou que talvez envie o orçamento.",
    "A proposta estava atrasada, mas foi discutida.",
    "O time avaliou possibilidades de automação.",
    "João precisa enviar uma atualização.",
  ].join("\n");
  const result = extractMeetingActions(notes);
  assert.equal(result.status, "no-actions");
  assert.equal(result.actions.length, 0);
});

test("negated instructions and headline notes are not automatically converted into tasks", () => {
  const result = extractMeetingActions([
    "Não enviar dados pessoais ao fornecedor",
    "NAO revisar o documento confidencial",
    "Do not send the draft",
    "Enviar a versão final",
  ].join("\n"));
  assert.equal(result.actions.length, 1);
  assert.equal(result.actions[0].title, "Enviar a versão final");
});

test("owner and deadline must be explicitly labeled in separate segments", () => {
  const result = extractMeetingActions([
    "Responsável: Carla | Ação: Preparar a apresentação | Prazo: sexta-feira",
    "- Atualizar a planilha | Owner: Sam | Deadline: 2026-11-01",
    "Revisar o texto com Ana na terça-feira",
  ].join("\n"));
  assert.equal(result.actions.length, 3);
  assert.equal(result.actions[0].explicitOwner, "Carla");
  assert.equal(result.actions[0].explicitDeadline, "sexta-feira");
  assert.equal(result.actions[1].explicitOwner, "Sam");
  assert.equal(result.actions[1].explicitDeadline, "2026-11-01");
  assert.equal(result.actions[2].explicitOwner, null);
  assert.equal(result.actions[2].explicitDeadline, null);
});

test("preserves deadlines verbatim instead of assuming what Friday means", () => {
  const out = extractMeetingActions("Enviar o e-mail | Prazo: sexta-feira");
  assert.equal(out.actions[0].explicitDeadline, "sexta-feira");
  assert.equal(out.actions[0].title, "Enviar o e-mail");
});

test("deduplicates accents, case, and punctuation while preserving first source", () => {
  const out = extractMeetingActions("Revisar a proposta!\nrevisar a PROPOSTA\nRevisar a proposta.");
  assert.equal(out.actions.length, 1);
  assert.equal(out.actions[0].lineNumber, 1);
  assert.equal(out.skippedLines, 2);
});

test("enforces payload size and action count limits without truncating a user's input silently", () => {
  const tooLong = extractMeetingActions("Enviar a proposta\n".repeat(300));
  assert.ok("Enviar a proposta\n".repeat(300).length > MAX_NOTES_CHARS);
  assert.equal(tooLong.status, "too-long");
  assert.equal(tooLong.actions.length, 0);
  const many = Array.from({ length: MAX_ACTIONS + 4 }, (_, i) => `Enviar documento número ${i + 1}`).join("\n");
  const result = extractMeetingActions(many);
  assert.equal(result.actions.length, MAX_ACTIONS);
  assert.equal(result.truncated, true);
  assert.equal(result.skippedLines, 4);
});

test("empty whitespace and unsupported linguistic format return explicit abstention states", () => {
  assert.equal(extractMeetingActions("").status, "empty");
  assert.equal(extractMeetingActions(" \n  ").status, "empty");
  assert.equal(extractMeetingActions("Resumo: falamos sobre IA").status, "no-actions");
});

test("HTML looking source text remains plain content; UI does not use unsafe rendering", () => {
  const out = extractMeetingActions("Enviar &lt;script&gt;alert(1)&lt;/script&gt; para revisão");
  assert.equal(out.actions.length, 1);
  assert.match(out.actions[0].title, /&lt;script&gt;/);
  const client = readFileSync("src/components/MeetingActionsLab.tsx", "utf8");
  assert.doesNotMatch(client, /dangerouslySetInnerHTML|innerHTML|\.fetch\(|localStorage|sessionStorage|XMLHttpRequest/);
  assert.match(client, /originalLine/);
});

test("new laboratory is a real static route linked from the homepage and canonical use case", () => {
  const hero = readFileSync("src/components/BrazilFirstHero.tsx", "utf8");
  const home = readFileSync("src/components/HomeEditorialClient.tsx", "utf8");
  const page = readFileSync("src/app/laboratorio/page.tsx", "utf8");
  assert.match(hero, /BASE_PATH\}\/laboratorio\//);
  assert.match(home, /index === 0 \? \x60\$\{BASE_PATH\}\/laboratorio\//);
  assert.match(page, /<MeetingActionsLab \/>/);
  assert.match(page, /Modo local por regras/);
});
