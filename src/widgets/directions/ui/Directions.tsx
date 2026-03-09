import { NeonCard } from "@/shared/ui/neon-card/NeonCard";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import styles from "./Directions.module.css";

export function Directions() {
  const directions: Array<{
    title: string;
    description: string;
    colorClass: "neon-card-orange" | "neon-card-teal" | "neon-card-red" | "neon-card-purple";
  }> = [
    {
      title: "АКРОБАТИКА",
      description:
        "Кувырки, стойки, мосты — базовые элементы, которые развивают координацию и силу. Идеально для старта.",
      colorClass: "neon-card-orange",
    },
    {
      title: "ВОЗДУШНАЯ ГИМНАСТИКА",
      description:
        "Полотна, кольца, трапеция — занятия, которые развивают гибкость и выносливость в воздухе.",
      colorClass: "neon-card-teal",
    },
    {
      title: "БАЛАНС И ЖОНГЛИРОВАНИЕ",
      description:
        "Стремление к равновесию и ловкости рук — отличная тренировка для мозга и тела.",
      colorClass: "neon-card-red",
    },
    {
      title: "РАСТЯЖКА",
      description:
        "Комплекс упражнений для развития гибкости всего тела, улучшения осанки и подготовки к сложным трюкам.",
      colorClass: "neon-card-purple",
    },
  ];

  return (
    <section id="directions" className="page-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="НАПРАВЛЕНИЯ ЗАНЯТИЙ" />
          </h2>
          <p className="section-subtitle">
            Мы предлагаем разнообразные программы для детей разного возраста и
            уровня подготовки
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {directions.map((item) => (
            <NeonCard
              key={item.title}
              title={item.title}
              description={item.description}
              colorClass={item.colorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}