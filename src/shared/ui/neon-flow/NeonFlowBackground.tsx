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
              intensity: 100,
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

        // The effect follows pointer events. We drive a virtual cursor that
        // continuously seeks random targets across the whole viewport.
        let x = window.innerWidth * 0.5;
        let y = window.innerHeight * 0.5;
        let vx = 0;
        let vy = 0;
        let targetX = Math.random() * Math.max(window.innerWidth, 1);
        let targetY = Math.random() * Math.max(window.innerHeight, 1);
        let framesToRetarget = 0;

        const isMobileOrTablet = () =>
          typeof window !== "undefined" &&
          window.matchMedia("(max-width: 1024px)").matches;

        const pickNextTarget = () => {
          const maxX = Math.max(window.innerWidth, 1);
          const maxY = Math.max(window.innerHeight, 1);
          targetX = Math.random() * maxX;
          targetY = Math.random() * maxY;
          const timeScale = isMobileOrTablet() ? 3 : 2;
          // Desktop: ~5.6-10.4s, Mobile/Tablet: ~8.4-15.6s.
          framesToRetarget = Math.floor((168 + Math.floor(Math.random() * 144)) * timeScale);
        };

        const emitVirtualPointer = (cx: number, cy: number) => {
          const mouseEvt = new MouseEvent("mousemove", {
            clientX: cx,
            clientY: cy,
            bubbles: true,
          });
          const pointerEvt = new PointerEvent("pointermove", {
            clientX: cx,
            clientY: cy,
            pointerType: "mouse",
            bubbles: true,
          });

          window.dispatchEvent(mouseEvt);
          window.dispatchEvent(pointerEvt);
          document.dispatchEvent(mouseEvt);
          document.dispatchEvent(pointerEvt);
          canvasRef.current?.dispatchEvent(mouseEvt);
          canvasRef.current?.dispatchEvent(pointerEvt);
        };

        pickNextTarget();

        const step = () => {
          if (cancelled) return;

          const maxX = Math.max(1, window.innerWidth);
          const maxY = Math.max(1, window.innerHeight);
          const dx = targetX - x;
          const dy = targetY - y;
          const dist = Math.hypot(dx, dy);

          // Spring-like seek + damping gives "mouse-like" smooth motion.
          const speedScale = isMobileOrTablet() ? 0.35 : 0.5;
          const accel = 0.0048 * speedScale;
          const damping = 0.968;
          const jitterX = (Math.random() - 0.5) * 0.09 * speedScale;
          const jitterY = (Math.random() - 0.5) * 0.09 * speedScale;

          vx = (vx + dx * accel + jitterX) * damping;
          vy = (vy + dy * accel + jitterY) * damping;
          const maxSpeed = 4.2 * speedScale;
          vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
          vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy));

          x += vx;
          y += vy;

          if (x < 0) {
            x = 0;
            vx = Math.abs(vx) * 0.46;
          } else if (x > maxX) {
            x = maxX;
            vx = -Math.abs(vx) * 0.46;
          }

          if (y < 0) {
            y = 0;
            vy = Math.abs(vy) * 0.46;
          } else if (y > maxY) {
            y = maxY;
            vy = -Math.abs(vy) * 0.46;
          }

          emitVirtualPointer(x, y);

          framesToRetarget -= 1;
          if (dist < 20 || framesToRetarget <= 0) {
            pickNextTarget();
          }

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
