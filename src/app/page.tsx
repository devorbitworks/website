import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
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

export default function LandingPage() {
  return (
    <>
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
