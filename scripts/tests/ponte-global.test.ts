import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { PONTE_CASES, fillPontePrompt, validatePonteRegistry } from "../../src/lib/ponteGlobalData";

const read=(path:string)=>readFileSync(path,"utf8");

test("Ponte Global uses unique real official HTTPS source references",()=>{
  assert.deepEqual(validatePonteRegistry(PONTE_CASES),[]);
  assert.equal(PONTE_CASES.length,3);
  const hosts=PONTE_CASES.map(x=>new URL(x.source.url).hostname);
  assert.deepEqual(hosts,["help.openai.com","blog.google","docs.anthropic.com"]);
  assert.ok(PONTE_CASES.every(x=>x.source.reviewedAt==="2026-10-24"));
});
test("Brazilian adaptation is separate from publisher context and marked as untested",()=>{
  for (const item of PONTE_CASES) {
    assert.equal(item.source.kind,"original-publisher-guidance");
    for (const locale of ["pt","en"] as const){
      const body=item[locale];
      assert.ok(body.globalContext.length>40);
      assert.ok(body.brazilApplication.length>45);
      assert.ok(body.tip.length>20);
      assert.ok(body.caveat.length>30);
      assert.ok(body.prompt.includes("{{CENARIO}}"));
    }
  }
  assert.equal(PONTE_CASES.find(x=>x.id==="operacoes")?.labPath,"/laboratorio/");
});
test("prompt customization is deterministic and capped before rendering",()=>{
  const item=PONTE_CASES[0];
  const next=fillPontePrompt(item.pt.prompt,"Atendimento da loja no bairro");
  assert.match(next,/Atendimento da loja no bairro/);
  assert.doesNotMatch(next,/\{\{CENARIO\}\}/);
  const long=fillPontePrompt(item.pt.prompt,"x".repeat(4000));
  assert.ok(long.includes("x".repeat(280)));
  assert.ok(!long.includes("x".repeat(281)));
  assert.deepEqual(item.pt.prompt.includes("{{CENARIO}}"),true);
});
test("registry catches collisions, invalid URLs, unreviewable material and missing guidance",()=>{
  const base=PONTE_CASES[0];
  assert.ok(validatePonteRegistry([base,base]).some(x=>x.startsWith("duplicate:")));
  assert.ok(validatePonteRegistry([{...base,source:{...base.source,url:"javascript:alert(1)"}}])
    .some(x=>x.startsWith("non-https:")));
  assert.ok(validatePonteRegistry([{...base,pt:{...base.pt,prompt:"No scenario"}}])
    .some(x=>x.startsWith("no-scenario:")));
});
test("new routes exist, Brazil remains first and original news feed is preserved",()=>{
  const home=read("src/app/page.tsx");
  assert.match(home, /<PonteGlobalTeaser \/>/);
  assert.ok(home.indexOf("<BrazilRadar />")<home.indexOf("<PonteGlobalTeaser />"));
  assert.ok(home.indexOf("<PonteGlobalTeaser />")<home.indexOf("<HomeEditorialSections />"));
  const page=read("src/app/ponte/page.tsx");
  assert.match(page, /PonteGlobalClient/);
  assert.match(page, /index:false/);
  const teaser=read("src/components/PonteGlobalTeaser.tsx");
  assert.match(teaser,/BASE_PATH\}\/ponte\//);
});
test("personalization is local, with explicit user copy and no auto requests or storage",()=>{
  const ui=read("src/components/PonteGlobalClient.tsx");
  assert.match(ui,/navigator\.clipboard\.writeText/);
  assert.match(ui,/useLanguage/);
  assert.match(ui,/rel="noopener noreferrer"/);
  assert.match(ui,/maxLength=\{280\}/);
  assert.doesNotMatch(ui,/fetch\(|XMLHttpRequest|localStorage|sessionStorage|dangerouslySetInnerHTML|supabaseAdmin|service_role/);
  assert.match(ui,/NÃO EXECUTADO|NOT EXECUTED/);
  assert.match(ui,/Aplicações propostas, não resultados comprovados/);
});
