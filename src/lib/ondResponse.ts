/** OND.ai rich-response v1 pilot. A chart block is a typed view request, not data entitlement.
 * The trusted MarketsPage owns the real history and performs all calculations locally.
 * No HTML, model call, SQL, remote URL or arbitrary component name is accepted.
 */
import type { MarketSeries } from './marketData';

export type MarketChartBlock = Readonly<{
  type: 'chart';
  visual: 'line';
  datasetRef: string;
  provenanceRef: string;
  unit: string;
  encoding: Readonly<{ x: 'date'; y: readonly ['value'] }>;
}>;

export type MarketStatusBlock = Readonly<{ type: 'status'; label: string }>;

export type MarketRichResponse = Readonly<{
  schema: 'ond.response/1';
  blocks: readonly [MarketChartBlock | MarketStatusBlock];
}>;

const REF = /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/;

export function marketHistoryResponse(row: MarketSeries): MarketRichResponse {
  const id = String(row.id || '');
  const valid = REF.test(id) &&
    typeof row.unit === 'string' && !!row.unit.trim() &&
    Array.isArray(row.history) && row.history.length > 0 &&
    row.history.every(p =>
      typeof p.date === 'string' &&
      /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(p.date) &&
      Number.isFinite(Date.parse(p.date)) &&
      typeof p.value === 'number' && Number.isFinite(p.value)
    ) &&
    row.history.every((p,i) => i===0 || Date.parse(row.history[i-1].date) <= Date.parse(p.date));
  if (!valid) {
    return {schema:'ond.response/1',blocks:[{type:'status',label:'Verified chart history unavailable'}]};
  }
  return {schema:'ond.response/1',blocks:[{
    type:'chart',visual:'line',datasetRef:'markets.'+id,provenanceRef:'markets.'+id+'.source',
    unit:row.unit,encoding:{x:'date',y:['value']}
  }]};
}
