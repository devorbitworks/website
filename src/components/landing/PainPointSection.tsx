"use client";
import { useState } from "react";

const tabs = ["본사 관리자", "현장 관리자", "현장 근로자"] as const;
type Tab = typeof tabs[number];

const painData: Record<Tab, string[]> = {
  "본사 관리자": [
    "수십 곳 단지 현황을 매번 엑셀·전화로만 파악",
    "배치·폐지 신고 기한(7일)을 놓쳐 과태료 발생 우려",
    "계약 만료 시점을 개별 캘린더에 수기로 입력·관리",
    "보고서 취합에 매주 4~5시간 소요",
  ],
  "현장 관리자": [
    "인원 변경 시 본사에 구두·문자로만 공유",
    "안전점검 항목을 종이 체크리스트로 처리",
    "근로자 출근 여부를 매번 전화로 확인",
    "순찰 기록을 수기 일지로 작성 후 팩스·사진 전송",
  ],
  "현장 근로자": [
    "출퇴근 확인 방법이 단지마다 제각각",
    "안전교육·안전조항 내용을 확인할 수단이 없음",
    "휴일·교대 요청을 감독자에게 구두로만 전달",
    "근로계약 내용을 서면으로만 보관",
  ],
};

function tabStyle(active: boolean): React.CSSProperties {
  return {
    padding: "11px 28px",
    border: "none",
    cursor: "pointer",
    borderRadius: 1000,
    fontSize: 16,
    fontFamily: "inherit",
    fontWeight: active ? 700 : 500,
    transition: "all .18s ease",
    background: active ? "#0AC3C4" : "transparent",
    color: active ? "#FFFFFF" : "#565A61",
  };
}

export default function PainPointSection() {
  const [activeTab, setActiveTab] = useState<Tab>("본사 관리자");
  const cards = painData[activeTab];

  return (
    <section className="pain-section" style={{ background: "#FAFAFA", padding: "96px 0" }}>
      <div className="pain-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 className="pain-h2" style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-.025em", margin: "0 0 12px", color: "#161616" }}>
            이런 어려움, 매일 반복되고 있지 않으신가요?
          </h2>
          <p className="pain-sub" style={{ fontSize: 18, color: "#565A61", margin: 0 }}>
            경비·미화·시설 용역 현장의 고질적인 관리 비효율
          </p>
        </div>

        {/* Tab pills */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div className="pain-tabs-wrap" style={{ display: "flex", gap: 4, background: "#fff", border: "1px solid #E4E6E8", borderRadius: 1000, padding: 5 }}>
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(activeTab === tab)}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4-column cards */}
        <div className="pain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {cards.map((text, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #E4E6E8", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16, minHeight: 184, boxShadow: "0 2px 4px rgba(22,22,22,.04)" }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#0AC3C4", letterSpacing: ".04em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontSize: 17, lineHeight: 1.55, fontWeight: 600, color: "#292B2D", margin: 0 }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
