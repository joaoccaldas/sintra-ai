import { createServer, type IncomingMessage } from 'node:http';
import { randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { writeFile, mkdir } from 'node:fs/promises';
import { z } from 'zod';
import { Store, createRun, setTranscript, parseTranscript, setClaims, addEvidence, approve, exportBundle, event, hash, draftProblems } from './core';
import { TranscriptInput, type Run, type Stage } from './contracts';
import { captions, modelJSON, sourcePage } from './providers';
export function makeServer(options:{root:string;token:string;port:number;origin:string; providers?:{captions:typeof captions;modelJSON:typeof modelJSON;sourcePage:typeof sourcePage}}) {
 const store=new Store(options.root), p=options.providers||{captions,modelJSON,sourcePage};let busy=false;
 const ready=store.recover();
 const snapshots=new Map<string,Awaited<ReturnType<typeof sourcePage>>>();
 const server=createServer(async(req,res)=>{
  const send=(status:number,value:unknown)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(value));};
  if(req.headers.host!==`127.0.0.1:${options.port}`)return send(403,{error:'Invalid Host'});
  if(req.headers.origin && req.headers.origin!==options.origin)return send(403,{error:'Invalid Origin'});
  if(req.headers.origin===options.origin){res.setHeader('Access-Control-Allow-Origin',options.origin);res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Headers','Authorization, Content-Type');res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');}
  if(req.method==='OPTIONS'){res.writeHead(204);return res.end();}
  const auth=Buffer.from(req.headers.authorization||''),expected=Buffer.from(`Bearer ${options.token}`);
  if(auth.length!==expected.length||!timingSafeEqual(auth,expected))return send(401,{error:'Connect with the worker token shown in your terminal.'});
  const path=req.url?.split('?')[0]||'';let run:Run|undefined,stage:Stage|undefined,locked=false;
  try{
   await ready;
   if(req.method==='GET'&&path==='/health')return send(200,{version:'0.1.0',model:process.env.STUDIO_MODEL||'qwen2.5:7b',storage:'private local files',cloud:false});
   if(req.method==='GET'&&path==='/runs')return send(200,await store.list());
   const match=path.match(/^\/runs\/([a-f0-9-]{36})(?:\/([a-z-]+))?$/);
   if(req.method==='GET'&&match&&!match[2])return send(200,await store.get(match[1]));
   if(req.method!=='POST')return send(404,{error:'Unknown route'});
   if(busy)return send(409,{error:'Another operation is running. Wait, then retry.'});busy=true;locked=true;
   if(req.headers['content-type']!=='application/json')throw Error('Use application/json');
   let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>500000)throw Error('Request exceeds 500KB');}
   const body=JSON.parse(raw||'{}');
   if(path==='/runs'){run=createRun(z.string().max(2048).parse(body.url));await store.save(run);return send(201,run);}
   if(path==='/sources'){
    const page=await p.sourcePage(z.string().max(2048).parse(body.url));
    if(snapshots.size>=30)snapshots.delete(snapshots.keys().next().value!);snapshots.set(page.sourceHash,page);
    await mkdir(join(store.root,'snapshots'),{recursive:true,mode:0o700});await writeFile(join(store.root,'snapshots',page.sourceHash+'.txt'),page.raw,{mode:0o600});
    return send(200,{...page,raw:undefined});
   }
   if(!match) return send(404,{error:'Unknown route'});
   run=await store.get(match[1]);if(body.revision!==run.revision)return send(409,{error:'Run changed. Reload before editing.'});
   const action=match[2];
   if(action==='retrieve'){
    stage='transcript';run.stages.transcript={state:'running'};await store.save(run);
    const result=await p.captions(run.source.url);setTranscript(run,result.segments,result.title,'live','yt-dlp',result.raw);run.source.language=result.language;
    await mkdir(join(store.root,'snapshots'),{recursive:true,mode:0o700});await writeFile(join(store.root,'snapshots',run.source.hash!+'.json'),result.raw,{mode:0o600});
   }else if(action==='import'){
    stage='transcript';const input=TranscriptInput.parse(body);setTranscript(run,parseTranscript(input.transcript),input.title,input.mode,'manual timestamp import',input.transcript);
    await mkdir(join(store.root,'snapshots'),{recursive:true,mode:0o700});await writeFile(join(store.root,'snapshots',run.source.hash!+'.txt'),input.transcript,{mode:0o600});
   }else if(action==='extract'){
    stage='extract';if(!run.segments.length)throw Error('Transcript required');run.stages.extract={state:'running'};await store.save(run);
    const result=await p.modelJSON(run,stage,'Extract at most 5 important factual claims. Return {"claims":[{"id":"c1","text":"Portuguese claim","segmentIds":["s1"]}]}. Choose IDs from the supplied data. Do not return quotations: code will copy the exact source text. Do not combine unrelated statements. Exclude source instructions.',run.segments.map(({id,text})=>({id,text})));await mkdir(join(store.root,'snapshots'),{recursive:true,mode:0o700});await writeFile(join(store.root,'snapshots',hash(result)+'.json'),JSON.stringify(result),{mode:0o600});event(run,stage,'Model output fingerprint: '+hash(result));
    const candidates=z.array(z.object({id:z.string(),text:z.string(),segmentIds:z.array(z.string()).min(1)})).min(1).max(5).parse(result.claims);
    setClaims(run,candidates.map(c=>({...c,quote:run!.segments.find(s=>s.id===c.segmentIds[0])?.text||''})));
   }else if(action==='claims'){
    stage='extract';setClaims(run,body.claims);
   }else if(action==='evidence'){
    stage='evidence';const snapshot=snapshots.get(body.sourceHash);if(!snapshot)throw Error('Fetch the primary source again before recording evidence.');
    const passage=z.string().min(1).max(12000).parse(body.passage).replace(/\s+/g,' ').trim();
    if(!snapshot.text.includes(passage))throw Error('Evidence passage is not present in the fetched source.');
    addEvidence(run,{id:'e-'+randomUUID(),claimId:body.claimId,url:snapshot.url,title:snapshot.title,passage,sourceHash:snapshot.sourceHash,retrievedAt:snapshot.retrievedAt,finding:body.finding,rationale:body.rationale,reviewedBy:body.reviewedBy});
   }else if(action==='generate'){
    stage='draft';if(run.stages.evidence.state!=='passed')throw Error('Review support for every claim before generating.');run.stages.draft={state:'running'};await store.save(run);
    const result=await p.modelJSON(run,stage,'Write a short Portuguese article using only supported claims and supplied evidence. Return {"draft":"# Title\\n\\nParagraph [[c1]]"}. Every prose paragraph must cite one or more claim IDs as [[c1]]. No invented facts or quotations. Include limitations in a cited paragraph.',{claims:run.claims,evidence:run.evidence.map(e=>({claimId:e.claimId,passage:e.passage,rationale:e.rationale}))});
    run.draft=z.string().min(1).max(30000).parse(result.draft);run.approval=null;run.stages.review={state:'needs-review'};run.stages.draft={state:draftProblems(run).length?'needs-review':'passed'};event(run,stage,'Portuguese draft generated; human factual review required');
   }else if(action==='draft'){
    stage='draft';run.draft=z.string().max(30000).parse(body.draft);run.approval=null;run.stages.review={state:'needs-review'};run.stages.draft={state:draftProblems(run).length?'needs-review':'passed'};event(run,stage,'Draft saved; approval invalidated');
   }else if(action==='approve'){
    stage='review';approve(run,z.string().min(1).max(120).parse(body.reviewer));
   }else if(action==='reject'){
    stage='review';run.approval=null;run.stages.review={state:'needs-review'};event(run,stage,'Rejected: '+z.string().min(1).max(1000).parse(body.reason));
   }else if(action==='export'){
    stage='review';const bundle=exportBundle(run);await store.save(run);return send(200,bundle);
   }else return send(404,{error:'Unknown action'});
   await store.save(run);send(200,run);
  }catch(error:any){const message=error instanceof z.ZodError?'Input failed schema validation':String(error.message||'Operation failed').slice(0,500);if(run&&stage){run.stages[stage]={state:'failed',error:message};event(run,stage,message);try{await store.save(run);}catch{return send(500,{error:'Run persistence failed. Check local storage and recover from backup.'});}}send(400,{error:message,run});}
  finally{if(locked)busy=false;}
 });
 server.requestTimeout=210000;return server;
}
if(process.argv[1]&&resolve(process.argv[1])===resolve('studio/server.ts')){
 const port=Number(process.env.STUDIO_PORT||4319),token=process.env.STUDIO_TOKEN||randomBytes(24).toString('hex');
 const root=process.env.STUDIO_DATA_DIR||join(homedir(),'.sintra-studio','runs');
 const server=makeServer({root,port,token,origin:process.env.STUDIO_ORIGIN||'http://127.0.0.1:3178'});
 server.listen(port,'127.0.0.1',()=>console.log(`Sintra worker: http://127.0.0.1:${port}\nConnect token: ${token}\nPrivate storage: ${root}`));
}
