import type { Metadata } from "next";
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
import { JsonLd } from "@/shared/ui/json-ld/JsonLd";
import { getFaqPageJsonLd } from "@/shared/lib/structuredData";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <HomePageShell>
      <JsonLd data={getFaqPageJsonLd()} />
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
