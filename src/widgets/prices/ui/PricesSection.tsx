 "use client";

import { useEffect, useRef, useState } from "react";
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
  const infoRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() =>
    prices.map(() => false),
  );

  useEffect(() => {
    setVisibleCards(prices.map(() => false));
  }, [prices.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisibleNow = entry.isIntersecting && entry.intersectionRatio >= 0.25;

          if (entry.target === infoRef.current) {
            setIsInfoVisible(isVisibleNow);
            return;
          }

          const index = cardRefs.current.findIndex((card) => card === entry.target);
          if (index !== -1) {
            setVisibleCards((prev) => {
              const next = [...prev];
              next[index] = isVisibleNow;
              return next;
            });
          }
        });
      },
      { threshold: [0, 0.25, 1] },
    );

    if (infoRef.current) {
      observer.observe(infoRef.current);
    }
    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [prices.length]);

  return (
    <section id="prices" className="page-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="ЦЕНЫ НА ЗАНЯТИЯ" />
          </h2>
        </div>
        <div
          ref={infoRef}
          className={`${styles.infoBox} ${isInfoVisible ? styles.visible : ""}`}
        >
          <p className={styles.infoItem}>✓ Первое пробное занятие — бесплатно!</p>
          <p className={styles.infoItem}>
            ✓ На занятии как правило сразу присутствует 3-4 тренера по разным направлениям
          </p>
          <p className={styles.infoItem}>✓ Продолжительность занятия — 2 часа</p>
        </div>
        <div className={styles.cardGrid}>
          {prices.map((price, idx) => (
            <div
              key={price.name}
              ref={(node) => {
                cardRefs.current[idx] = node;
              }}
              className={`${styles.cardWrap} ${visibleCards[idx] ? styles.visible : ""}`}
              style={{ transitionDelay: `${idx * 90}ms` }}
            >
              <PriceCard
                name={price.name}
                amount={price.amount}
                highlight={price.highlight}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}