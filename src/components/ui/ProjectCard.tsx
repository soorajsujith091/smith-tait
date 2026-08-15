"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { MapPin, ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block relative overflow-hidden rounded-[var(--radius-media)]"
        id={`project-card-${project.slug}`}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)]">
          <Image
            src={project.heroImage}
            alt={`${project.name} — ${project.category} lighting design project in ${project.location}`}
            fill
            className="object-cover img-cinematic transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="text-caption text-[var(--color-white)]/70 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>

          {/* Arrow indicator */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight size={18} className="text-[var(--color-ink-dark)]" />
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-heading font-display text-[var(--color-white)] mb-1 transition-transform duration-500 group-hover:-translate-y-1">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-sm font-body text-[var(--color-white)]/60 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <MapPin size={12} />
              <span>{project.location}</span>
              <span className="mx-2 text-[var(--color-accent)]">·</span>
              <span>{project.year}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
