"use client";

import React, { useState, useEffect, useRef } from "react";

interface RandomRevealTextProps {
  text: string;
  duration?: number;
  className?: string;
  delay?: number;
}

export function RandomRevealText({ text, duration = 4000, delay = 0, className = "" }: RandomRevealTextProps) {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
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

    let timeoutId: NodeJS.Timeout;
    let animationFrameId: number;
    let startTimestamp: number | null = null;
    
    // Pre-calculate shuffled indices
    const indices = Array.from({ length: text.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    timeoutId = setTimeout(() => {
      const update = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        const charsToShow = Math.floor(progress * text.length);
        
        setVisibleIndices((prev) => {
          if (prev.size === charsToShow) return prev;
          const next = new Set<number>();
          for (let i = 0; i < charsToShow; i++) {
            next.add(indices[i]);
          }
          return next;
        });

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(update);
        } else {
          // Ensure all are shown at the end
          setVisibleIndices(new Set(indices));
        }
      };

      animationFrameId = requestAnimationFrame(update);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, text, duration, delay]);

  return (
    <span ref={ref} className={className} style={{ display: 'inline' }}>
      {text.split("").map((char, index) => (
        <span 
          key={index} 
          style={{ 
            opacity: visibleIndices.has(index) ? 1 : 0,
            transition: 'opacity 0.1s ease-in'
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
