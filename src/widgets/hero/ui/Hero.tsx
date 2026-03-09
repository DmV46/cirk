import Link from "next/link";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.heroVideo}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/bg-video.mp4`}
      />
      <div className={styles.heroBg} />
      <div className={`container ${styles.heroInner}`}>
        <h1 className={styles.heroTitle}>
          <span className={styles.glitchText} data-text="ОБЪЕДИНЕННАЯ ЦИРКОВАЯ">ОБЪЕДИНЕННАЯ ЦИРКОВАЯ</span>{" "}
          <span className={`${styles.heroTitleAccent} ${styles.glitchText}`} data-text="СТУДИЯ">СТУДИЯ</span>
        </h1>
        <p className={styles.heroText}>
          Акробатика, воздушная гимнастика и тренировки будущего. 
        </p>
        <p className={styles.heroText2}>
          Развиваем гибкость, силу и уверенность в себе через цирковое искусство.
        </p>
        <div className={styles.heroActions}>
          <Link href="#about" className={`${styles.btn} ${styles.btnSecondary}`}>
            НАШИ ВЫСТУПЛЕНИЯ
          </Link>
          <Link href="#prices" className={`${styles.btn} ${styles.btnPrimary}`}>
            НАЧАТЬ ТРЕНИРОВКУ
          </Link>
        </div>
      </div>
    </section>
  );
}