import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цены — Цирковая студия",
  description: "Стоимость занятий по цирковой гимнастике для детей",
};

export default function PricesPage() {
  const plans = [
    {
      name: "Разовое занятие",
      price: "800 ₽",
      description: "Идеально для пробного урока",
      features: ["1 занятие", "60 минут", "Все направления"],
    },
    {
      name: "Абонемент 8 занятий",
      price: "5 600 ₽",
      description: "Самый популярный вариант",
      features: ["8 занятий в месяц", "60 минут", "Скидка 12%"],
      popular: true,
    },
    {
      name: "Абонемент 12 занятий",
      price: "7 200 ₽",
      description: "Максимальная выгода",
      features: ["12 занятий в месяц", "60 минут", "Скидка 25%"],
    },
  ];

  return (
    <div>
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Цены на занятия</h1>
            <p className="section-subtitle">
              Выберите удобный формат посещения. Первое пробное занятие —
              бесплатно!
            </p>
          </div>

          <div
            className="card-grid"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`plan-card ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <span className="plan-badge">Популярно</span>
                )}
                <h3 className="card-title">{plan.name}</h3>
                <p className="card-text">{plan.description}</p>
                <div style={{ marginTop: "1.5rem" }}>
                  <span className="plan-price">{plan.price}</span>
                  <span className="text-muted">/мес</span>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span style={{ color: "var(--amber-500)" }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`btn btn-sm ${plan.popular ? "btn-primary" : "btn-secondary"}`}
                  style={{ marginTop: "2rem", width: "100%" }}
                >
                  Записаться
                </button>
              </div>
            ))}
          </div>

          <div className="info-box">
            <h3 className="card-title" style={{ fontSize: "1.125rem" }}>
              📌 Важная информация
            </h3>
            <ul
              className="card-text"
              style={{
                marginTop: "1rem",
                paddingLeft: "1.25rem",
                listStyle: "disc",
              }}
            >
              <li style={{ marginBottom: "0.5rem" }}>
                Пробное занятие — бесплатно
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Абонементы действуют в течение календарного месяца
              </li>
              <li>
                Возможна рассрочка на абонементы от 12 занятий
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
