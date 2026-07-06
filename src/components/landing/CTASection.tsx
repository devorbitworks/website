"use client";
import { useState } from "react";

type ConsultType = "전화 상담" | "방문 상담" | "이메일";
type Status = "idle" | "loading" | "success" | "error";

export default function CTASection() {
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [units, setUnits] = useState("");
  const [consult, setConsult] = useState<ConsultType>("전화 상담");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const consultOptions: ConsultType[] = ["전화 상담", "방문 상담", "이메일"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, phone, units, consult }),
      });

      if (res.ok) {
        setStatus("success");
        setCompany("");
        setPhone("");
        setUnits("");
        setConsult("전화 상담");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "오류가 발생했습니다. 다시 시도해주세요.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="cta-section" style={{ background: "#E2E6E9", padding: "96px 0" }}>
      <div className="cta-grid" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }}>
        {/* Left */}
        <div>
          <h2 className="cta-h2" style={{ fontSize: 38, lineHeight: 1.32, fontWeight: 800, letterSpacing: "-.025em", color: "#161616", margin: "0 0 28px" }}>
            현장 용역 관리의<br />새로운 기준,<br />오빗웍스와 함께 시작하세요
          </h2>
          <div className="cta-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#contact" style={{ padding: "15px 26px", borderRadius: 8, background: "#0AC3C4", color: "#fff", fontSize: 17, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(10,195,196,.35)", fontFamily: "inherit" }}>
              도입 상담 신청 →
            </a>
            <a href="#contact" style={{ padding: "15px 26px", borderRadius: 8, border: "1px solid #CDD2D8", background: "#fff", color: "#404347", fontSize: 17, fontWeight: 600, textDecoration: "none", fontFamily: "inherit" }}>
              서비스 소개서 받기
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,.3)" }}>
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#E0F7F7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="#0AC3C4"/>
                  <path d="M7 12.5l3 3 6-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#161616", margin: "0 0 10px" }}>상담 신청이 완료되었습니다!</h3>
              <p style={{ fontSize: 15, color: "#71767D", margin: "0 0 24px", lineHeight: 1.6 }}>
                담당자가 1영업일 내로 연락드리겠습니다.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                style={{ padding: "10px 24px", borderRadius: 8, border: "1px solid #CDD2D8", background: "#fff", color: "#404347", fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}
              >
                다시 신청하기
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#404347", marginBottom: 7 }}>회사명</label>
                <input
                  type="text"
                  required
                  placeholder="회사명을 입력하세요"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{ width: "100%", padding: "13px 14px", border: "1px solid #CDD2D8", borderRadius: 8, fontSize: 15, fontFamily: "inherit", color: "#161616", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#404347", marginBottom: 7 }}>연락처</label>
                <input
                  type="text"
                  required
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: "100%", padding: "13px 14px", border: "1px solid #CDD2D8", borderRadius: 8, fontSize: 15, fontFamily: "inherit", color: "#161616", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#404347", marginBottom: 7 }}>
                  단지 수 <span style={{ color: "#9DA3AB", fontWeight: 500 }}>(선택)</span>
                </label>
                <input
                  type="text"
                  placeholder="관리 중인 단지 수"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  style={{ width: "100%", padding: "13px 14px", border: "1px solid #CDD2D8", borderRadius: 8, fontSize: 15, fontFamily: "inherit", color: "#161616", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#404347", marginBottom: 7 }}>상담 방식</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {consultOptions.map((opt) => {
                    const active = consult === opt;
                    return (
                      <span
                        key={opt}
                        onClick={() => setConsult(opt)}
                        style={{ flex: 1, textAlign: "center", padding: 12, border: `1px solid ${active ? "#0AC3C4" : "#CDD2D8"}`, background: active ? "#E0F7F7" : "#fff", color: active ? "#07898A" : "#565A61", borderRadius: 8, fontSize: 14, fontWeight: active ? 700 : 600, cursor: "pointer" }}
                      >
                        {opt}
                      </span>
                    );
                  })}
                </div>
              </div>

              {status === "error" && (
                <p style={{ margin: 0, fontSize: 13, color: "#B23B22", background: "#FFF4F2", border: "1px solid #FBD9D2", borderRadius: 8, padding: "10px 14px" }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                style={{ width: "100%", padding: 15, border: "none", borderRadius: 8, background: status === "loading" ? "#7FE1E1" : "#0AC3C4", color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "inherit", cursor: status === "loading" ? "not-allowed" : "pointer", marginTop: 4, boxShadow: "0 2px 4px rgba(22,22,22,.15)", transition: "background .15s" }}
              >
                {status === "loading" ? "발송 중…" : "상담 신청하기"}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
