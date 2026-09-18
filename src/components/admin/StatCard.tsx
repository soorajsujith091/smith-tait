"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  badge?: {
    text: string;
    trend: "up" | "down" | "neutral";
  };
  children?: React.ReactNode;
};

export function StatCard({ title, value, subtitle, badge, children }: StatCardProps) {
  return (
    <div className="bg-[var(--color-navy)] border border-white/5 rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)]">
          {title}
        </h3>
        {badge && (
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-[10px] font-display uppercase tracking-wider text-[var(--color-accent)]">
            {badge.trend === "up" && <ArrowUpRight size={12} />}
            {badge.trend === "down" && <ArrowDownRight size={12} />}
            {badge.text}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-3 mb-2 relative z-10">
        <span className="text-4xl font-display text-white">{value}</span>
        {subtitle && (
          <span className="text-xs font-body text-[var(--color-grey)]">
            {subtitle}
          </span>
        )}
      </div>

      <div className="mt-auto pt-4 relative z-0">
        {children}
      </div>
    </div>
  );
}
