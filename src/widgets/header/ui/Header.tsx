"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { publicPath } from "@/shared/lib/publicPath";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/videos", label: "Видео" },
  { href: "/prices", label: "Цены" },
  { href: "/trainers", label: "Тренеры" },
  { href: "/about", label: "О нас" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScrollToPrices = (event: MouseEvent<HTMLAnchorElement>) => {
    const pricesSection = document.getElementById("prices");
    if (!pricesSection) {
      return;
    }
    event.preventDefault();
    pricesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#prices");
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/" className={styles.logo}>
            <Image
              src={publicPath("/logo_200x200px.svg")}
              alt="Логотип студии"
              width={200}
              height={200}
              className={styles.logoSvg}
            />
            <span className={styles.logoText}>Объединенная цирковая студия</span>
          </Link>

          <nav className={styles.navDesktop} aria-label="Основное меню">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  pathname === link.href ? styles.navLinkActive : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.ctaDesktop}>
            <Link href="#prices" className={styles.btnPrimary} onClick={handleScrollToPrices}>
              Начать занятие
            </Link>
          </div>

          <button
            type="button"
            className={styles.burger}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <>
          <button
            type="button"
            className={styles.drawerBackdrop}
            aria-label="Закрыть меню"
            onClick={() => setMobileOpen(false)}
          />
          <aside className={styles.drawerPanel} aria-modal aria-label="Меню">
            <div className={styles.drawerHead}>
              <div className={styles.drawerLogoRow}>
                <Image
                  src={publicPath("/logo_200x200px.svg")}
                  alt="Логотип студии"
                  width={200}
                  height={200}
                  className={styles.drawerLogoSvg}
                />
                <span className={styles.drawerLogoText}>Цирковая студия</span>
              </div>
              <button
                type="button"
                className={styles.drawerClose}
                aria-label="Закрыть"
                onClick={() => setMobileOpen(false)}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className={styles.drawerNav}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.drawerNavLink} ${
                    pathname === link.href ? styles.drawerNavLinkActive : ""
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className={styles.drawerCtas}>
              <Link
                href="#about"
                className={styles.btnOutlineFull}
                onClick={() => setMobileOpen(false)}
              >
                Наши выступления
              </Link>
              <Link
                href="#prices"
                className={styles.btnPrimaryFull}
                onClick={(event) => {
                  handleScrollToPrices(event);
                  setMobileOpen(false);
                }}
              >
                Начать занятие
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
