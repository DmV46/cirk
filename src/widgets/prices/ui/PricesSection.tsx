import { PriceCard } from "@/shared/ui/price-card/PriceCard";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import styles from "./PricesSection.module.css";

export function PricesSection() {
  const prices = [
    {
      name: "РАЗОВОЕ",
      desc: "Для тех, кто хочет попробовать",
      amount: "800 ₽",
      features: [
        "Доступ ко всем направлениям",
        "Продолжительность 60 мин",
        "Индивидуальный подход",
      ],
    },
    {
      name: "8 ЗАНЯТИЙ",
      desc: "Оптимальный выбор для начала",
      amount: "5 600 ₽",
      features: [
        "Скидка 12%",
        "Срок действия 30 дней",
        "Заморозка на 7 дней",
      ],

    },
    {
      name: "12 ЗАНЯТИЙ",
      desc: "Для регулярных тренировок",
      amount: "7 200 ₽",
      features: [
        "Скидка 25%",
        "Срок действия 45 дней",
        "Заморозка на 14 дней",
      ],
      highlight: true,
    },
  ];

  return (
    <section id="prices" className="page-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="ЦЕНЫ НА ЗАНЯТИЯ" />
          </h2>
          <p className="section-subtitle">
            Выберите подходящий формат тренировок. Первое пробное занятие — бесплатно!
          </p>
        </div>
        <div className={styles.cardGrid}>
          {prices.map((price) => (
            <PriceCard
              key={price.name}
              name={price.name}
              desc={price.desc}
              amount={price.amount}
              features={price.features}
              highlight={price.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}