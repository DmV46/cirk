import { StatCard } from "@/shared/ui/stat-card/StatCard";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import { TypewriterText } from "@/shared/ui/typewriter-text/TypewriterText";
import { RandomRevealText } from "@/shared/ui/random-reveal-text/RandomRevealText";
import styles from "./Principles.module.css";

export function Principles() {
  return (
    <section id="principles" className={`page-section ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <CyberText text="НАШИ ПРИНЦИПЫ" />
          </h2>
        </div>
        <div className={styles.aboutHero}>
          <div className={styles.aboutText}>
            <p className={styles.textBlock}>
              <TypewriterText text="Объединенная цирковая студия — это не просто спортивная секция. Это место, где каждый ребенок может раскрыть свой потенциал, преодолеть страхи и научиться владеть своим телом." speed={20} />
            </p>
            <p className={styles.textBlock}>
              <RandomRevealText 
                text="Мы верим, что цирковое искусство объединяет в себе спорт, творчество и дисциплину. Наша цель — создать безопасную и поддерживающую атмосферу для развития будущих звезд." 
                duration={3000} 
                delay={0}
              />
            </p>
          </div>
          <div className={styles.aboutStats}>
            <StatCard number="с 2017" description="Год основания студии" />
            <StatCard number="50+" description="Номеров создано и поставлено" />
            <StatCard number="70+" description="Наград на фестивалях" />
          </div>
        </div>
      </div>
    </section>
  );
}