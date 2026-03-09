import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тренеры — Цирковая студия",
  description: "Наши тренеры — профессиональные артисты цирка и гимнасты",
};

const trainers = [
  {
    id: 1,
    name: "Анна Петрова",
    role: "Воздушная гимнастика",
    image: "https://placehold.co/400x500/fffbeb/92400e?text=Анна+Петрова",
    bio: "Мастер спорта по художественной гимнастике. 12 лет опыта работы с детьми. Специализация: воздушные полотна и кольца. Работала артисткой в цирке на Цветном бульваре.",
  },
  {
    id: 2,
    name: "Михаил Козлов",
    role: "Акробатика",
    image: "https://placehold.co/400x500/fffbeb/92400e?text=Михаил+Козлов",
    bio: "Кандидат в мастера спорта по спортивной акробатике. 8 лет преподавания. Участник международных соревнований. Специализируется на групповой акробатике и пирамидах.",
  },
  {
    id: 3,
    name: "Елена Волкова",
    role: "Баланс и растяжка",
    image: "https://placehold.co/400x500/fffbeb/92400e?text=Елена+Волкова",
    bio: "Выпускница Московской государственной академии хореографии. 10 лет в цирковом искусстве. Ведёт занятия по пластике, растяжке и основам эквилибра.",
  },
];

export default function TrainersPage() {
  return (
    <div>
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Наши тренеры</h1>
            <p className="section-subtitle">
              Профессиональные артисты цирка и гимнасты с многолетним опытом
              работы с детьми
            </p>
          </div>

          <div
            className="card-grid"
            style={{
              marginTop: "4rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {trainers.map((trainer) => (
              <article key={trainer.id} className="trainer-card">
                <div className="trainer-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                  />
                </div>
                <div className="trainer-info">
                  <h3 className="card-title">{trainer.name}</h3>
                  <p className="trainer-role">{trainer.role}</p>
                  <p className="card-text" style={{ marginTop: "1rem" }}>
                    {trainer.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
