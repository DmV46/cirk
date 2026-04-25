"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = [
  { href: "/", label: "Главная" },
  { href: "/videos", label: "Видео" },
  { href: "/prices", label: "Цены" },
  { href: "/trainers", label: "Тренеры" },
  { href: "/about", label: "О нас" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  const handleCallbackSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const phone = (new FormData(form).get("phone") ?? "").toString().trim();
    if (!phone) {
      return;
    }
    window.location.href = "tel:+79035868406";
    form.reset();
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footerGrid}>
          <div>
            <Link href="/" className={styles.footerLogo}>
              Объединенная цирковая студия
            </Link>
            <p className={styles.footerDesc}>
              Подготовка детей к цирковой гимнастике. Развиваем гибкость, силу и
              уверенность в себе.
            </p>
          </div>
          <nav className={styles.footerNav}>
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                {link.label}
              </Link>
            ))}
          </nav>
          <form className={styles.callbackForm} onSubmit={handleCallbackSubmit}>
            <p className={styles.callbackTitle}>Остались вопросы? Напишите нам</p>
            <input
              className={styles.callbackInput}
              type="text"
              name="name"
              placeholder="Ваше имя"
              autoComplete="name"
            />
            <input
              className={styles.callbackInput}
              type="tel"
              name="phone"
              placeholder="Телефон для обратного звонка"
              autoComplete="tel"
              required
            />
            <button type="submit" className={styles.callbackButton}>
              Заказать звонок
            </button>
          </form>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerContacts}>
            <div className={styles.footerContactRow}>
              <span className={styles.footerContactLabel}>Адрес:</span>
              <a
                href="https://yandex.ru/maps/?text=%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%2C%203%20%D0%BC%D0%BA%D1%80%2C%203%D0%91"
                target="_blank"
                rel="noreferrer"
                className={styles.footerContactLink}
              >
                г. Московский, 3мкр, 3Б
              </a>
            </div>
            <div className={styles.footerContactRow}>
              <span className={styles.footerContactLabel}>Запись:</span>
              <a className={styles.footerContactLink} href="tel:+79035868406">
                8 (903) 586-84-06
              </a>
              <a className={styles.footerContactLink} href="tel:+79057346102">
                8 (905) 734-61-02
              </a>
            </div>
          </div>
          <p className={styles.footerCopy}>
            © 2026 Объединенная цирковая студия. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
