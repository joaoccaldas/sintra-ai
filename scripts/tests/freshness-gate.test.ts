import assert from "node:assert/strict";
import test from "node:test";
import {mkdtempSync,mkdirSync,copyFileSync,writeFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {spawnSync} from "node:child_process";
for (const [label,hours,expected] of [["fresh",1,0],["stale",49,1],["future",-2,1]] as const) {
 test(`freshness gate ${label}`,()=>{
  const root=mkdtempSync(join(tmpdir(),"sintra-freshness-"));
  try {
   mkdirSync(join(root,"scripts"));mkdirSync(join(root,"src/data"),{recursive:true});
   copyFileSync("scripts/audit-freshness.mjs",join(root,"scripts/audit-freshness.mjs"));
   writeFileSync(join(root,"src/data/liveFeed.generated.json"),JSON.stringify({generatedAt:new Date(Date.now()-hours*3600000).toISOString(),sourceCount:1,items:Array.from({length:12},(_,i)=>({id:`test-${i}`,title:"Fixture",url:"https://example.com",source:"Fixture",category:"test",publishedAt:new Date().toISOString()}))}));
   const result=spawnSync(process.execPath,[join(root,"scripts/audit-freshness.mjs")],{encoding:"utf8"});
   assert.equal(result.status,expected,result.stdout+result.stderr);
  } finally {rmSync(root,{recursive:true,force:true});}
 });
}
