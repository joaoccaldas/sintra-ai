/**
 * Stream-body bound: Content-Length is advisory and may be absent or forged.
 * Do not await req.json() on unbounded attacker-controlled request streams.
 */
export async function readBoundedJson(req: Request, limitBytes = 6000): Promise<
  {ok:true;value:unknown} | {ok:false;error:"payload-too-large"|"bad-json"}
> {
  if (!req.body) return {ok:false,error:"bad-json"};
  const reader=req.body.getReader();
  const chunks:Uint8Array[]=[];
  let bytes=0;
  try {
    while(true) {
      const result=await reader.read();
      if(result.done)break;
      const chunk=result.value;
      bytes+=chunk.byteLength;
      if(bytes>limitBytes) {
        await reader.cancel().catch(()=>{});
        return {ok:false,error:"payload-too-large"};
      }
      chunks.push(chunk);
    }
    const combined=new Uint8Array(bytes);
    let offset=0;
    for(const part of chunks){combined.set(part,offset);offset+=part.byteLength;}
    return {ok:true,value:JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(combined))};
  } catch {
    return {ok:false,error:"bad-json"};
  } finally {
    try {reader.releaseLock();}catch{ /* reader may already be cancelled */ }
  }
}
