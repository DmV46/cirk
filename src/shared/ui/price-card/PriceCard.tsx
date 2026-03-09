import { ReactNode } from "react";
import styles from "./PriceCard.module.css";

interface PriceCardProps {
  name: string;
  desc: string;
  amount: string;
  features: string[];
  highlight?: boolean;
}

export function PriceCard({ name, desc, amount, features, highlight }: PriceCardProps) {
  return (
    <div className={styles.priceCard} style={highlight ? { transform: 'scale(1.05)' } : {}}>
      <h3 className={styles.priceName}>{name}</h3>
      <p className={styles.priceDesc}>{desc}</p>
      <div className={styles.priceAmount}>{amount}</div>
      <ul className={styles.priceFeatures}>
        {features.map((feature, i) => (
          <li key={i} className={highlight && i === 0 ? styles.highlight : ""}>
            ✓ {feature}
          </li>
        ))}
      </ul>
      <button 
        className={`${styles.btn} ${highlight ? styles.btnHighlight : styles.btnDefault}`}
      >
        Купить
      </button>
    </div>
  );
}