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

const OWNER_META = /(?:^|\s*(?:\||·|;|—)\s*)(?:respons[aá]vel|owner)\s*:\s*([^|;·—]+)(?=$|\s*[|;·—])/iu;
const DEADLINE_META = /(?:^|\s*(?:\||·|;|—)\s*)(?:prazo|deadline)\s*:\s*([^|;·—]+)(?=$|\s*[|;·—])/iu;

function cleanLine(value: string): string {
  return value
    .replace(/^\s*(?:[-*•]|\d{1,2}[.)]|\[\s?\])\s*/, "")
    .replace(/^\s*(?:a[cç][aã]o|tarefa|action|task)\s*:\s*/iu, "")
    .trim();
}

function explicitMetadata(line: string, regex: RegExp): string | null {
  const match = line.match(regex);
  if (!match?.[1]) return null;
  const cleaned = match[1].trim();
  if (!cleaned || cleaned.length > 80) return null;
  return cleaned;
}

function normalizeForIdentity(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
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

    const owner = explicitMetadata(source, OWNER_META);
    const deadline = explicitMetadata(source, DEADLINE_META);

    // Metadata may appear at beginning or after a task line. We do not infer
    // who is responsible from casual mentions of people in meetings.
    const task = cleanLine(source.replace(OWNER_META, " ").replace(DEADLINE_META, " "))
      .replace(PREAMBLE, "").trim();
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
