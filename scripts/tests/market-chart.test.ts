import test from 'node:test';
import assert from 'node:assert/strict';
import { windowHistory,periodChange } from '../../src/lib/marketData';
test('period windows are anchored to the last observation, not collection time',()=>{
 const points=[{date:'2024-01-01',value:1},{date:'2025-01-01',value:2},{date:'2025-02-01',value:3}];
 assert.deepEqual(windowHistory(points,30),[points[2]]);assert.equal(windowHistory(points,0),points);
});
test('rate changes use percentage points; currency changes use percent; zero base is undefined',()=>{
 const points=[{date:'2024-01-01',value:2},{date:'2025-01-01',value:3}];
 assert.deepEqual(periodChange(points,'% annual'),{value:1,unit:'pp'});
 assert.deepEqual(periodChange(points,'USD per EUR'),{value:50,unit:'%'});
 assert.equal(periodChange([{...points[0],value:0},points[1]],'Index'),null);
 assert.equal(periodChange(points.slice(1),'Index'),null);
});
