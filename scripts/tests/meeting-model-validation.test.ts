import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import {validateModelCandidates,exactLabeledValue} from "../../supabase/functions/sintra-meeting-actions/validation";

const NOTES = [
  "Enviaremos a proposta ao cliente na terça.",
  "- Enviar proposta ao cliente | Responsável: Ana | Prazo: sexta-feira",
  "- Não enviar a versão antiga.",
  "- Revisar documento | Owner: Roberto | Deadline: 2026-11-03",
  "João disse que talvez revise amanhã.",
].join("\n");
const action=(lineNumber:number,title:string,owner:string|null=null,deadline:string|null=null) =>
  ({lineNumber,title,sourceQuote:NOTES.split("\n")[lineNumber-1],owner,deadline});

test("accepts exact cited action and verbatim explicitly labeled owner and relative deadline",()=>{
  const {actions,rejected} = validateModelCandidates(NOTES,{actions:[
    action(2,"Enviar proposta ao cliente","Ana","sexta-feira"),
    action(4,"Revisar documento","Roberto","2026-11-03"),
  ]});
  assert.equal(actions.length,2);assert.equal(rejected.length,0);
  assert.equal(actions[0].lineNumber,2);
  assert.equal(actions[0].deadline,"sexta-feira");
  assert.equal(actions[0].reviewStatus,"needs-review");
});
test("rejects invented sources, invalid line citations, ungrounded owner/deadline and negative lines",()=>{
  const output=validateModelCandidates(NOTES,{actions:[
    {...action(2,"Enviar proposta ao cliente"),sourceQuote:"Outras notas"},
    action(55,"Enviar proposta ao cliente"),
    action(2,"Enviar proposta ao cliente","Pedro"),
    action(2,"Enviar proposta ao cliente","Ana","amanhã"),
    action(3,"Não enviar a versão antiga"),
  ]});
  assert.equal(output.actions.length,0);
  assert.deepEqual(output.rejected.map(x=>x.reason),
    ["source-not-exact","source-not-exact","unsupported-owner-or-deadline",
      "unsupported-owner-or-deadline","negated-source"]);
});
test("does not invent metadata just because a person appears in meeting prose",()=>{
  const result=validateModelCandidates(NOTES,{actions:[
    action(5,"Revisar amanhã","João",null),
  ]});
  assert.equal(result.actions.length,0);
  assert.equal(result.rejected[0].reason,"unsupported-owner-or-deadline");
});
test("preserves HTML entities and rejects title duplicates within one provider batch",()=>{
  const source="Enviar &lt;script&gt; sem executar scripts | Responsável: Ana";
  const r=validateModelCandidates(source,{actions:[
    {lineNumber:1,sourceQuote:source,title:"Enviar texto para revisão",owner:"Ana",deadline:null},
    {lineNumber:1,sourceQuote:source,title:"ENVIAR texto para revisão",owner:"Ana",deadline:null},
  ]});
  assert.equal(r.actions.length,1);
  assert.equal(r.rejected[0].reason,"duplicate-title");
  assert.equal(r.actions[0].sourceQuote,source);
});
test("malformed response, injected fields, overlong input and output caps fail closed",()=>{
  assert.equal(validateModelCandidates(NOTES,{}).actions.length,0);
  assert.equal(validateModelCandidates(NOTES,{actions:"not array"}).actions.length,0);
  assert.equal(validateModelCandidates("a".repeat(4001),{actions:[action(2,"Enviar")]}).actions.length,0);
  const corpus=Array.from({length:22},(_,i)=>`Enviar proposta número ${i+1}`).join("\n");
  const actions=corpus.split("\n").map((sourceQuote,i)=>({title:sourceQuote,
    lineNumber:i+1,sourceQuote,owner:null,deadline:null}));
  const out=validateModelCandidates(corpus,{actions});
  assert.equal(out.actions.length,12);
  assert.equal(out.rejected.length,10);
});
test("explicit metadata detection never infers unlabeled users and dates",()=>{
  assert.equal(exactLabeledValue("Enviar para João dia 10","owner"),null);
  assert.equal(exactLabeledValue("Enviar | Owner: Sam | Deadline: Tomorrow","owner"),"Sam");
  assert.equal(exactLabeledValue("Enviar | Owner: Sam | Deadline: Tomorrow","deadline"),"Tomorrow");
});
test("Edge function remains disabled by default, uses authenticated Supabase and no raw input logs",()=>{
  const s=readFileSync("supabase/functions/sintra-meeting-actions/index.ts","utf8");
  assert.match(s,/withSupabase\(\{ auth:"user" \}/);
  assert.match(s,/SINTRA_MODEL_ENABLED/);
  assert.match(s,/SINTRA_ANTHROPIC_API_KEY/);
  assert.match(s,/sintra_reserve_model_quota/);
  assert.match(s,/MODEL_INPUT_LIMIT/);
  assert.match(s,/reviewRequired:true/);
  assert.doesNotMatch(s,/console\.log\(|console\.error\(|NEXT_PUBLIC_|verify_jwt:\s*false/);
});
test("SQL limits calls atomically, forbids user RPC and keeps usage in private RLS schema",()=>{
  const sql=readFileSync("docs/database/SINTRA_MODEL_PILOT_QUOTA_20261024.sql","utf8");
  assert.match(sql,/security definer/);
  assert.match(sql,/set search_path = ''/);
  assert.match(sql,/revoke all on function public\.sintra_reserve_model_quota\(uuid,integer,integer\) from public, anon, authenticated/);
  assert.match(sql,/grant execute on function public\.sintra_reserve_model_quota\(uuid,integer,integer\) to service_role/);
  assert.match(sql,/for update/);
  assert.match(sql,/enable row level security/);
});
