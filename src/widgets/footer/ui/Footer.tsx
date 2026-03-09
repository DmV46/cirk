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
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} Цирковая студия. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
