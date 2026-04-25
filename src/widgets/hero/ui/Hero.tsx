"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { publicPath } from "@/shared/lib/publicPath";
import styles from "./Hero.module.css";

/** Характерный «спокойный» ease из премиальных лендингов (в духе Digital Serenity) */
const serenityEase = [0.16, 1, 0.3, 1] as const;

const wordReveal = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: serenityEase },
  },
};

const actionsContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.9 },
  },
};

const actionsContainerInstant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

const buttonItemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: serenityEase },
  },
};

const buttonItemInstant = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
};

type SerenityWordsProps = {
  level: "h1" | "h2";
  text: string;
  className: string;
  wordClassName: string;
  ariaLabel: string;
  stagger: number;
  delayChildren: number;
  reduceMotion: boolean;
};

function SerenityWords({
  level,
  text,
  className,
  wordClassName,
  ariaLabel,
  stagger,
  delayChildren,
  reduceMotion,
}: SerenityWordsProps) {
  const words = text.split(/\s+/).filter(Boolean);
  const MotionTag = level === "h1" ? motion.h1 : motion.h2;
  const StaticTag = level === "h1" ? "h1" : "h2";

  const listVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };

  if (reduceMotion) {
    return (
      <StaticTag className={className} aria-label={ariaLabel}>
        {text}
      </StaticTag>
    );
  }

  return (
    <MotionTag
      className={className}
      aria-label={ariaLabel}
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={`${i}-${word}`}
          variants={wordReveal}
          className={wordClassName}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.motionWrap}>
          <motion.div
            className={styles.logoWrap}
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: serenityEase }}
          >
            <Image
              src={publicPath("/logo_270x202px.svg")}
              alt="Логотип объединенной цирковой студии"
              width={270}
              height={202}
              className={styles.logo}
              priority
            />
          </motion.div>

          <SerenityWords
            level="h2"
            text="БУДУЩЕЕ это ТЫ"
            className={styles.tagline}
            wordClassName={styles.serenityWord}
            ariaLabel="Будущее это ты"
            stagger={0.13}
            delayChildren={0.38}
            reduceMotion={!!reduceMotion}
          />

          <motion.div
            className={styles.serenityLine}
            aria-hidden
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 1.08, delay: 0.52, ease: serenityEase }
            }
          />

          <motion.div
            className={styles.actions}
            variants={
              reduceMotion ? actionsContainerInstant : actionsContainerVariants
            }
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <motion.div
              variants={
                reduceMotion ? buttonItemInstant : buttonItemVariants
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.ctaMotion}
            >
              <Link href="#about" className={styles.btnOrange}>
                Наши выступления
              </Link>
            </motion.div>
            <motion.div
              variants={
                reduceMotion ? buttonItemInstant : buttonItemVariants
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.ctaMotion}
            >
              <Link href="#prices" className={styles.btnTeal}>
                Начать занятие
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
