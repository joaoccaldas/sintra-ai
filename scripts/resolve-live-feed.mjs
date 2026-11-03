#!/usr/bin/env node
/** Prefer ond.ai Feeds, retain the existing independent collector as fallback. */
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export const DEFAULT_FEED_URL='https://raw.githubusercontent.com/joaoccaldas/sintra-ai/ondai-feeds-data/sintra-ai.json';
export function validateSnapshot(data,now=Date.now(),maxAgeHours=36) {
 if(!data || !Array.isArray(data.items) || !data.items.length || data.items.length>200)throw Error('Shared feed has no usable items or exceeds the item limit');
 const generated=Date.parse(data.generatedAt);
 if(!Number.isFinite(generated) || generated>now+300000 || now-generated>maxAgeHours*3600000)throw Error('Shared feed is stale or has an invalid collection date');
 const ids=new Set();const categories=new Set(['Labs','Research','Open Source','Press','Practitioner','Community']);
 for(const item of data.items) {
  if(typeof item.id!=='string'||!item.id||ids.has(item.id))throw Error('Invalid or duplicate item identity');ids.add(item.id);
  if(typeof item.title!=='string'||!item.title.trim()||item.title.length>500||typeof item.summary!=='string'||item.summary.length>2000||typeof item.source!=='string'||!item.source||!categories.has(item.category))throw Error('Invalid source item');
  const u=new URL(item.url);if(u.protocol!=='https:'||u.username||u.password||u.hostname==='localhost')throw Error('Unsafe item URL');
  if(item.publishedAt!==null && !Number.isFinite(Date.parse(item.publishedAt)))throw Error('Invalid publication date');
  if(!/^#[0-9a-f]{6}$/i.test(item.color))throw Error('Invalid source color');
 }
 return {...data,sourceCount:new Set(data.items.map(i=>i.source)).size,sources:[...new Set(data.items.map(i=>i.source))],itemCount:data.items.length};
}
export async function writeSnapshot(path,data) {
 await mkdir(dirname(path),{recursive:true});const tmp=path+'.'+randomUUID()+'.tmp';await writeFile(tmp,JSON.stringify(data,null,2)+'\n',{flag:'wx'});await rename(tmp,path);
}
export async function resolveFeed({output=resolve(ROOT,'src/data/liveFeed.generated.json'),local=process.env.ONDAI_FEED_SNAPSHOT,url=process.env.ONDAI_FEED_URL||DEFAULT_FEED_URL,now=Date.now(),fetcher=fetch,fallback}={}) {
 const maxAge=Number(process.env.ONDAI_FEED_MAX_AGE_HOURS||36);
 let reason;
 try {
  let data;
  if(local)data=JSON.parse(await readFile(local,'utf8'));
  else {
   const target=new URL(url);if(target.protocol!=='https:'||target.username||target.password)throw Error('Shared feed requires HTTPS');
   const r=await fetcher(target,{signal:AbortSignal.timeout(12000),headers:{Accept:'application/json'}});if(!r.ok)throw Error('Shared feed HTTP '+r.status);
   const length=Number(r.headers.get('content-length')||0);if(length>1000000)throw Error('Shared feed exceeds 1 MB');
   const reader=r.body.getReader();let size=0;const chunks=[];
   while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>1000000){await reader.cancel();throw Error('Shared feed exceeds 1 MB');}chunks.push(value);}
   data=JSON.parse(Buffer.concat(chunks).toString('utf8'));
  }
  const valid=validateSnapshot(data,now,maxAge);
  await writeSnapshot(output,{...valid,delivery:{mode:'ondai-feeds',resolvedAt:new Date(now).toISOString()}});
  console.log(`ond.ai Feeds: ${valid.items.length} items; collected ${valid.generatedAt}`);return 'ondai-feeds';
 } catch(error){reason=error.message;console.warn('Shared feed unavailable:',reason);}
 // Never allow an unsuccessful collector to erase the previously valid snapshot.
 let previous;try{previous=await readFile(output);}catch{}
 const run=fallback||(()=>spawnSync(process.execPath,[resolve(ROOT,'scripts/aggregate-live-feed.mjs')],{cwd:ROOT,stdio:'inherit'}).status===0);
 try {
  if(!await run())throw Error('Fallback collector failed');
  const valid=validateSnapshot(JSON.parse(await readFile(output,'utf8')),now,Infinity);
  // Existing collector can retain stale content and exit 0; report that honestly.
  const unchanged=previous && JSON.parse(previous).generatedAt===valid.generatedAt;
  const mode=unchanged || now-Date.parse(valid.generatedAt)>36*3600000?'last-good':'sintra-collector';
  await writeSnapshot(output,{...valid,delivery:{mode,reason,resolvedAt:new Date(now).toISOString()}});return mode;
 } catch(error) {
  if(previous){let old;try{old=validateSnapshot(JSON.parse(previous),now,Infinity);}catch{}if(old){await writeSnapshot(output,{...old,delivery:{mode:'last-good',reason,resolvedAt:new Date(now).toISOString()}});console.warn('Retained last good snapshot');return 'last-good';}}
  throw Error('No usable shared, fallback or previous snapshot');
 }
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url))resolveFeed().catch(error=>{console.error(error.message);process.exitCode=1;});
