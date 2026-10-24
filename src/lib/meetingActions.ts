/**
 * Small, explainable first-win extraction engine.
 *
 * IMPORTANT: This is a local, deterministic learning exercise, NOT an LLM,
 * autonomous agent or independently verified summary. It intentionally
 * abstains when a line is ambiguous rather than invent owners or deadlines.
 *
 * No network, cookies, storage, vendor API calls, or personal-data telemetry.
 */
export const MAX_NOTES_CHARS = 4000;
export const MAX_ACTIONS = 15;

export interface ActionCandidate {
  id: string;
  title: string;
  originalLine: string;
  lineNumber: number;
  explicitOwner: string | null;
  explicitDeadline: string | null;
  reviewStatus: "needs-review";
}

export type ExtractionStatus = "ready" | "empty" | "too-long" | "no-actions";

export interface ExtractionResult {
  status: ExtractionStatus;
  actions: ActionCandidate[];
  consideredLines: number;
  skippedLines: number;
  truncated: boolean;
  method: "local-rules-v1";
}

/**
 * A deliberately narrow set of task-opening verbs.
 * No statistical claims; it only recognizes explicit task language.
 */
const ACTION_VERB = /^(?:enviar|revisar|preparar|atualizar|criar|agendar|confirmar|corrigir|publicar|testar|documentar|entregar|verificar|validar|organizar|compartilhar|montar|analisar|falar|ligar|definir|checar|submeter|implementar|reservar|ajustar|avisar|concluir|solicitar|acompanhar|entrar em contato|send|review|prepare|update|create|schedule|confirm|test|document|deliver|check|validate|share|analyze|call|submit|implement|follow up)\b/iu;

const AVOID_NEGATION = /^(?:não|nao|not|do not|don't|sem necessidade de|não precisamos|nao precisamos|evitar|cancelar a ideia de)\b/iu;
const PREAMBLE = /^(?:(?:por favor|favor|precisamos(?: de)?|devemos|please|we need to|to do)\s+)+/iu;

const OWNER_META = /^(?:respons[aá]vel|owner)\s*:\s*(.+)$/iu;
const DEADLINE_META = /^(?:prazo|deadline)\s*:\s*(.+)$/iu;

function cleanLine(value: string): string {
  return value
    .replace(/^\s*(?:[-*•]|\d{1,2}[.)]|\[\s?\])\s*/, "")
    .replace(/^\s*(?:a[cç][aã]o|tarefa|action|task)\s*:\s*/iu, "")
    .trim();
}

function explicitMetadata(value: string, pattern: RegExp): string | null {
  const match = value.match(pattern);
  const result = match?.[1]?.trim();
  return result && result.length <= 80 ? result : null;
}

function decomposeLine(source: string): { task: string; owner: string | null; deadline: string | null } {
  // A bare ';' belongs to common HTML entities (e.g. &lt; and &#233;).
  // Split only on visible delimiters or whitespace-surrounded semicolons.
  const segments = source.split(/\s*(?:\||·|—)\s*|\s+;\s+/u).map(x => x.trim()).filter(Boolean);
  let owner: string | null = null;
  let deadline: string | null = null;
  let task = "";
  for (const part of segments) {
    const candidate = cleanLine(part);
    if (OWNER_META.test(candidate)) {
      owner = explicitMetadata(candidate, OWNER_META);
    } else if (DEADLINE_META.test(candidate)) {
      deadline = explicitMetadata(candidate, DEADLINE_META);
    } else if (!task) {
      task = candidate;
    }
  }
  return { task: task.replace(PREAMBLE, "").trim(), owner, deadline };
}

function normalizeForIdentity(value: string): string {
  const normalized = value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  const words = normalized.split(" ").filter(Boolean);
  // Grammar-only normalization after the leading action verb:
  // "Revisar proposta" and "Revisar a proposta" are the same action here.
  // Never remove object nouns, negation, quantities or names.
  if (words.length > 2 && ["a","o","as","os","um","uma","the"].includes(words[1])) {
    words.splice(1,1);
  }
  return words.join(" ");
}

export function extractMeetingActions(input: string): ExtractionResult {
  const empty: ExtractionResult = {
    status: "empty", actions: [], consideredLines: 0,
    skippedLines: 0, truncated: false, method: "local-rules-v1",
  };
  if (typeof input !== "string" || !input.trim()) return empty;
  if (input.length > MAX_NOTES_CHARS) {
    return { ...empty, status: "too-long" };
  }

  const lines = input.split(/\r?\n/);
  const tasks: ActionCandidate[] = [];
  const seen = new Set<string>();
  let considered = 0;
  let skipped = 0;
  let truncated = false;

  for (let index = 0; index < lines.length; index++) {
    const source = lines[index].trim();
    if (!source) continue;
    considered += 1;

    // Metadata is accepted ONLY when explicitly labeled in a separate
    // pipe/semicolon segment. Arbitrary people/dates are never inferred.
    const { task, owner, deadline } = decomposeLine(source);
    const negative = AVOID_NEGATION.test(task);
    const tooLong = task.length > 280 || task.length < 8;
    const accepted = !negative && !tooLong && ACTION_VERB.test(task);
    const identity = normalizeForIdentity(task);
    if (!accepted || !identity || seen.has(identity)) {
      skipped += 1;
      continue;
    }

    if (tasks.length >= MAX_ACTIONS) {
      truncated = true;
      skipped += 1;
      continue;
    }

    seen.add(identity);
    tasks.push({
      id: `line-${index + 1}`,
      title: task,
      originalLine: source,
      lineNumber: index + 1,
      explicitOwner: owner,
      explicitDeadline: deadline,
      reviewStatus: "needs-review",
    });
  }

  return {
    status: tasks.length ? "ready" : "no-actions",
    actions: tasks, consideredLines: considered,
    skippedLines: skipped, truncated, method: "local-rules-v1",
  };
}
