import React from "react";

export function Marquee() {
  const words = [
    { text: "АКРОБАТИКА", color: "var(--teal-neon)" },
    { text: "ВОЗДУШНАЯ ГИМНАСТИКА", color: "var(--orange-neon)" },
    { text: "БАЛАНС", color: "var(--purple-neon)" },
    { text: "РАСТЯЖКА", color:"var(--teal-neon)"  },
    { text: "ЖОНГЛИРОВАНИЕ", color: "var(--red-neon)" },
  ];

  const content = (
    <span className="marquee-text">
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span style={{ color: w.color, textShadow: `0 0 8px ${w.color}` }}>{w.text}</span>
          <span className="marquee-separator"> ✦ </span>
        </React.Fragment>
      ))}
    </span>
  );

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}