import { ReactNode } from "react";
import styles from "./NeonCard.module.css";

interface NeonCardProps {
  title: string;
  description: string;
  colorClass: "neon-card-orange" | "neon-card-teal" | "neon-card-red" | "neon-card-purple";
}

export function NeonCard({ title, description, colorClass }: NeonCardProps) {
  // Map prop value to module class
  const colorModuleClass = colorClass === "neon-card-orange" ? styles.neonCardOrange :
                           colorClass === "neon-card-teal" ? styles.neonCardTeal :
                           colorClass === "neon-card-red" ? styles.neonCardRed :
                           styles.neonCardPurple;

  return (
    <div className={`${styles.neonCard} ${colorModuleClass}`}>
      <h3 className={styles.neonCardTitle}>{title}</h3>
      <p className={styles.neonCardDesc}>{description}</p>
    </div>
  );
}