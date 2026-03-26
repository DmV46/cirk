import type { ReactNode } from "react";
import { HomePageFixedBackdrop } from "./HomePageFixedBackdrop";
import styles from "./HomePageShell.module.css";

export function HomePageShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <HomePageFixedBackdrop />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
