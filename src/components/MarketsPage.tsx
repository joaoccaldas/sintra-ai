'use client';
import { useState } from 'react';
import { ArrowUpRight, Download, Globe2 } from 'lucide-react';
import { MARKET_DATA, windowHistory, periodChange, type MarketSeries, type Observation } from '@/lib/marketData';
import { marketHistoryResponse } from '@/lib/ondResponse';
const num=(n:number|null)=>n===null?'—':n.toLocaleString('en-US',{maximumFractionDigits:3});
const day=(s:string|null,annual=false)=>s?(annual?s.slice(0,4):new Date(s).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})):'No observation';
const modes={'ondai-feeds':'Via ond.ai Feeds','public-provider':'Direct provider fallback','last-good':'Last valid data','unavailable':'Unavailable'};
function Sparkline({points}:{points:Observation[]}) {
 if(points.length<2)return <div className="h-12 text-xs text-fg-4">History unavailable</div>;
 const values=points.map(p=>p.value),min=Math.min(...values),span=Math.max(...values)-min||1;
 const start=Date.parse(points[0].date),duration=Date.parse(points[points.length-1].date)-start||1;
 return <svg viewBox="0 0 220 44" className="w-full h-12 text-violet-bright" aria-hidden="true"><path d={points.map((p,i)=>`${i?'L':'M'}${2+(Date.parse(p.date)-start)/duration*216},${40-(p.value-min)/span*36}`).join(' ')} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"/></svg>;
}
function HistoryChart({row}:{row:MarketSeries}) {
 const annual=row.category==='Macro';const [days,setDays]=useState(0);const [index,setIndex]=useState<number|null>(null);const [table,setTable]=useState(false);
 const response=marketHistoryResponse(row),chart=response.blocks[0];
 const points=windowHistory(row.history,days),point=points[Math.min(index??points.length-1,points.length-1)];
 const change=periodChange(points,row.unit);
 if(!points.length||chart.type!=='chart')return <div className="surface-panel rounded-2xl border border-white/10 p-8"><h2 className="text-xl">{row.name}</h2><p className="text-fg-3 mt-3">No verified observations are available. Other series remain usable; the next build will retry this source.</p></div>;
 const lo=Math.min(...points.map(p=>p.value)),hi=Math.max(...points.map(p=>p.value));const pad=(hi-lo)*.08||Math.max(Math.abs(hi)*.02,.1);const min=lo-pad,max=hi+pad;
 const start=Date.parse(points[0].date),end=Date.parse(points[points.length-1].date),span=end-start||1;
 const x=(p:Observation)=>58+(Date.parse(p.date)-start)/span*704,y=(v:number)=>230-(v-min)/(max-min)*198;
 const path=points.map((p,i)=>`${i?'L':'M'}${x(p)},${y(p.value)}`).join(' ');
 const csv=()=>{const content='date,value,unit\n'+points.map(p=>`${p.date},${p.value},${row.unit}`).join('\n');const url=URL.createObjectURL(new Blob([content],{type:'text/csv'}));const a=document.createElement('a');a.href=url;a.download=row.id+'.csv';a.click();URL.revokeObjectURL(url);};
 return <section aria-label="Selected series detail" className="surface-panel rounded-2xl border border-white/10 p-5 md:p-8">
  <div className="flex flex-wrap justify-between gap-5"><div><p className="font-mono text-xs uppercase tracking-widest text-violet-bright">{row.category} · {row.cadence}</p><h2 className="font-serif text-3xl mt-2 text-fg-1">{row.name}</h2></div><span className="text-xs text-fg-3">{modes[row.delivery]}</span></div>
  <div className="flex flex-wrap items-end justify-between gap-4 mt-6"><div aria-live="polite"><p className="text-4xl tracking-tight tabular-nums text-fg-1">{num(point.value)} <span className="text-sm text-fg-3">{row.unit}</span></p><p className="text-sm text-fg-3 mt-1">{day(point.date,annual)}</p></div><div className="text-right text-sm text-fg-2">{change&&<><span className="tabular-nums">{change.value>=0?'+':''}{num(change.value)} {change.unit}</span><p className="text-xs text-fg-4">Change over displayed period · calculated</p></>}</div></div>
  <div className="flex flex-wrap gap-2 mt-6" aria-label="Chart period">{(annual?[[1826,'5Y'],[3653,'10Y'],[0,'All']]:[[30,'1M'],[90,'3M'],[180,'6M'],[0,'All']]).map(([n,label])=><button key={n} aria-pressed={days===n} onClick={()=>{setDays(Number(n));setIndex(null);}} className={`rounded-full px-4 py-2 text-xs border ${days===n?'border-violet-bright text-violet-bright bg-violet/10':'border-white/10 text-fg-3'}`}>{label}</button>)}</div>
  <svg data-response-schema={response.schema} data-dataset-ref={chart.datasetRef} viewBox="0 0 800 275" role="img" aria-label={`${row.name} history; use the date slider or data table for exact values`} className="w-full mt-4 touch-pan-y" onPointerMove={e=>{const rect=e.currentTarget.getBoundingClientRect();const target=start+Math.max(0,Math.min(1,((e.clientX-rect.left)/rect.width*800-58)/704))*span;let best=0;points.forEach((p,i)=>{if(Math.abs(Date.parse(p.date)-target)<Math.abs(Date.parse(points[best].date)-target))best=i;});setIndex(best);}}>
   {[0,.5,1].map(t=>{const v=min+(max-min)*t;return <g key={t}><line x1="58" x2="762" y1={y(v)} y2={y(v)} stroke="currentColor" className="text-fg-4" opacity=".18"/><text x="50" y={y(v)+4} textAnchor="end" fill="currentColor" className="text-fg-3" fontSize="11">{num(v)}</text></g>;})}
   <path d={path} fill="none" stroke="currentColor" className="text-violet-bright" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/>
   <line x1={x(point)} x2={x(point)} y1="30" y2="230" stroke="currentColor" className="text-violet-bright" opacity=".4" strokeDasharray="4 4"/>
   <circle cx={x(point)} cy={y(point.value)} r="5" fill="currentColor" className="text-violet-bright"/>
   <text x="58" y="260" fill="currentColor" className="text-fg-3" fontSize="12">{day(points[0].date,annual)}</text><text x="762" y="260" textAnchor="end" fill="currentColor" className="text-fg-3" fontSize="12">{day(points[points.length-1].date,annual)}</text>
  </svg>
  <label className="block text-xs text-fg-3">Explore observation date<input aria-label="Observation date" type="range" min="0" max={points.length-1} value={index??points.length-1} onChange={e=>setIndex(Number(e.target.value))} className="block w-full mt-2 accent-violet-500" aria-valuetext={`${day(point.date,annual)}: ${num(point.value)} ${row.unit}`}/></label>
  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-fg-3 mt-6"><a href={row.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex gap-1 items-center underline">{row.provider}<ArrowUpRight size={12}/></a><span>Retrieved {day(row.retrievedAt)}</span><a href={row.licenseUrl} target="_blank" rel="noreferrer" className="underline">Reuse terms</a><button onClick={csv} className="inline-flex items-center gap-1 underline"><Download size={12}/>CSV</button><button onClick={()=>setTable(!table)} aria-expanded={table} className="underline">{table?'Hide':'Show'} data table</button></div>
  {row.stale&&<p role="status" className="mt-4 text-sm text-amber-400">Refresh unavailable. Values retain their original observation and retrieval dates.</p>}
  {table&&<div className="overflow-auto max-h-72 mt-5"><table className="w-full text-sm text-left"><caption className="text-left text-fg-3 py-2">{row.name} · {row.unit}</caption><thead><tr><th className="py-2">Observation</th><th>Value</th></tr></thead><tbody>{[...points].reverse().map(p=><tr key={p.date} className="border-t border-white/10"><td className="py-2">{day(p.date,annual)}</td><td className="tabular-nums">{num(p.value)}</td></tr>)}</tbody></table></div>}
 </section>;
}
export default function MarketsPage() {
 const [group,setGroup]=useState('Currencies');const [indicator,setIndicator]=useState('NY.GDP.MKTP.KD.ZG');const [selected,setSelected]=useState('EUR-USD');
 const visible=MARKET_DATA.rows.filter(r=>r.category===group&&(group!=='Macro'||r.id.startsWith(indicator)));
 const active=visible.find(r=>r.id===selected)||visible[0];
 return <div className="pt-24 pb-20 px-5 md:px-10 max-w-6xl mx-auto">
  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-bright"><Globe2 size={15}/>The wider picture · ond.ai Feeds</div>
  <h1 className="font-serif text-4xl md:text-6xl leading-tight tracking-tight text-fg-1 mt-5">Markets &amp; <em className="text-violet-bright">economy.</em></h1>
  <p className="text-fg-3 max-w-2xl mt-4 leading-relaxed">Follow currencies and the economic backdrop across Sweden, Brazil, the US and the euro area. Published observations, with the history and sources behind every number.</p>
  <div className="flex flex-wrap items-center gap-3 my-8">{['Currencies','Macro'].map(g=><button key={g} onClick={()=>setGroup(g)} aria-pressed={group===g} className={`px-5 py-2.5 rounded-full border text-sm ${g===group?'bg-violet/15 border-violet-bright text-violet-bright':'border-white/10 text-fg-3'}`}>{g==='Macro'?'Macroeconomy':g}</button>)}{group==='Macro'&&<label className="text-sm text-fg-3">Indicator <select value={indicator} onChange={e=>setIndicator(e.target.value)} className="ml-2 rounded-lg border border-white/20 bg-void p-2 text-fg-1"><option value="NY.GDP.MKTP.KD.ZG">GDP growth</option><option value="FP.CPI.TOTL.ZG">Inflation</option><option value="SL.UEM.TOTL.ZS">Unemployment</option></select></label>}</div>
  <div className={`grid gap-3 mb-5 ${group==='Macro'?'sm:grid-cols-2 lg:grid-cols-4':'sm:grid-cols-3'}`}>{visible.map(r=><button key={r.id} aria-pressed={active?.id===r.id} onClick={()=>setSelected(r.id)} className={`surface-panel text-left rounded-xl p-5 border ${active?.id===r.id?'border-violet-bright':'border-white/10'}`}><span className="text-sm text-fg-2">{r.name}</span><div className="text-2xl tabular-nums text-fg-1 mt-2">{num(r.value)} <span className="text-xs text-fg-3">{r.unit}</span></div><Sparkline points={r.history}/><span className="block text-xs text-fg-3 mt-2">{day(r.period,group==='Macro')} · {r.delivery==='last-good'?'Last valid':r.delivery==='unavailable'?'Unavailable':'Published'}</span></button>)}</div>
  {active&&<HistoryChart key={active.id} row={active}/>}
  <div className="text-xs text-fg-3 leading-relaxed mt-6 space-y-2"><p>Annual macro observations are the latest available year, not current-month estimates. Currency rates are daily ECB reference rates, not executable quotes. Charts use available observations; changes are calculated from the displayed endpoints.</p><p>World Bank WDI: GDP — national accounts / OECD / World Bank; inflation — IMF International Financial Statistics; unemployment — ILO modelled estimates. CC BY 4.0. Currency data: European Central Bank via Frankfurter. Data reformatted for display; source values are preserved.</p><p>Stock and proprietary index histories remain in the private Feeds app until public redistribution is cleared.</p></div>
 </div>;
}
