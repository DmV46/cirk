import Link from "next/link";

export default function Home() {
  const pageSections = [
    {
      href: "/about",
      title: "О нас",
      description:
        "История студии, наши принципы и подход к обучению. Узнайте больше о том, как мы работаем с детьми.",
      icon: "🏟️",
    },
    {
      href: "/trainers",
      title: "Тренеры",
      description:
        "Познакомьтесь с нашими тренерами — профессиональными артистами цирка и гимнастами с опытом работы с детьми.",
      icon: "👤",
    },
    {
      href: "/prices",
      title: "Цены",
      description:
        "Разовое занятие от 800 ₽, абонементы со скидкой до 25%. Первое пробное занятие — бесплатно.",
      icon: "💰",
    },
    {
      href: "/videos",
      title: "Видео выступлений",
      description:
        "Посмотрите выступления наших воспитанников на фестивалях и открытых уроках.",
      icon: "🎬",
    },
    {
      href: "/faq",
      title: "Частые вопросы",
      description:
        "С какого возраста заниматься? Что нужно для первого занятия? Ответы на популярные вопросы.",
      icon: "❓",
    },
  ];

  const directions = [
    {
      title: "Акробатика",
      description:
        "Кувырки, стойки, мосты — базовые элементы, которые развивают координацию и силу.",
      icon: "🤸",
    },
    {
      title: "Воздушная гимнастика",
      description:
        "Полотна, кольца, трапеция — занятия, которые развивают гибкость и выносливость.",
      icon: "🎭",
    },
    {
      title: "Баланс и жонглирование",
      description:
        "Стремление к равновесию и ловкости рук — отличная тренировка для мозга.",
      icon: "⚖️",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <h1 className="hero-title">
            Цирковая гимнастика{" "}
            <span className="hero-title-accent">для детей</span>
          </h1>
          <p className="hero-text">
            Развиваем гибкость, силу и уверенность в себе через цирковое
            искусство. Акробатика, воздушная гимнастика и многое другое.
          </p>
          <div className="hero-actions">
            <Link href="/prices" className="btn btn-primary">
              Записаться
            </Link>
            <Link href="/about" className="btn btn-secondary">
              О нас
            </Link>
          </div>
        </div>
      </section>

      {/* Направления занятий */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Направления занятий</h2>
            <p className="section-subtitle">
              Мы предлагаем разнообразные программы для детей разного возраста и
              уровня подготовки
            </p>
          </div>
          <div className="card-grid">
            {directions.map((item) => (
              <div key={item.title} className="card">
                <span className="card-icon">{item.icon}</span>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Краткая информация по всем страницам */}
      <section className="page-section page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Узнайте больше</h2>
            <p className="section-subtitle">
              Краткая информация по разделам сайта
            </p>
          </div>
          <div className="card-grid">
            {pageSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="section-link"
              >
                <span className="card-icon">{section.icon}</span>
                <h3 className="card-title">{section.title}</h3>
                <p className="card-text">{section.description}</p>
                <span className="section-link-cta">Подробнее →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Цены и FAQ — акцент внизу */}
      <section className="page-section">
        <div className="container">
          <div className="highlight-grid">
            <div className="highlight-box">
              <h3 className="highlight-title">💰 Цены</h3>
              <p className="highlight-text">
                Разовое занятие — 800 ₽. Абонемент 8 занятий — 5 600 ₽ (скидка
                12%). Абонемент 12 занятий — 7 200 ₽ (скидка 25%). Первое
                пробное занятие бесплатно!
              </p>
              <Link href="/prices" className="btn btn-primary btn-sm highlight-btn">
                Все тарифы
              </Link>
            </div>
            <div className="highlight-box">
              <h3 className="highlight-title">❓ Частые вопросы</h3>
              <p className="highlight-text">
                С какого возраста заниматься? Что нужно для первого занятия? Как
                записаться? Ответы на популярные вопросы — в разделе FAQ.
              </p>
              <Link
                href="/faq"
                className="btn btn-secondary btn-sm highlight-btn"
              >
                Открыть FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
