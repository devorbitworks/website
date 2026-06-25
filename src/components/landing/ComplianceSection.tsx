import Image from "next/image";

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
    <circle cx="12" cy="12" r="11" fill="#0AC3C4"/>
    <path d="M7 12.5l3 3 6-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ComplianceSection() {
  return (
    <section style={{ background: "#FAFAFA", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-.025em", margin: 0, color: "#161616" }}>
            법규 위반 리스크, 시스템으로 자동 차단
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* 경비업법 */}
          <div style={{ background: "#fff", border: "1px solid #E4E6E8", borderRadius: 16, padding: 36, boxShadow: "0 2px 12px rgba(22,22,22,.06)" }}>
            <span style={{ display: "inline-block", fontSize: 13, fontWeight: 800, color: "#71767D", letterSpacing: ".04em", marginBottom: 6 }}>경비업법</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 18px", color: "#161616" }}>배치·폐지 신고 기한</h3>
            <div style={{ background: "#FFF4F2", border: "1px solid #FBD9D2", borderRadius: 12, padding: 16, marginBottom: 18 }}>
              <p style={{ margin: 0, fontSize: 15, color: "#B23B22", fontWeight: 700, lineHeight: 1.5 }}>
                7일 이내 미신고 시 최대 400만원 과태료
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <CheckIcon />
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 800, color: "#07898A" }}>오빗웍스 대응</p>
                <p style={{ margin: 0, fontSize: 16, color: "#404347", lineHeight: 1.55 }}>
                  근무지 배정 즉시 전산 신고, 인적사항 자동 기입
                </p>
              </div>
            </div>
          </div>

          {/* 중대재해처벌법 */}
          <div style={{ background: "#fff", border: "1px solid #E4E6E8", borderRadius: 16, padding: 36, boxShadow: "0 2px 12px rgba(22,22,22,.06)" }}>
            <span style={{ display: "inline-block", fontSize: 13, fontWeight: 800, color: "#71767D", letterSpacing: ".04em", marginBottom: 6 }}>중대재해처벌법</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 18px", color: "#161616" }}>현장 안전관리 체계 구축</h3>
            <div style={{ background: "#FFF4F2", border: "1px solid #FBD9D2", borderRadius: 12, padding: 16, marginBottom: 18 }}>
              <p style={{ margin: 0, fontSize: 15, color: "#B23B22", fontWeight: 700, lineHeight: 1.5 }}>
                미이행 시 징역 1년 이상, 벌금 최대 50억원
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <CheckIcon />
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 800, color: "#07898A" }}>오빗웍스 대응</p>
                <p style={{ margin: 0, fontSize: 16, color: "#404347", lineHeight: 1.55 }}>
                  업무별 안전조항 표준화, 점검 이력 자동 보존
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real screen */}
        <div style={{ marginTop: 52 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ padding: "5px 12px", borderRadius: 1000, background: "#E0F7F7", color: "#07898A", fontSize: 13, fontWeight: 800 }}>실제 화면</span>
            <span style={{ fontSize: 16, color: "#565A61", fontWeight: 600 }}>배치·폐지 신고를 전산으로 — 관할 경찰서·발송 상태까지 한 화면에서 관리</span>
          </div>
          <div style={{ border: "1px solid #E4E6E8", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 20px rgba(22,22,22,.15)", background: "#fff" }}>
            <div style={{ height: 36, background: "#FAFAFA", borderBottom: "1px solid #F2F3F4", display: "flex", alignItems: "center", gap: 7, padding: "0 14px" }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F57" }} />
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FEBC2E" }} />
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28C840" }} />
              <span style={{ marginLeft: 10, fontSize: 11, color: "#9DA3AB", fontWeight: 600 }}>orbitworks · 배치/폐지 관리</span>
            </div>
            <Image src="/screen-deploy.jpg" alt="오빗웍스 배치/폐지 관리 화면" width={1280} height={600} style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
