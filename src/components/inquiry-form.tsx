'use client';
import {Suspense,useEffect,useRef,useState,type FormEvent} from 'react';
import {useSearchParams} from 'next/navigation';
import {businesses,fieldLimit,forms,isBusiness,selectInquiryFields,unconfigured,validateInquiry,type Business,type Field} from '@/lib/inquiry';
import {privacy} from '@/lib/navigation';

export function InquiryForm({businessPicker=false}:{businessPicker?:boolean}) {
  return <Suspense fallback={<Form businessPicker={businessPicker} initial="orbit"/>}>{businessPicker?<BusinessForm/>:<Form initial="orbit"/>}</Suspense>;
}
function BusinessForm(){const params=useSearchParams();const selected=params.get('service');return <Form businessPicker initial={isBusiness(selected)?selected:'orbit'}/>;}
function Form({initial,businessPicker=false}:{initial:Business;businessPicker?:boolean}){
  const [selection,setSelection]=useState<{initial:Business;value:Business}>({initial,value:initial});
  const business=selection.initial===initial?selection.value:initial;
  const [common,setCommon]=useState<Record<string,string>>({});
  const [drafts,setDrafts]=useState<Partial<Record<Business,Record<string,string>>>>({});
  const [consent,setConsent]=useState(false);
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [busy,setBusy]=useState(false);
  const [status,setStatus]=useState('');
  const [configured,setConfigured]=useState<boolean|null>(null);
  useEffect(()=>{
    const controller=new AbortController();
    fetch('/api/inquiry',{cache:'no-store',signal:controller.signal})
      .then(async response=>response.ok&&(await response.json()).configured===true)
      .then(value=>{if(!controller.signal.aborted)setConfigured(value);})
      .catch(()=>{if(!controller.signal.aborted)setConfigured(false);});
    return ()=>controller.abort();
  },[]);
  const submitting=useRef(false);
  const form=useRef<HTMLFormElement>(null);
  const hp=useRef<HTMLInputElement>(null);
  const fields={...drafts[business],...common};
  function value(field:Field,value:string){
    if(['company','person','contact'].includes(field.key))setCommon(v=>({...v,[field.key]:value}));
    else setDrafts(v=>({...v,[business]:{...v[business],[field.key]:value}}));
    if(errors[field.key])setErrors(v=>({...v,[field.key]:''}));
  }
  const focusFirst=(issues:Record<string,string>)=>{const name=Object.keys(issues)[0]; if(name && name!=='_form')form.current?.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();};
  async function send(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); if(submitting.current)return;
    setStatus('');
    const payload={business,fields:selectInquiryFields(business,fields),consent,website:hp.current?.value??''};
    const issues=validateInquiry(payload);setErrors(issues);
    if(Object.keys(issues).length){if(issues._form)setStatus(issues._form);focusFirst(issues);return;}
    submitting.current=true;setBusy(true);
    try{
      const response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await response.json();
      if(response.status===503&&data.code==='INQUIRY_UNCONFIGURED'){setConfigured(false);setStatus(unconfigured);}
      else if(response.ok&&data.code==='INQUIRY_ACCEPTED'&&data.ok===true){setStatus('문의가 접수되었습니다.');}
      else if(response.status===502&&data.code==='INQUIRY_DELIVERY_FAILED'){setStatus('메일 서버에서 접수를 확인하지 못했습니다. 입력하신 내용은 이 화면에 남아 있습니다.');}
      else if(response.status===422&&data.errors){setErrors(data.errors);setStatus(data.errors._form??'입력하신 내용을 확인해 주세요.');focusFirst(data.errors);}
      else setStatus('문의가 접수되지 않았습니다. 입력하신 내용은 이 화면에 남아 있습니다.');
    }catch{setStatus('문의가 접수되지 않았습니다. 입력하신 내용은 이 화면에 남아 있습니다.');}
    finally{submitting.current=false;setBusy(false);}
  }
  return <form ref={form} method="post" action="/api/inquiry" noValidate onSubmit={send} className="inquiry-form" aria-busy={busy}>
    {businessPicker&&<fieldset className="interest"><legend>관심 사업 *</legend><div className="choices">{Object.entries(businesses).map(([key,label])=><label key={key}><input type="radio" name="business" value={key} checked={business===key} disabled={busy} onChange={()=>{if(isBusiness(key)){setSelection({initial,value:key});setErrors({});setStatus('');}}}/><span>{label}</span></label>)}</div></fieldset>}
    {configured!==true&&<p className="preview-notice">{configured===null?'문의 접수 설정을 확인 중입니다.':unconfigured}</p>}
    <div className="form-grid">{forms[business].map(field=>{
      const id=`inquiry-${field.key}`;const err=errors[field.key];
      const shared={id,name:field.key,required:field.required,'aria-invalid':!!err,'aria-describedby':err?`${id}-error`:undefined};
      const input={...shared,value:fields[field.key]??'',maxLength:fieldLimit(field),placeholder:field.hint,onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>value(field,e.target.value)};
      return <div key={`${business}-${field.key}`} className={field.wide?'field field-wide':'field'}>
        {business==='web'&&field.key==='type'&&<h3>홈페이지 제작 기본 정보</h3>}
        {field.options?<fieldset><legend>{field.label}</legend><div className="choices">{Object.entries(field.options).map(([option,label])=><label key={option}><input {...shared} id={`${id}-${option}`} type="radio" value={option} checked={fields[field.key]===option} onChange={()=>value(field,option)}/><span>{label}</span></label>)}</div></fieldset>:<><label htmlFor={id}>{field.label}</label>{field.kind==='area'?<textarea {...input} rows={4}/>:<input {...input} type={field.kind==='email'||field.kind==='tel'?field.kind:'text'} inputMode={field.kind==='number'?'numeric':field.kind==='url'?'url':undefined} autoComplete={{company:'organization',person:'name',email:'email',phone:'tel'}[field.key]}/>}</>}
        {err&&<p className="field-error" id={`${id}-error`} role="alert">{err}</p>}
        {business==='web'&&field.key==='customer'&&<p className="discount-note">오빗웍스 이용 고객사 홈페이지 제작 30% 할인</p>}
      </div>;
    })}</div>
    <div hidden aria-hidden="true"><label>웹사이트<input ref={hp} name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <div className="consent"><label><input type="checkbox" name="consent" required checked={consent} aria-invalid={!!errors.consent} aria-describedby={errors.consent?'consent-error':undefined} onChange={e=>{setConsent(e.target.checked);setErrors(v=>({...v,consent:''}));}}/> 개인정보 수집·이용에 동의합니다. (필수)</label><a href={privacy} target="_blank" rel="noopener noreferrer">개인정보처리방침 보기 <span aria-hidden="true">↗</span></a></div>
    {errors.consent&&<p className="field-error" id="consent-error" role="alert">{errors.consent}</p>}
    <div className="form-actions"><button className="arrow-link solid" type="submit" disabled={busy}>{busy?'확인 중':business==='orbit'?'상담 신청하기':'문의 남기기'}<span aria-hidden="true">↗</span></button><p>선택 항목은 비워두고 문의하셔도 됩니다.</p></div>
    <p className={status?'submit-status':'sr-only'} role="status" aria-live="polite">{status}</p>
    <noscript><style>{`.form-actions button{display:none}`}</style><p>문의 기능을 이용하려면 JavaScript가 필요합니다.</p></noscript>
  </form>;
}
