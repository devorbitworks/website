"use client";
import { useState } from "react";
import Image from "next/image";

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

const featData = [
  {
    badge: "제공중", badgeBg: "#E0F7F7", badgeColor: "#07898A",
    cards: [
      { t: "계약관리", d: "계약 등록부터 이력 관리, 만료 알림까지 한 곳에서" },
      { t: "단지관리", d: "배치·폐지 신고와 단지별 자산 관리" },
      { t: "문서관리", d: "계약서·청구서 등 문서 통합 보관" },
      { t: "인사관리", d: "근로자 등록과 현장 배치 관리" },
    ],
  },
  {
    badge: "26.08 예정", badgeBg: "#F2F3F4", badgeColor: "#71767D",
    cards: [
      { t: "근태관리", d: "NFC·QR 기반 출퇴근 기록" },
      { t: "순찰관리", d: "NFC 태깅으로 순찰 이력 자동 기록" },
      { t: "영업·안전관리", d: "방문 현황 관리와 현장 안전점검" },
    ],
  },
];

export default function FeaturesSection() {
  const [featTab, setFeatTab] = useState(0);
  const fd = featData[featTab];

  return (
    <section id="features" className="feat-section" style={{ background: "#FAFAFA", padding: "96px 0" }}>
      <div className="feat-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-.025em", margin: 0, color: "#161616" }}>
            핵심 기능 구조
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 4, background: "#fff", border: "1px solid #E4E6E8", borderRadius: 1000, padding: 5 }}>
            <button onClick={() => setFeatTab(0)} style={tabStyle(featTab === 0)}>본사 WEB</button>
            <button onClick={() => setFeatTab(1)} style={tabStyle(featTab === 1)}>현장 APP</button>
          </div>
        </div>

        {/* Cards: 4 columns */}
        <div className="feat-cards" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {fd.cards.map((f) => (
            <div key={f.t} style={{ background: "#fff", border: "1px solid #E4E6E8", borderRadius: 16, padding: "28px 24px", boxShadow: "0 2px 4px rgba(22,22,22,.04)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: "#E0F7F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ width: 18, height: 18, borderRadius: 6, background: "#0AC3C4" }} />
                </span>
                <span style={{ padding: "5px 11px", borderRadius: 1000, fontSize: 12, fontWeight: 800, background: fd.badgeBg, color: fd.badgeColor }}>
                  {fd.badge}
                </span>
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, margin: "0 0 8px", color: "#161616" }}>{f.t}</h3>
              <p style={{ fontSize: 15, color: "#71767D", margin: 0, lineHeight: 1.55 }}>{f.d}</p>
            </div>
          ))}
        </div>

        {/* Real screens */}
        <div className="feat-screens" style={{ marginTop: 52, display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 32, alignItems: "start" }}>
          {/* Browser: 계약관리 */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ padding: "4px 11px", borderRadius: 1000, background: "#E0F7F7", color: "#07898A", fontSize: 12, fontWeight: 800 }}>본사 WEB</span>
              <span style={{ fontSize: 15, color: "#565A61", fontWeight: 600 }}>계약 관리 — 단지별 계약 상태·만료일·인원을 한눈에</span>
            </div>
            <div style={{ border: "1px solid #E4E6E8", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 20px rgba(22,22,22,.15)", background: "#fff" }}>
              <div style={{ height: 36, background: "#FAFAFA", borderBottom: "1px solid #F2F3F4", display: "flex", alignItems: "center", gap: 7, padding: "0 14px" }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F57" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FEBC2E" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28C840" }} />
                <span style={{ marginLeft: 10, fontSize: 11, color: "#9DA3AB", fontWeight: 600 }}>orbitworks · 계약 관리</span>
              </div>
              <Image src="/screen-contract.jpg" alt="오빗웍스 계약 관리 화면" width={800} height={500} style={{ width: "100%", display: "block" }} />
            </div>
          </div>

          {/* Phone: 근무조회 */}
          <div className="feat-phone">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ padding: "4px 11px", borderRadius: 1000, background: "#F2F3F4", color: "#71767D", fontSize: 12, fontWeight: 800 }}>현장 APP</span>
              <span style={{ fontSize: 15, color: "#565A61", fontWeight: 600 }}>근무 조회</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 248, background: "#161616", borderRadius: 32, padding: 8, boxShadow: "0 4px 20px rgba(22,22,22,.28)" }}>
                <div style={{ background: "#fff", borderRadius: 25, overflow: "hidden" }}>
                  <Image src="/screen-attendance.jpg" alt="오빗웍스 근무조회 앱 화면" width={248} height={500} style={{ width: "100%", display: "block" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
