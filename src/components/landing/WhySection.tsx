export default function WhySection() {
  return (
    <section className="why-section" style={{ background: "#fff", padding: "96px 0" }}>
      <div className="why-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="why-h2" style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-.025em", margin: 0, color: "#161616" }}>
            시중 ERP, 왜 현장에서 결국 안 쓰게 될까요?
          </h2>
        </div>

        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "stretch" }}>
          {/* Left */}
          <div style={{ border: "1px solid #E4E6E8", borderRadius: 16, padding: "36px 32px", background: "#FAFAFA" }}>
            <span style={{ display: "inline-block", fontSize: 13, fontWeight: 800, color: "#9DA3AB", letterSpacing: ".06em", marginBottom: 8 }}>유형 1</span>
            <h3 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 20px", color: "#161616" }}>기능이 너무 적다</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              <li style={{ display: "flex", gap: 10, fontSize: 16, color: "#565A61", lineHeight: 1.5 }}><span style={{ color: "#9DA3AB", fontWeight: 700 }}>—</span>계약관리만, 근태관리만 되는 개별 시스템</li>
              <li style={{ display: "flex", gap: 10, fontSize: 16, color: "#565A61", lineHeight: 1.5 }}><span style={{ color: "#9DA3AB", fontWeight: 700 }}>—</span>데이터가 분산되어 중복 작업 발생</li>
              <li style={{ display: "flex", gap: 10, fontSize: 16, color: "#565A61", lineHeight: 1.5 }}><span style={{ color: "#9DA3AB", fontWeight: 700 }}>—</span>도입 효과가 반감</li>
            </ul>
          </div>

          {/* OR */}
          <div className="why-or" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: 52, height: 52, borderRadius: "50%", background: "#161616", color: "#fff", fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>OR</span>
          </div>

          {/* Right */}
          <div style={{ border: "1px solid #E4E6E8", borderRadius: 16, padding: "36px 32px", background: "#FAFAFA" }}>
            <span style={{ display: "inline-block", fontSize: 13, fontWeight: 800, color: "#9DA3AB", letterSpacing: ".06em", marginBottom: 8 }}>유형 2</span>
            <h3 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 20px", color: "#161616" }}>기능이 너무 많다</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              <li style={{ display: "flex", gap: 10, fontSize: 16, color: "#565A61", lineHeight: 1.5 }}><span style={{ color: "#9DA3AB", fontWeight: 700 }}>—</span>기능 100개 중 실제 쓰는 건 5개</li>
              <li style={{ display: "flex", gap: 10, fontSize: 16, color: "#565A61", lineHeight: 1.5 }}><span style={{ color: "#9DA3AB", fontWeight: 700 }}>—</span>교육 비용·시간 증가</li>
              <li style={{ display: "flex", gap: 10, fontSize: 16, color: "#565A61", lineHeight: 1.5 }}><span style={{ color: "#9DA3AB", fontWeight: 700 }}>—</span>결국 엑셀·수기로 복귀</li>
            </ul>
          </div>
        </div>

        {/* Dark banner */}
        <div className="why-banner" style={{ marginTop: 24, background: "#878D92", borderRadius: 16, padding: 40, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap", boxShadow: "0 4px 20px rgba(22,22,22,.15)" }}>
          <div style={{ maxWidth: 420 }}>
            <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: 1000, background: "rgba(10,195,196,.18)", color: "#4FE0E0", fontSize: 13, fontWeight: 800, marginBottom: 14 }}>
              답은 오빗웍스
            </span>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.4, letterSpacing: "-.02em" }}>
              필요한 기능은 다 있고,<br />사용법은 단순하다
            </h3>
          </div>
          <div className="why-banner-cards" style={{ display: "flex", gap: 14, flex: 1, minWidth: 420 }}>
            {["경비·미화·시설 용역 전용 기능", "첫 로그인 후 바로 쓰는 UI", "도입 후 포기 없는 구조"].map((text) => (
              <div key={text} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: 18, fontSize: 15, fontWeight: 600, color: "#fff", lineHeight: 1.5 }}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
