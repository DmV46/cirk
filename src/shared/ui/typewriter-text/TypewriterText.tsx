"use client";

import React, { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export function TypewriterText({ text, delay = 0, speed = 20, className = "" }: TypewriterTextProps) {
  const [displayedText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.substring(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      <span>{displayedText}</span>
      {isVisible && displayedText.length < text.length && (
        <span style={{ borderRight: "2px solid var(--orange-neon)", animation: "blink 1s step-end infinite" }}>&#8203;</span>
      )}
      <span style={{ opacity: 0 }}>{text.substring(displayedText.length)}</span>
    </span>
  );
}
