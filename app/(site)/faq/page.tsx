import type { Metadata } from "next";
import { FaqSection } from "@/widgets/faq/ui/FaqSection";
import { JsonLd } from "@/shared/ui/json-ld/JsonLd";
import { getFaqPageJsonLd } from "@/shared/lib/structuredData";

export const metadata: Metadata = {
  title: "Частые вопросы",
  description:
    "FAQ цирковой студии в г. Московский: с какого возраста принимать, что взять на занятие, нужна ли подготовка и можно ли родителям присутствовать.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <div>
      <JsonLd data={getFaqPageJsonLd()} />
      <FaqSection />
    </div>
  );
}
