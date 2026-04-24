import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Item {
  title: string;
  body: string;
}

interface Props {
  items: Item[];
}

export default function StaggerList({ items }: Props) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: EASE_QUINT },
    },
  };

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7 list-none p-0"
    >
      {items.map((d, i) => (
        <motion.li key={d.title} variants={item}>
          <div className="flex items-baseline gap-3">
            <span
              className="font-body text-[0.75rem] font-medium tracking-[0.14em]"
              style={{ color: "var(--color-brand)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="font-display font-semibold text-[1.125rem] leading-[1.2] tracking-tight">
              {d.title}
            </h4>
          </div>
          <p
            className="mt-2 text-[0.9375rem] leading-[1.55] pl-8"
            style={{ color: "var(--color-muted)" }}
          >
            {d.body}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
