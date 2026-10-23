import { z } from 'zod';
export const Segment = z.object({ id: z.string(), start: z.number().min(0), duration: z.number().min(0), text: z.string().min(1).max(10000) });
export const Claim = z.object({ id: z.string().regex(/^[a-z][a-z0-9-]{0,49}$/), text: z.string().min(1).max(2000), segmentIds: z.array(z.string()).min(1), quote: z.string().min(1), status: z.enum(['unverified','supported','contradicted','unsupported']).default('unverified') });
export const Evidence = z.object({ id: z.string(), claimId: z.string(), url: z.string().url(), title: z.string(), passage: z.string().min(1).max(12000), sourceHash: z.string(), retrievedAt: z.string(), finding: z.enum(['supported','contradicted','unsupported']), rationale: z.string().min(1), reviewedBy: z.string().min(1) });
export const Stages = ['source','transcript','extract','evidence','draft','review'] as const;
export type Stage = typeof Stages[number];
export type State = 'pending'|'running'|'passed'|'failed'|'blocked'|'needs-review';
export interface Run {
  schemaVersion: 1; id: string; revision: number; mode: 'live'|'import'|'fixture'; createdAt: string; updatedAt: string;
  source: { url: string; videoId: string; title: string; provider: string; hash?: string; language?: string };
  segments: z.infer<typeof Segment>[]; claims: z.infer<typeof Claim>[]; evidence: z.infer<typeof Evidence>[];
  draft: string; approval: null | { hash: string; reviewer: string; at: string };
  stages: Record<Stage, { state: State; error?: string }>;
  events: { at: string; stage: Stage; message: string }[];
  usage: { stage: string; model: string; inputTokens: number|null; outputTokens: number|null; durationMs: number; cost: null; promptHash: string }[];
  exports: { at: string; hash: string; kind: 'review-bundle'; published: false }[];
}
export const TranscriptInput = z.object({ title: z.string().min(1).max(300), transcript: z.string().min(1).max(200000), mode: z.enum(['import','fixture']).default('import') });
export const RunSchema = z.object({
 schemaVersion:z.literal(1),id:z.string().uuid(),revision:z.number().int().min(0),mode:z.enum(['live','import','fixture']),createdAt:z.string().datetime(),updatedAt:z.string().datetime(),
 source:z.object({url:z.string().url(),videoId:z.string().regex(/^[\w-]{11}$/),title:z.string(),provider:z.string(),hash:z.string().optional(),language:z.string().optional()}),
 segments:Segment.array().max(2000),claims:Claim.array().max(20),evidence:Evidence.array().max(20),draft:z.string().max(30000),approval:z.object({hash:z.string(),reviewer:z.string(),at:z.string().datetime()}).nullable(),
 stages:z.object(Object.fromEntries(Stages.map(s=>[s,z.object({state:z.enum(['pending','running','passed','failed','blocked','needs-review']),error:z.string().optional()})]))),
 events:z.array(z.object({at:z.string(),stage:z.enum(Stages),message:z.string()})),
 usage:z.array(z.object({stage:z.string(),model:z.string(),inputTokens:z.number().nullable(),outputTokens:z.number().nullable(),durationMs:z.number(),cost:z.null(),promptHash:z.string()})),
 exports:z.array(z.object({at:z.string(),hash:z.string(),kind:z.literal('review-bundle'),published:z.literal(false)}))
});
