import Image from "next/image";

export default function AboutHero() {
  return (
    <section id="top" style={{ position: "relative", background: "#FAFAFA", overflow: "hidden", padding: "0 0 96px" }}>
      {/* Text header */}
      <div style={{ position: "relative", textAlign: "center", padding: "80px 0 0", overflow: "hidden" }}>
        {/* Watermark */}
        <div aria-hidden="true" className="about-hero-watermark" style={{ position: "absolute", top: "54%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 200, fontWeight: 800, letterSpacing: "-.04em", color: "#EDEFF1", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>
          Guardianlink
        </div>
        <div style={{ position: "relative" }}>
          <span style={{ display: "inline-block", padding: "7px 16px", borderRadius: 1000, background: "#E0F7F7", color: "#07898A", fontSize: 14, fontWeight: 700, marginBottom: 22 }}>
            Guardian Link co.,ltd
          </span>
          <h1 className="about-hero-h1" style={{ fontSize: 56, lineHeight: 1.2, fontWeight: 800, letterSpacing: "-.035em", margin: 0, color: "#161616" }}>
            현장을 지키고 연결하는 기준
          </h1>
        </div>
      </div>

      {/* Image + overlay */}
      <div className="about-hero-inner" style={{ maxWidth: 1100, margin: "56px auto 0", padding: "0 32px", position: "relative" }}>
        <div className="about-hero-img-wrap" style={{ display: "block", width: "100%", height: 480, borderRadius: 28, boxShadow: "0 4px 20px rgba(22,22,22,.15)", position: "relative", overflow: "hidden" }}>
          <Image src="/about-hero.jpg" alt="현장을 지키고 연결하는 가디언링크" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 1100px" priority />
          {/* Overlay */}
          <div className="about-overlay" style={{ position: "absolute", left: 48, right: 48, bottom: 48, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", borderRadius: 16, padding: "36px 40px", boxShadow: "0 4px 20px rgba(22,22,22,.15)", maxWidth: 680 }}>
            <p style={{ margin: "0 0 14px", fontSize: 17, lineHeight: 1.7, color: "#292B2D", fontWeight: 600 }}>
              가디언링크(Guardian Link)는 지키는 사람·공간을 뜻하는 'Guardian'과 현장과 본사를 잇는 'Link'를 결합한 이름입니다.
            </p>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: "#565A61" }}>
              'Guardian'은 안전하게 보호받는 현장을, 'Link'는 그 현장과 본사를 끊김 없이 연결하는 방법을 의미합니다. 이름처럼, 가디언링크는 고객이 믿고 의지할 수 있는 안정적이고 혁신적인 현장 관리 솔루션, <strong style={{ color: "#07898A", fontWeight: 700 }}>오빗웍스(orbitworks)</strong>를 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
