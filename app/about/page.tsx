import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас — Цирковая студия",
  description: "История нашей цирковой студии, тренеры и подход к обучению детей",
};

export default function AboutPage() {
  const values = [
    {
      title: "Безопасность",
      description:
        "Все занятия проходят с соблюдением техники безопасности, страховка на каждом уроке.",
    },
    {
      title: "Индивидуальный подход",
      description:
        "Небольшие группы позволяют уделять внимание каждому ребёнку.",
    },
    {
      title: "Постепенное развитие",
      description:
        "Программа строится от простого к сложному, без спешки и перегрузок.",
    },
  ];

  return (
    <div>
      <section className="page-section">
        <div className="container">
          <div className="about-grid">
            <div>
              <h1 className="section-title" style={{ textAlign: "left" }}>
                О нашей студии
              </h1>
              <p
                className="card-text"
                style={{ marginTop: "1.5rem", fontSize: "1.125rem" }}
              >
                Цирковая студия — это место, где дети от 4 лет знакомятся с
                цирковым искусством в безопасной и дружелюбной атмосфере. Мы
                верим, что цирковая гимнастика — это не только спорт, но и
                творчество, уверенность и радость движения.
              </p>
              <p
                className="card-text"
                style={{ marginTop: "1rem" }}
              >
                Наши тренеры — профессиональные артисты цирка и гимнасты с
                многолетним опытом работы с детьми. Мы делаем занятия
                интересными и доступными, помогая каждому ребёнку раскрыть свой
                потенциал.
              </p>
            </div>
            <div className="stats-box">
              <div className="stats-item">
                <span className="stats-number">10+</span>
                <span className="card-text">лет опыта работы с детьми</span>
              </div>
              <div className="stats-item">
                <span className="stats-number">4+</span>
                <span className="card-text">
                  года минимальный возраст для занятий
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Наши принципы</h2>
          </div>
          <div className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            {values.map((item) => (
              <div key={item.title} className="card">
                <h3 className="card-title card-title-accent">
                  {item.title}
                </h3>
                <p className="card-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
