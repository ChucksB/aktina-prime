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

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
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
        className="inline-flex items-center justify-center w-11 h-11 rounded-full"
        style={{ boxShadow: "var(--shadow-ring)" }}
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
            transition={{ duration: reduce ? 0 : 0.25, ease: EASE_QUINT }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(254,254,254,0.98)", backdropFilter: "blur(12px)" }}
          >
            <nav
              aria-label="Mobile primary"
              className="h-full w-full flex flex-col justify-center px-8"
            >
              <ul className="flex flex-col gap-6">
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
