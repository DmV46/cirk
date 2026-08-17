"use client";

import { useEffect, useRef, useState } from "react";
import { BookLessonModal } from "@/shared/ui/book-lesson-modal/BookLessonModal";
import { PriceCard } from "@/shared/ui/price-card/PriceCard";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import { allPricePlans, priceGroups } from "../model/pricesData";
import styles from "./PricesSection.module.css";

export function PricesSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState<string | undefined>();
  const groupsLayoutRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isGroupsVisible, setIsGroupsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() =>
    allPricePlans.map(() => false),
  );

  useEffect(() => {
    setVisibleCards(allPricePlans.map(() => false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisibleNow = entry.isIntersecting && entry.intersectionRatio >= 0.25;

          if (entry.target === groupsLayoutRef.current) {
            setIsGroupsVisible(isVisibleNow);
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

    if (groupsLayoutRef.current) {
      observer.observe(groupsLayoutRef.current);
    }
    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const mainPlans = priceGroups[0].plans.map((plan, index) => ({ plan, index }));
  const prepPlans = priceGroups[1].plans.map((plan, index) => ({
    plan,
    index: mainPlans.length + index,
  }));

  return (
    <section id="prices" className="page-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="ЦЕНЫ НА ЗАНЯТИЯ" />
          </h2>
        </div>

        <div
          ref={groupsLayoutRef}
          className={`${styles.groupsLayout} ${isGroupsVisible ? styles.visible : ""}`}
        >
          <article className={styles.priceGroup}>
            <div className={styles.infoBox}>
              <h3 className={styles.groupTitle}>Основная группа</h3>
              <p className={styles.infoItem}>✓ Первое пробное занятие — бесплатно!</p>
              <p className={styles.infoItem}>
                ✓ На занятии как правило сразу присутствует
                <br />
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
              <p className={styles.infoItem}>
                ✓ Льготная категория — скидка{" "}
                <span className={styles.infoHighlight}>13%</span>
              </p>
            </div>

            <div className={`${styles.cardGrid} ${styles.cardGridMain}`}>
              {mainPlans.map(({ plan, index }) => (
                <div
                  key={plan.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className={`${styles.cardWrap} ${visibleCards[index] ? styles.visible : ""}`}
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <PriceCard
                    name={plan.name}
                    duration={priceGroups[0].duration}
                    amount={plan.amount}
                    highlight={plan.highlight}
                    onBuyClick={() => {
                      setSelectedPlanName(plan.bookingLabel);
                      setIsBookingModalOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </article>

          <article className={`${styles.priceGroup} ${styles.priceGroupPrep}`}>
            <div className={`${styles.infoBox} ${styles.infoBoxPrep}`}>
              <h3 className={`${styles.groupTitle} ${styles.groupTitlePrep}`}>
                Подготовительная группа
              </h3>
              <p className={styles.infoItem}>✓ Первое пробное занятие — бесплатно!</p>
              <p className={styles.infoItem}>
                ✓ На занятии как правило присутствует
                <br />
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
              <p className={styles.infoItem}>
                ✓ Льготная категория — скидка{" "}
                <span className={styles.infoHighlightPrep}>13%</span>
              </p>
            </div>

            <div className={`${styles.cardGrid} ${styles.cardGridSingle}`}>
              {prepPlans.map(({ plan, index }) => (
                <div
                  key={plan.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className={`${styles.cardWrap} ${visibleCards[index] ? styles.visible : ""}`}
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <PriceCard
                    name={plan.name}
                    duration={priceGroups[1].duration}
                    amount={plan.amount}
                    highlight={plan.highlight}
                    onBuyClick={() => {
                      setSelectedPlanName(plan.bookingLabel);
                      setIsBookingModalOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </article>
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
