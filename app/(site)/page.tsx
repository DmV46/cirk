import { Hero } from "@/widgets/hero/ui/Hero";
import { HomePageShell } from "@/widgets/home-page/ui/HomePageShell";
import { DirectionsMarquee } from "@/widgets/directions-marquee/ui/DirectionsMarquee";
import { TrialLessonCallout } from "@/widgets/trial-lesson-callout/ui/TrialLessonCallout";
import { Directions } from "@/widgets/directions/ui/Directions";
import { Principles } from "@/widgets/principles/ui/Principles";
import { PricesSection } from "@/widgets/prices/ui/PricesSection";
import { AboutStudio } from "@/widgets/about-studio/ui/AboutStudio";
import { TeamSection } from "@/widgets/team/ui/TeamSection";
import { SafetyNotice } from "@/widgets/safety-notice/ui/SafetyNotice";
import { FaqSection } from "@/widgets/faq/ui/FaqSection";

export default function Home() {
  return (
    <HomePageShell>
      <Hero />
      <DirectionsMarquee />
      <TrialLessonCallout />
      <Directions />
      <AboutStudio />
      <TeamSection />
      <PricesSection />
      <Principles />
      <SafetyNotice />
      <FaqSection />
    </HomePageShell>
  );
}
