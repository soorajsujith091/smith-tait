"use client";

import { motion } from "framer-motion";

type QuoteBlockProps = {
  quote: string;
  attribution: string;
  role?: string;
  light?: boolean;
};

export function QuoteBlock({ quote, attribution, role, light = false }: QuoteBlockProps) {
  return (
    <motion.blockquote
      className="relative py-8 md:py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-12 h-[2px] bg-[var(--color-accent)] mb-8" />
      <p
        className={`font-display text-2xl md:text-3xl lg:text-4xl font-light leading-snug italic mb-8 ${
          light ? "text-[var(--color-white)]" : "text-[var(--color-navy)]"
        }`}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <footer>
        <cite
          className={`not-italic font-display font-medium text-base ${
            light ? "text-[var(--color-white)]" : "text-[var(--color-navy)]"
          }`}
        >
          {attribution}
        </cite>
        {role && (
          <span
            className={`block mt-1 text-sm font-body ${
              light ? "text-[var(--color-white)]/50" : "text-[var(--color-grey)]"
            }`}
          >
            {role}
          </span>
        )}
      </footer>
    </motion.blockquote>
  );
}
