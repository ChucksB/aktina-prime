import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "span";
  className?: string;
  once?: boolean;
  amount?: number;
}

const EASE_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Reveal({
  children,
  delay = 0,
  y = 32,
  as = "div",
  className,
  once = true,
  amount = 0.25,
}: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.8,
        delay: reduce ? 0 : delay,
        ease: EASE_QUINT,
      },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
