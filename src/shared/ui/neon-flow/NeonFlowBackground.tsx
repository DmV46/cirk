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
  const animationFrameRef = useRef<number | null>(null);
  const reactId = useId();
  const canvasId = `neon-flow-canvas-${reactId.replace(/:/g, "")}`;

  useEffect(() => {
    if (!canvasRef.current) return;

    let cancelled = false;
    const blockTrustedPointerEvents = (event: Event) => {
      // Let only synthetic events drive the effect.
      // Real pointer/mouse movement should not affect tubes motion.
      if ("isTrusted" in event && (event as MouseEvent).isTrusted) {
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener("mousemove", blockTrustedPointerEvents, true);
    window.addEventListener("pointermove", blockTrustedPointerEvents, true);

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

        // The third-party effect follows pointer events; emulate a chaotic
        // pointer path so motion is autonomous across the whole viewport.
        let x = window.innerWidth * 0.5;
        let y = window.innerHeight * 0.5;
        let vx = (Math.random() - 0.5) * 6;
        let vy = (Math.random() - 0.5) * 6;
        let ax = 0;
        let ay = 0;

        const jitter = () => (Math.random() - 0.5) * 0.18;

        const step = () => {
          if (cancelled) return;

          ax += jitter();
          ay += jitter();

          ax = Math.max(-1.2, Math.min(1.2, ax));
          ay = Math.max(-1.2, Math.min(1.2, ay));

          vx = Math.max(-8, Math.min(8, vx + ax));
          vy = Math.max(-8, Math.min(8, vy + ay));

          x += vx;
          y += vy;

          const maxX = Math.max(1, window.innerWidth);
          const maxY = Math.max(1, window.innerHeight);

          if (x < 0) {
            x = 0;
            vx = Math.abs(vx) * 0.92;
            ax *= -0.6;
          } else if (x > maxX) {
            x = maxX;
            vx = -Math.abs(vx) * 0.92;
            ax *= -0.6;
          }

          if (y < 0) {
            y = 0;
            vy = Math.abs(vy) * 0.92;
            ay *= -0.6;
          } else if (y > maxY) {
            y = maxY;
            vy = -Math.abs(vy) * 0.92;
            ay *= -0.6;
          }

          window.dispatchEvent(
            new MouseEvent("mousemove", {
              clientX: x,
              clientY: y,
              bubbles: true,
            }),
          );
          window.dispatchEvent(
            new PointerEvent("pointermove", {
              clientX: x,
              clientY: y,
              pointerType: "mouse",
              bubbles: true,
            }),
          );

          animationFrameRef.current = window.requestAnimationFrame(step);
        };

        animationFrameRef.current = window.requestAnimationFrame(step);
      } catch (e) {
        console.warn("[NeonFlow] не удалось загрузить эффект (нужен интернет / CDN):", e);
      }
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("mousemove", blockTrustedPointerEvents, true);
      window.removeEventListener("pointermove", blockTrustedPointerEvents, true);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
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
