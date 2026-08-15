"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TimelineMilestone } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TimelineProps = {
  milestones: TimelineMilestone[];
};

export function Timeline({ milestones }: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Navigation arrows (desktop) */}
      <div className="desktop-only absolute -top-16 right-0 flex items-center gap-3 z-10">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[var(--color-white)]/60 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all"
          aria-label="Scroll timeline left"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[var(--color-white)]/60 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all"
          aria-label="Scroll timeline right"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Scrollable timeline */}
      <div
        ref={scrollRef}
        className="flex gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {milestones.map((milestone, i) => (
          <motion.div
            key={milestone.year}
            className="flex-shrink-0 w-[300px] md:w-[400px] snap-start relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {/* Timeline line */}
            <div className="flex items-center mb-8">
              <div className="w-3 h-3 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
              <div className="h-[1px] bg-white/20 flex-1" />
            </div>

            <div className="pr-8">
              {/* Era label */}
              <span className="text-caption text-[var(--color-accent)] mb-2 block">
                {milestone.era}
              </span>

              {/* Year */}
              <span className="font-display text-4xl font-light text-[var(--color-white)]/30 block mb-3">
                {milestone.year}
              </span>

              {/* Title */}
              <h3 className="text-lg font-display font-medium text-[var(--color-white)] mb-3">
                {milestone.title}
              </h3>

              {/* Description */}
              <p className="text-sm font-body text-[var(--color-white)]/50 leading-relaxed mb-4">
                {milestone.description}
              </p>

              {/* Optional image */}
              {milestone.image && (
                <div className="relative aspect-[16/10] rounded-[var(--radius-card)] overflow-hidden">
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    fill
                    className="object-cover img-cinematic"
                    sizes="400px"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
