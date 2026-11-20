import test from 'node:test';
import assert from 'node:assert/strict';
import {selectInquiryFields,validateInquiry} from '../src/lib/inquiry.ts';
import {createInquiryHandlers} from '../src/lib/inquiry-response.ts';

const contact='preview@example.invalid';
const base={company:'테스트 회사',person:'테스트 담당자'};
const variants={orbit:{...base,email:contact,phone:'010-0000-0000'},web:{...base,contact,type:'new',purpose:'테스트'},it:{...base,contact,device:'테스트',idea:'테스트',message:'테스트'},mro:{...base,contact,message:'테스트'}};
const payload=(business,fields=variants[business])=>({business,fields,consent:true,website:''});
const inquiryResponse=createInquiryHandlers({env:{}}).POST;

const post=(body,contentType='application/json')=>inquiryResponse(new Request('http://localhost/api/inquiry',{method:'POST',headers:{'Content-Type':contentType},body:typeof body==='string'?body:JSON.stringify(body)}));
for(const business of Object.keys(variants))test(`${business}: valid payload explicitly fails closed with 503 and does not echo data`,async()=>{
  const input=payload(business);assert.deepEqual(validateInquiry(input),{});const res=await post(input);assert.equal(res.status,503);assert.equal(res.headers.get('cache-control'),'no-store');const json=await res.json();assert.equal(json.code,'INQUIRY_UNCONFIGURED');assert.match(json.message,/설정되지/);assert.ok(!JSON.stringify(json).includes(contact));assert.ok(!JSON.stringify(json).includes(base.person));
});
test('invalid required fields, type, email, consent, and unsupported selector values',async()=>{
  const res=await post({...payload('orbit',{company:' ',person:123,email:'bad',phone:'bad',sites:'-5',method:'fax'}),consent:'true'});assert.equal(res.status,422);assert.deepEqual(Object.keys((await res.json()).errors),['company','person','phone','email','sites','method','consent']);
  assert.ok(validateInquiry(payload('web',{...variants.web,type:'other'})).type);
  assert.ok(validateInquiry(payload('it',{...variants.it,message:'x'.repeat(2001)})).message);
  assert.ok(validateInquiry(payload('mro',{...variants.mro,contact:'x'})).contact);
});
test('optional site count is empty or a nonnegative integer, and contact accepts phone',()=>{
  assert.deepEqual(validateInquiry(payload('orbit',{...variants.orbit,sites:''})),{});
  assert.deepEqual(validateInquiry(payload('orbit',{...variants.orbit,sites:'0'})),{});
  assert.ok(validateInquiry(payload('orbit',{...variants.orbit,sites:'1.2'})).sites);
  assert.deepEqual(validateInquiry(payload('mro',{...variants.mro,contact:'02-123-4567'})),{});
});
test('malformed, overlarge, unsupported, and bot-filled submissions are rejected',async()=>{
  assert.equal((await post('{bad')).status,400);
  assert.equal((await post('x','text/plain')).status,415);
  assert.equal((await post('x'.repeat(32769))).status,413);
  assert.equal((await post({...payload('orbit'),website:'honeypot'})).status,422);
  assert.equal((await post({business:'constructor',fields:{},consent:true})).status,422);
});

test('posting uses only fields declared for the active business and leaves drafts untouched',()=>{
  const draft={...variants.orbit,...variants.web};
  assert.deepEqual(selectInquiryFields('orbit',draft),variants.orbit);
  assert.deepEqual(selectInquiryFields('web',draft),variants.web);
  assert.equal(draft.contact,contact);
  assert.equal(draft.email,contact);
});
