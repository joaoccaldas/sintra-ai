import test from "node:test";
import assert from "node:assert/strict";
import { readBoundedJson } from "../../supabase/functions/sintra-meeting-actions/transport";

const makeReq=(body:string) => new Request("https://example.test/function",{method:"POST",
  headers:{"content-type":"application/json"},body});

test("accepts small valid request body and preserves UTF-8 Portuguese",async()=>{
  const q=await readBoundedJson(makeReq(JSON.stringify({notes:"Revisão do cartão",consent:true})),6000);
  assert.equal(q.ok,true);
  if(q.ok)assert.equal((q.value as {notes:string}).notes,"Revisão do cartão");
});
test("rejects malicious stream without content-length, not just forged header",async()=>{
  const q=await readBoundedJson(makeReq(JSON.stringify({notes:"X".repeat(20_000)})),6000);
  assert.deepEqual(q,{ok:false,error:"payload-too-large"});
});
test("rejects malformed and invalid-encoding bodies without echoing user content",async()=>{
  assert.deepEqual(await readBoundedJson(makeReq("{not json"),6000),
    {ok:false,error:"bad-json"});
  const request=new Request("https://example.test",{method:"POST",
    body:new Uint8Array([0xff,0xfe,0xfd])});
  assert.deepEqual(await readBoundedJson(request,6000),
    {ok:false,error:"bad-json"});
});
test("accepts exact-size 6KB payload and rejects next byte",async()=>{
  const a=await readBoundedJson(makeReq(JSON.stringify({x:"z".repeat(5992)})),6000);
  // JSON.stringify({x:"..."}) adds eight bytes (payload is 6000 total).
  assert.equal(a.ok,true);
  const b=await readBoundedJson(makeReq(JSON.stringify({x:"z".repeat(5993)})),6000);
  assert.deepEqual(b,{ok:false,error:"payload-too-large"});
});
