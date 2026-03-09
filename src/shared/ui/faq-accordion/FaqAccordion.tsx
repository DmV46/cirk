"use client";

import { useState } from "react";
import styles from "./FaqAccordion.module.css";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <div className={styles.faqList}>
      {items.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <button
            type="button"
            onClick={() => setOpenId(openId === index ? null : index)}
            className={styles.faqTrigger}
          >
            <span>{item.question}</span>
            <span className={`${styles.faqIcon} ${openId === index ? styles.open : ""}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
          {openId === index && (
            <div className={styles.faqContent}>
              <p className="faq-answer">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
