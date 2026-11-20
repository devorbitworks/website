import {inquiryDelivery,type CreateTransport} from './inquiry-mail.ts';
import {isBusiness,selectInquiryFields,unconfigured,validateInquiry} from './inquiry.ts';

const limit=32768;
const failed='메일 서버에서 접수를 확인하지 못했습니다. 입력하신 내용은 이 화면에 남아 있습니다.';
function reply(status:number,body:Record<string,unknown>){return Response.json(body,{status,headers:{'Cache-Control':'no-store'}});}
function record(value:unknown):value is Record<string,unknown>{return value!==null&&typeof value==='object'&&!Array.isArray(value);}
const legacyMethods:Record<string,string>={'전화 상담':'phone','방문 상담':'visit','이메일':'email'};
function legacyPayload(payload:unknown):unknown {
  if(!record(payload)||Object.hasOwn(payload,'business'))return payload;
  const {company,manager,phone,email,units,consult,consent,website}=payload;
  const method=typeof consult==='string'&&Object.hasOwn(legacyMethods,consult)?legacyMethods[consult]:consult;
  return {business:'orbit',fields:{company,person:manager,phone,email,sites:units,method},consent,website};
}
export function createInquiryHandlers({env=process.env,createTransport,legacy=false}:{
  env?:Readonly<Record<string,string|undefined>>;
  createTransport?:CreateTransport;
  legacy?:boolean;
}={}){
  const delivery=inquiryDelivery(env,createTransport);
  const GET=()=>reply(200,{configured:delivery.configured()});
  async function POST(request:Request){
    if(request.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase()!=='application/json')return reply(415,{code:'UNSUPPORTED_MEDIA_TYPE'});
    if(Number(request.headers.get('content-length'))>limit)return reply(413,{code:'PAYLOAD_TOO_LARGE'});
    let payload:unknown;
    try{
      const reader=request.body?.getReader();
      if(!reader)return reply(400,{code:'INVALID_JSON'});
      const decoder=new TextDecoder('utf-8',{fatal:true});
      let length=0,text='';
      for(;;){const {done,value}=await reader.read();if(done)break;length+=value.byteLength;if(length>limit){await reader.cancel();return reply(413,{code:'PAYLOAD_TOO_LARGE'});}text+=decoder.decode(value,{stream:true});}
      payload=JSON.parse(text+decoder.decode());
    }catch{return reply(400,{code:'INVALID_JSON'});}
    if(legacy)payload=legacyPayload(payload);
    const errors=validateInquiry(payload);
    if(Object.keys(errors).length||!record(payload)||!isBusiness(payload.business)||!record(payload.fields))return reply(422,{code:'VALIDATION_FAILED',errors});
    const fields=Object.fromEntries(Object.entries(payload.fields).filter((entry):entry is [string,string]=>typeof entry[1]==='string'));
    const result=await delivery.send(payload.business,selectInquiryFields(payload.business,fields));
    if(result==='unconfigured')return reply(503,{code:'INQUIRY_UNCONFIGURED',message:unconfigured});
    if(result==='failed')return reply(502,{code:'INQUIRY_DELIVERY_FAILED',message:failed});
    return reply(200,{ok:true,code:'INQUIRY_ACCEPTED'});
  }
  return {GET,POST};
}
