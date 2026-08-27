"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Lightbox } from "@/components/ui/Lightbox";
import { projects } from "@/data/projects";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) {
    return (
      <section className="bg-section-paper section-padding pt-32 min-h-screen flex items-center justify-center">
        <div className="container-st text-center">
          <h1 className="text-heading font-display">Project Not Found</h1>
          <Link href="/projects" className="btn-primary mt-8 inline-flex">
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const relatedProjects = projects
    .filter((p) => p.slug !== slug && p.category === project.category)
    .slice(0, 3);

  // For the presentation view
  const consultant = project.credits && project.credits.length > 0 ? project.credits[0].name : "Smith Tait";
  const status = project.year >= 2024 ? "Ongoing" : "Completed";

  // De-duplicate hero image if it's already in the gallery
  const allImages = project.gallery.includes(project.heroImage) 
    ? project.gallery 
    : [project.heroImage, ...project.gallery];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Desktop Slide Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Sidebar (Dark) */}
        <div className="w-full lg:w-[35%] xl:w-[30%] bg-[#12121A] text-white p-6 sm:p-10 lg:p-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center relative z-20 pt-[100px] lg:pt-0">
          
          <Link
            href="/projects"
            className="hidden lg:inline-flex items-center gap-2 text-xs font-body tracking-wider text-[var(--color-white)]/50 hover:text-[var(--color-accent)] transition-colors absolute top-[100px] left-12 uppercase z-30"
          >
            <ArrowLeft size={14} />
            All Projects
          </Link>

          <div className="mt-4 lg:mt-0 max-w-sm">
            <span className="text-[10px] md:text-xs font-display tracking-[0.2em] uppercase text-white/50 block mb-2">
              OUR PROJECTS
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-display uppercase tracking-widest mb-10 lg:mb-16 text-white">
              {project.category}
            </h1>

            <div className="space-y-4">
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/10 pb-4 items-start">
                <span className="text-[10px] md:text-xs font-display font-medium tracking-widest uppercase text-white/50 mt-0.5">NAME</span>
                <span className="text-xs md:text-sm font-display tracking-wider uppercase text-white leading-snug">{project.name}</span>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/10 pb-4 items-start">
                <span className="text-[10px] md:text-xs font-display font-medium tracking-widest uppercase text-white/50 mt-0.5">LOCATION</span>
                <span className="text-xs md:text-sm font-display tracking-wider uppercase text-white leading-snug">{project.location}</span>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/10 pb-4 items-start">
                <span className="text-[10px] md:text-xs font-display font-medium tracking-widest uppercase text-white/50 mt-0.5">CLIENT</span>
                <span className="text-xs md:text-sm font-display tracking-wider uppercase text-white leading-snug">{project.client}</span>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/10 pb-4 items-start">
                <span className="text-[10px] md:text-xs font-display font-medium tracking-widest uppercase text-white/50 mt-0.5">CONSULTANT</span>
                <span className="text-xs md:text-sm font-display tracking-wider uppercase text-white leading-snug">{consultant}</span>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/10 pb-4 items-start">
                <span className="text-[10px] md:text-xs font-display font-medium tracking-widest uppercase text-white/50 mt-0.5">SCOPE</span>
                <span className="text-xs md:text-sm font-display tracking-wider uppercase text-white leading-snug">{project.scope}</span>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/10 pb-4 items-start">
                <span className="text-[10px] md:text-xs font-display font-medium tracking-widest uppercase text-white/50 mt-0.5">STATUS</span>
                <span className="text-xs md:text-sm font-display tracking-wider uppercase text-white leading-snug">{status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content (Images) */}
        <div className="w-full lg:w-[65%] xl:w-[70%] bg-white pt-[88px] lg:pt-[100px] px-4 sm:px-8 lg:px-12 pb-20 relative flex flex-col justify-center min-h-[50vh] lg:min-h-screen">
          
          {/* Vertical Text overlay for desktop */}
          <div className="hidden xl:flex absolute right-4 top-0 bottom-0 items-center justify-center pointer-events-none z-10">
             <div className="flex items-center gap-4 rotate-90 translate-x-[40%] origin-center">
                <span className="text-xs font-display tracking-[0.4em] uppercase text-black/30 whitespace-nowrap">SMITH TAIT</span>
                <div className="h-px w-32 bg-black/20" />
             </div>
          </div>

          <div className="w-full max-w-6xl mx-auto xl:pr-12">
             <div className="columns-1 md:columns-2 gap-4 space-y-4">
                {allImages.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="relative w-full overflow-hidden group cursor-pointer break-inside-avoid"
                    onClick={() => {
                      setLightboxIndex(i);
                      setLightboxOpen(true);
                    }}
                  >
                    <Image 
                      src={img} 
                      alt={`${project.name} slide image ${i + 1}`} 
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                      loading={i < 2 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                  </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>

      {/* Description Content (Below the fold) */}
      <section className="bg-section-paper section-padding border-t border-black/5">
        <div className="container-st">
          <div className="max-w-3xl mx-auto">
            <SectionLabel label="Overview" />
            <p className="text-xl md:text-2xl font-body font-light text-[var(--color-navy)] leading-relaxed mb-16">
              {project.overview}
            </p>

            <SectionLabel label="Lighting Concept" />
            <p className="text-lg font-body text-[var(--color-navy)]/80 leading-relaxed mb-16">
              {project.designConcept}
            </p>

            <SectionLabel label="Project Credits" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {project.credits.map((credit, i) => (
                <div key={credit.role}>
                  <span className="text-xs font-body text-[var(--color-navy)]/50 uppercase tracking-wider block mb-1">
                    {credit.role}
                  </span>
                  <span className="text-base font-display text-[var(--color-navy)]">
                    {credit.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-white section-padding border-t border-black/5">
          <div className="container-st">
            <SectionLabel label="Related Projects" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {relatedProjects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <div className="bg-[#12121A]">
        <div className="container-st">
          <div className="flex items-stretch">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="flex-1 flex items-center gap-3 py-8 text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors group"
              >
                <ChevronLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-widest block text-[var(--color-white)]/30 mb-1">
                    Previous Project
                  </span>
                  <span className="text-sm font-display tracking-widest uppercase">
                    {prevProject.name}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="flex-1 flex items-center justify-end gap-3 py-8 text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors group text-right border-l border-white/10 pl-4"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest block text-[var(--color-white)]/30 mb-1">
                    Next Project
                  </span>
                  <span className="text-sm font-display tracking-widest uppercase">
                    {nextProject.name}
                  </span>
                </div>
                <ChevronRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      <Lightbox
        images={allImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </div>
  );
}
