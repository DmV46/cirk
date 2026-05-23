"use client";

import Image from "next/image";
import Link from "next/link";
import { publicPath } from "@/shared/lib/publicPath";
import { SocialLinks } from "@/shared/ui/social-links/SocialLinks";
import styles from "./Footer.module.css";

const footerLinks = [
  { href: "/", label: "Главная" },
  { href: "/videos", label: "Фото и видео" },
  { href: "/prices", label: "Цены" },
  { href: "/trainers", label: "Наша команда" },
  { href: "/about", label: "О нас" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footerGrid}>
          <div>
            <Link href="/" className={styles.footerLogo}>
              <Image
                src={publicPath("/logo_200x200px.svg")}
                alt="Объединенная цирковая студия"
                width={200}
                height={200}
                className={styles.footerLogoSvg}
              />
              <span className={styles.footerLogoText}>Объединенная цирковая студия</span>
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
            <div className={`${styles.footerContactRow} ${styles.footerSocialRow}`}>
              <span className={styles.footerContactLabel}>Соцсети:</span>
              <SocialLinks className={styles.footerSocialLinks} />
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
