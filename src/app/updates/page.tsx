import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import Image from "next/image";
import { updates, UpdateTag, UpdateItem } from "@/data/updates";

function renderItem(item: UpdateItem, j: number) {
  if (typeof item === "string") {
    return (
      <li key={j} style={{ fontSize: 15, color: "#404347", lineHeight: 1.65 }}>{item}</li>
    );
  }
  if (item.type === "link") {
    return (
      <li key={j} style={{ fontSize: 15, lineHeight: 1.65, listStyle: "none", marginLeft: -18 }}>
        <a href={item.url} target="_blank" rel="noopener noreferrer"
          style={{ color: "#0AC3C4", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}>
          {item.label} →
        </a>
      </li>
    );
  }
  if (item.type === "image") {
    return (
      <li key={j} style={{ listStyle: "none", marginLeft: -18, marginTop: 8 }}>
        <div style={{ position: "relative", width: "100%", borderRadius: 12, overflow: "hidden", border: "1px solid #E4E6E8" }}>
          <Image src={item.src} alt={item.alt ?? ""} width={720} height={400} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </li>
    );
  }
}

const tagStyle: Record<UpdateTag, { bg: string; color: string }> = {
  "기능 추가": { bg: "#E0F7F7", color: "#07898A" },
  "개선":     { bg: "#EEF2FF", color: "#4F46E5" },
  "버그 수정": { bg: "#FFF4F2", color: "#B23B22" },
  "공지":     { bg: "#F2F3F4", color: "#565A61" },
};

export default function UpdatesPage() {
  return (
    <>
      <GNB variant="landing" />
      <main style={{ background: "#FAFAFA", minHeight: "100vh", padding: "80px 0 120px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px" }}>
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <span style={{ display: "inline-block", fontSize: 13, fontWeight: 700, color: "#0AC3C4", letterSpacing: ".08em", marginBottom: 12 }}>
              RELEASE NOTES
            </span>
            <h1 style={{ fontSize: "clamp(28px, 6vw, 40px)", fontWeight: 800, letterSpacing: "-.03em", margin: "0 0 12px", color: "#161616" }}>
              업데이트 노트
            </h1>
            <p style={{ fontSize: 16, color: "#565A61", margin: 0, lineHeight: 1.6 }}>
              오빗웍스의 새로운 기능과 개선사항을 확인하세요.
            </p>
          </div>

          {/* Entries */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {updates.map((entry, i) => (
              <div key={i} style={{ display: "flex", gap: 16, paddingBottom: 40 }}>
                {/* Timeline dot + line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: i === 0 ? "#0AC3C4" : "#CDD2D8", flexShrink: 0 }} />
                  {i < updates.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: "#E4E6E8", marginTop: 8 }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: 8 }}>
                  {/* Meta: date + version + tag */}
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: "#9DA3AB", fontWeight: 500 }}>{entry.date}</span>
                    <span style={{ fontSize: 12, color: "#CDD2D8", fontWeight: 600 }}>{entry.version}</span>
                    <span style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      borderRadius: 1000,
                      fontSize: 12,
                      fontWeight: 700,
                      background: tagStyle[entry.tag].bg,
                      color: tagStyle[entry.tag].color,
                    }}>
                      {entry.tag}
                    </span>
                  </div>

                  <h2 style={{ fontSize: "clamp(17px, 4vw, 20px)", fontWeight: 800, color: "#161616", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                    {entry.title}
                  </h2>
                  <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {entry.items.map((item, j) => renderItem(item, j))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer variant="landing" />
    </>
  );
}
