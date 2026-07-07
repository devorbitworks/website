import Image from "next/image";

export default function FooterAbout() {
  return (
    <footer style={{ background: "#0AC3C4", padding: "52px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Top row: logo + links */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>
          <Image src="/guardianlink-logo-white.png" alt="Guardianlink" width={160} height={30} style={{ height: 30, width: "auto", display: "block" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="https://orbitworks.gitbook.io/orbitworks-docs/undefined-3/undefined-1" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, color: "#fff", fontWeight: 700, textDecoration: "none" }}>개인정보수집방침</a>
            <span style={{ width: 1, height: 13, background: "rgba(255,255,255,.45)" }} />
            <a href="https://orbitworks.gitbook.io/orbitworks-docs/undefined-3/undefined" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, color: "#fff", fontWeight: 700, textDecoration: "none" }}>이용약관</a>
          </div>
        </div>

        {/* Company info */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.3)", paddingTop: 24, fontSize: 14, color: "rgba(255,255,255,.92)", lineHeight: 1.95 }}>
          <p style={{ margin: 0 }}>주식회사 가디언링크　대표: 이부희　사업자등록번호: 441-81-03721</p>
          <p style={{ margin: 0 }}>본사 주소: 서울특별시 관악구 양녕로1길 36, 1동 B1F Q7</p>
          <p style={{ margin: 0 }}>E-Mail: buhee@orbitworks.co.kr</p>
          <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,.7)" }}>© 2026 Guardian Link Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
