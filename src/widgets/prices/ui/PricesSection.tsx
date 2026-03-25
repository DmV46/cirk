import { PriceCard } from "@/shared/ui/price-card/PriceCard";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import styles from "./PricesSection.module.css";

export function PricesSection() {
  const prices = [
    {
      name: "8 ЗАНЯТИЙ В МЕСЯЦ",
      desc: "Базовый формат",
      amount: "11 000 ₽",
      features: [
        "Продолжительность занятия — 2 часа",
        "Все направления студии",
        "Уточняйте сроки и заморозку у администратора",
      ],
    },
    {
      name: "10 ЗАНЯТИЙ В МЕСЯЦ",
      desc: "Расширенный формат",
      amount: "12 400 ₽",
      features: [
        "Продолжительность занятия — 2 часа",
        "Все направления студии",
        "Уточняйте сроки и заморозку у администратора",
      ],
    },
    {
      name: "12 ЗАНЯТИЙ В МЕСЯЦ",
      desc: "Максимум регулярности",
      amount: "13 650 ₽",
      features: [
        "Продолжительность занятия — 2 часа",
        "Все направления студии",
        "Уточняйте сроки и заморозку у администратора",
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
            Выберите подходящий формат. Продолжительность занятия — 2 часа. Первое
            пробное занятие — бесплатно!
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