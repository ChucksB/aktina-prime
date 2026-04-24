import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Props {
  words: string[];
  brandPeriod?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function WordReveal({
  words,
  brandPeriod = false,
  className,
  ariaLabel,
}: Props) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const line: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 38 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.95, ease: EASE_EXPO },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      aria-label={ariaLabel ?? words.join(" ")}
      className={className}
    >
      <span className="sr-only">{ariaLabel ?? words.join(" ")}</span>
      <span aria-hidden="true" className="block">
        {words.map((w, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={line} className="block">
              {w}
              {brandPeriod && i === words.length - 1 ? (
                <span style={{ color: "var(--color-brand)" }}>.</span>
              ) : null}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.span>
  );
}
