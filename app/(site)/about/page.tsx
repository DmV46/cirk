import type { Metadata } from "next";
import { AboutStudio } from "@/widgets/about-studio/ui/AboutStudio";
import { Principles } from "@/widgets/principles/ui/Principles";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "Об объединённой цирковой студии в г. Московский: история, подход к обучению и успехи воспитанников. Адрес: 3 мкр, 3Б.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      <AboutStudio />
      <Principles />
    </div>
  );
}
