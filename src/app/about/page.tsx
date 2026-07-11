import GNB from "@/components/GNB";
import FooterAbout from "@/components/FooterAbout";
import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import VisionSection from "@/components/about/VisionSection";
import ValuesSection from "@/components/about/ValuesSection";
import RoadmapSection from "@/components/RoadmapSection";

export default function AboutPage() {
  return (
    <>
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
