"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";
import styles from "./Hero.module.css";

const CIRCLE_COUNT = 25;
const ORANGE = "#ffa926";
const TEAL = "#00beca";

/** Детерминированный RNG — одинаковый SSR/CSR, без hydration mismatch */
function mulberry32(seed: number) {
  let a = seed;
  return function rnd() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildMagicCircles(seed: number) {
  const rnd = mulberry32(seed);
  const colors = [
    ...Array(13).fill(ORANGE),
    ...Array(12).fill(TEAL),
  ];
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }

  let keyframesCss = "";

  const circles = Array.from({ length: CIRCLE_COUNT }, (_, i) => {
    const id = i + 1;
    const size = 150 + Math.floor(rnd() * 101);
    const top = Math.floor(rnd() * 100);
    const left = Math.floor(rnd() * 100);
    const color = colors[i];
    const opacity = (15 + Math.floor(rnd() * 6)) / 100;
    const blur = 50 + Math.floor(rnd() * 21);
    const duration = 20 + Math.floor(rnd() * 21);

    const x1 = -60 + rnd() * 120;
    const y1 = -60 + rnd() * 120;
    const x2 = -60 + rnd() * 120;
    const y2 = -60 + rnd() * 120;
    const x3 = -60 + rnd() * 120;
    const y3 = -60 + rnd() * 120;

    const animName = `cirkHeroFloat${id}`;

    keyframesCss += `
@keyframes ${animName} {
  0% { transform: translate(0, 0); }
  25% { transform: translate(${x1.toFixed(2)}px, ${y1.toFixed(2)}px); }
  50% { transform: translate(${x2.toFixed(2)}px, ${y2.toFixed(2)}px); }
  75% { transform: translate(${x3.toFixed(2)}px, ${y3.toFixed(2)}px); }
  100% { transform: translate(0, 0); }
}
.${animName} { animation: ${animName} ${duration}s ease-in-out infinite; }
`;

    return { id, size, top, left, color, opacity, blur, duration, animName };
  });

  return { circles, keyframesCss };
}

export function Hero() {
  const { circles, keyframesCss } = useMemo(() => buildMagicCircles(0x4c69725f4865726f), []);

  return (
    <section className={styles.hero}>
      <style dangerouslySetInnerHTML={{ __html: keyframesCss }} />

      <div className={styles.heroBgPhoto} aria-hidden />

      <div className={styles.gradientLayer} aria-hidden />

      <div className={styles.pulseLayer} aria-hidden>
        <div className={styles.pulseRadial} />
      </div>

      <div className={styles.radialGlow} aria-hidden />
      <div className={styles.bottomFade} aria-hidden />

      {circles.map((c) => (
        <div
          key={c.id}
          className={`${styles.magicCircle} ${c.animName}`}
          style={{
            top: `${c.top}%`,
            left: `${c.left}%`,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            opacity: c.opacity,
            filter: `blur(${c.blur}px)`,
          }}
        />
      ))}

      <div className={styles.content}>
        <motion.div
          className={styles.motionWrap}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className={styles.title}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            aria-label="Объединенная цирковая студия"
          >
            ОБЪЕДИНЕННАЯ ЦИРКОВАЯ СТУДИЯ
          </motion.h1>

          <motion.h2
            className={styles.tagline}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            aria-label="Будущее это ты"
          >
            БУДУЩЕЕ это ТЫ
          </motion.h2>

          <motion.div
            className={styles.actions}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.ctaMotion}
            >
              <Link href="#about" className={styles.btnOrange}>
                Наши выступления
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.ctaMotion}
            >
              <Link href="#prices" className={styles.btnTeal}>
                Начать занятие
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
