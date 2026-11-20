import type {ReactNode} from 'react';
import Link from 'next/link';
import type {Asset} from '@/lib/design';
export function Copy({text,mobile}:{text:string;mobile?:string}) {
  if(!mobile || mobile===text) return text;
  return <><span className="desktop-copy">{text}</span><span className="mobile-copy">{mobile}</span></>;
}
export function Art({asset,mobile,alt='',className='',priority=false}:{asset:Asset;mobile?:Asset;alt?:string;className?:string;priority?:boolean}) {
  return <picture className={'art '+className}>{mobile&&<source media="(max-width: 767px)" srcSet={mobile.asset} width={Math.round(mobile.w)} height={Math.round(mobile.h)}/>}<img src={asset.asset} width={Math.round(asset.w)} height={Math.round(asset.h)} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined} decoding="async"/></picture>;
}
export function ArrowLink({href,children,variant='solid'}:{href:string;children:ReactNode;variant?:'solid'|'plain'|'light'}) {
  const props={className:'arrow-link '+variant,children:<>{children}<span aria-hidden="true">↗</span></>};
  return href.startsWith('#') ? <a href={href} {...props}/> : <Link href={href} {...props}/>;
}
export function Steps({text,start,count,className=''}:{text:string[];start:number;count:number;className?:string}) {
  return <ol className={'steps '+className}>{Array.from({length:count},(_,i)=>{const j=start+i*3;return <li key={j}><span className="eyebrow">{text[j]}</span><h3>{text[j+1]}</h3><p>{text[j+2]}</p></li>;})}</ol>;
}
