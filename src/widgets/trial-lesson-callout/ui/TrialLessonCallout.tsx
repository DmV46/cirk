import styles from "./TrialLessonCallout.module.css";

export function TrialLessonCallout() {
  return (
    <section className={styles.section} aria-label="Пробное занятие">
      <div className={styles.frame}>
        <p className={styles.text}>
          🔥 Приглашаем детей от 5 лет на{" "}
          <span className={styles.emphasis}>БЕСПЛАТНОЕ</span> пробное занятие!
        </p>
      </div>
    </section>
  );
}
