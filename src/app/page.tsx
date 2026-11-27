import type {Metadata} from 'next';
import {Art,ArrowLink,Copy,Steps} from '@/components/ui';
import {ProductStage} from '@/components/product-stage';
import {InquiryForm} from '@/components/inquiry-form';
import {section} from '@/lib/design';
import {operationFeatureIds} from '@/lib/navigation';

export const metadata:Metadata={alternates:{canonical:'/'}};

const orbit=(name:string)=>section('orbit',`section/orbit-${name}`);
export default function Home(){
  const hero=orbit('hero'), toc=orbit('toc'), review=orbit('review'), patrol=orbit('patrol'), details=orbit('details'), on=orbit('onboarding'), inquiry=orbit('inquiry');
  return <>
    <section className="orbit-hero arrival"><div className="wrap centered">
      <Art asset={hero.a[0]} mobile={hero.ma[0]} alt="Orbitworks" className="orbit-logo enter-title" priority/>
      <h1 className="copy enter-title"><Copy text={hero.t[0]} mobile={hero.mt[0]}/></h1><p className="copy lead enter-title"><Copy text={hero.t[1]} mobile={hero.mt[1]}/></p>
      <div className="hero-actions enter-visual"><ArrowLink href="#inquiry">{hero.t[2]}</ArrowLink><ArrowLink href="#product" variant="plain">{hero.t[4]}</ArrowLink></div>
      <figure className="hero-product enter-visual"><ProductStage desktop={hero.a[1]} mobile={hero.ma[1]} alt="오빗웍스 계약 현황 화면" panelLabel="계약 종료 예정과 확인 사항 요약 강조" priority/><figcaption>{hero.t[6]}</figcaption></figure>
    </div></section>
    <nav className="section-nav" aria-label="오빗웍스 페이지 목차"><div className="wrap orbit-toc">{['product','deployment','patrol','features','inquiry'].map((id,i)=><a href={`#${id}`} key={id}>{toc.t[i]}</a>)}</div></nav>
    <div id="complexes" tabIndex={-1} style={{scrollMarginTop:24}}><Product name="contracts" id="product"/></div>
    <Product name="personnel" id="personnel"/>
    <section className="review dark"><div className="wrap review-inner" data-reveal><Art asset={review.a[0]} mobile={review.ma[0]} alt=""/><p className="eyebrow">{review.t[0]}</p><figure><blockquote className="copy">{review.t[1]}</blockquote><figcaption><strong>{review.t[2]}</strong><span>{review.t[3]}</span></figcaption></figure></div></section>
    <Product name="deployment" id="deployment"/>
    <section className="operations section-pad" id="features" tabIndex={-1}><div className="wrap"><header data-reveal><h2>{details.t[0]}</h2><p className="lead copy"><Copy text={details.t[1]} mobile={details.mt[1]}/></p></header><ul className="feature-grid">{details.a.map((asset,i)=><li id={operationFeatureIds[i]} tabIndex={-1} key={asset.asset} data-reveal><Art asset={asset} mobile={details.ma[i]} alt=""/><h3><Copy text={details.t[2+i*2]} mobile={details.mt[2+i*2]}/></h3><p className="copy"><Copy text={details.t[3+i*2]} mobile={details.mt[3+i*2]}/></p></li>)}</ul></div></section>
    <section className="patrol section-pad dark" id="patrol" tabIndex={-1}><div className="wrap centered"><header data-reveal><span className="pill">{patrol.t[8]}</span><h2 className="copy"><Copy text={patrol.t[0]} mobile={patrol.mt[0]}/></h2><p className="copy lead"><Copy text={patrol.t[1]} mobile={patrol.mt[1]}/></p></header><div className="patrol-art" data-reveal>
      <figure><Art asset={patrol.a[1]} mobile={patrol.ma[1]} alt="순찰 기준 설정 화면"/><Art asset={patrol.a[2]} mobile={patrol.ma[2]} className="patrol-overlay"/><figcaption>{patrol.t[9]}</figcaption></figure>
      <Art asset={patrol.a[0]} mobile={patrol.ma[0]} alt="현장 순찰 기록 모바일 화면" className="patrol-phone"/>
      <figure><Art asset={patrol.a[3]} mobile={patrol.ma[3]} alt="순찰 내역 조회 화면"/><Art asset={patrol.a[4]} mobile={patrol.ma[4]} className="patrol-overlay"/><figcaption>{patrol.t[10]}</figcaption></figure></div><ol className="patrol-steps" data-reveal>{[2,4,6].map((i,j)=><li key={i}><span className="desktop-copy">{patrol.t[i]}</span><Copy text={patrol.t[i+1]} mobile={patrol.mt[j+4]}/></li>)}</ol></div></section>
    <section className="onboarding section-pad" id="onboarding" tabIndex={-1}><div className="wrap"><header className="split" data-reveal><h2 className="copy">{on.t[0]}</h2><div className="timing"><p>{on.t[1]}</p><strong>{on.t[2]}</strong><p className="copy">{on.t[3]}</p></div></header><Steps text={on.t} start={4} count={5} data-reveal/><ArrowLink href="#inquiry">{on.t[19]}</ArrowLink></div></section>
    <section className="orbit-inquiry section-pad" id="inquiry" tabIndex={-1}><div className="wrap"><header className="centered" data-reveal><h2 className="copy">{inquiry.t[0]}</h2><p className="copy lead">{inquiry.t[1]}</p></header><InquiryForm/></div></section>
  </>;
}
function Product({name,id}:{name:'contracts'|'personnel'|'deployment';id:string}){
  const {t,mt,a,ma}=orbit(name);
  const personnel=name==='personnel', deployment=name==='deployment';
  const start=personnel?5:4;
  return <section className={`product-scroll section-pad ${name}`} id={id} tabIndex={-1}><div className="wrap"><div className="product-split" data-reveal>
    <header className="product-copy">
      <p className="eyebrow"><Copy text={t[0]} mobile={mt[0]}/></p>
      <h2 className="copy"><Copy text={t[1]} mobile={mt[1]}/></h2>
      <p className="copy lead"><Copy text={t[2]} mobile={mt[2]}/></p>
    </header>
    <figure className="product-visual">
      <ProductStage desktop={a[0]} mobile={ma[0]} alt={personnel?'빈 근로자 등록 화면':deployment?'배치·폐지 처리 상태 화면':'단지별 계약 목록과 계약 상태 화면'} panelLabel={personnel?'근로자 등록 양식 강조':deployment?'발송 상태 패널 강조':undefined}/>
      {personnel&&<figcaption className="product-caption">{t[4]}</figcaption>}
    </figure>
    <div className="product-bullets">{Array.from({length:personnel?3:2},(_,i)=>{
      const desktopIndex=start+i*2, mobileIndex=4+i*2;
      return <div key={i}><h3><Copy text={t[desktopIndex]} mobile={mt[mobileIndex]}/></h3><p className="copy"><Copy text={t[desktopIndex+1]} mobile={mt[mobileIndex+1]}/></p></div>;
    })}</div>
  </div>{deployment&&<aside className="usage-note" data-reveal><h3>{t[8]}</h3>{t[9].split('\n\n').map(p=><p key={p}>{p}</p>)}</aside>}</div></section>;
}
