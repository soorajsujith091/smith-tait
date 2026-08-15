"use client";

import { motion } from "framer-motion";

type SectionLabelProps = {
  label: string;
  light?: boolean;
};

export function SectionLabel({ label, light = false }: SectionLabelProps) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
      <span
        className={`text-caption ${
          light ? "text-[var(--color-accent)]" : "text-[var(--color-grey)]"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}
