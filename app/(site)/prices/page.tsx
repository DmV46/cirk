import type { Metadata } from "next";
import { PricesSection } from "@/widgets/prices/ui/PricesSection";

export const metadata: Metadata = {
  title: "Цены",
  description:
    "Стоимость занятий в объединённой цирковой студии в г. Московский. Основная и подготовительная группы, первое пробное занятие бесплатно.",
  alternates: {
    canonical: "/prices",
  },
};

export default function PricesPage() {
  return (
    <div>
      <PricesSection />
    </div>
  );
}
