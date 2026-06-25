export default function CaseSection() {
  return (
    <section id="cases" style={{ background: "#FAFAFA", padding: "96px 0" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-.025em", margin: 0, color: "#161616" }}>
            현재 도입 고객사
          </h2>
        </div>

        <div style={{ background: "#fff", border: "1px solid #E4E6E8", borderRadius: 16, padding: 44, boxShadow: "0 4px 20px rgba(22,22,22,.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
            <span style={{ width: 56, height: 56, borderRadius: 14, background: "#E0F7F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#07898A", flexShrink: 0 }}>
              EMP
            </span>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "#161616" }}>(주)이엠피 서비스</h3>
              <p style={{ margin: "2px 0 0", fontSize: 15, color: "#71767D" }}>경비·시설 용역</p>
            </div>
            <div style={{ display: "flex", gap: 8, marginLeft: "auto", flexWrap: "wrap" }}>
              {["계약관리", "단지관리", "문서관리"].map((b) => (
                <span key={b} style={{ padding: "6px 13px", borderRadius: 1000, background: "#F2F3F4", color: "#565A61", fontSize: 13, fontWeight: 700 }}>{b}</span>
              ))}
            </div>
          </div>

          <blockquote style={{ margin: 0, padding: "24px 0 0", borderTop: "1px solid #F2F3F4" }}>
            <p style={{ fontSize: 21, lineHeight: 1.65, fontWeight: 600, color: "#292B2D", margin: "0 0 18px", letterSpacing: "-.01em" }}>
              "오빗웍스는 현재 일부 기능만 사용 중임에도 실무자와 관리자 모두가 편리하다는 반응입니다. 기능이 추가되고 완성도가 높아질수록 가장 실용적인 솔루션이 될 것으로 기대합니다."
            </p>
            <footer style={{ fontSize: 15, color: "#71767D", fontWeight: 600 }}>
              (주)이엠피 서비스 전략팀
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
