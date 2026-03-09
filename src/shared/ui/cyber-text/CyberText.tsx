import React from "react";
import styles from "./CyberText.module.css";

interface CyberTextProps {
  text: string;
  className?: string;
}

export function CyberText({ text, className = "" }: CyberTextProps) {
  return (
    <span className={`${styles.neonText} ${className}`}>
      {text}
    </span>
  );
}
