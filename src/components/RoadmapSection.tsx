"use client";

import { useEffect, useState } from "react";

type Status = "done" | "active" | "upcoming";

interface Milestone {
  period: string;
  status: Status;
  title: string;
  desc: string;
}

const milestones: Milestone[] = [
  {
    period: "2026 Q1",
    status: "done",
    title: "서비스 런칭",
    desc: "2026년 3월, 오빗웍스 베타 서비스를 오픈하고 첫 현장에 적용했습니다.",
  },
  {
    period: "2026 Q2",
    status: "done",
    title: "서류·자산 관리 기능 구축",
    desc: "베타 운영 현장의 의견을 반영해, 각종 서류·문서·자산을 관리할 수 있는 핵심 기능을 구축했습니다.",
  },
  {
    period: "2026 Q3",
    status: "active",
    title: "순찰·근태 기능 개발",
    desc: "2026년 8월, 현장 순찰과 근태 관리 기능 완료를 목표로 개발을 진행하고 있습니다.",
  },
  {
    period: "2026 Q4",
    status: "upcoming",
    title: "전자결재 도입",
    desc: "결재 라인 기반의 전자결재 기능을 완료할 예정입니다.",
  },
  {
    period: "2027",
    status: "upcoming",
    title: "서비스 확장",
    desc: "신규 고객사 확대와 추가 기능 출시를 준비합니다.",
  },
];

const activeIndex = milestones.findIndex((m) => m.status === "active");

const statusLabel: Record<Status, string> = {
  done: "완료",
  active: "진행 중",
  upcoming: "예정",
};

const statusColor: Record<Status, string> = {
  done: "#9DA3AB",
  active: "#0AC3C4",
  upcoming: "#C4C8CD",
};

export default function RoadmapSection() {
  const [spotlight, setSpotlight] = useState(activeIndex === -1 ? 0 : activeIndex);

  useEffect(() => {
    const id = setInterval(() => {
      setSpotlight((i) => (i + 1) % milestones.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="roadmap" className="roadmap-section" style={{ background: "#F7F6F3", padding: "104px 0" }}>
      <div className="roadmap-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div className="roadmap-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,440px) 1fr", gap: 64, alignItems: "start" }}>
          {/* Left */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: "#9DA3AB" }} />
              <span style={{ fontSize: 15, fontWeight: 800, color: "#565A61", letterSpacing: ".04em" }}>로드맵</span>
            </div>
            <h2 className="roadmap-h2" style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.15, margin: "0 0 24px", color: "#161616" }}>
              하나씩,
              <br />
              단단하게.
            </h2>
            <p style={{ fontSize: 17, color: "#565A61", lineHeight: 1.7, margin: "0 0 48px", maxWidth: 440 }}>
              가디언링크는 무리한 약속 대신, 분기별 단계로 해낸 것과 다음에 할 일을 투명하게 보여드립니다.
            </p>

            <div className="roadmap-stats" style={{ display: "flex", gap: 40 }}>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 700, color: "#161616" }}>5</div>
                <div style={{ fontSize: 14, color: "#9DA3AB", marginTop: 6 }}>분기별 단계</div>
              </div>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 700, color: "#161616" }}>Q3</div>
                <div style={{ fontSize: 14, color: "#9DA3AB", marginTop: 6 }}>진행 단계</div>
              </div>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 700, color: "#161616" }}>2027</div>
                <div style={{ fontSize: 14, color: "#9DA3AB", marginTop: 6 }}>서비스 확장</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="roadmap-card" style={{ background: "#fff", border: "1px solid #E5E2DC", borderRadius: 24, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: "1px solid #EFEDE8" }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#161616" }}>진행 현황</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "#0AC3C4" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0AC3C4", animation: "gl-pulse 1.8s ease-in-out infinite" }} />
                자동 갱신
              </span>
            </div>

            <div style={{ position: "relative", padding: "8px 0" }}>
              <div style={{ position: "absolute", left: 33, top: 8, bottom: 8, width: 2, background: "#EFEDE8" }} />
              {milestones.map((m, i) => (
                <div
                  key={m.period}
                  className="roadmap-item"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 20,
                    padding: "18px 28px",
                    background: i === spotlight ? "rgba(10,195,196,0.08)" : "transparent",
                    transition: "background-color .5s cubic-bezier(.4,0,.2,1)",
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      flexShrink: 0,
                      width: 12,
                      height: 12,
                      marginTop: 5,
                      borderRadius: "50%",
                      background: m.status === "upcoming" ? "#fff" : statusColor[m.status],
                      border: m.status === "upcoming" ? "2px solid #C4C8CD" : "none",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#9DA3AB", letterSpacing: ".02em" }}>{m.period}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: statusColor[m.status] }}>{statusLabel[m.status]}</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#161616", margin: "6px 0 4px" }}>{m.title}</h3>
                    <p style={{ fontSize: 14.5, color: "#565A61", lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
