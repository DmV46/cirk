"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div key={index} className="faq-item">
          <button
            type="button"
            onClick={() => setOpenId(openId === index ? null : index)}
            className="faq-trigger"
          >
            <span>{item.question}</span>
            <span className={`faq-icon ${openId === index ? "open" : ""}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="faq-content">
              <p className="faq-answer">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
