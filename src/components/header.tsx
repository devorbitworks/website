'use client';
import {useEffect,useRef,useState,type KeyboardEvent} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowRight,Building2,ChevronDown,ClipboardCheck,Files,LayoutGrid,Package,Route,Send,UsersRound,type LucideIcon} from 'lucide-react';
import {nav,orbitShortcuts,orbitMoreShortcuts,type OrbitShortcut} from '@/lib/navigation';

const icons: Record<OrbitShortcut['icon'],LucideIcon> = {
  contract:Files, complex:Building2, asset:Package, official:Send,
  people:UsersRound, deployment:ClipboardCheck, overview:LayoutGrid, patrol:Route,
};

function FeatureLink({item,onChoose}:{item:OrbitShortcut;onChoose:()=>void}) {
  const Icon=icons[item.icon];
  return <a href={`/#${item.id}`} className="orbit-feature-link" onClick={onChoose}>
    <span className="orbit-feature-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.6}/></span>
    <span className="orbit-feature-copy"><strong>{item.label}{item.planned&&<span className="orbit-planned">예정</span>}</strong><p>{item.description}</p></span>
  </a>;
}

export function Header() {
  const route = usePathname();
  const [shownOn,setShownOn] = useState<string | null>(null);
  const [megaShownOn,setMegaShownOn] = useState<string | null>(null);
  const [mobileFeaturesOn,setMobileFeaturesOn] = useState<string | null>(null);
  const open = shownOn === route;
  const megaOpen = megaShownOn === route;
  const mobileFeaturesOpen = open && mobileFeaturesOn === route;
  const toggle = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);
  const megaHost = useRef<HTMLDivElement>(null);
  const megaTrigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const clearClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current=null;
  };
  const closeMega = () => {clearClose();setMegaShownOn(null);};
  const chooseFeature = () => {closeMega();setShownOn(null);setMobileFeaturesOn(null);};
  const enterMega = () => {clearClose();setMegaShownOn(route);};
  const leaveMega = () => {
    clearClose();
    closeTimer.current=window.setTimeout(()=>{
      if (!megaHost.current?.contains(document.activeElement)) setMegaShownOn(null);
      closeTimer.current=null;
    },160);
  };
  const triggerKey = (event:KeyboardEvent<HTMLButtonElement>) => {
    if(event.key!=='ArrowDown')return;
    event.preventDefault();enterMega();
    requestAnimationFrame(()=>megaHost.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus());
  };
  useEffect(()=>()=>{if(closeTimer.current!==null)window.clearTimeout(closeTimer.current);},[]);
  useEffect(()=>{
    if(!megaOpen)return;
    const outside=(event:PointerEvent)=>{
      if(!megaHost.current?.contains(event.target as Node))setMegaShownOn(null);
    };
    const escape=(event:globalThis.KeyboardEvent)=>{
      if(event.key!=='Escape')return;
      event.preventDefault();setMegaShownOn(null);
      if(megaHost.current?.contains(document.activeElement))megaTrigger.current?.focus();
    };
    const resize=()=>{if(window.innerWidth<768)setMegaShownOn(null);};
    document.addEventListener('pointerdown',outside);
    document.addEventListener('keydown',escape);
    window.addEventListener('resize',resize);
    return()=>{
      document.removeEventListener('pointerdown',outside);
      document.removeEventListener('keydown',escape);
      window.removeEventListener('resize',resize);
    };
  },[megaOpen]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = drawer.current;
    const screen = matchMedia('(min-width: 768px)');
    let focusFrame = 0;
    const cancelInitialFocus = () => cancelAnimationFrame(focusFrame);
    let deadline: number | undefined;
    const focusFirst = (time: number) => {
      if (!panel?.isConnected || panel.dataset.open !== 'true' || screen.matches || panel.contains(document.activeElement)) return;
      deadline ??= time + 650;
      const first = panel.querySelector<HTMLAnchorElement>('a[href]');
      if (!panel.inert && first && getComputedStyle(first).visibility === 'visible') first.focus({preventScroll:true});
      if (!panel.contains(document.activeElement) && time < deadline) focusFrame = requestAnimationFrame(focusFirst);
    };
    focusFrame = requestAnimationFrame(() => { focusFrame = requestAnimationFrame(focusFirst); });
    const resize = () => { if (screen.matches) { cancelInitialFocus(); setShownOn(null); } };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();cancelInitialFocus();setShownOn(null);toggle.current?.focus({preventScroll:true});
      }
      if (event.key !== 'Tab') return;
      const links = [...(panel?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [])];
      const last = links.at(-1);
      if (document.activeElement === toggle.current) {
        event.preventDefault();(event.shiftKey ? last : links[0])?.focus({preventScroll:true});
      }
      if (!event.shiftKey && last && document.activeElement === last) {
        event.preventDefault();toggle.current?.focus({preventScroll:true});
      }
    };
    document.addEventListener('keydown',onKey);screen.addEventListener('change',resize);
    return () => {
      cancelInitialFocus();document.body.style.overflow = previous;
      document.removeEventListener('keydown',onKey);screen.removeEventListener('change',resize);
    };
  },[open,route]);
  const mainLink=(item:typeof nav[number],mobile:boolean)=><Link key={item.href} className={mobile?'mobile-main-link':'nav-root-link'} href={item.href} aria-current={route===item.href?'page':undefined} onClick={mobile?()=>{setShownOn(null);if(route===item.href)toggle.current?.focus();}:undefined}><span>{item.label}</span></Link>;
  const links = (mobile = false) => nav.map(item => {
    if(item.href!=='/')return mainLink(item,mobile);
    if(mobile)return <div className="mobile-orbit-group" key={item.href}>
      <div className="mobile-orbit-row"><Link href="/" className="mobile-orbit-home" aria-current={route==='/'?'page':undefined} onClick={()=>{setShownOn(null);setMobileFeaturesOn(null);}}><span>{item.label}</span><small>{item.detail}</small></Link><button type="button" className="mobile-orbit-toggle" aria-label={mobileFeaturesOpen?'오빗웍스 기능 메뉴 닫기':'오빗웍스 기능 메뉴 열기'} aria-expanded={mobileFeaturesOpen} aria-controls="mobile-orbit-features" onClick={()=>setMobileFeaturesOn(mobileFeaturesOpen?null:route)}><ChevronDown size={19} aria-hidden="true"/></button></div>
      <div id="mobile-orbit-features" className="mobile-feature-links" hidden={!mobileFeaturesOpen}>{[...orbitShortcuts,...orbitMoreShortcuts].map(shortcut=><FeatureLink item={shortcut} key={shortcut.id} onChoose={chooseFeature}/>)}</div>
    </div>;
    return <div className="orbit-nav-item" key={item.href} ref={megaHost} onMouseEnter={enterMega} onMouseLeave={leaveMega} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node | null))closeMega();}}>
      <button type="button" className="nav-root-link orbit-menu-trigger" ref={megaTrigger} aria-current={route==='/'?'page':undefined} aria-expanded={megaOpen} aria-controls="orbit-feature-menu" onClick={()=>{clearClose();setMegaShownOn(megaOpen?null:route);}} onKeyDown={triggerKey}><span>{item.label}</span><ChevronDown size={11} className="orbit-menu-chevron" aria-hidden="true"/><small>{item.detail}</small></button>
      <div id="orbit-feature-menu" className="orbit-mega" hidden={!megaOpen} role="region" aria-label="오빗웍스 기능 바로가기">
        <div className="wrap orbit-mega-inner"><ul className="orbit-feature-grid">{orbitShortcuts.map(shortcut=><li key={shortcut.id}><FeatureLink item={shortcut} onChoose={chooseFeature}/></li>)}</ul>
          <aside className="orbit-mega-aside"><a href="/" className="orbit-product-preview" onClick={chooseFeature}><strong>오빗웍스 둘러보기 <ArrowRight size={15} aria-hidden="true"/></strong><div className="orbit-preview-frame"><img src="/assets/orbit-menu-dashboard.png" alt="가상 예시 데이터로 재구성한 오빗웍스 대시보드 미리보기" width={1200} height={488}/><span className="orbit-preview-caption">대시보드 예시</span></div></a><div className="orbit-more-links">{orbitMoreShortcuts.map(shortcut=><FeatureLink item={shortcut} key={shortcut.id} onChoose={chooseFeature}/>)}</div><a href="/#inquiry" className="orbit-menu-contact" onClick={chooseFeature}>도입 상담 바로가기 <ArrowRight size={14} aria-hidden="true"/></a></aside>
        </div>
      </div>
    </div>;
  });
  return <header className="site-header" id="top"><div className="wrap header-inner">
    <Link href="/" aria-label="가디언링크 홈" onClick={()=>{setShownOn(null);closeMega();}}><picture><source media="(max-width: 767px)" srcSet="/assets/orbit-mobile-01.png"/><img className="header-logo" width="188" height="38" src="/assets/orbit-desktop-01.png" alt="Guardian Link" /></picture></Link>
    <nav className="desktop-nav" aria-label="주 메뉴">{links()}</nav>
    <button type="button" className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?'메뉴 닫기':'메뉴 열기'} onClick={()=>{setShownOn(open?null:route);setMobileFeaturesOn(null);}}><i/><i/><i/></button>
  </div><div className="mobile-scrim" data-open={open} onClick={()=>{setShownOn(null);toggle.current?.focus();}} aria-hidden="true"/>
  <nav id="mobile-menu" ref={drawer} className="mobile-nav" data-open={open} inert={!open} aria-label="모바일 주 메뉴">{links(true)}</nav></header>;
}
