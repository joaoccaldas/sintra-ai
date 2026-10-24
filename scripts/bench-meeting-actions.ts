/**
 * Inspectable deterministic baseline, with optional offline model prediction
 * file. This command NEVER calls a provider and never reads user notes.
 *
 *   npx tsx scripts/bench-meeting-actions.ts
 *   npx tsx scripts/bench-meeting-actions.ts --predictions path/to/offline.json
 */
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import { extractMeetingActions } from "../src/lib/meetingActions";
import { validateModelCandidates } from "../supabase/functions/sintra-meeting-actions/validation";

type Fixture = {id:string;notes:string;expectedLines:number[];locale:string;type:string};
type PredictedCase = {id:string;actions:unknown[]};
const data = JSON.parse(readFileSync("scripts/fixtures/meeting-action-evaluation.json","utf8")) as {cases:Fixture[]};
const index = process.argv.indexOf("--predictions");
const predictions:Map<string,unknown[]>|null = index >= 0
 ? new Map((JSON.parse(readFileSync(process.argv[index+1],"utf8")) as {cases:PredictedCase[]}).cases.map(c=>[c.id,c.actions]))
 : null;

let tp=0,fp=0,fn=0,groundingRejections=0,latency=0;
const rows=[];
for (const sample of data.cases){
  const t0=performance.now();
  const proposal=predictions
    ? validateModelCandidates(sample.notes,{actions:predictions.get(sample.id)??[]})
    : extractMeetingActions(sample.notes);
  latency+=performance.now()-t0;
  const ids = new Set(
    predictions ? proposal.actions.map(a=>a.lineNumber)
      : proposal.actions.map(a=>a.lineNumber)
  );
  const gold = new Set(sample.expectedLines);
  let hit=0,miss=0;
  for(const line of ids) gold.has(line)?hit++:miss++;
  const omitted=[...gold].filter(line=>!ids.has(line)).length;
  tp+=hit;fp+=miss;fn+=omitted;
  if(predictions)groundingRejections+=(proposal as ReturnType<typeof validateModelCandidates>).rejected.length;
  rows.push({id:sample.id,type:sample.type,expected:gold.size,predicted:ids.size,tp:hit,fp:miss,fn:omitted});
}
const precision=tp+fp?tp/(tp+fp):null,recall=tp+fn?tp/(tp+fn):null;
const report={
  schemaVersion:"1.0",method:predictions?"offline-model-prediction-validator":"local-rules-v1",
  dataset:data.cases.length,syntheticOnly:true,
  counts:{tp,fp,fn,groundingRejections},
  metrics:{precision,recall,f1:precision!==null&&recall!==null&&(precision+recall)>0
    ?2*precision*recall/(precision+recall):null,
    localExecutionMs:Math.round(latency*1000)/1000},
  data:rows,
  limitations:["No real user data","No provider inference unless predictions file given",
    "Line-match scoring does not assess semantic quality","Provider cost and p95 network latency not measured"],
};
console.log(JSON.stringify(report,null,2));
