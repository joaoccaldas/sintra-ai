import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,readFile,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DEFINITIONS,validateRow,validateMarketSnapshot,resolveRows,resolveMarkets,fetchJSON } from '../resolve-market-feed.mjs';
const now=Date.parse('2026-11-03T00:00:00Z');
const sample=(id='EUR-USD')=>({...DEFINITIONS.find(d=>d.id===id),history:[{date:'2026-10-30',value:1.1},{date:'2026-11-02',value:1.2}],value:1.2,period:'2026-11-02',retrievedAt:'2026-11-02T18:00:00Z',stale:false});
test('rejects unapproved quote IDs, wrong units, invalid/future/unsorted dates, nonfinite values and latest mismatch',()=>{
 for(const change of [{id:'MSFT'},{unit:'USD'},{retrievedAt:'2027-01-01'},{history:[{date:'2026-02-30',value:1}]},{history:[{date:'2027-01-01',value:1}]},{history:[{date:'2026-11-02',value:1},{date:'2026-10-30',value:1}]},{history:[{date:'2026-10-30',value:Infinity}]},{value:3}])assert.throws(()=>validateRow({...sample(),...change},now));
 assert.throws(()=>validateMarketSnapshot({schemaVersion:1,rows:[sample(),sample()]},now));
});
test('public projection discards arbitrary fields and canonicalizes attribution',()=>{
 const result=validateRow({...sample(),secret:'private',sourceUrl:'https://evil.example',name:'secret'},now);
 assert.equal(result.secret,undefined);assert.equal(result.name,'EUR / USD');assert.match(result.sourceUrl,/ecb.europa.eu/);
});
test('per-series fallback selects shared, provider, then dated last-good without refreshing dates',()=>{
 const stale={...sample('EUR-SEK'),retrievedAt:'2026-10-01T00:00:00Z'};
 const result=resolveRows([sample(),stale],[sample('EUR-SEK')],[{...sample('EUR-BRL'),retrievedAt:'2026-10-01T00:00:00Z'}],now);
 assert.deepEqual(result.slice(0,3).map(r=>r.delivery),['ondai-feeds','public-provider','last-good']);
 assert.equal(result[2].retrievedAt,'2026-10-01T00:00:00Z');assert.equal(result[3].delivery,'unavailable');assert.equal(result[3].value,null);
});
test('old annual observation can be current collection; refresh failures use fallback',()=>{
 const annual={...sample('NY.GDP.MKTP.KD.ZG-SWE'),history:[{date:'2024-01-01',value:1}],value:1,period:'2024-01-01'};
 assert.equal(resolveRows([annual],[],[],now)[3].delivery,'ondai-feeds');
 assert.equal(resolveRows([{...annual,stale:true}],[],[],now)[3].delivery,'last-good');
});
test('fresh partial shared feed survives unavailable providers, and complete outage renders explicit empty state',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'sintra-markets-'));
 try{
  const result=await resolveMarkets({now,fetcher:async()=>{throw Error('offline');},collector:async()=>[],output:join(dir,'data.json'),publicOutput:join(dir,'public.json')});
  assert.equal(result.rows.filter(r=>r.delivery==='unavailable').length,15);
  assert.deepEqual(JSON.parse(await readFile(join(dir,'public.json'),'utf8')),result);
 }finally{await rm(dir,{recursive:true,force:true});}
});
test('response body size is bounded',async()=>{
 await assert.rejects(()=>fetchJSON('https://example.com',async()=>new Response('a'.repeat(2000001))),/limit/);
});
test('complete valid shared snapshot bypasses independent collection',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'sintra-market-primary-'));
 try {
  const {writeFile}=await import('node:fs/promises');const local=join(dir,'shared.json');
  await writeFile(local,JSON.stringify({schemaVersion:1,rows:DEFINITIONS.map(d=>sample(d.id))}));
  const result=await resolveMarkets({now,local,output:join(dir,'out.json'),publicOutput:join(dir,'public.json'),fetcher:async()=>{throw Error('offline');},collector:async()=>{assert.fail('fresh primary must skip collector');}});
  assert.equal(result.rows.filter(r=>r.delivery==='ondai-feeds').length,15);
 } finally {await rm(dir,{recursive:true,force:true});}
});
test('offline retry retains prior values and original dates while preserving unavailable series',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'sintra-market-cache-'));
 try {
  const {writeFile}=await import('node:fs/promises');const output=join(dir,'out.json');
  const old={...sample(),retrievedAt:'2026-10-01T00:00:00Z'};
  await writeFile(output,JSON.stringify({schemaVersion:1,rows:resolveRows([],[],[old],now)}));
  const result=await resolveMarkets({now,output,publicOutput:join(dir,'public.json'),fetcher:async()=>{throw Error('offline');},collector:async()=>[]});
  assert.equal(result.rows[0].delivery,'last-good');assert.equal(result.rows[0].retrievedAt,old.retrievedAt);assert.equal(result.rows[0].value,old.value);assert.equal(result.rows[1].delivery,'unavailable');
 } finally {await rm(dir,{recursive:true,force:true});}
});
