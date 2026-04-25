"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { publicPath } from "@/shared/lib/publicPath";
import { buildMagicCircles, HERO_MAGIC_SEED } from "@/widgets/hero/lib/magicCircles";
import styles from "./HomePageShell.module.css";

/** Визуал героя без текста: фото, круги, градиенты — всё закреплено к вьюпорту */
export function HomePageFixedBackdrop() {
  const { circles, keyframesCss } = useMemo(() => buildMagicCircles(HERO_MAGIC_SEED), []);

  return (
    <div className={styles.fixedBackdrop} aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: keyframesCss }} />
      <div
        className={styles.fixedBackdropPhoto}
        style={
          {
            "--hero-photo-desktop": `url("${publicPath("/IMG_7178.JPG")}")`,
            "--hero-photo-mobile": `url("${publicPath("/IMG_7325.JPG")}")`,
          } as CSSProperties
        }
      />
      <div className={styles.fixedBackdropCircles}>
        {circles.map((c) => (
          <div
            key={c.id}
            className={`${styles.magicCircleFixed} ${c.animName}`}
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
      </div>
      <div className={styles.fixedBackdropGradient} />
      <div className={styles.fixedBackdropPulse}>
        <div className={styles.fixedBackdropPulseRadial} />
      </div>
      <div className={styles.fixedBackdropRadialGlow} />
      <div className={styles.fixedBackdropBottomFade} />
    </div>
  );
}
