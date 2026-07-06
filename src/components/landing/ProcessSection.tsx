const steps = [
  { no: "01", title: "도입 상담", desc: "현장 규모와 요구사항 파악", period: "1~2일", style: "primary" },
  { no: "02", title: "데이터 이관", desc: "기존 계약·인사 데이터 정리", period: "상황별", style: "mid" },
  { no: "03", title: "현장 설정", desc: "단지·근로자·권한 세팅", period: "2~3일", style: "mid" },
  { no: "04", title: "교육 & 파일럿", desc: "실무자 교육과 시범 운영", period: "3~5일", style: "mid" },
  { no: "05", title: "정식 운영", desc: "전 현장 본격 운영 및 지원", period: "상시", style: "dark" },
] as const;

export default function ProcessSection() {
  return (
    <section className="process-section" style={{ background: "#fff", padding: "96px 0" }}>
      <div className="process-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-.025em", margin: "0 0 12px", color: "#161616" }}>
            오빗웍스 도입은 이렇게 진행됩니다
          </h2>
          <p style={{ fontSize: 18, color: "#565A61", margin: 0 }}>빠르면 1~2주 내 정식 운영이 가능합니다</p>
        </div>

        <div className="process-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
          {/* Connecting line */}
          <div className="process-line" style={{ position: "absolute", top: 26, left: "10%", right: "10%", height: 2, background: "#E4E6E8" }} />

          {steps.map((step) => {
            const circleStyle: React.CSSProperties =
              step.style === "primary"
                ? { background: "#0AC3C4", color: "#fff", boxShadow: "0 4px 20px rgba(10,195,196,.3)" }
                : step.style === "dark"
                ? { background: "#161616", color: "#fff" }
                : { background: "#fff", border: "2px solid #CDD2D8", color: "#565A61" };

            const badgeStyle: React.CSSProperties =
              step.style === "primary"
                ? { background: "#E0F7F7", color: "#07898A" }
                : step.style === "dark"
                ? { background: "#161616", color: "#fff" }
                : { background: "#F2F3F4", color: "#71767D" };

            return (
              <div key={step.no} style={{ position: "relative", textAlign: "center" }}>
                <span style={{ position: "relative", zIndex: 1, width: 54, height: 54, borderRadius: "50%", fontSize: 18, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", ...circleStyle }}>
                  {step.no}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: "18px 0 6px", color: "#161616" }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#71767D", margin: "0 0 10px", lineHeight: 1.5 }}>{step.desc}</p>
                <span style={{ display: "inline-block", padding: "4px 11px", borderRadius: 1000, fontSize: 13, fontWeight: 700, ...badgeStyle }}>
                  {step.period}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
