import GNB from "@/components/GNB";
import FooterAbout from "@/components/FooterAbout";
import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import VisionSection from "@/components/about/VisionSection";
import ValuesSection from "@/components/about/ValuesSection";

export default function AboutPage() {
  return (
    <>
      <GNB variant="about" />
      <main>
        <AboutHero />
        <MissionSection />
        <VisionSection />
        <ValuesSection />
      </main>
      <FooterAbout />
    </>
  );
}
