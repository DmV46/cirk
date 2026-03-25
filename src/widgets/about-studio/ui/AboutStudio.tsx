import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import styles from "./AboutStudio.module.css";

export function AboutStudio() {
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
            <p className={styles.lead}>
              Друзья, помните яркое выступление на нашем «Открытом микрофоне?» Спешим
              познакомить вас с этими удивительными артистами поближе.
            </p>

            <p className={styles.paragraph}>
              Перед вами — «Объединенная цирковая студия» из г. Московский. И теперь у
              ваших детей есть шанс попробовать себя в настоящем цирковом искусстве!
              🎉
            </p>

            <p className={styles.callout}>
              🔥 Приглашаем детей от 5 лет на <span className={styles.emphasis}>БЕСПЛАТНОЕ</span> пробное
              занятие!
            </p>

            <p className={styles.paragraph}>
              Создатель, руководитель и тренер студии— Владимир Самолетов.
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>✨ Артист цирка во втором поколении</li>
              <li className={styles.listItem}>✨ Лауреат Национальной Премии «Циркъ»</li>
              <li className={styles.listItem}>✨ Призер международных конкурсов</li>
              <li className={styles.listItem}>✨ Член Союза Деятелей циркового искусства</li>
              <li className={styles.listItem}>
                ✨ В прошлом — артист Большого Московского Цирка (с детства!)
              </li>
              <li className={styles.listItem}>
                ✨ Сейчас — 6-й сезон работает приглашенным артистом в Большом Театре
                (опера «Сказка о царе Салтане»)
              </li>
            </ul>

            <p className={styles.paragraph}>
              Но главное — это успехи студии и ее воспитанников:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                🏆 Студия отмечена Благодарственным письмом Министерства Культуры РФ!
              </li>
              <li className={styles.listItem}>
                🏆 Ребята участвуют в престижных цирковых фестивалях, в том числе на
                манеже легендарного циркового училища (ГУЦЭИ).
              </li>
              <li className={styles.listItem}>
                🏆 Воспитанники выступают на мероприятиях, концертах и шоу.
              </li>
              <li className={styles.listItem}>
                🌟 Одна из учениц уже получила приглашение со своим номером в
                «Московский театр иллюзий» и выходит на профессиональную сцену!
              </li>
            </ul>

            <p className={styles.paragraph}>
              Хотите, чтобы ваш ребенок попал в такую команду? Приходите знакомиться!
              👇
            </p>

            <div className={styles.contacts}>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>📍 Адрес студии:</span>{" "}
                <span>г. Московский, 3мкр, 3Б.</span>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>📞 Запись:</span>{" "}
                <a className={styles.phone} href="tel:+79035868406">
                  89035868406
                </a>
                ,{" "}
                <a className={styles.phone} href="tel:+79057346102">
                  89057346102
                </a>
              </div>
            </div>
          </div>
          <div className={styles.securityBox}>
            <h3 className={styles.securityTitle}>
              БЕЗОПАСНОСТЬ ПРЕЖДЕ ВСЕГО
            </h3>
            <p className={styles.securityDesc}>
              Все тренеры проходят регулярное обучение технике безопасности. 
              Оборудование проверяется перед каждым занятием.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}