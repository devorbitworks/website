export default function MissionSection() {
  return (
    <section style={{ background: "#fff", padding: "104px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ display: "inline-block", fontSize: 15, fontWeight: 800, color: "#0AC3C4", letterSpacing: ".08em", marginBottom: 14 }}>미션</span>
          <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-.03em", margin: "0 0 16px", color: "#161616" }}>현장을 혁신하고, 업무를 가볍게</h2>
          <p style={{ fontSize: 18, color: "#565A61", margin: "0 auto", maxWidth: 680, lineHeight: 1.6 }}>
            가디언링크는 현장과 관리회사의 복잡함을 단순하게, 업무의 무게를 가볍게 만들어 갑니다.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {/* Card 1: 보라 */}
          <div style={{ background: "#F0EDFB", borderRadius: 24, padding: "44px 36px", minHeight: 280, display: "flex", flexDirection: "column" }}>
            <span style={{ width: 64, height: 64, borderRadius: 18, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: "0 2px 12px rgba(22,22,22,.08)" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#7C5CE0" strokeWidth="2"/>
                <circle cx="12" cy="12" r="5" stroke="#7C5CE0" strokeWidth="2"/>
                <circle cx="12" cy="12" r="1.6" fill="#7C5CE0"/>
              </svg>
            </span>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.45, margin: 0, color: "#1F1640" }}>
              복잡한 업무는 간소화하고 관리 효율은 극대화합니다
            </h3>
          </div>

          {/* Card 2: 민트 */}
          <div style={{ background: "#E1F6F1", borderRadius: 24, padding: "44px 36px", minHeight: 280, display: "flex", flexDirection: "column" }}>
            <span style={{ width: 64, height: 64, borderRadius: 18, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: "0 2px 12px rgba(22,22,22,.08)" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="3" width="14" height="18" rx="2" stroke="#1FA886" strokeWidth="2"/>
                <path d="M9 8h6M9 12h6M9 16l1.5 1.5L14 14" stroke="#1FA886" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.45, margin: 0, color: "#0E3B30" }}>
              용역 관리의 부담을 덜어내고 신뢰와 안전을 더합니다
            </h3>
          </div>

          {/* Card 3: 연두 */}
          <div style={{ background: "#EAF5DA", borderRadius: 24, padding: "44px 36px", minHeight: 280, display: "flex", flexDirection: "column" }}>
            <span style={{ width: 64, height: 64, borderRadius: 18, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: "0 2px 12px rgba(22,22,22,.08)" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M12 3a6 6 0 0 0-4 10.5c.6.5 1 1.2 1 2V17h6v-1.5c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" stroke="#7FA82B" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M9.5 20h5M10 17.5h4" stroke="#7FA82B" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.45, margin: 0, color: "#3A4A16" }}>
              최적화된 솔루션으로 경비·미화 관리의 새로운 기준을 만듭니다
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
