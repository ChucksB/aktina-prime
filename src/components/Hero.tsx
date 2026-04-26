import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/splite";

/** Matches Tailwind's `lg` breakpoint — 3D renders only at this size or larger. */
const LG_BREAKPOINT = "(min-width: 1024px)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(LG_BREAKPOINT);
    const update = () => setIsDesktop(mq.matches);
    update();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    // Older Safari fallback.
    (mq as any).addListener(update);
    return () => (mq as any).removeListener(update);
  }, []);

  return isDesktop;
}

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WORDS = ["Technology", "Media", "Impact"];
const SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bleedY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bleedScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const line: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 42 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 1.0, ease: EASE_EXPO },
    },
  };

  const soft: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.8, ease: EASE_QUINT, delay: reduce ? 0 : 0.8 },
    },
  };

  const cta: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: EASE_QUINT, delay: reduce ? 0 : 1.05 },
    },
  };

  const stage: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.98 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: reduce ? 0 : 1.1, ease: EASE_EXPO, delay: reduce ? 0 : 0.3 },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate overflow-hidden"
      style={{ paddingTop: "6.5rem", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}
    >
      <BackgroundLayer
        bleedY={bleedY}
        bleedScale={bleedScale}
        gridY={gridY}
        disable={reduce || undefined}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x relative"
        style={reduce ? undefined : { opacity: heroOpacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: text content */}
          <div className="lg:col-span-7">
            <motion.div variants={soft} className="eyebrow">
              <span className="num">01</span>
              <span>Aktina Prime Global Services</span>
            </motion.div>

            <h1
              className="font-display font-semibold mt-8 md:mt-10"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 6.25rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
            >
              <span className="sr-only">Technology. Media. Impact.</span>
              <span aria-hidden="true" className="block">
                {WORDS.map((w) => (
                  <span key={w} className="block overflow-hidden pb-[0.08em]">
                    <motion.span variants={line} className="block">
                      {w}
                      <span style={{ color: "var(--color-brand)" }}>.</span>
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              variants={soft}
              className="body-lg mt-8 md:mt-10"
              style={{ maxWidth: "48ch" }}
            >
              A multi-disciplinary technology, media, and publicity studio.
              Products built, campaigns executed, media produced, at international scale.
            </motion.p>

            <motion.div variants={cta} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#tech" className="btn btn-accent btn-arrow">
                <span>Explore Our Work</span>
                <span className="btn-arrow-glyph" aria-hidden="true">→</span>
              </a>
              <a href="#contact" className="btn btn-ghost btn-arrow">
                <span>Get In Touch</span>
                <span className="btn-arrow-glyph" aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>

          {/*
            Right column — Spline 3D.
            Rendered only on lg+ (≥1024px). On narrower screens the layout
            cascades to a single column and the 3D is skipped entirely, so
            the Spline runtime never downloads on mobile.
          */}
          {isDesktop ? (
            <motion.div variants={stage} className="lg:col-span-5 w-full">
              <ProductWindow />
            </motion.div>
          ) : null}
        </div>

        <motion.div
          variants={cta}
          className="mt-14 md:mt-20 flex items-center gap-4"
        >
          <span
            className="inline-block h-px w-10 bg-[color:var(--color-line-strong)]"
            aria-hidden="true"
          />
          <motion.span
            className="text-[0.75rem] uppercase tracking-[0.16em] text-[color:var(--color-muted)]"
            animate={reduce ? undefined : { y: [0, 4, 0] }}
            transition={{
              duration: 2.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            Scroll
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProductWindow() {
  return (
    <div className="relative w-full h-[500px] md:h-[620px] lg:h-[780px]">
      {/* Top-left affordance label, pinned to the nominal frame */}
      <div className="absolute top-2 left-2 z-[2] flex items-center gap-2 pointer-events-none">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--color-brand)" }}
          aria-hidden="true"
        />
        <span
          className="font-body text-[0.6875rem] uppercase tracking-[0.16em]"
          style={{ color: "var(--color-muted)" }}
        >
          Interactive
        </span>
      </div>

      {/*
        Canvas bleeds well beyond the column on desktop so extreme-pose
        animations (outstretched arm, head tilt) stay inside the canvas and
        don't clip. pointer-events:none keeps the bleed area click-through for
        text/CTAs; Spline listens via setGlobalEvents(true) so drag + track
        still work from anywhere on the page.
      */}
      <div className="absolute inset-y-0 -inset-x-0 lg:-left-64 lg:-right-64 lg:-top-12 lg:-bottom-12 pointer-events-none">
        <SplineScene scene={SPLINE_SCENE} className="w-full h-full" scale={0.75} />
      </div>
    </div>
  );
}

function BackgroundLayer({
  bleedY,
  bleedScale,
  gridY,
  disable,
}: {
  bleedY: any;
  bleedScale: any;
  gridY: any;
  disable?: boolean;
}) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(34,42,53,0.035) 1px, transparent 1px)",
          backgroundSize: "96px 100%",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)",
          y: disable ? 0 : (gridY as any),
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10"
        style={{
          top: "-20%",
          right: "-20%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(closest-side, rgba(230, 57, 70, 0.14), rgba(230, 57, 70, 0) 70%)",
          filter: "blur(10px)",
          y: disable ? 0 : (bleedY as any),
          scale: disable ? 1 : (bleedScale as any),
        }}
      />
    </>
  );
}
