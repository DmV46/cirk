import type { Metadata } from "next";
import { PricesSection } from "@/widgets/prices/ui/PricesSection";

export const metadata: Metadata = {
  title: "Цены — Цирковая студия",
  description: "Стоимость занятий по цирковой гимнастике для детей",
};

export default function PricesPage() {
  return (
    <div>
      <PricesSection />
    </div>
  );
}
