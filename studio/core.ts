import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Claim, Evidence, Segment, Stages, RunSchema, type Run, type Stage } from './contracts';
import type { KnowledgeRecord } from '../src/lib/knowledgeData';
export const hash = (value: unknown) => createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex');
export function videoUrl(input: string) {
  const u = new URL(input); const host = u.hostname.replace(/^www\./,'');
  if (!['https:','http:'].includes(u.protocol) || u.username || u.password || u.port) throw Error('Use a public YouTube URL');
  const id = host === 'youtu.be' ? u.pathname.slice(1) : ['youtube.com','m.youtube.com'].includes(host) ? (u.pathname === '/watch' ? u.searchParams.get('v') : u.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]+)\/?$/)?.[1]) : null;
  if (!/^[A-Za-z0-9_-]{11}$/.test(id || '')) throw Error('Invalid YouTube video ID or host');
  return { videoId: id!, url: `https://www.youtube.com/watch?v=${id}` };
}
export function parseTranscript(text: string) {
  const lines = text.trim().split(/\r?\n/).filter(l => l.trim()); let previous = -1;
  if (lines.length > 2000) throw Error('Maximum 2000 transcript segments');
  return lines.map((line, i) => {
    const m = line.match(/^\[(?:(\d{1,2}):)?(\d{1,3}):(\d{2})(?:\.(\d{1,3}))?\]\s*(.+)$/);
    if (!m || +m[3] > 59 || (m[1] && +m[2] > 59)) throw Error(`Invalid timestamp on line ${i+1}; use [mm:ss] text`);
    const start = +(m[1]||0)*3600 + +m[2]*60 + +m[3] + +(m[4]||0)/10**(m[4]?.length||0);
    if (start < previous) throw Error(`Timestamps must be ordered (line ${i+1})`); previous = start;
    return Segment.parse({ id:`s${i+1}`, start, duration:0, text:m[5].trim() });
  });
}
export function json3Segments(raw: string) {
  const data = JSON.parse(raw); if (!Array.isArray(data.events)) throw Error('Invalid caption response');
  const segments = data.events.filter((e: any) => Array.isArray(e.segs)).map((e: any) => ({ start: e.tStartMs/1000, duration:(e.dDurationMs||0)/1000, text:e.segs.map((s:any)=>s.utf8||'').join('').replace(/\s+/g,' ').trim() })).filter((e:any)=>e.text);
  if (!segments.length || segments.length>2000) throw Error('No captions or transcript exceeds 2000 segments');
  return segments.map((s:any,i:number)=>Segment.parse({...s,id:`s${i+1}`}));
}
export function createRun(url: string): Run {
  const source=videoUrl(url), now=new Date().toISOString();
  return { schemaVersion:1,id:randomUUID(),revision:0,mode:'live',createdAt:now,updatedAt:now,source:{...source,title:source.videoId,provider:'pending'},segments:[],claims:[],evidence:[],draft:'',approval:null,stages:Object.fromEntries(Stages.map(s=>[s,{state:s==='source'?'passed':'pending'}])) as Run['stages'],events:[],usage:[],exports:[] };
}
export function event(run:Run,stage:Stage,message:string) { run.events.push({at:new Date().toISOString(),stage,message}); }
export function invalidate(run:Run,from:Stage) {
  for(const s of Stages.slice(Stages.indexOf(from))) run.stages[s]={state:'pending'};
  run.approval=null;
  if(Stages.indexOf(from)<=2) run.claims=[];
  if(Stages.indexOf(from)<=3) run.evidence=[];
  if(Stages.indexOf(from)<=4) run.draft='';
}
export function setTranscript(run:Run,segments:Run['segments'],title:string,mode:Run['mode'],provider:string,raw:string) {
  if(!segments.length) throw Error('Transcript is empty');
  if(run.source.hash===hash(raw)&&run.source.title===title&&run.mode===mode){run.stages.transcript={state:'passed'};event(run,'transcript','Identical transcript retained; no duplicate artifacts');return;}
  invalidate(run,'extract'); run.segments=segments; run.source={...run.source,title,provider,hash:hash(raw)};run.mode=mode;run.stages.transcript={state:'passed'};event(run,'transcript',`${segments.length} segments · ${mode} · ${provider}`);
}
export function setClaims(run:Run,value:unknown) {
  if(!run.segments.length) throw Error('Retrieve or import a transcript first');
  const claims=Claim.array().min(1).max(20).parse(value);
  const ids=new Set<string>();
  for(const c of claims) {
    if(ids.has(c.id)) throw Error('Duplicate claim ID');ids.add(c.id);
    const selected=c.segmentIds.map(id=>run.segments.find(s=>s.id===id));
    if(selected.some(s=>!s)) throw Error('Claim cites an unknown segment');
    if(!selected.some(s=>s!.text.includes(c.quote))) throw Error('Claim quotation is not an exact source passage');
    c.status='unverified';
  }
  invalidate(run,'evidence');run.claims=claims;run.stages.extract={state:'passed'};run.stages.evidence={state:'needs-review'};event(run,'extract',`${claims.length} source-linked claims; independent review required`);
}
export function addEvidence(run:Run,value:unknown) {
  const e=Evidence.parse(value); const c=run.claims.find(c=>c.id===e.claimId); if(!c) throw Error('Unknown claim');
  const url=new URL(e.url); if(url.protocol!=='https:' || url.username || url.password) throw Error('Evidence requires HTTPS');
  invalidate(run,'draft');run.evidence=run.evidence.filter(x=>x.claimId!==e.claimId);run.evidence.push(e);c.status=e.finding;
  run.stages.evidence={state:run.claims.every(x=>x.status==='supported')?'passed':'needs-review'};event(run,'evidence',`${e.claimId}: ${e.finding} · reviewer ${e.reviewedBy}`);
}
export function draftProblems(run:Run,draft=run.draft):string[] {
  const problems:string[]=[];
  if(!run.claims.length || run.claims.some(c=>c.status!=='supported')) problems.push('Every extracted claim needs supported external evidence; revise extraction to exclude unsupported claims.');
  if(!draft.trim()) problems.push('Draft is empty.');
  const paragraphs=draft.split(/\n\s*\n/).map(p=>p.split('\n').filter(line=>!/^#{1,6}\s/.test(line.trim())).join('\n')).filter(p=>p.trim());
  if(!paragraphs.length)problems.push('Draft requires at least one cited prose paragraph.');
  if(/<\/?[a-z][^>]*>|\]\(\s*(?:javascript|data|file):/i.test(draft))problems.push('Raw HTML and unsafe link schemes are not allowed in exported drafts.');
  for(const p of paragraphs) {
    const cites=[...p.matchAll(/\[\[([^\]]+)\]\]/g)].map(m=>m[1]);
    if(!cites.length) problems.push('Every prose paragraph needs a [[claim-id]] citation.');
    if(cites.some(id=>!run.claims.some(c=>c.id===id&&c.status==='supported'))) problems.push('Draft contains an unknown or unsupported claim citation.');
  }
  return [...new Set(problems)];
}
export function contentHash(run:Run) { return hash({source:run.source,segments:run.segments,claims:run.claims,evidence:run.evidence,draft:run.draft,mode:run.mode}); }
export function approve(run:Run,reviewer:string) {
  if(!reviewer.trim()) throw Error('Reviewer name is required');const problems=draftProblems(run);if(problems.length)throw Error(problems.join(' '));
  run.approval={hash:contentHash(run),reviewer:reviewer.trim(),at:new Date().toISOString()};run.stages.review={state:'passed'};event(run,'review',`Approved by ${reviewer}`);
}
export function exportBundle(run:Run) {
  if(!run.approval || run.approval.hash!==contentHash(run)) throw Error('Current draft and evidence require approval');
  if(draftProblems(run).length)throw Error('Draft validation failed');
  const date=run.approval.at.slice(0,10), due=new Date(Date.parse(run.approval.at)+30*86400000).toISOString().slice(0,10);
  const candidate:KnowledgeRecord={id:`studio-${run.source.videoId.toLowerCase().replace(/_/g,'-')}-${run.id.slice(0,8)}`,title:run.draft.match(/^#\s+(.+)$/m)?.[1]||run.source.title,summary:run.claims[0].text,kind:'workflow',tags:['Sintra Studio','YouTube'],reviewedAt:date,reviewDueAt:due,evidenceLevel:'example-workflow',facts:run.claims.map(c=>({text:c.text,sourceIds:run.evidence.filter(e=>e.claimId===c.id).map(e=>e.id)})),sources:run.evidence.map(e=>({id:e.id,title:e.title,publisher:new URL(e.url).hostname,url:e.url,checkedAt:e.retrievedAt.slice(0,10)})),prerequisites:['Review the attached source snapshots and draft.'],steps:['Read the reviewed Portuguese article in the accompanying Markdown.'],output:run.draft,validation:['Human-reviewed claim support and content-bound approval.'],limitations:[`Mode: ${run.mode}. Source linkage and reviewer assessment do not certify objective truth.`, 'Candidate only; no automatic publication or provider application execution.'],related:[],executionStatus:'not-run-in-sintra'};
  const markdown=run.draft.replace(/\[\[([^\]]+)\]\]/g,(_,id)=>run.evidence.filter(e=>e.claimId===id).map(e=>`[${id}](${e.url})`).join(' '));
  const receipt={at:new Date().toISOString(),hash:contentHash(run),kind:'review-bundle' as const,published:false as const};run.exports.push(receipt);
  return {schemaVersion:1,candidate,markdown,run,receipt};
}
export class Store {
  constructor(readonly root:string){}
  async init(){await mkdir(this.root,{recursive:true,mode:0o700});}
  path(id:string){if(!/^[a-f0-9-]{36}$/.test(id))throw Error('Invalid run ID');return join(this.root,`${id}.json`);}
  async get(id:string):Promise<Run>{const r=RunSchema.parse(JSON.parse(await readFile(this.path(id),'utf8'))) as unknown as Run;if(r.id!==id)throw Error('Invalid stored run');return r;}
  async save(run:Run){run.revision++;run.updatedAt=new Date().toISOString();const p=this.path(run.id),tmp=`${p}.${randomUUID()}.tmp`,body=JSON.stringify(run,null,2);const history=join(this.root,'history',run.id);await mkdir(history,{recursive:true,mode:0o700});await writeFile(join(history,`${run.revision}-${randomUUID()}.json`),body,{mode:0o600,flag:'wx'});await writeFile(tmp,body,{mode:0o600,flag:'wx'});await rename(tmp,p);}
  async recover(){await this.init();for(const file of (await readdir(this.root)).filter(f=>f.endsWith('.json'))){const run=await this.get(file.slice(0,-5));let changed=false;for(const stage of Stages){if(run.stages[stage].state==='running'){run.stages[stage]={state:'failed',error:'Worker restarted during this stage. Retry explicitly.'};event(run,stage,'Interrupted operation recovered after restart');changed=true;}}if(changed)await this.save(run);}}
  async list(){await this.init();const records=[];for(const file of (await readdir(this.root)).filter(f=>f.endsWith('.json'))){const r=await this.get(file.slice(0,-5));records.push({id:r.id,title:r.source.title,mode:r.mode,updatedAt:r.updatedAt});}return records.sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));}
}
