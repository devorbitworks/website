import type { Metadata } from "next";
import GNB from "@/components/GNB";
import FooterAbout from "@/components/FooterAbout";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import VisionSection from "@/components/about/VisionSection";
import ValuesSection from "@/components/about/ValuesSection";
import RoadmapSection from "@/components/RoadmapSection";

export const metadata: Metadata = {
  title: "주식회사 가디언링크 | 경비용역 그룹웨어 오빗웍스 개발사",
  description:
    "주식회사 가디언링크는 경비·미화·시설관리 용역 현장의 디지털 전환을 위한 통합 그룹웨어 오빗웍스를 개발·운영하는 B2B SaaS 기업입니다.",
};

export default function AboutPage() {
  return (
    <>
      <OrganizationJsonLd />
      <GNB variant="about" />
      <main>
        <AboutHero />
        <MissionSection />
        <VisionSection />
        <ValuesSection />
        <RoadmapSection />
      </main>
      <FooterAbout />
    </>
  );
}
