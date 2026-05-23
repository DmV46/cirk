import type { Metadata } from "next";
import { FaqSection } from "@/widgets/faq/ui/FaqSection";

export const metadata: Metadata = {
  title: "FAQ — Цирковая студия",
  description: "Часто задаваемые вопросы о занятиях цирковой гимнастикой",
};

export default function FaqPage() {
  return (
    <div>
      <FaqSection />
    </div>
  );
}
