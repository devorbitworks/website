import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.orbitworks.co.kr"),
  title: "오빗웍스 — 경비·미화·시설 통합 관리 그룹웨어",
  description: "계약·단지·인사·문서까지, 현장에 꼭 필요한 기능만 담은 용역 통합 그룹웨어",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="4451c4836e778d1dd64bbc3473ad9e3b61039817" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body style={{ margin: 0, fontFamily: "'Pretendard',-apple-system,sans-serif", color: "#161616", background: "#fff", lineHeight: 1.5, WebkitFontSmoothing: "antialiased" } as React.CSSProperties}>
        {children}
      </body>
    </html>
  );
}
