import { PriceCard } from "@/shared/ui/price-card/PriceCard";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import styles from "./PricesSection.module.css";

export function PricesSection() {
  const prices = [
    {
      name: "8 ЗАНЯТИЙ В МЕСЯЦ",
      amount: "11 000 ₽",
    },
    {
      name: "10 ЗАНЯТИЙ В МЕСЯЦ",
      amount: "12 400 ₽",
    },
    {
      name: "12 ЗАНЯТИЙ В МЕСЯЦ",
      amount: "13 650 ₽",
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
        </div>
        <div className={styles.infoBox}>
          <p className={styles.infoItem}>✓ Первое пробное занятие — бесплатно!</p>
          <p className={styles.infoItem}>
            ✓ На занятии как правило сразу присутствует 3-4 тренера по разным направлениям
          </p>
          <p className={styles.infoItem}>✓ Продолжительность занятия — 2 часа</p>
        </div>
        <div className={styles.cardGrid}>
          {prices.map((price) => (
            <PriceCard
              key={price.name}
              name={price.name}
              amount={price.amount}
              highlight={price.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}