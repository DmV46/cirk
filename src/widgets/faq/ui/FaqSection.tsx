import { FaqAccordion } from "@/shared/ui/faq-accordion/FaqAccordion";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import { FAQ_ITEMS } from "@/widgets/faq/model/faqData";

export function FaqSection() {
  return (
    <section id="faq" className="page-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="ЧАСТЫЕ ВОПРОСЫ" />
          </h2>
        </div>
        <FaqAccordion items={FAQ_ITEMS} />
      </div>
    </section>
  );
}