 "use client";

import { useEffect, useRef, useState } from "react";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import { SocialLinks } from "@/shared/ui/social-links/SocialLinks";
import styles from "./AboutStudio.module.css";

export function AboutStudio() {
  const textItemRefs = useRef<Array<HTMLElement | null>>([]);
  const [visibleTextItems, setVisibleTextItems] = useState<boolean[]>(
    () => Array.from({ length: 14 }, () => false),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisibleNow = entry.isIntersecting && entry.intersectionRatio >= 0.25;

          const itemIndex = textItemRefs.current.findIndex((item) => item === entry.target);
          if (itemIndex !== -1) {
            setVisibleTextItems((prev) => {
              if (prev[itemIndex] === isVisibleNow) {
                return prev;
              }
              const next = [...prev];
              next[itemIndex] = isVisibleNow;
              return next;
            });
          }
        });
      },
      { threshold: [0, 0.25, 1] },
    );

    textItemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className={`page-section ${styles.section}`}>
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="О НАШЕЙ СТУДИИ" />
          </h2>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.text}>
            <p
              ref={(node) => {
                textItemRefs.current[0] = node;
              }}
              className={`${styles.paragraph} ${styles.revealItem} ${visibleTextItems[0] ? styles.visible : ""}`}
            >
              Создатель, руководитель и тренер студии —{" "}
              <CyberText text="ВЛАДИМИР САМОЛЕТОВ" />.
            </p>
            <ul className={styles.list}>
              <li
                ref={(node) => {
                textItemRefs.current[1] = node;
              }}
              className={`${styles.listItem} ${styles.revealItem} ${visibleTextItems[1] ? styles.visible : ""}`}
              >
                ✨ Артист цирка во втором поколении
              </li>
              <li
                ref={(node) => {
                textItemRefs.current[2] = node;
              }}
              className={`${styles.listItem} ${styles.revealItem} ${visibleTextItems[2] ? styles.visible : ""}`}
              >
                ✨ Лауреат Национальной Премии «Циркъ»
              </li>
              <li
                ref={(node) => {
                textItemRefs.current[3] = node;
              }}
              className={`${styles.listItem} ${styles.revealItem} ${visibleTextItems[3] ? styles.visible : ""}`}
              >
                ✨ Призер международных конкурсов
              </li>
              <li
                ref={(node) => {
                textItemRefs.current[4] = node;
              }}
              className={`${styles.listItem} ${styles.revealItem} ${visibleTextItems[4] ? styles.visible : ""}`}
              >
                ✨ Член Союза Деятелей циркового искусства
              </li>
              <li
                ref={(node) => {
                textItemRefs.current[5] = node;
              }}
              className={`${styles.listItem} ${styles.revealItem} ${visibleTextItems[5] ? styles.visible : ""}`}
              >
                ✨ В прошлом — артист Большого Московского Цирка (с детства!)
              </li>
              <li
                ref={(node) => {
                textItemRefs.current[6] = node;
              }}
              className={`${styles.listItem} ${styles.revealItem} ${visibleTextItems[6] ? styles.visible : ""}`}
              >
                ✨ Сейчас — 6-й сезон работает приглашенным артистом в Большом Театре
                (опера «Сказка о царе Салтане»)
              </li>
            </ul>

            <p
              ref={(node) => {
                textItemRefs.current[7] = node;
              }}
              className={`${styles.successLead} ${styles.revealItem} ${visibleTextItems[7] ? styles.visible : ""}`}
            >
              Но главное — это успехи студии и ее воспитанников:
            </p>
            <ul className={styles.list}>
              <li
                ref={(node) => {
                textItemRefs.current[8] = node;
              }}
              className={`${styles.listItem} ${styles.revealItem} ${visibleTextItems[8] ? styles.visible : ""}`}
              >
                🏆 Студия отмечена Благодарственным письмом Министерства Культуры РФ!
              </li>
              <li
                ref={(node) => {
                textItemRefs.current[9] = node;
              }}
              className={`${styles.listItem} ${styles.revealItem} ${visibleTextItems[9] ? styles.visible : ""}`}
              >
                🏆 Ребята участвуют в престижных цирковых фестивалях, в том числе на
                манеже легендарного циркового училища (ГУЦЭИ).
              </li>
              <li
                ref={(node) => {
                textItemRefs.current[10] = node;
              }}
              className={`${styles.listItem} ${styles.revealItem} ${visibleTextItems[10] ? styles.visible : ""}`}
              >
                🏆 Воспитанники выступают на мероприятиях, концертах и шоу.
              </li>
              <li
                ref={(node) => {
                textItemRefs.current[11] = node;
              }}
              className={`${styles.listItem} ${styles.revealItem} ${visibleTextItems[11] ? styles.visible : ""}`}
              >
                🌟 Одна из учениц уже получила приглашение со своим номером в
                «Московский театр иллюзий» и выходит на профессиональную сцену!
              </li>
            </ul>

            <p
              ref={(node) => {
                textItemRefs.current[12] = node;
              }}
              className={`${styles.paragraph} ${styles.revealItem} ${visibleTextItems[12] ? styles.visible : ""}`}
            >
              Хотите, чтобы ваш ребенок попал в такую команду? Приходите знакомиться!
              👇
            </p>

            <div
              ref={(node) => {
                textItemRefs.current[13] = node;
              }}
              className={`${styles.contacts} ${styles.revealItem} ${visibleTextItems[13] ? styles.visible : ""}`}
            >
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>📍 Адрес студии:</span>{" "}
                <a
                  className={styles.phone}
                  href="https://yandex.ru/maps/?text=%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%2C%203%20%D0%BC%D0%BA%D1%80%2C%203%D0%91"
                  target="_blank"
                  rel="noreferrer"
                >
                  г. Московский, 3мкр, 3Б.
                </a>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>📞 Запись:</span>{" "}
                <span className={styles.phonesWrap}>
                  <a className={styles.phone} href="tel:+79035868406">
                    8 (903) 586-84-06
                  </a>
                  <a className={styles.phone} href="tel:+79057346102">
                    8 (905) 734-61-02
                  </a>
                </span>
              </div>
              <div className={styles.socialRow}>
                <span className={styles.contactLabel}>Мы в соцсетях:</span>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}