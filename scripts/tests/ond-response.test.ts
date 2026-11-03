import test from 'node:test';
import assert from 'node:assert/strict';
import { marketHistoryResponse } from '../../src/lib/ondResponse';
import type { MarketSeries } from '../../src/lib/marketData';

function row(): MarketSeries {
 return {id:'EUR-USD',name:'EUR/USD',unit:'USD per EUR',category:'Currencies',
 cadence:'daily',provider:'ECB',sourceUrl:'https://example.org/source',
 licenseUrl:'https://example.org/license',value:1.2,period:'2026-11-02',
 retrievedAt:'2026-11-03',stale:false,delivery:'public-provider',
 history:[{date:'2026-11-01',value:1.1},{date:'2026-11-02',value:1.2}]};
}
test('shared response block is stable and source-backed, no synthetic values',()=>{
 const x=marketHistoryResponse(row());
 assert.deepEqual(x,{schema:'ond.response/1',blocks:[{
  type:'chart',visual:'line',datasetRef:'markets.EUR-USD',
  provenanceRef:'markets.EUR-USD.source',unit:'USD per EUR',
  encoding:{x:'date',y:['value']}
 }]});
 assert.equal(JSON.stringify(x).includes('1.2'),false);
});
test('missing data returns status, not a fabricated chart',()=>{
 assert.equal(marketHistoryResponse({...row(),history:[]}).blocks[0].type,'status');
});
test('nonfinite values fail closed',()=>{
 assert.equal(marketHistoryResponse({...row(),history:[{date:'2026-11-02',value:Infinity}]}).blocks[0].type,'status');
});
test('out of order history fails closed',()=>{
 assert.equal(marketHistoryResponse({...row(),history:[{date:'2026-11-03',value:1},{date:'2026-11-02',value:2}]}).blocks[0].type,'status');
});
test('untrusted ID cannot become a data reference',()=>{
 assert.equal(marketHistoryResponse({...row(),id:'https://evil.example/'}).blocks[0].type,'status');
});
test('invalid or missing date fails closed',()=>{
 assert.equal(marketHistoryResponse({...row(),history:[{date:'not-a-date',value:2}]}).blocks[0].type,'status');
});
