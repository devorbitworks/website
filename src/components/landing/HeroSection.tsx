import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="top" style={{ position: "relative", overflow: "hidden", background: "#fff", padding: "80px 0 96px" }}>
      {/* Radial glow */}
      <div style={{ position: "absolute", top: -120, right: -80, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle,rgba(10,195,196,.16),rgba(10,195,196,0))", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", position: "relative" }}>
        {/* Left */}
        <div>
          <span style={{ display: "inline-block", padding: "7px 14px", borderRadius: 1000, background: "#E0F7F7", color: "#07898A", fontSize: 14, fontWeight: 700, marginBottom: 24 }}>
            경비·미화·시설 용역 통합 그룹웨어
          </span>
          <h1 style={{ fontSize: 52, lineHeight: 1.22, fontWeight: 800, letterSpacing: "-.03em", margin: "0 0 20px", color: "#161616" }}>
            복잡한 용역 관리,<br />필요한 기능만 손쉽게
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.66, color: "#565A61", margin: "0 0 32px", maxWidth: 480 }}>
            계약·단지·인사·문서까지 —<br />현장에 꼭 필요한 기능만 담아 처음 로그인하는 순간부터 바로 씁니다.
          </p>
          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            <a href="#contact" style={{ padding: "15px 26px", borderRadius: 8, background: "#0AC3C4", color: "#fff", fontSize: 17, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(10,195,196,.35)", fontFamily: "inherit" }}>
              도입 상담 신청 →
            </a>
            <a href="#contact" style={{ padding: "15px 26px", borderRadius: 8, border: "1px solid #CDD2D8", background: "#fff", color: "#404347", fontSize: 17, fontWeight: 600, textDecoration: "none", fontFamily: "inherit" }}>
              서비스 소개서 받기
            </a>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: "#404347" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#0AC3C4"/><path d="M7 12.5l3 3 6-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              1~2주 내 정식 운영
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: "#404347" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#0AC3C4"/><path d="M7 12.5l3 3 6-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              별도 개발 없이 도입
            </div>
          </div>
        </div>

        {/* Right: Mockup */}
        <div style={{ position: "relative", height: 480 }}>
          {/* Browser frame: dashboard */}
          <div style={{ position: "absolute", inset: "0 56px 0 0", background: "#fff", border: "1px solid #E4E6E8", borderRadius: 14, boxShadow: "0 4px 20px rgba(22,22,22,.15)", overflow: "hidden" }}>
            <div style={{ height: 38, background: "#FAFAFA", borderBottom: "1px solid #F2F3F4", display: "flex", alignItems: "center", gap: 7, padding: "0 14px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
              <span style={{ marginLeft: 10, fontSize: 11, color: "#9DA3AB", fontWeight: 600 }}>orbitworks 대시보드</span>
            </div>
            <div style={{ height: "calc(100% - 38px)", overflow: "hidden", position: "relative" }}>
              <Image src="/dashboard.png" alt="orbitworks 대시보드 화면" fill sizes="600px" style={{ objectFit: "cover", objectPosition: "top" }} />
            </div>
          </div>

          {/* Phone frame: app */}
          <div style={{ position: "absolute", right: 0, bottom: -16, width: 148, height: 312, background: "#161616", borderRadius: 26, padding: 7, boxShadow: "0 4px 20px rgba(22,22,22,.28)" }}>
            <div style={{ background: "#fff", borderRadius: 20, height: "100%", overflow: "hidden", position: "relative" }}>
              <Image src="/app.jpg" alt="orbitworks 모바일 앱 화면" fill sizes="148px" style={{ objectFit: "cover", objectPosition: "top" }} />
            </div>
          </div>

          {/* Caption */}
          <span style={{ position: "absolute", left: 0, bottom: -36, fontSize: 13, color: "#9DA3AB", fontWeight: 600 }}>
            orbitworks 대시보드 · 모바일 앱 실제 화면
          </span>
        </div>
      </div>
    </section>
  );
}
