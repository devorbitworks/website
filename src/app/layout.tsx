import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {Header} from '@/components/header';
import {RevealObserver} from '@/components/motion';
import {Art,Copy} from '@/components/ui';
import {section} from '@/lib/design';
import {privacy,terms} from '@/lib/navigation';
import OrganizationJsonLd from '@/components/OrganizationJsonLd';
import { canonicalSite, isProduction } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(canonicalSite),
  title: {default:'오빗웍스 | 가디언링크',template:'%s | 가디언링크'},
  description: '계약·단지·인사·문서까지, 현장에 꼭 필요한 기능만 담은 용역 통합 그룹웨어',
  robots: {index:isProduction(),follow:isProduction()},
  verification: {other: {'naver-site-verification':'4451c4836e778d1dd64bbc3473ad9e3b61039817'}},
};
export default function RootLayout({children}:{children:ReactNode}) {
  const {t,mt,a,ma}=section('orbit','footer');
  return <html lang="ko" data-scroll-behavior="smooth"><body><OrganizationJsonLd/><a className="skip" href="#main">본문 바로가기</a><Header/><main id="main" tabIndex={-1}>{children}</main><footer className="site-footer"><div className="wrap footer-inner"><div><Art asset={a[0]} mobile={ma[0]} alt="Guardian Link"/><p className="footer-company">{t[0]}</p><address className="copy"><Copy text={t[1]} mobile={mt[1]}/></address></div><nav aria-label="정책"><a href={privacy}>{t[2]}</a><a href={terms}>{t[3]}</a></nav><small>{t[4]}</small><a className="back-top" href="#top" aria-label="맨 위로">{t[5]}</a></div></footer><RevealObserver/></body></html>;
}
