import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/trainers", label: "Тренеры" },
  { href: "/prices", label: "Цены" },
  { href: "/videos", label: "Видео" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-logo">
              🎪 Цирковая студия
            </Link>
            <p className="footer-desc">
              Подготовка детей к цирковой гимнастике. Развиваем гибкость, силу и
              уверенность в себе.
            </p>
          </div>
          <nav className="footer-nav">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Цирковая студия. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
