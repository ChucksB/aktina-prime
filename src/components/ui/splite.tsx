import { useEffect, useRef, useState } from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
  /** Visual scale applied via CSS transform. 1 = default size, 0.75 = 75% etc. */
  scale?: number;
}

/**
 * Minimal React wrapper around @splinetool/runtime.
 * Skips the @splinetool/react-spline package because v4 assumes Next.js
 * and v2 reads removed React internals (ReactCurrentOwner) under React 19.
 * The runtime is dynamically imported so SSR does not try to load it.
 */
export function SplineScene({ scene, className, scale = 1 }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  );

  useEffect(() => {
    let disposed = false;
    let app: { dispose?: () => void } | null = null;
    const canvas = canvasRef.current;
    if (!canvas) return;

    setStatus("loading");

    import("@splinetool/runtime")
      .then(({ Application }) => {
        if (disposed || !canvas) return;
        app = new Application(canvas);
        return (app as any).load(scene);
      })
      .then(() => {
        if (disposed) return;
        try {
          (app as any)?.setBackgroundColor?.("transparent");
          (app as any)?.setGlobalEvents?.(true);
        } catch {
          /* noop */
        }
        setStatus("ready");
      })
      .catch((err) => {
        if (!disposed) {
          console.error("Spline scene failed to load:", err);
          setStatus("error");
        }
      });

    return () => {
      disposed = true;
      try {
        app?.dispose?.();
      } catch {
        /* noop */
      }
    };
  }, [scene]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
        aria-label="Interactive 3D scene"
      />

      {status !== "ready" ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {status === "error" ? (
            <span className="font-body text-[0.6875rem] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              3D scene unavailable
            </span>
          ) : (
            <div
              aria-label="Loading 3D scene"
              className="h-6 w-6 rounded-full border-2 border-[color:var(--color-line-strong)] border-t-[color:var(--color-ink)] animate-spin"
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
