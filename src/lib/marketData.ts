import raw from '@/data/markets.generated.json';
export interface Observation { date: string; value: number }
export interface MarketSeries {
 id:string;name:string;unit:string;category:string;cadence:string;provider:string;sourceUrl:string;licenseUrl:string;
 history:Observation[];value:number|null;period:string|null;retrievedAt:string|null;stale:boolean;
 delivery:'ondai-feeds'|'public-provider'|'last-good'|'unavailable';
}
export const MARKET_DATA=raw as {schemaVersion:number;resolvedAt:string;rows:MarketSeries[]};
export function windowHistory(history:Observation[],days:number) {
 if(!history.length||!days)return history;
 const cutoff=Date.parse(history[history.length-1].date)-days*86400000;
 return history.filter(p=>Date.parse(p.date)>=cutoff);
}
export function periodChange(points:Observation[],unit:string) {
 if(points.length<2)return null;
 const start=points[0].value,delta=points[points.length-1].value-start;
 return unit.startsWith('%')?{value:delta,unit:'pp'}:start===0?null:{value:delta/Math.abs(start)*100,unit:'%'};
}
