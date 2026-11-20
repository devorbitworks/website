import test from 'node:test';
import assert from 'node:assert/strict';
import {createInquiryHandlers} from '../src/lib/inquiry-response.ts';

const recipient='buhee@orbitworks.co.kr';
const credentials={GMAIL_USER:'sender@example.invalid',GMAIL_APP_PASSWORD:'synthetic-stub-only'};
const enabled={...credentials,VERCEL_ENV:'production',INQUIRY_DELIVERY_ENABLED:'true'};
const fields={company:'테스트 회사',person:'테스트 담당자',phone:'010-0000-0000',email:'visitor@example.invalid',method:'visit'};
const inquiry={business:'orbit',fields,consent:true,website:''};
const legacy={company:fields.company,manager:fields.person,phone:fields.phone,email:fields.email,units:'0',consult:'방문 상담'};
const request=(body)=>new Request('http://localhost/api/inquiry',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});

function stub(reply={accepted:[recipient]}) {
  const calls={create:0,messages:[]};
  return {calls,createTransport:(auth)=>{
    calls.create++;
    assert.deepEqual(auth,{user:credentials.GMAIL_USER,pass:credentials.GMAIL_APP_PASSWORD});
    return {async sendMail(message){calls.messages.push(message);if(reply instanceof Error)throw reply;return reply;}};
  }};
}

test('default, local, preview, wrong flag, or missing credentials cannot construct transport',async()=>{
  const {calls,createTransport}=stub();
  for(const env of [
    {},{...enabled,INQUIRY_DELIVERY_ENABLED:undefined},{...enabled,INQUIRY_DELIVERY_ENABLED:'false'},
    {...enabled,INQUIRY_DELIVERY_ENABLED:'TRUE'},{...enabled,VERCEL_ENV:undefined,NODE_ENV:'production'},
    {...enabled,VERCEL_ENV:'preview'},{...enabled,GMAIL_APP_PASSWORD:''},{...enabled,GMAIL_USER:'a@example.invalid\nBcc: attacker@example.invalid'},
  ]){
    const {GET,POST}=createInquiryHandlers({env,createTransport});
    assert.deepEqual(await GET().json(),{configured:false});
    assert.equal((await POST(request(inquiry))).status,503);
    assert.equal((await createInquiryHandlers({env,createTransport,legacy:true}).POST(request({...legacy,consent:true}))).status,503);
  }
  assert.equal(calls.create,0);
});

test('production readiness discloses only a boolean and does not construct transport',async()=>{
  const {calls,createTransport}=stub();
  const {GET}=createInquiryHandlers({env:enabled,createTransport});
  const response=GET();assert.equal(response.headers.get('cache-control'),'no-store');
  assert.deepEqual(await response.json(),{configured:true});
  assert.equal(calls.create,0);
});

test('both APIs require explicit consent and reject invalid or trapped input before constructing transport',async()=>{
  const {calls,createTransport}=stub();
  for(const [legacyMode,body] of [[false,inquiry],[true,legacy]]){
    const {POST}=createInquiryHandlers({env:enabled,legacy:legacyMode,createTransport});
    for(const consent of [undefined,false,'true',1]){
      const response=await POST(request({...body,consent}));
      assert.equal(response.status,422);
      assert.ok((await response.json()).errors.consent);
    }
    assert.equal((await POST(request({...body,consent:true,website:'bot'}))).status,422);
  }
  assert.equal(calls.create,0);
});

test('all four businesses route to the approved receiver; unknown input never reaches SMTP',async()=>{
  const {calls,createTransport}=stub();
  const {POST}=createInquiryHandlers({env:enabled,createTransport});
  const shared={company:fields.company,person:fields.person,contact:fields.email};
  const other={web:{...shared,type:'new',purpose:'스텁 테스트'},it:{...shared,device:'기기',idea:'활용',message:'내용'},mro:{...shared,message:'내용'}};
  for(const [business,known] of Object.entries({orbit:fields,...other})){
    const result=await POST(request({...inquiry,business,fields:{...known,to:'other@example.invalid',hidden:'do not send'},to:'other@example.invalid'}));
    assert.equal(result.status,200);
    assert.deepEqual(await result.json(),{ok:true,code:'INQUIRY_ACCEPTED'});
  }
  const result=await createInquiryHandlers({env:enabled,legacy:true,createTransport}).POST(request({...legacy,consent:true}));
  assert.equal(result.status,200);
  assert.match(calls.messages.at(-1).text,/단지 수 \(선택\): 0/);
  assert.match(calls.messages.at(-1).text,/상담 방식: 방문 상담/);
  assert.equal(calls.messages.length,5);
  for(const mail of calls.messages){
    assert.equal(mail.to,recipient);
    assert.equal(mail.from,credentials.GMAIL_USER);
    assert.deepEqual(Object.keys(mail),['from','to','subject','text']);
    assert.ok(!JSON.stringify(mail).includes('other@example.invalid'));
    assert.ok(!JSON.stringify(mail).includes('do not send'));
    assert.match(mail.text,/동의: 예/);
  }
});

test('unconfirmed, wrong, rejected, or thrown SMTP result returns 502 without leaking details',async()=>{
  for(const reply of [{accepted:[]},{accepted:['another@example.invalid']},{accepted:[recipient],rejected:[recipient]},new Error(`hide ${credentials.GMAIL_APP_PASSWORD} and ${fields.email}`)]){
    const {createTransport}=stub(reply);
    const {POST}=createInquiryHandlers({env:enabled,createTransport});
    const response=await POST(request(inquiry));
    assert.equal(response.status,502);
    const output=await response.json();assert.equal(output.code,'INQUIRY_DELIVERY_FAILED');assert.ok(!('ok' in output));
    assert.doesNotMatch(JSON.stringify(output),/visitor@example.invalid|synthetic-stub-only/);
  }
});
