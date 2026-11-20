import type {Metadata} from 'next';
import {Copy} from '@/components/ui';
import {section} from '@/lib/design';
export const metadata:Metadata={title:'업데이트 노트',alternates:{canonical:'/updates'}};
const get=(name:string)=>section('updates',`section/updates-${name}`);
export default function Updates(){
  const h=get('intro'), road=get('roadmap-primary'), f=get('feature-highlights');
  return <>
    <section className="updates-intro arrival"><div className="wrap"><div className="enter-title"><p className="eyebrow">{h.t[0]}</p><h1>{h.t[1]}</h1><p className="copy lead"><Copy text={h.t[2]} mobile={h.mt[2]}/></p></div></div></section>
    <section className="roadmap section-pad"><div className="wrap roadmap-grid"><header data-reveal><p className="eyebrow">{road.t[0]}</p><h2 className="copy">{road.t[1]}</h2><p className="copy lead">{road.t[2]}</p><p className="stat-label">{road.t[3]}</p><dl className="road-stats">{[4,6,8].map(i=><div key={i}><dt>{road.t[i+1]}</dt><dd>{road.t[i]}</dd></div>)}</dl><p className="copy small-note"><Copy text={road.t[10]} mobile={road.mt[10]}/></p></header>
    <div className="timeline enter-visual" data-reveal><header><h3>{road.t[11]}</h3><span>{road.t[12]}</span></header><ol>{[13,17,21,25,29,33].map((i,j)=><li key={i} className={j<4?'done':j===4?'developing':'planned'}><div className="timeline-meta">{j===1?<span><time dateTime="2026-04">2026.04</time> ~ <time dateTime="2026-06">2026.06</time></span>:<time dateTime={road.t[i].replace('.','-')}>{road.t[i]}</time>}<span className="pill">{road.t[i+1]}</span></div><h4>{road.t[i+2]}</h4><p className="copy"><Copy text={road.t[i+3]} mobile={road.mt[i+2]}/></p></li>)}</ol><p className="timeline-note copy">{road.t[37]}</p></div></div></section>
    <section className="feature-highlights section-pad"><div className="wrap"><header data-reveal><h2>{f.t[0]}</h2><p className="lead copy">{f.t[1]}</p></header><div className="split">{[2,8].map(i=><article key={i} data-reveal><p className="eyebrow">{f.t[i]}</p><h3>{f.t[i+1]}</h3><p className="copy">{f.t[i+2]}</p><ul className="line-list">{f.t.slice(i+3,i+6).map(x=><li key={x}>{x}</li>)}</ul></article>)}</div></div></section>
  </>;
}
