"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./NeonFlowBackground.module.css";

/** threejs-components TubesCursor — как в YASHVW25 / 21st.dev Neon Flow */
const TUBES_MODULE_URL =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

type TubesApi = {
  destroy?: () => void;
  dispose?: () => void;
  tubes?: {
    setColors: (c: string[]) => void;
    setLightsColors: (c: string[]) => void;
  };
};

function loadTubesModule(): Promise<{ default: (canvas: HTMLCanvasElement, opts: unknown) => TubesApi }> {
  const runImport = new Function("u", "return import(u)") as (
    u: string,
  ) => Promise<{ default: (canvas: HTMLCanvasElement, opts: unknown) => TubesApi }>;
  return runImport(TUBES_MODULE_URL);
}

export function NeonFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<TubesApi | null>(null);
  const reactId = useId();
  const canvasId = `neon-flow-canvas-${reactId.replace(/:/g, "")}`;

  useEffect(() => {
    if (!canvasRef.current) return;

    let cancelled = false;

    (async () => {
      try {
        const mod = await loadTubesModule();
        if (cancelled || !canvasRef.current) return;

        const TubesCursor = mod.default;
        if (typeof TubesCursor !== "function") return;

        const instance = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#00beca", "#ffa926", "#b400d8"],
            lights: {
              intensity: 200,
              colors: ["#00d8d8", "#ff9d00", "#ffa926", "#c084fc"],
            },
          },
        });
        if (cancelled) {
          instance.destroy?.();
          instance.dispose?.();
          return;
        }
        appRef.current = instance;
      } catch (e) {
        console.warn("[NeonFlow] не удалось загрузить эффект (нужен интернет / CDN):", e);
      }
    })();

    return () => {
      cancelled = true;
      const prev = appRef.current;
      appRef.current = null;
      prev?.destroy?.();
      prev?.dispose?.();
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden>
      <canvas id={canvasId} ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
