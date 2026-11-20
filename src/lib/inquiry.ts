export const businesses = { orbit:'오빗웍스',web:'홈페이지 제작',it:'IT 디바이스 소싱',mro:'MRO · 소싱 사전 단계' } as const;
export type Business = keyof typeof businesses;
export const isBusiness = (value: unknown):value is Business => typeof value==='string' && Object.hasOwn(businesses,value);
export const unconfigured = '현재 문의 접수 기능이 설정되지 않았습니다. 입력하신 내용은 실제 문의로 접수되거나 메일로 발송되지 않습니다.';
export type Field = {key:string;label:string;hint?:string;required?:boolean;kind?:'area'|'email'|'tel'|'contact'|'url'|'number'|'choice';options?:Record<string,string>;limit?:number;wide?:boolean};
const company:Field={key:'company',label:'회사명 *',hint:'회사명을 입력해 주세요',required:true};
const person:Field={key:'person',label:'담당자명 *',hint:'담당자명을 입력해 주세요',required:true};
const contact:Field={key:'contact',label:'연락받을 정보 *',hint:'이메일 또는 연락처',kind:'contact',required:true,wide:true};
const schedule:Field={key:'schedule',label:'희망 일정 (선택)',hint:'미정·상담 후 결정 가능'};
const budget:Field={key:'budget',label:'예상 예산 (선택)',hint:'미정·상담 후 결정 가능'};
const message:Field={key:'message',label:'문의 내용 *',hint:'필요한 내용과 검토 중인 사항을 알려주세요.',required:true,kind:'area',wide:true};
export const forms:Record<Business,Field[]>={
  orbit:[company,person,{key:'phone',label:'연락처 *',hint:'010-0000-0000',kind:'tel',required:true},{key:'email',label:'연락받을 이메일 주소 *',hint:'email@company.com',kind:'email',required:true,limit:254},{key:'sites',label:'단지 수 (선택)',hint:'관리 중인 단지 수',kind:'number'},{key:'method',label:'상담 방식',kind:'choice',options:{phone:'전화 상담',visit:'방문 상담',email:'이메일'}}],
  web:[company,person,contact,{key:'type',label:'제작 구분 *',kind:'choice',options:{new:'신규 제작',renewal:'리뉴얼'},required:true,wide:true},{key:'purpose',label:'업종·제작 목적 *',hint:'어떤 사업을 소개하고, 홈페이지로 무엇을 하고 싶은지 알려주세요.',kind:'area',required:true,wide:true},{key:'existing',label:'기존 사이트 주소 (선택)',hint:'리뉴얼할 사이트 주소',kind:'url',limit:500},{key:'reference',label:'참고 사이트 주소 (선택)',hint:'마음에 드는 참고 사이트 주소',kind:'url',limit:500},{key:'features',label:'필요한 메뉴·기능 (선택)',hint:'회사소개, 사업영역, 문의, 게시판 등 필요한 내용을 적어주세요.',kind:'area',wide:true},schedule,budget,{key:'customer',label:'오빗웍스 이용 여부 · 할인 대상 확인 (선택)',kind:'choice',options:{yes:'이용 중',no:'미이용',unknown:'모름'},wide:true},{...message,label:'추가 문의 내용 (선택)',required:false}],
  it:[company,person,contact,{key:'device',label:'찾는 IT 디바이스 *',hint:'어떤 종류의 디바이스를 찾고 있는지 알려주세요.',required:true},{key:'idea',label:'활용·판매 구상 *',hint:'누구에게 어떤 용도로 제공하려는지 알려주세요.',required:true},{key:'candidate',label:'후보 제품 링크 (선택)',hint:'검토 중인 제품이 있다면 주소를 남겨주세요.',kind:'url',limit:500},{key:'quantity',label:'예상 수량 (선택)',hint:'미정 가능'},budget,schedule,{...message,label:'필요한 도움 *',hint:'찾는 디바이스, 활용·판매 구상, 후보 제품 링크와 필요한 도움을 알려주세요.'}],
  mro:[company,person,contact,message],
};
export function selectInquiryFields(business:Business,draft:Record<string,string>):Record<string,string>{
  return Object.fromEntries(forms[business].filter(({key})=>Object.hasOwn(draft,key)).map(({key})=>[key,draft[key]]));
}
export const fieldLimit=(field:Field)=>field.limit ?? (field.kind==='area'?2000:field.kind==='number'?12:field.kind==='contact'?254:120);
const isEmail=(s:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(s);
const isPhone=(s:string)=>/^\+?[\d\s()-]+$/u.test(s) && /^\+?\d{8,15}$/u.test(s.replace(/[\s()-]/gu,''));
const isUrl=(s:string)=>{try{const u=new URL(s.includes('://')?s:`https://${s}`);return /^(https?:)$/u.test(u.protocol)&&u.hostname.includes('.')&&!u.username&&!u.password;}catch{return false;}};
const record=(v:unknown):v is Record<string,unknown>=>typeof v==='object'&&v!==null&&!Array.isArray(v);
export function validateInquiry(payload:unknown):Record<string,string> {
  if(!record(payload)||!isBusiness(payload.business)||!record(payload.fields)) return {_form:'문의 정보를 확인해 주세요.'};
  if(payload.website !== undefined && payload.website !== '') return {_form:'문의 정보를 확인해 주세요.'};
  const errors:Record<string,string>={};
  for(const field of forms[payload.business]){
    const value=payload.fields[field.key];
    const text=typeof value==='string'?value.trim():'';
    if(value!==undefined&&typeof value!=='string') errors[field.key]='입력값을 확인해 주세요.';
    else if(!text && field.required) errors[field.key]=field.kind==='choice'?'필수 항목을 선택해 주세요.':'필수 항목을 입력해 주세요.';
    else if(text && text.length>fieldLimit(field)) errors[field.key]=`${fieldLimit(field)}자 이내로 입력해 주세요.`;
    else if(text && field.kind==='email'&&!isEmail(text)) errors[field.key]='이메일 형식을 확인해 주세요.';
    else if(text && field.kind==='tel'&&!isPhone(text)) errors[field.key]='연락처 형식을 확인해 주세요.';
    else if(text && field.kind==='contact'&&!isEmail(text)&&!isPhone(text)) errors[field.key]='이메일 또는 연락처 형식을 확인해 주세요.';
    else if(text && field.kind==='url'&&!isUrl(text)) errors[field.key]='사이트 주소 형식을 확인해 주세요.';
    else if(text && field.kind==='number'&&!/^\d+$/u.test(text)) errors[field.key]='0 이상의 정수를 입력해 주세요.';
    else if(text && field.options && !Object.hasOwn(field.options,text)) errors[field.key]='선택 항목을 확인해 주세요.';
  }
  if(payload.consent!==true) errors.consent='개인정보 수집·이용에 동의해 주세요.';
  return errors;
}
