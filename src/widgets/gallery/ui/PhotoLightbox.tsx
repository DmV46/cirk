"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { GalleryPhotoItem } from "@/shared/lib/yandexDiskGallery";
import styles from "./PhotoLightbox.module.css";

type PhotoLightboxProps = {
  photos: GalleryPhotoItem[];
  index: number;
  onClose: () => void;
};

export function PhotoLightbox({ photos, index, onClose }: PhotoLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const photo = photos[index];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!photo || !mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        role="dialog"
        aria-modal="true"
        aria-label={photo.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
          ×
        </button>

        <motion.div
          className={styles.stage}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => event.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={photo.id}
            src={photo.fullSrc}
            alt={photo.title}
            className={styles.image}
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
