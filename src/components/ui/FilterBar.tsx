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
  light?: boolean;
};

export function FilterBar({ activeFilter, onFilterChange, light }: FilterBarProps) {
  return (
    <>
      {/* Mobile Select */}
      <div className="md:hidden mb-8">
        <select
          value={activeFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className={`w-full p-3 rounded-lg border font-body text-sm ${
            light
              ? "bg-[var(--color-navy)] text-[var(--color-white)] border-white/20 focus:border-[var(--color-accent)]"
              : "bg-white text-[var(--color-navy)] border-[var(--color-grey)]/30 focus:border-[var(--color-accent)]"
          } focus:outline-none`}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Pills */}
      <motion.div
        className="hidden md:flex flex-wrap gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {categories.map((cat) => {
          const isActive = activeFilter === cat;
          const baseClasses = "relative px-5 py-2.5 text-sm font-body tracking-wide rounded-[var(--radius-pill)] border transition-all duration-300";
          
          let colorClasses = "";
          if (isActive) {
            colorClasses = "bg-[var(--color-accent)] text-[var(--color-ink-dark)] border-[var(--color-accent)]";
          } else if (light) {
            colorClasses = "bg-transparent text-[var(--color-white)] border-white/30 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]";
          } else {
            colorClasses = "bg-transparent text-[var(--color-navy)] border-[var(--color-grey)]/30 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]";
          }

          return (
            <button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={`${baseClasses} ${colorClasses}`}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>
    </>
  );
}
