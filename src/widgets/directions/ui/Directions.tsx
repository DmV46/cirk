"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { NeonCard } from "@/shared/ui/neon-card/NeonCard";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import styles from "./Directions.module.css";

const COLOR_CLASSES = [
  "neon-card-orange",
  "neon-card-teal",
  "neon-card-red",
  "neon-card-purple",
] as const;

type DirectionItem = {
  title: string;
  description: string;
};

const DIRECTIONS: DirectionItem[] = [
  {
    title: "АКРОБАТИКА",
    description:
      "Кувырки, стойки, мосты — базовые элементы, которые развивают координацию и силу. Идеально для старта.",
  },
  {
    title: "ВОЗДУШНАЯ ГИМНАСТИКА",
    description:
      "Полотна, кольца, трапеция — гибкость и выносливость в воздухе под руководством тренеров.",
  },
  {
    title: "ЖОНГЛИРОВАНИЕ",
    description:
      "Ловкость рук, координация и концентрация — от базовых бросков до выступательных связок.",
  },
  {
    title: "ПАРТЕРНАЯ ГИМНАСТИКА",
    description:
      "Работа в паре и группе: поддержки, броски и синхронность — командный дух и доверие.",
  },
  {
    title: "ТАНЦЫ",
    description:
      "Пластика, ритм и сцена — движение в музыке и подготовка к показам и концертам.",
  },
  {
    title: "СОЗДАНИЕ НОМЕРОВ",
    description:
      "От идеи до выхода на сцену: постановка, репетиции и объединение дисциплин в единый номер.",
  },
  {
    title: "КОНЦЕРТЫ",
    description:
      "Выступления перед зрителями — опыт сцены, артистизм и работа в составе студии.",
  },
  {
    title: "КОНКУРСЫ",
    description:
      "Участие в соревнованиях и фестивалях — цели, прогресс и мотивация к росту.",
  },
  {
    title: "ФЕСТИВАЛИ",
    description:
      "Сборы, обмен опытом и праздник циркового искусства вместе с другими коллективами.",
  },
  {
    title: "БАЛАНС И РАСТЯЖКА",
    description:
      "Равновесие, эквилибр и комплекс на гибкость — основа для сложных элементов и здоровой осанки.",
  },
];

/** Повтор при каждом входе секции в вьюпорт (прокрутка вниз и вверх) */
const gridInView = {
  once: false,
  amount: 0.11,
  margin: "0px 0px -14% 0px",
} as const;

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.065, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 38 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Directions() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const onFocusOut = (ev: FocusEvent) => {
      const next = ev.relatedTarget as Node | null;
      if (next && el.contains(next)) return;
      setOpenTitle(null);
    };
    el.addEventListener("focusout", onFocusOut);
    return () => el.removeEventListener("focusout", onFocusOut);
  }, []);

  const onGridMouseLeave = useCallback(() => {
    setOpenTitle(null);
  }, []);

  const activate = useCallback((title: string) => {
    setOpenTitle(title);
  }, []);

  const toggle = useCallback((title: string) => {
    setOpenTitle((t) => (t === title ? null : title));
  }, []);

  return (
    <section id="directions" className={`page-section ${styles.section}`}>
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="НАПРАВЛЕНИЯ ЗАНЯТИЙ" />
          </h2>
          <p className="section-subtitle">
            Разные программы и уровни подготовки — комбинируйте направления под свои цели.
          </p>
        </div>
        <motion.div
          ref={gridRef}
          className={styles.featuresGrid}
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={gridInView}
          onMouseLeave={onGridMouseLeave}
        >
          {DIRECTIONS.map((item, index) => (
            <motion.div key={item.title} variants={cardVariants} className={styles.cardWrap}>
              <div
                className={styles.cardFloat}
                style={{ animationDelay: `${index * 0.14}s` }}
              >
                <NeonCard
                  title={item.title}
                  description={item.description}
                  colorClass={COLOR_CLASSES[index % COLOR_CLASSES.length]}
                  revealDescription
                  expanded={openTitle === item.title}
                  onRevealActivate={() => activate(item.title)}
                  onRevealToggle={() => toggle(item.title)}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
