"use client";

import { motion } from "framer-motion";
import type { ProjectCategory } from "@/types";

const categories: (ProjectCategory | "All")[] = [
  "All",
  "Hospitality",
  "Residential",
  "Facade",
  "Landscape",
  "Public Realm",
  "Mixed-Use",
];

type FilterBarProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-3 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          className={`relative px-5 py-2.5 text-sm font-body tracking-wide rounded-[var(--radius-pill)] border transition-all duration-300 ${
            activeFilter === cat
              ? "bg-[var(--color-accent)] text-[var(--color-ink-dark)] border-[var(--color-accent)]"
              : "bg-transparent text-[var(--color-navy)] border-[var(--color-grey)]/30 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          }`}
          id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {cat}
        </button>
      ))}
    </motion.div>
  );
}
