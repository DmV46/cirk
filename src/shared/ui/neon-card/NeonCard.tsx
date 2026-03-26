"use client";

import { useCallback, useId, useSyncExternalStore } from "react";
import styles from "./NeonCard.module.css";

function subscribeCoarse(cb: () => void) {
  const mq = window.matchMedia("(hover: none)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getCoarseSnapshot() {
  return window.matchMedia("(hover: none)").matches;
}

function getCoarseServerSnapshot() {
  return false;
}

function usePrefersCoarsePointer() {
  return useSyncExternalStore(subscribeCoarse, getCoarseSnapshot, getCoarseServerSnapshot);
}

interface NeonCardProps {
  title: string;
  description: string;
  colorClass: "neon-card-orange" | "neon-card-teal" | "neon-card-red" | "neon-card-purple";
  /** Описание скрыто до взаимодействия; `expanded` задаёт родитель (одна открытая карточка) */
  revealDescription?: boolean;
  expanded?: boolean;
  /** Наведение мыши / фокус с клавиатуры */
  onRevealActivate?: () => void;
  /** Тап / клик на сенсоре — переключить эту карточку */
  onRevealToggle?: () => void;
}

export function NeonCard({
  title,
  description,
  colorClass,
  revealDescription = false,
  expanded = false,
  onRevealActivate,
  onRevealToggle,
}: NeonCardProps) {
  const descId = `${useId().replace(/:/g, "")}-desc`;
  const coarse = usePrefersCoarsePointer();

  const colorModuleClass =
    colorClass === "neon-card-orange"
      ? styles.neonCardOrange
      : colorClass === "neon-card-teal"
        ? styles.neonCardTeal
        : colorClass === "neon-card-red"
          ? styles.neonCardRed
          : styles.neonCardPurple;

  const handleClick = useCallback(() => {
    if (!revealDescription || !coarse) return;
    onRevealToggle?.();
  }, [revealDescription, coarse, onRevealToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!revealDescription || !coarse) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onRevealToggle?.();
      }
    },
    [revealDescription, coarse, onRevealToggle],
  );

  const rootClass = [
    styles.neonCard,
    colorModuleClass,
    revealDescription ? styles.neonCardReveal : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!revealDescription) {
    return (
      <div className={rootClass}>
        <h3 className={styles.neonCardTitle}>{title}</h3>
        <p className={styles.neonCardDesc}>{description}</p>
      </div>
    );
  }

  const dataExpanded = expanded ? "true" : undefined;

  return (
    <div
      className={rootClass}
      data-expanded={dataExpanded}
      onMouseEnter={() => onRevealActivate?.()}
      onFocus={() => onRevealActivate?.()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-controls={descId}
    >
      <h3 className={styles.neonCardTitle}>{title}</h3>
      <div className={styles.descReveal}>
        <div className={styles.descRevealInner}>
          <p id={descId} className={styles.neonCardDesc}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
