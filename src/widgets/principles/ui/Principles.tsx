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
              <TypewriterText text="Объединенная Цирковая Студия — это синтез искусства и спорта, опыта и молодости, новаторства и профессионализма." speed={20} />
            </p>
            <h3 className={styles.goalsTitle}>Наши цели</h3>
            <p className={styles.textBlock}>
              <RandomRevealText 
                text="Открыть двери нашим ученикам в волшебный мир циркового искусства. Где они научатся трюку и быть сильными, артистизму и открывать себя, коммуникации и поддерживать друг друга, ответственности и безопасности, а главное получать удовольствие от всего процесса, чтобы с легкостью и артистизмом выходить на выступление и показывать свое мастерство" 
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