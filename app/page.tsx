import { Hero } from "@/widgets/hero/ui/Hero";
import { Marquee } from "@/shared/ui/marquee/Marquee";
import { Directions } from "@/widgets/directions/ui/Directions";
import { Principles } from "@/widgets/principles/ui/Principles";
import { PricesSection } from "@/widgets/prices/ui/PricesSection";
import { AboutStudio } from "@/widgets/about-studio/ui/AboutStudio";
import { FaqSection } from "@/widgets/faq/ui/FaqSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <Marquee />
      <Directions />
      <Principles />
      <PricesSection />
      <AboutStudio />
      <FaqSection />
    </div>
  );
}