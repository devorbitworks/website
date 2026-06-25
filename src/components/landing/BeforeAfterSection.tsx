import Image from "next/image";

const rows = [
  { label: "현황 파악", before: "담당자별 개별 연락", after: "대시보드 실시간 조회" },
  { label: "계약 관리", before: "엑셀 확인·수기 알림", after: "만료 D-90 자동 표기·알림" },
  { label: "배치/폐지 신고", before: "수기 경찰서 신고", after: "배정 즉시 전산 신고" },
  { label: "순찰 확인", before: "전화로 사후 확인", after: "NFC 태깅 자동 기록" },
  { label: "인력 배치", before: "구두·문자 공지", after: "시스템 배치·이력 보존" },
  { label: "보고서 취합", before: "수작업 취합 (주 2~3h)", after: "단지별 자동 집계·출력" },
];

export default function BeforeAfterSection() {
  return (
    <section id="effects" style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-.025em", margin: 0, color: "#161616" }}>
            오빗웍스 도입 전 vs 도입 후
          </h2>
        </div>

        <div style={{ border: "1px solid #E4E6E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(22,22,22,.06)" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr 1.4fr", background: "#161616" }}>
            <div style={{ padding: "18px 24px", fontSize: 15, fontWeight: 700, color: "#9DA3AB" }}>구분</div>
            <div style={{ padding: "18px 24px", fontSize: 15, fontWeight: 700, color: "#CDD2D8" }}>도입 전</div>
            <div style={{ padding: "18px 24px", fontSize: 15, fontWeight: 800, color: "#4FE0E0" }}>도입 후</div>
          </div>
          {rows.map((row, i) => (
            <div key={row.label} style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr 1.4fr", borderBottom: i < rows.length - 1 ? "1px solid #F2F3F4" : undefined }}>
              <div style={{ padding: "20px 24px", fontSize: 16, fontWeight: 700, color: "#161616", background: "#FAFAFA" }}>{row.label}</div>
              <div style={{ padding: "20px 24px", fontSize: 16, color: "#71767D" }}>{row.before}</div>
              <div style={{ padding: "20px 24px", fontSize: 16, fontWeight: 600, color: "#161616" }}>{row.after}</div>
            </div>
          ))}
        </div>

        {/* Real screen */}
        <div style={{ marginTop: 52 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ padding: "5px 12px", borderRadius: 1000, background: "#E0F7F7", color: "#07898A", fontSize: 13, fontWeight: 800 }}>실제 화면</span>
            <span style={{ fontSize: 16, color: "#565A61", fontWeight: 600 }}>교대·격일제 근무까지 — 단지별 출근부가 자동으로 집계됩니다</span>
          </div>
          <div style={{ border: "1px solid #E4E6E8", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 20px rgba(22,22,22,.15)", background: "#fff" }}>
            <div style={{ height: 36, background: "#FAFAFA", borderBottom: "1px solid #F2F3F4", display: "flex", alignItems: "center", gap: 7, padding: "0 14px" }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F57" }} />
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FEBC2E" }} />
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28C840" }} />
              <span style={{ marginLeft: 10, fontSize: 11, color: "#9DA3AB", fontWeight: 600 }}>orbitworks · 현장운영관리 · 출근부</span>
            </div>
            <Image src="/screen-roster.png" alt="오빗웍스 출근부 화면" width={1080} height={500} style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
