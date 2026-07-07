"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type GNBVariant = "landing" | "about";

export default function GNB({ variant = "landing" }: { variant?: GNBVariant }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLanding = variant === "landing";

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: isLanding ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid #E4E6E8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href={isLanding ? "/#top" : "/about#top"} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src={isLanding ? "/orbitworks-logo.png" : "/guardianlink-logo.png"}
            alt={isLanding ? "orbitworks" : "Guardianlink"}
            width={200}
            height={isLanding ? 24 : 30}
            style={{ height: isLanding ? 24 : 30, width: "auto", display: "block" }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex" style={{ alignItems: "center", gap: isLanding ? 36 : 32 }}>
          {isLanding ? (
            <>
              <Link href="/about" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>회사소개</Link>
              <Link href="#features" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>기능소개</Link>
              <Link href="#effects" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>도입효과</Link>
              <Link href="#cases" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>도입사례</Link>
              <Link href="#contact" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>도입문의</Link>
              <Link href="/updates" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>업데이트</Link>
            </>
          ) : (
            <>
              <Link href="/about#top" style={{ fontSize: 16, fontWeight: 700, color: "#0AC3C4", textDecoration: "none" }}>회사소개</Link>
              <Link href="/#features" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>기능소개</Link>
              <Link href="/#effects" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>도입효과</Link>
              <Link href="/#cases" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>도입사례</Link>
              <Link href="/#contact" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>도입문의</Link>
              <Link href="/updates" style={{ fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none" }}>업데이트</Link>
            </>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: 10 }}>
          {isLanding && (
            <a href="#contact" style={{ padding: "10px 18px", borderRadius: 8, border: "1px solid #CDD2D8", background: "#fff", color: "#404347", fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "inherit" }}>
              소개서 다운로드
            </a>
          )}
          <a href={isLanding ? "#contact" : "/#contact"} style={{ padding: "10px 20px", borderRadius: 8, background: "#0AC3C4", color: "#fff", fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 2px 4px rgba(22,22,22,.15)", fontFamily: "inherit" }}>
            {isLanding ? "상담 신청" : "도입 상담 신청"}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(v => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
          aria-label="메뉴"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {mobileOpen
              ? <path d="M6 6l12 12M6 18L18 6" stroke="#404347" strokeWidth="2" strokeLinecap="round" />
              : <path d="M4 6h16M4 12h16M4 18h16" stroke="#404347" strokeWidth="2" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "#fff", borderBottom: "1px solid #E4E6E8", padding: "16px 32px 24px" }} className="lg:hidden">
          {isLanding ? (
            <>
              {[["회사소개", "/about"], ["기능소개", "#features"], ["도입효과", "#effects"], ["도입사례", "#cases"], ["도입문의", "#contact"]].map(([label, href]) => (
                <Link key={label} href={href} style={{ display: "block", fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none", padding: "12px 0", borderBottom: "1px solid #F2F3F4" }} onClick={() => setMobileOpen(false)}>{label}</Link>
              ))}
            </>
          ) : (
            <>
              {[["회사소개", "/about#top"], ["기능소개", "/#features"], ["도입효과", "/#effects"], ["도입사례", "/#cases"], ["도입문의", "/#contact"]].map(([label, href]) => (
                <Link key={label} href={href} style={{ display: "block", fontSize: 16, fontWeight: 600, color: "#404347", textDecoration: "none", padding: "12px 0", borderBottom: "1px solid #F2F3F4" }} onClick={() => setMobileOpen(false)}>{label}</Link>
              ))}
            </>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            {isLanding && <a href="#contact" style={{ padding: "12px 18px", borderRadius: 8, border: "1px solid #CDD2D8", background: "#fff", color: "#404347", fontSize: 15, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>소개서 다운로드</a>}
            <a href={isLanding ? "#contact" : "/#contact"} style={{ padding: "12px 20px", borderRadius: 8, background: "#0AC3C4", color: "#fff", fontSize: 15, fontWeight: 700, textDecoration: "none", textAlign: "center" }} onClick={() => setMobileOpen(false)}>
              {isLanding ? "상담 신청" : "도입 상담 신청"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
