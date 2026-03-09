import type { Metadata } from "next";
import { AboutStudio } from "@/widgets/about-studio/ui/AboutStudio";
import { Principles } from "@/widgets/principles/ui/Principles";

export const metadata: Metadata = {
  title: "О нас — Цирковая студия",
  description: "История нашей цирковой студии, тренеры и подход к обучению детей",
};

export default function AboutPage() {
  return (
    <div>
      <AboutStudio />
      <Principles />
    </div>
  );
}
