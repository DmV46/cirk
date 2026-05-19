"use client";

import { motion } from "framer-motion";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import { LEFT_DIRECTIONS, RIGHT_DIRECTIONS } from "../model/directionsData";
import styles from "./Directions.module.css";

const COLOR_CLASSES = [
  styles.itemPurple,
  styles.itemOrange,
  styles.itemRed,
  styles.itemTeal,
] as const;

/** Повтор при каждом входе секции в вьюпорт (прокрутка вниз и вверх) */
const gridInView = {
  once: false,
  amount: 0.11,
  margin: "0px 0px -14% 0px",
} as const;

const frameVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Directions() {
  const leftColumn = LEFT_DIRECTIONS;
  const rightColumn = RIGHT_DIRECTIONS;
  const midpoint = leftColumn.length;

  return (
    <section id="directions" className={`page-section ${styles.section}`}>
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="НАПРАВЛЕНИЯ ЗАНЯТИЙ" />
          </h2>
        </div>
        <motion.div
          className={styles.frame}
          variants={frameVariants}
          initial="hidden"
          whileInView="show"
          viewport={gridInView}
        >
          <div className={styles.list}>
            <ul className={styles.column}>
              {leftColumn.map((item, index) => (
                <motion.li
                  key={item.title}
                  variants={itemVariants}
                  className={`${styles.listItem} ${COLOR_CLASSES[index % COLOR_CLASSES.length]}`}
                >
                  {item.title}
                </motion.li>
              ))}
            </ul>
            <ul className={styles.column}>
              {rightColumn.map((item, index) => (
                <motion.li
                  key={item.title}
                  variants={itemVariants}
                  className={`${styles.listItem} ${COLOR_CLASSES[(index + midpoint) % COLOR_CLASSES.length]}`}
                >
                  {item.title}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
