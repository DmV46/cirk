import type { Metadata } from "next";
import { TrainerCard } from "@/shared/ui/trainer-card/TrainerCard";

import { CyberText } from "@/shared/ui/cyber-text/CyberText";

export const metadata: Metadata = {
  title: "Тренеры — Цирковая студия",
  description: "Наши тренеры — профессиональные артисты цирка и гимнасты",
};

const trainers = [
  {
    id: 1,
    name: "Анна Петрова",
    role: "Воздушная гимнастика",
    image: "https://placehold.co/400x500/18181b/00d8d8?text=Анна+Петрова",
    bio: "Мастер спорта по художественной гимнастике. 12 лет опыта работы с детьми. Специализация: воздушные полотна и кольца. Работала артисткой в цирке на Цветном бульваре.",
  },
  {
    id: 2,
    name: "Михаил Козлов",
    role: "Акробатика",
    image: "https://placehold.co/400x500/18181b/ff8800?text=Михаил+Козлов",
    bio: "Кандидат в мастера спорта по спортивной акробатике. 8 лет преподавания. Участник международных соревнований. Специализируется на групповой акробатике и пирамидах.",
  },
  {
    id: 3,
    name: "Елена Волкова",
    role: "Баланс и растяжка",
    image: "https://placehold.co/400x500/18181b/b400d8?text=Елена+Волкова",
    bio: "Выпускница Московской государственной академии хореографии. 10 лет в цирковом искусстве. Ведёт занятия по пластике, растяжке и основам эквилибра.",
  },
  {
    id: 4,
    name: "Игорь Смирнов",
    role: "Жонглирование",
    image: "https://placehold.co/400x500/18181b/e65c00?text=Игорь+Смирнов",
    bio: "Профессиональный жонглер с 15-летним стажем. Лауреат международных цирковых фестивалей. Обучает координации, ловкости и балансу.",
  },
  {
    id: 5,
    name: "София Морозова",
    role: "Гимнастика для малышей",
    image: "https://placehold.co/400x500/18181b/00d8d8?text=София+Морозова",
    bio: "Педагог раннего развития с профильным образованием. 6 лет опыта работы с детьми от 4 до 7 лет. Ведет игровые тренировки по основам акробатики.",
  },
];

export default function TrainersPage() {
  return (
    <div>
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">
              <CyberText text="НАШИ ТРЕНЕРЫ" />
            </h1>
            <p className="section-subtitle">
              Профессиональные артисты цирка и гимнасты с многолетним опытом
              работы с детьми
            </p>
          </div>

          <div
            style={{
              display: "grid",
              marginTop: "4rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {trainers.map((trainer) => (
              <TrainerCard
                key={trainer.id}
                name={trainer.name}
                role={trainer.role}
                image={trainer.image}
                bio={trainer.bio}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
