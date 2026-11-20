'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';
export function RevealObserver() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    const seen=new WeakSet<Element>();
    const io=new IntersectionObserver(entries=>{
      entries.forEach(({target,isIntersecting})=>{
        if(!isIntersecting) return;
        seen.add(target); const rect=target.getBoundingClientRect();
        if(!motion.matches && rect.top > 24 && typeof target.animate==='function') {
          const mobile=matchMedia('(max-width: 767px)').matches;
          target.animate([{opacity:.05,transform:`translateY(${mobile?12:20}px)`},{opacity:1,transform:'translateY(0)'}],{duration:mobile?440:640,easing:'ease-out'});
        }
        io.unobserve(target);
      });
    },{threshold:0,rootMargin:'0px 0px -32px 0px'});
    const observe=()=>document.querySelectorAll('[data-reveal]').forEach(el=>{if(!seen.has(el)) io.observe(el);});
    const mo=new MutationObserver(observe);
    observe(); mo.observe(document.querySelector('main')?.parentElement ?? document.body,{childList:true,subtree:true});
    const stop=()=>{if(motion.matches) document.getAnimations().forEach(a=>a.cancel());};
    motion.addEventListener('change',stop);
    return ()=>{io.disconnect();mo.disconnect();motion.removeEventListener('change',stop);};
  },[]);
  return null;
}
export function TapPanel({children,label,className=''}:{children:ReactNode;label:string;className?:string}){
  const [active,setActive]=useState(false);
  const pointer=useRef('');
  return <button type="button" className={'tap-panel '+className} aria-label={label} aria-pressed={active} onPointerDown={e=>{pointer.current=e.pointerType;}} onClick={e=>{if(e.detail===0 || pointer.current!=='mouse')setActive(v=>!v);}}>{children}</button>;
}
