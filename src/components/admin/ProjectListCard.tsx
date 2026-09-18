"use client";

import React from "react";
import Image from "next/image";
import { Building2, Tag } from "lucide-react";

type ProjectListCardProps = {
  title: string;
  location: string;
  subtitle: string;
  status: string;
  imageUrl: string;
  fixtures: number;
  tags: string[];
};

export function ProjectListCard({
  title,
  location,
  subtitle,
  status,
  imageUrl,
  fixtures,
  tags,
}: ProjectListCardProps) {
  return (
    <div className="bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-6 group hover:border-[var(--color-accent)]/30 transition-colors">
      {/* Image */}
      <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0">
        <Image src={imageUrl} alt={title} fill className="object-cover img-cinematic" />
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-display text-white border border-white/10 uppercase tracking-wider">
          {fixtures} Fixtures
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-baseline gap-3">
            <h4 className="text-lg font-display text-white">{title}</h4>
            <span className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)]">
              {location}
            </span>
          </div>
          <div className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-3 py-1 rounded-full text-[10px] font-display uppercase tracking-widest border border-[var(--color-accent)]/20">
            {status}
          </div>
        </div>
        
        <p className="text-sm font-body text-[var(--color-grey)] mb-4">
          {subtitle}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-display uppercase tracking-wider text-[var(--color-grey)]">
          <div className="flex items-center gap-1.5">
            <Building2 size={14} className="text-[var(--color-accent)] opacity-70" />
            <span>Sim & Mockups</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag size={14} className="text-[var(--color-accent)] opacity-70" />
            <span>Target: {tags.join(" / ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
