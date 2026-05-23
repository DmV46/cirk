"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SafetyNotice.module.css";

export function SafetyNotice() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = boxRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25);
        });
      },
      { threshold: [0, 0.25, 1] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`page-section ${styles.section}`} aria-label="Безопасность">
      <div className="container">
        <div className={styles.wrapper}>
          <div ref={boxRef} className={`${styles.box} ${isVisible ? styles.visible : ""}`}>
            <p className={styles.text}>
              Цирковая лебедка, воздушный реквизит и оборудование имеют пакет документов,
              техпаспорта и сертификаты соответствия.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
