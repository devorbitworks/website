import type { Metadata } from "next";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import HeroSection from "@/components/landing/HeroSection";
import PainPointSection from "@/components/landing/PainPointSection";
import WhySection from "@/components/landing/WhySection";
import ComplianceSection from "@/components/landing/ComplianceSection";
import BeforeAfterSection from "@/components/landing/BeforeAfterSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ROISection from "@/components/landing/ROISection";
import CaseSection from "@/components/landing/CaseSection";
import ProcessSection from "@/components/landing/ProcessSection";
import CTASection from "@/components/landing/CTASection";

export const metadata: Metadata = {
  title: "경비용역 관리 프로그램 오빗웍스 | 근태·순찰·계약 통합 그룹웨어",
  description:
    "오빗웍스는 경비·미화·시설 용역업체를 위한 통합 관리 그룹웨어입니다. 계약·단지·인사·문서관리부터 근태, 순찰, 안전관리까지 하나의 시스템에서 처리합니다. 엑셀과 수기 일지를 대체하세요.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "오빗웍스",
    title: "경비용역 관리 프로그램 오빗웍스",
    description: "경비·미화·시설 용역업체를 위한 통합 관리 그룹웨어. 계약·인사·근태·순찰을 한 곳에서.",
    url: "/",
    images: ["/orbitworks-logo.png"],
  },
};

export default function LandingPage() {
  return (
    <>
      <OrganizationJsonLd />
      <GNB variant="landing" />
      <main>
        <HeroSection />
        <PainPointSection />
        <WhySection />
        <ComplianceSection />
        <BeforeAfterSection />
        <FeaturesSection />
        <ROISection />
        <CaseSection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer variant="landing" />
    </>
  );
}
