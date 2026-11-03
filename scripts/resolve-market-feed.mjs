/** Build-time public market contract. No browser credentials or private quote export. */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeSnapshot, DEFAULT_FEED_URL } from './resolve-live-feed.mjs';
export const COUNTRIES={SWE:'Sweden',BRA:'Brazil',USA:'United States',EMU:'Euro area'};
export const INDICATORS={'NY.GDP.MKTP.KD.ZG':['GDP growth','% annual'],'FP.CPI.TOTL.ZG':['Consumer inflation','% annual'],'SL.UEM.TOTL.ZS':['Unemployment','% of labour force']};
const ECB='https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html';
export const DEFINITIONS=[...['USD','SEK','BRL'].map(q=>({id:'EUR-'+q,name:'EUR / '+q,unit:q+' per EUR',category:'Currencies',cadence:'Daily reference rate',provider:'ECB via Frankfurter',sourceUrl:ECB,licenseUrl:'https://www.ecb.europa.eu/services/using-our-site/disclaimer/html/index.en.html'})),...Object.entries(INDICATORS).flatMap(([code,[name,unit]])=>Object.entries(COUNTRIES).map(([country,label])=>({id:code+'-'+country,name:label+' · '+name,unit,category:'Macro',cadence:'Annual · latest available',provider:'World Bank WDI',sourceUrl:'https://data.worldbank.org/indicator/'+code,licenseUrl:'https://creativecommons.org/licenses/by/4.0/'})))];
const DAY=86400000;
export function validateRow(row,now=Date.now()) {
 const def=DEFINITIONS.find(d=>d.id===row?.id);
 if(!def||row.unit!==def.unit||row.provider!==def.provider)throw Error('Unapproved series, provider or unit');
 const retrieved=Date.parse(row.retrievedAt);
 if(!Number.isFinite(retrieved)||retrieved>now+300000)throw Error('Invalid retrieval date');
 if(!Array.isArray(row.history)||!row.history.length||row.history.length>400)throw Error('Invalid history length');
 let previous='';
 const history=row.history.map(p=>{
  if(!/^\d{4}-\d{2}-\d{2}$/.test(p.date)||!Number.isFinite(Date.parse(p.date))||new Date(p.date).toISOString().slice(0,10)!==p.date||p.date<=previous||Date.parse(p.date)>now||typeof p.value!=='number'||!Number.isFinite(p.value)||(def.category==='Currencies'&&p.value<=0))throw Error('Invalid observation');
  previous=p.date;return {date:p.date,value:p.value};
 });
 const last=history.at(-1);
 if(row.value!==last.value||row.period!==last.date)throw Error('Latest value disagrees with history');
 return {...def,history,value:last.value,period:last.date,retrievedAt:row.retrievedAt,stale:row.stale===true};
}
export function validateMarketSnapshot(data,now=Date.now()) {
 if(data?.schemaVersion!==1||!Array.isArray(data.rows)||data.rows.length>DEFINITIONS.length)throw Error('Invalid market snapshot');
 const rows=data.rows.map(r=>validateRow(r,now));
 if(new Set(rows.map(r=>r.id)).size!==rows.length)throw Error('Duplicate series');
 return rows;
}
export async function fetchJSON(url,fetcher=fetch) {
 const response=await fetcher(url,{signal:AbortSignal.timeout(15000),headers:{Accept:'application/json'}});
 if(!response.ok)throw Error('Provider unavailable');
 const reader=response.body.getReader();let size=0;const parts=[];
 try {while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>2000000)throw Error('Response exceeds limit');parts.push(value);}} finally {await reader.cancel();}
 return JSON.parse(Buffer.concat(parts).toString('utf8'));
}
export async function collectPublic(now=Date.now(),fetcher=fetch) {
 const retrievedAt=new Date(now).toISOString();const rows=[];
 const from=new Date(now-370*DAY).toISOString().slice(0,10);
 const tasks=[async()=>{
  const data=await fetchJSON('https://api.frankfurter.dev/v2/rates?base=EUR&quotes=USD,SEK,BRL&providers=ecb&from='+from,fetcher);
  for(const quote of ['USD','SEK','BRL']){
   const history=data.filter(p=>p.base==='EUR'&&p.quote===quote).map(p=>({date:p.date,value:p.rate})).sort((a,b)=>a.date.localeCompare(b.date)).slice(-400);
   if(history.length)rows.push({...DEFINITIONS.find(d=>d.id==='EUR-'+quote),history,value:history.at(-1).value,period:history.at(-1).date,retrievedAt,stale:false});
  }
 },...Object.keys(INDICATORS).map(code=>async()=>{
  const data=await fetchJSON(`https://api.worldbank.org/v2/country/SWE;BRA;USA;EMU/indicator/${code}?format=json&mrnev=12&per_page=100`,fetcher);
  for(const country of Object.keys(COUNTRIES)) {
   const history=(data[1]||[]).filter(p=>p.countryiso3code===country&&p.value!==null).map(p=>({date:p.date+'-01-01',value:p.value})).sort((a,b)=>a.date.localeCompare(b.date));
   if(history.length)rows.push({...DEFINITIONS.find(d=>d.id===code+'-'+country),history,value:history.at(-1).value,period:history.at(-1).date,retrievedAt,stale:false});
  }
 })];
 await Promise.allSettled(tasks.map(task=>task()));
 return rows.flatMap(r=>{try{return [validateRow(r,now)];}catch{return [];}});
}
export function resolveRows(shared,providers,previous,now=Date.now()) {
 return DEFINITIONS.map(def=>{
  const fresh=r=>r&&!r.stale&&now-Date.parse(r.retrievedAt)<(def.category==='Macro'?7*DAY:36*3600000);
  const primary=shared.find(r=>r.id===def.id),direct=providers.find(r=>r.id===def.id);
  if(fresh(primary))return {...primary,delivery:'ondai-feeds'};
  if(fresh(direct))return {...direct,delivery:'public-provider'};
  const last=[primary,direct,...previous.filter(r=>r.id===def.id)].filter(Boolean).sort((a,b)=>b.period.localeCompare(a.period)||b.retrievedAt.localeCompare(a.retrievedAt))[0];
  return last?{...last,stale:true,delivery:'last-good'}:{...def,history:[],value:null,period:null,retrievedAt:null,stale:true,delivery:'unavailable'};
 });
}
export async function resolveMarkets({now=Date.now(),fetcher=fetch,local=process.env.ONDAI_MARKET_SNAPSHOT,output='src/data/markets.generated.json',publicOutput='public/api/markets.json',collector=collectPublic}={}) {
 let shared=[],previous=[];
 try {const data=local?JSON.parse(await readFile(local,'utf8')):await fetchJSON(DEFAULT_FEED_URL,fetcher);shared=validateMarketSnapshot(data.markets||data,now);}catch{}
 // Read only validated nonempty rows from local/deployed cache, preserving retrieval dates.
 const usable=data=>validateMarketSnapshot({...data,rows:data.rows.filter(r=>r.delivery!=='unavailable')},now);
 try {previous=usable(JSON.parse(await readFile(output,'utf8')));}catch{}
 if(!previous.length)try{previous=usable(await fetchJSON('https://joaoccaldas.github.io/sintra-ai/api/markets.json',fetcher));}catch{}
 const allFresh=DEFINITIONS.every(d=>{const r=shared.find(r=>r.id===d.id);return r&&!r.stale&&now-Date.parse(r.retrievedAt)<(d.category==='Macro'?7*DAY:36*3600000);});
 const providers=allFresh?[]:await collector(now,fetcher);
 const rows=resolveRows(shared,providers,previous,now);
 const result={schemaVersion:1,resolvedAt:new Date(now).toISOString(),rows};
 await writeSnapshot(output,result);await writeSnapshot(publicOutput,result);
 const modes=Object.fromEntries(['ondai-feeds','public-provider','last-good','unavailable'].map(m=>[m,rows.filter(r=>r.delivery===m).length]));
 console.log('Market delivery:',JSON.stringify(modes));return result;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))resolveMarkets().catch(e=>{console.error(e.message);process.exitCode=1;});
