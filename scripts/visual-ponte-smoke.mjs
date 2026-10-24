import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const base=process.env.SINTRA_PONTE_URL;
if(base!=="http://127.0.0.1:4173/sintra-ai/preview/ponte-global/") {
  throw new Error("Ponte smoke allowed only on isolated local preview");
}
const folder=join(process.cwd(),"artifacts","ponte-global");
await mkdir(folder,{recursive:true});
const widths=[320,390,768,1440];
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN||undefined});
const failures=[];
try{
  for(const width of widths){
    const page=await browser.newPage({viewport:{width,height:width<500?844:900},deviceScaleFactor:1,isMobile:width<=390,hasTouch:width<=390});
    try{
      const home=await page.goto(base,{waitUntil:"domcontentloaded",timeout:25_000});
      if(!home?.ok())throw Error("Homepage HTTP "+home?.status());
      await page.getByRole("heading",{name:/Entenda a IA/}).waitFor();
      const tease=page.getByRole("heading",{name:/O mundo inspira/});
      if(!await tease.isVisible())throw Error("Global bridge not discoverable from homepage");
      await page.locator("a[href$='/ponte/']").first().click();
      await page.getByRole("heading",{level:1,name:/O que aprendemos lá fora/}).waitFor();
      const cards=page.getByRole("group",{name:"Escolha seu caso de uso"}).locator("button[aria-pressed]");
      if(await cards.count()!==3)throw Error("Expected three real cases");
      if(!await page.getByText("OpenAI · Fonte original").isVisible())throw Error("Missing original source provenance");
      const custom=page.getByRole("textbox",{name:"Personalize um cenário"});
      await custom.fill("Uma floricultura no Recife não sabe quando receberá novos produtos.");
      await page.getByTestId("ponte-prompt").getByText(/Uma floricultura no Recife/).waitFor();
      if(await page.getByTestId("ponte-prompt").innerText().then(t=>t.includes("{{CENARIO}}")))throw Error("Unresolved prompt template");
      await cards.nth(1).click();
      await page.getByText("Google · Fonte original").waitFor();
      await cards.nth(2).click();
      await page.getByText("Anthropic · Fonte original").waitFor();
      if(!await page.getByRole("link",{name:/Testar no laboratório/}).isVisible())throw Error("Real exercise link missing");
      const size=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
      if(size.scrollWidth>width+2)throw Error(`Horizontal overflow ${size.scrollWidth}px at ${width}px`);
      const title=await page.title();
      if(!title.includes("Ponte Global"))throw Error("Incorrect page metadata");
      await page.screenshot({path:join(folder,`ponte-${width}.png`),fullPage:true});
      console.log(JSON.stringify({width,status:"pass",...size,cases:3,sourceLinks:3}));
    }catch(error){
      const message=String(error?.message||error);
      failures.push({width,error:message});
      console.error(JSON.stringify({width,status:"fail",error:message}));
    }finally{await page.close();}
  }
}finally{await browser.close();}
if(failures.length){console.error(JSON.stringify({failures},null,2));process.exitCode=1;}
