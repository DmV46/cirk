 "use client";

import { useEffect, useRef, useState } from "react";
import { BookLessonModal } from "@/shared/ui/book-lesson-modal/BookLessonModal";
import { PriceCard } from "@/shared/ui/price-card/PriceCard";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import styles from "./PricesSection.module.css";

export function PricesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState<string | undefined>();
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
  const infoGroupsRef = useRef<HTMLDivElement | null>(null);
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

          if (entry.target === infoGroupsRef.current) {
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

    if (infoGroupsRef.current) {
      observer.observe(infoGroupsRef.current);
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
          ref={infoGroupsRef}
          className={`${styles.infoGroups} ${isInfoVisible ? styles.visible : ""}`}
        >
          <div className={styles.infoBox}>
            <h3 className={styles.groupTitle}>Основная группа</h3>
            <p className={styles.infoItem}>✓ Первое пробное занятие — бесплатно!</p>
            <p className={styles.infoItem}>
              ✓ На занятии как правило сразу присутствует<br/>
              <span className={styles.infoHighlight}>
                3{"\u00A0"}-{"\u00A0"}4{"\u00A0"}тренера
              </span>{" "}
              по разным направлениям
            </p>
            <p className={styles.infoItem}>
              ✓ Продолжительность занятия —{" "}
              <span className={styles.infoHighlight}>2{"\u00A0"}часа</span>
            </p>
            <p className={styles.infoItem}>
              ✓ Занятия — <span className={styles.infoHighlight}>3{"\u00A0"}раза в неделю</span>
            </p>
          </div>
          <div className={styles.infoBox}>
            <h3 className={`${styles.groupTitle} ${styles.groupTitlePrep}`}>
              Подготовительная группа
            </h3>
            <p className={styles.infoItem}>✓ Первое пробное занятие — бесплатно!</p>
            <p className={styles.infoItem}>
              ✓ На занятии как правило присутствует<br/>
              <span className={styles.infoHighlightPrep}>
                2{"\u00A0"}-{"\u00A0"}3{"\u00A0"}тренера
              </span>{" "}
              по разным направлениям
            </p>
            <p className={styles.infoItem}>
              ✓ Продолжительность занятия —{" "}
              <span className={styles.infoHighlightPrep}>1{"\u00A0"}час</span>
            </p>
            <p className={styles.infoItem}>
              ✓ Занятия —{" "}
              <span className={styles.infoHighlightPrep}>2{"\u00A0"}раза в неделю</span>
            </p>
          </div>
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
                onBuyClick={() => {
                  setSelectedPlanName(price.name);
                  setIsBookingModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <BookLessonModal
        open={isBookingModalOpen}
        planName={selectedPlanName}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}