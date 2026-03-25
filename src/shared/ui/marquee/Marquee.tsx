import React from "react";
import styles from "./Marquee.module.css";

/**
 * Направления в одной линии с Hero: акценты #ffa926 / #00beca + палитра неон-карточек.
 */
const ITEMS: { text: string; color: string; glow: string }[] = [
  { text: "ВОЗДУШНАЯ ГИМНАСТИКА", color: "#00beca", glow: "rgba(0, 190, 202, 0.45)" },
  { text: "ЖОНГЛИРОВАНИЕ", color: "#ffa926", glow: "rgba(255, 169, 38, 0.45)" },
  { text: "АКРОБАТИКА", color: "var(--teal-neon)", glow: "var(--teal-neon-glow)" },
  { text: "ПАРТЕРНАЯ ГИМНАСТИКА", color: "var(--purple-neon)", glow: "var(--purple-neon-glow)" },
  { text: "ТАНЦЫ", color: "#00beca", glow: "rgba(0, 190, 202, 0.4)" },
  { text: "СОЗДАНИЕ НОМЕРОВ", color: "#ffa926", glow: "rgba(255, 169, 38, 0.4)" },
  { text: "КОНЦЕРТЫ", color: "var(--red-neon)", glow: "var(--red-neon-glow)" },
  { text: "КОНКУРСЫ", color: "var(--orange-neon)", glow: "var(--orange-neon-glow)" },
  { text: "ФЕСТИВАЛИ", color: "var(--teal-neon)", glow: "var(--teal-neon-glow)" },
];

function MarqueeSegment({ copyIndex }: { copyIndex: number }) {
  return (
    <span className={styles.segment}>
      {ITEMS.map((w, i) => (
        <React.Fragment key={`${copyIndex}-${i}`}>
          <span
            className={styles.text}
            style={{
              color: w.color,
              textShadow: `0 0 12px ${w.glow}, 0 0 24px ${w.glow}`,
            }}
          >
            {w.text}
          </span>
          <span className={styles.separator}>✦</span>
        </React.Fragment>
      ))}
    </span>
  );
}

export function Marquee() {
  return (
    <div className={styles.container}>
      <div className={styles.track}>
        {[0, 1, 2, 3].map((copyIndex) => (
          <MarqueeSegment key={copyIndex} copyIndex={copyIndex} />
        ))}
      </div>
    </div>
  );
}
