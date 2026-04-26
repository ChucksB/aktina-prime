import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Link = { label: string; href: string };

interface Props {
  links: Link[];
}

const EASE_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function NavMobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // iOS-safe scroll lock: freeze body via position: fixed, preserving scrollY.
  // Setting html { overflow: hidden } does not reliably lock scroll on iOS Safari.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        // z-[90] keeps the toggle clickable above the overlay (z-[80]) so users can close with the X.
        className="relative z-[90] inline-flex items-center justify-center w-11 h-11 rounded-full"
        style={{
          boxShadow: "var(--shadow-ring)",
          background: "var(--color-canvas)",
        }}
      >
        <span className="relative block w-5 h-[14px]" aria-hidden="true">
          <motion.span
            className="absolute left-0 right-0 h-[1.5px] bg-[color:var(--color-ink-deep)] rounded-full"
            style={{ top: 0 }}
            animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: EASE_QUINT }}
          />
          <motion.span
            className="absolute left-0 right-0 h-[1.5px] bg-[color:var(--color-ink-deep)] rounded-full"
            style={{ top: "50%", marginTop: "-0.75px" }}
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: EASE_QUINT }}
          />
          <motion.span
            className="absolute left-0 right-0 h-[1.5px] bg-[color:var(--color-ink-deep)] rounded-full"
            style={{ bottom: 0 }}
            animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: EASE_QUINT }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: EASE_QUINT }}
            // Fixed full-viewport overlay.
            // - Solid BG (no rgba, no backdrop-filter) — iOS Safari sometimes renders semi-opaque + backdrop-filter as more transparent than declared.
            // - height: 100dvh — respects the iOS address-bar dynamic viewport.
            // - z-[80] — above header (z-50) and scroll-progress (z-60).
            className="fixed left-0 right-0 top-0 z-[80]"
            style={{
              height: "100dvh",
              background: "var(--color-canvas)",
            }}
          >
            <nav
              aria-label="Mobile primary"
              className="h-full w-full flex flex-col justify-center px-8"
            >
              <ul className="flex flex-col gap-6 list-none p-0 m-0">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      duration: reduce ? 0 : 0.55,
                      delay: reduce ? 0 : 0.06 + i * 0.07,
                      ease: EASE_QUINT,
                    }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display font-semibold text-[clamp(2.5rem,10vw,4rem)] leading-none tracking-tight text-[color:var(--color-ink-deep)]"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    duration: reduce ? 0 : 0.55,
                    delay: reduce ? 0 : 0.06 + links.length * 0.07,
                    ease: EASE_QUINT,
                  }}
                  className="mt-4"
                >
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="btn btn-accent"
                  >
                    Let's Talk
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
