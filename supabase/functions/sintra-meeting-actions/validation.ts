/**
 * Content boundary shared by the protected Edge Function and the evaluation
 * suite. This does not claim that the model's semantic interpretation is true.
 * Provenance checks prevent citations, owners and deadlines invented outside
 * exact source lines. Every result is "needs-review" until a user approves it.
 */
export const MODEL_INPUT_LIMIT = 4000;
export const MODEL_ACTION_LIMIT = 12;

export interface ProposedModelAction {
  title: string;
  lineNumber: number;
  sourceQuote: string;
  owner: string | null;
  deadline: string | null;
}

export interface GroundedAction extends ProposedModelAction {
  reviewStatus: "needs-review";
  method: "model-proposal";
}

export type Rejection = { index: number; reason: string };
export interface ValidationReceipt {
  actions: GroundedAction[];
  rejected: Rejection[];
  method: "source-line-validator-v1";
  sourceLineCount: number;
}

const normalized = (x: string) => x.toLocaleLowerCase("pt-BR")
  .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^\p{L}\p{N}]+/gu, " ").trim();

export function exactLabeledValue(source: string, label: "owner"|"deadline"): string|null {
  const names = label === "owner"
    ? /^(?:owner|respons[aá]vel)\s*:\s*(.+)$/iu
    : /^(?:deadline|prazo)\s*:\s*(.+)$/iu;
  const segments = source.split(/\s*\|\s*|\s+;\s+|\s*·\s*/u);
  for (const segment of segments) {
    const m = segment.trim().match(names);
    if (m?.[1]?.trim() && m[1].trim().length <= 80) return m[1].trim();
  }
  return null;
}

export function validateModelCandidates(notes: string, output: unknown): ValidationReceipt {
  const lines = notes.split(/\r?\n/);
  const result: ValidationReceipt = { actions: [], rejected: [], method:"source-line-validator-v1", sourceLineCount:lines.length };
  if (notes.length > MODEL_INPUT_LIMIT || !notes.trim()) return result;
  const candidates = output && typeof output === "object" && "actions" in output &&
    Array.isArray((output as {actions:unknown}).actions)
    ? (output as {actions:unknown[]}).actions : [];
  const seen = new Set<string>();
  for (const [index, raw] of candidates.slice(0, 35).entries()) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      result.rejected.push({index,reason:"invalid-object"});continue;
    }
    const a = raw as Record<string,unknown>;
    const line = a.lineNumber;
    const quote = a.sourceQuote;
    const title = a.title;
    if (typeof line !== "number" || !Number.isInteger(line) || line < 1 || line > lines.length ||
        typeof quote !== "string" || quote.length > 400 ||
        lines[line - 1].trim() !== quote.trim()) {
      result.rejected.push({index,reason:"source-not-exact"});continue;
    }
    if (typeof title !== "string" || title.trim().length < 5 || title.length > 180) {
      result.rejected.push({index,reason:"invalid-title"});continue;
    }
    // Negative instructions are never actionable regardless of model confidence.
    if (/^\s*(?:[-*•]\s*)?(?:n[aã]o|not|don't|do not|evitar)\b/iu.test(quote)) {
      result.rejected.push({index,reason:"negated-source"});continue;
    }
    const own = exactLabeledValue(quote,"owner");
    const due = exactLabeledValue(quote,"deadline");
    const owner = a.owner == null ? null : a.owner;
    const deadline = a.deadline == null ? null : a.deadline;
    if ((owner !== null && (typeof owner !== "string" || own !== owner.trim())) ||
        (deadline !== null && (typeof deadline !== "string" || due !== deadline.trim()))) {
      result.rejected.push({index,reason:"unsupported-owner-or-deadline"});continue;
    }
    const key = normalized(title);
    if (!key || seen.has(key)) {
      result.rejected.push({index,reason:"duplicate-title"});continue;
    }
    if (result.actions.length >= MODEL_ACTION_LIMIT) {
      result.rejected.push({index,reason:"action-limit"});continue;
    }
    seen.add(key);
    result.actions.push({
      title:title.trim(),lineNumber:line,sourceQuote:quote.trim(),
      owner:owner === null ? null : (owner as string).trim(),
      deadline:deadline === null ? null : (deadline as string).trim(),
      reviewStatus:"needs-review",method:"model-proposal",
    });
  }
  if (candidates.length > 35) result.rejected.push({index:35,reason:"candidate-limit"});
  return result;
}
