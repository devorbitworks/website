export default function ValuesSection() {
  return (
    <section style={{ position: "relative", background: "#FAFAFA", padding: "120px 0", overflow: "hidden" }}>
      {/* Floating decorations — matching original exactly */}
      <div aria-hidden="true" style={{ position: "absolute", top: 80, left: "8%", width: 18, height: 18, borderRadius: "50%", background: "#0AC3C4", opacity: .25, animation: "gl-float 6s ease-in-out infinite" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: 180, right: "12%", width: 28, height: 28, borderRadius: 8, background: "#7C5CE0", opacity: .16, animation: "gl-floatSlow 8s ease-in-out infinite" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 120, left: "14%", width: 24, height: 24, borderRadius: "50%", border: "3px solid #0AC3C4", opacity: .3, animation: "gl-floatSlow 7s ease-in-out infinite" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 80, right: "9%", width: 14, height: 14, borderRadius: "50%", background: "#7FA82B", opacity: .3, animation: "gl-float 5.5s ease-in-out infinite" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "5%", fontSize: 22, color: "#CDD2D8", animation: "gl-float 6.5s ease-in-out infinite" }}>✦</div>
      <div aria-hidden="true" style={{ position: "absolute", top: "30%", right: "6%", fontSize: 18, color: "#CDD2D8", animation: "gl-floatSlow 7.5s ease-in-out infinite" }}>✦</div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 32px", textAlign: "center", position: "relative" }}>
        <span style={{ display: "inline-block", fontSize: 15, fontWeight: 800, color: "#0AC3C4", letterSpacing: ".08em", marginBottom: 18 }}>핵심가치</span>
        <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-.03em", margin: "0 0 24px", color: "#161616", lineHeight: 1.35 }}>
          신뢰를 바탕으로 효율적인 현장 관리를 제공합니다
        </h2>
        <p style={{ fontSize: 18, color: "#565A61", margin: "0 0 56px", lineHeight: 1.7 }}>
          가디언링크는 고객과 함께 성장하며, 더 나은 관리 환경을 만들어갑니다. 경비와 미화 업무의 복잡함을 해결하고, 효율적이고 안전한 솔루션으로 고객의 일상을 지원합니다.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {/* 신뢰 */}
          <div style={{ width: 200, background: "#fff", border: "1px solid #E4E6E8", borderRadius: 20, padding: "36px 24px", boxShadow: "0 2px 12px rgba(22,22,22,.06)" }}>
            <span style={{ width: 60, height: 60, borderRadius: 16, background: "#E0F7F7", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M3 11l3-3 4 3 3-3 3 2 5-4M3 11v4l5 4 3-2 3 2 4-3v-5" stroke="#07898A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: "#161616" }}>신뢰</h3>
          </div>

          {/* 통합 */}
          <div style={{ width: 200, background: "#fff", border: "1px solid #E4E6E8", borderRadius: 20, padding: "36px 24px", boxShadow: "0 2px 12px rgba(22,22,22,.06)" }}>
            <span style={{ width: 60, height: 60, borderRadius: 16, background: "#E0F7F7", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M10 4a2 2 0 1 1 4 0v2h2a2 2 0 0 1 2 2v2h-2a2 2 0 1 0 0 4h2v2a2 2 0 0 1-2 2h-2v-2a2 2 0 1 0-4 0v2H8a2 2 0 0 1-2-2v-2H4a2 2 0 1 1 0-4h2V8a2 2 0 0 1 2-2h2V4z" stroke="#07898A" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
            </span>
            <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: "#161616" }}>통합</h3>
          </div>

          {/* 성과 */}
          <div style={{ width: 200, background: "#fff", border: "1px solid #E4E6E8", borderRadius: 20, padding: "36px 24px", boxShadow: "0 2px 12px rgba(22,22,22,.06)" }}>
            <span style={{ width: 60, height: 60, borderRadius: 16, background: "#E0F7F7", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="#07898A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: "#161616" }}>성과</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
