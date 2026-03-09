import { FaqAccordion } from "@/shared/ui/faq-accordion/FaqAccordion";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";

export function FaqSection() {
  const faqItems = [
    {
      question: "С какого возраста можно начать заниматься?",
      answer:
        "Мы принимаем детей от 4 лет. В этом возрасте они уже готовы к базовым упражнениям на координацию и гибкость. Для самых маленьких занятия проходят в игровой форме.",
    },
    {
      question: "Что нужно взять на первое занятие?",
      answer:
        "Удобную спортивную форму (лосины/шорты, футболка/майка, носочки). Обувь не требуется, мы занимаемся в носках или босиком. Также возьмите бутылочку воды.",
    },
    {
      question: "Нужна ли специальная физическая подготовка?",
      answer:
        "Нет, мы принимаем детей с любым уровнем подготовки. Наши тренеры подбирают нагрузку индивидуально для каждого ребенка.",
    },
    {
      question: "Можно ли присутствовать родителям на занятии?",
      answer:
        "Мы рекомендуем родителям ожидать в зоне ресепшен, чтобы дети не отвлекались. Но вы можете присутствовать на первом пробном занятии и на открытых уроках, которые мы проводим раз в сезон.",
    },
  ];

  return (
    <section id="faq" className="page-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="ЧАСТЫЕ ВОПРОСЫ" />
          </h2>
        </div>
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
}