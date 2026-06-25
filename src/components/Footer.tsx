import Image from "next/image";

type FooterVariant = "landing" | "about";

export default function Footer({ variant = "landing" }: { variant?: FooterVariant }) {
  const isAbout = variant === "about";

  return (
    <footer style={{ background: "#0AC3C4", padding: "48px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "flex-start", gap: 72, flexWrap: "wrap" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0, paddingTop: 4 }}>
          <Image src="/guardianlink-logo-white.png" alt="Guardianlink" width={160} height={30} style={{ height: 30, width: "auto", display: "block" }} />
        </div>

        {/* Info */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
            <a href="https://app.gitbook.com/o/m9zavSZx81uyDempcgd3/s/oPJ18VBH94vIKTCALOAJ/undefined-3/undefined-1" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, color: "#fff", textDecoration: "none", fontWeight: 700 }}>개인정보처리방침</a>
            <span style={{ width: 1, height: 13, background: "rgba(255,255,255,.45)" }} />
            <a href="https://app.gitbook.com/o/m9zavSZx81uyDempcgd3/s/oPJ18VBH94vIKTCALOAJ/undefined-3/undefined" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, color: "#fff", textDecoration: "none", fontWeight: 700 }}>이용약관</a>
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.9)", lineHeight: 1.95 }}>
            <p style={{ margin: 0 }}>주식회사 가디언링크 (Guardian Link Inc.)</p>
            <p style={{ margin: 0 }}>대표자 : 이부희 &nbsp;|&nbsp; 사업자등록번호 : 215-87-89699</p>
            {isAbout ? (
              <>
                <p style={{ margin: 0 }}>본사 : 서울특별시 관악구 양녕로1길 36, 1동 B1F Q7</p>
                <p style={{ margin: 0 }}>서울사무실 : 서울특별시 강남구 테헤란로 521, 에스타워 15층</p>
                <p style={{ margin: 0 }}>E-Mail : buhee@orbitworks.co.kr</p>
              </>
            ) : (
              <>
                <p style={{ margin: 0 }}>주소 : 서울특별시 관악구 양녕로1길 36, 1동 B1F Q7</p>
                <p style={{ margin: 0 }}>E-Mail : buhee@orbitworks.co.kr</p>
              </>
            )}
            <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,.7)" }}>© 2026 Guardian Link Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
