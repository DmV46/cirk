"use client";

import type { FormEvent } from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { publicPath } from "@/shared/lib/publicPath";
import styles from "./CallbackFab.module.css";

export function CallbackFab() {
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
    };
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const phone = (new FormData(form).get("phone") ?? "").toString().trim();
    if (!phone) {
      return;
    }
    window.location.href = "tel:+79035868406";
    form.reset();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={styles.fab}
        aria-label="Заказать обратный звонок"
        onClick={() => setOpen(true)}
      >
        <Image
          src={publicPath("/logo_200x200px.svg")}
          alt=""
          width={26}
          height={26}
          className={styles.fabIcon}
        />
      </button>

      {open ? (
        <div className={styles.modalRoot} role="dialog" aria-modal="true" aria-label="Обратный звонок">
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Закрыть окно обратного звонка"
            onClick={() => setOpen(false)}
          />
          <div className={styles.modalCard}>
            <h3 className={styles.title}>Обратный звонок</h3>
            <p className={styles.desc}>Оставьте номер, и мы свяжемся с вами в ближайшее время.</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Ваше имя"
                autoComplete="name"
              />
              <input
                className={styles.input}
                type="tel"
                name="phone"
                placeholder="Телефон"
                autoComplete="tel"
                required
              />
              <button type="submit" className={styles.submit}>
                Заказать звонок
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

