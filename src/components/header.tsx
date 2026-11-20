'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {nav} from '@/lib/navigation';

export function Header() {
  const route = usePathname();
  const [shownOn,setShownOn] = useState<string | null>(null);
  const open = shownOn === route;
  const toggle = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = drawer.current;
    const screen = matchMedia('(min-width: 768px)');
    let focusFrame = 0;
    const cancelInitialFocus = () => cancelAnimationFrame(focusFrame);
    // Give the drawer a paint with inert removed before focusing a link.
    // Retry if the visibility transition has not settled yet.
    let deadline: number | undefined;
    const focusFirst = (time: number) => {
      if (!panel?.isConnected || panel.dataset.open !== 'true' || screen.matches || panel.contains(document.activeElement)) return;
      deadline ??= time + 650;
      const first = panel.querySelector<HTMLAnchorElement>('a[href]');
      if (!panel.inert && first && getComputedStyle(first).visibility === 'visible') {
        first.focus({preventScroll:true});
      }
      if (!panel.contains(document.activeElement) && time < deadline) focusFrame = requestAnimationFrame(focusFirst);
    };
    focusFrame = requestAnimationFrame(() => { focusFrame = requestAnimationFrame(focusFirst); });
    const resize = () => { if (screen.matches) { cancelInitialFocus(); setShownOn(null); } };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelInitialFocus();
        setShownOn(null);
        toggle.current?.focus({preventScroll:true});
      }
      if (event.key !== 'Tab') return;
      const links = [...(panel?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [])];
      const last = links.at(-1);
      if (document.activeElement === toggle.current) {
        event.preventDefault();
        (event.shiftKey ? last : links[0])?.focus({preventScroll:true});
      }
      if (!event.shiftKey && last && document.activeElement === last) {
        event.preventDefault();
        toggle.current?.focus({preventScroll:true});
      }
    };
    document.addEventListener('keydown',onKey);
    screen.addEventListener('change',resize);
    return () => {
      cancelInitialFocus();
      document.body.style.overflow = previous;
      document.removeEventListener('keydown',onKey);
      screen.removeEventListener('change',resize);
    };
  },[open,route]);
  const links = (mobile = false) => nav.map(item => <Link key={item.href} href={item.href} aria-current={route === item.href ? 'page' : undefined} onClick={mobile ? () => {setShownOn(null); if(route===item.href) toggle.current?.focus();} : undefined}><span>{item.label}</span>{item.detail && <small>{item.detail}</small>}</Link>);
  return <header className="site-header" id="top"><div className="wrap header-inner">
    <Link href="/" aria-label="가디언링크 홈" onClick={()=>setShownOn(null)}><picture><source media="(max-width: 767px)" srcSet="/assets/orbit-mobile-01.png"/><img className="header-logo" width="188" height="38" src="/assets/orbit-desktop-01.png" alt="Guardian Link" /></picture></Link>
    <nav className="desktop-nav" aria-label="주 메뉴">{links()}</nav>
    <button type="button" className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?'메뉴 닫기':'메뉴 열기'} onClick={()=>setShownOn(open ? null : route)}><i/><i/><i/></button>
  </div><div className="mobile-scrim" data-open={open} onClick={()=>{setShownOn(null);toggle.current?.focus();}} aria-hidden="true"/>
  <nav id="mobile-menu" ref={drawer} className="mobile-nav" data-open={open} inert={!open} aria-label="모바일 주 메뉴">{links(true)}</nav></header>;
}
