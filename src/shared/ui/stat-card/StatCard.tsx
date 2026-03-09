import { ReactNode } from "react";
import styles from "./StatCard.module.css";

interface StatCardProps {
  number: string;
  description: string;
}

export function StatCard({ number, description }: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statNumber}>{number}</div>
      <div className={styles.statDesc}>{description}</div>
    </div>
  );
}