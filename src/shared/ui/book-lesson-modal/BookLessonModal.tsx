"use client";

import { useEffect, useLayoutEffect } from "react";
import { STUDIO_PHONES } from "@/shared/lib/studioContacts";
import styles from "./BookLessonModal.module.css";

type BookLessonModalProps = {
  open: boolean;
  planName?: string;
  onClose: () => void;
};

export function BookLessonModal({ open, planName, onClose }: BookLessonModalProps) {
  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

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

  if (!open) {
    return null;
  }

  return (
    <div className={styles.modalRoot} role="dialog" aria-modal="true" aria-label="Запись на занятие">
      <button type="button" className={styles.backdrop} aria-label="Закрыть" onClick={onClose} />
      <div className={styles.modalCard}>
        <h3 className={styles.title}>Запись на занятие</h3>
        {planName ? <p className={styles.plan}>{planName}</p> : null}
        <p className={styles.desc}>
          Чтобы записаться и попасть на занятие, позвоните нам и предварительно договоритесь о
          времени.
        </p>
        <div className={styles.phones}>
          {STUDIO_PHONES.map((phone) => (
            <a key={phone.href} className={styles.phoneLink} href={phone.href}>
              {phone.label}
            </a>
          ))}
        </div>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
