import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import styles from "./AboutStudio.module.css";

export function AboutStudio() {
  return (
    <section id="about" className={`page-section ${styles.section}`}>
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="О НАШЕЙ СТУДИИ" />
          </h2>
        </div>
        <div className={styles.contentWrapper}>
          <p className={styles.description}>
            Наша студия оборудована профессиональным цирковым реквизитом, 
            сертифицированными страховочными матами и подвесными системами. 
            Мы уделяем особое внимание безопасности на каждой тренировке.
          </p>
          <div className={styles.securityBox}>
            <h3 className={styles.securityTitle}>
              БЕЗОПАСНОСТЬ ПРЕЖДЕ ВСЕГО
            </h3>
            <p className={styles.securityDesc}>
              Все тренеры проходят регулярное обучение технике безопасности. 
              Оборудование проверяется перед каждым занятием.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}