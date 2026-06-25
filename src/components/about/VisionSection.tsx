import Image from "next/image";

const visionCards = [
  {
    img: "/vision1.jpg",
    title: "안전한 관리",
    desc: "믿을 수 있는 현장 관리 솔루션으로 업무의 안정성을 보장합니다.",
  },
  {
    img: "/vision2.jpg",
    title: "효율성 극대화",
    desc: "자동화된 시스템으로 시간과 비용을 절감합니다.",
  },
  {
    img: "/vision3.jpg",
    title: "고객 중심의 서비스",
    desc: "현장 맞춤형 솔루션으로 고객의 요구에 부합합니다.",
  },
];

export default function VisionSection() {
  return (
    <section id="vision" style={{ background: "#161616", padding: "104px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ display: "inline-block", fontSize: 15, fontWeight: 800, color: "#4FE0E0", letterSpacing: ".08em", marginBottom: 14 }}>비전</span>
          <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-.03em", margin: "0 0 16px", color: "#fff" }}>
            현장 용역 관리의 새로운 기준을 세우다
          </h2>
          <p style={{ fontSize: 18, color: "#9DA3AB", margin: "0 auto", maxWidth: 720, lineHeight: 1.6 }}>
            가디언링크는 경비와 미화 업무의 어려움을 해결하고, 혁신적인 기술로 고객의 업무 부담을 줄이는 데 최선을 다하고 있습니다.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {visionCards.map((card) => (
            <div key={card.title} style={{ borderRadius: 24, overflow: "hidden", background: "#1F2123", border: "1px solid #2A2D30" }}>
              <div style={{ position: "relative", width: "100%", height: 220 }}>
                <Image src={card.img} alt={card.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 420px" />
              </div>
              <div style={{ padding: 32 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px", color: "#fff" }}>{card.title}</h3>
                <p style={{ fontSize: 16, color: "#9DA3AB", margin: 0, lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
