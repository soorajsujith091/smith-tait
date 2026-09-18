"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-32 min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center overflow-hidden">
        <Image
          src="/images/general/aerial-view-streets-office-building-business-district.jpg"
          alt="Our Projects"
          fill
          className="object-cover img-cinematic"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-navy)]/80" />
        <div className="container-fluid relative z-10">
          <SectionLabel label="Portfolio" light />
          <AnimatedHeading as="h1" className="text-[var(--color-white)]">
            Our Projects
          </AnimatedHeading>
          <motion.p
            className="text-lg font-body text-[var(--color-white)]/60 mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A curated selection of architectural lighting projects across
            hospitality, residential, facade, landscape, public realm, and
            mixed-use developments.
          </motion.p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[var(--color-grey)] font-body">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
