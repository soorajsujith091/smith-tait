"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type StatBlockProps = {
  value: number;
  suffix?: string;
  label: string;
  light?: boolean;
};

export function StatBlock({ value, suffix = "", label, light = false }: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`font-display font-light tracking-tight ${
          light ? "text-[var(--color-white)]" : "text-[var(--color-navy)]"
        }`}
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1 }}
      >
        {count}
        {suffix}
      </div>
      <p
        className={`mt-3 text-sm font-body tracking-wide uppercase ${
          light ? "text-[var(--color-white)]/50" : "text-[var(--color-grey)]"
        }`}
      >
        {label}
      </p>
    </motion.div>
  );
}
