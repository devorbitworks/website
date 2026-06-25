"use client";
import { useState } from "react";

function fmt(man: number): string {
  const eok = Math.floor(man / 10000);
  const rest = man % 10000;
  if (eok > 0) return rest > 0 ? `${eok}억 ${rest.toLocaleString()}만원` : `${eok}억원`;
  return `${man.toLocaleString()}만원`;
}

const AVG_SALARY = 300;
const SAVINGS_RATE = 0.5;
const MAX_PEOPLE = 10;

export default function ROISection() {
  const [people, setPeople] = useState(3);

  const beforeMan = people * AVG_SALARY * 12;
  const saveMan = Math.round(beforeMan * SAVINGS_RATE);

  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-.025em", margin: "0 0 12px", color: "#161616" }}>
            도입 시 비용 절감 효과
          </h2>
          <p style={{ fontSize: 18, color: "#565A61", margin: 0 }}>
            관리인력 수를 입력해 예상 절감액을 확인하세요
          </p>
        </div>

        <div style={{ background: "#FAFAFA", border: "1px solid #E4E6E8", borderRadius: 16, padding: 40 }}>
          {/* Slider header */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#404347" }}>관리인력 수</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#0AC3C4" }}>
              {people}<span style={{ fontSize: 18, color: "#565A61", fontWeight: 700 }}> 명</span>
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={MAX_PEOPLE}
            value={people}
            onInput={(e) => setPeople(Number((e.target as HTMLInputElement).value))}
            style={{ width: "100%", height: 6, cursor: "pointer", marginBottom: 32, accentColor: "#0AC3C4" }}
          />

          {/* Result cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "#fff", border: "1px solid #E4E6E8", borderRadius: 12, padding: 26 }}>
              <p style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: "#71767D" }}>도입 전 연 인건비</p>
              <p style={{ margin: 0, fontSize: 34, fontWeight: 800, color: "#565A61", letterSpacing: "-.02em" }}>{fmt(beforeMan)}</p>
            </div>
            <div style={{ background: "#878D92", borderRadius: 12, padding: 26, boxShadow: "0 4px 20px rgba(22,22,22,.18)" }}>
              <p style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: "#4FE0E0" }}>연간 절감 효과</p>
              <p style={{ margin: 0, fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: "-.02em" }}>{fmt(saveMan)}</p>
            </div>
          </div>

          <p style={{ margin: "20px 0 0", fontSize: 13, color: "#9DA3AB", lineHeight: 1.6 }}>
            ※ 월 평균급여 {AVG_SALARY}만원, 관리인력 {Math.round(SAVINGS_RATE * 100)}% 감소 기준 시뮬레이션. 실제 절감 효과는 운영방식에 따라 달라질 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
