import styles from "./PriceCard.module.css";

interface PriceCardProps {
  name: string;
  amount: string;
  highlight?: boolean;
  onBuyClick?: () => void;
}

export function PriceCard({
  name,
  amount,
  highlight,
  onBuyClick,
}: PriceCardProps) {
  return (
    <div
      className={`${styles.priceCard} ${highlight ? styles.priceCardHighlight : ""}`}
    >
      <h3 className={styles.priceName}>{name}</h3>
      <div className={styles.priceAmount}>{amount}</div>
      <button
        className={`${styles.btn} ${highlight ? styles.btnHighlight : styles.btnDefault}`}
        type="button"
        onClick={onBuyClick}
      >
        Купить
      </button>
    </div>
  );
}
