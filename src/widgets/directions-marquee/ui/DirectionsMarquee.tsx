"use client";

import { DIRECTIONS } from "@/widgets/directions/model/directionsData";
import styles from "./DirectionsMarquee.module.css";

export function DirectionsMarquee() {
  const marqueeItems = DIRECTIONS.map((item) => item.title);
  const marqueeCycle = [...marqueeItems, ...marqueeItems];

  return (
    <section className={styles.section} aria-label="Популярные направления">
      <div className={styles.marquee} aria-hidden>
        <div className={styles.marqueeTrack}>
          {marqueeCycle.map((title, index) => (
            <span
              key={`${title}-${index}`}
              className={`${styles.marqueeItem} ${styles[`marqueeColor${(index % 4) + 1}`]}`}
            >
              {title}
              <span className={styles.marqueeDot}>•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
