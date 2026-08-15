"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Building2,
  Layers,
  User,
  ArrowLeft,
  ArrowRight,
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
      <section className="bg-section-paper section-padding pt-32">
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

  const metaItems = [
    { icon: User, label: "Client", value: project.client },
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Building2, label: "Type", value: project.category },
    { icon: Layers, label: "Scope", value: project.scope },
    { icon: Calendar, label: "Year", value: project.year.toString() },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={project.heroImage}
          alt={`${project.name} — ${project.category} lighting design by Smith Tait`}
          fill
          className="object-cover img-cinematic"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-dark)]/80 via-transparent to-[var(--color-ink-dark)]/40" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container-st">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-body text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors mb-4"
              >
                <ArrowLeft size={14} />
                All Projects
              </Link>
              <span className="text-caption text-[var(--color-accent)] block mb-3">
                {project.category}
              </span>
              <h1 className="text-section font-display text-[var(--color-white)]">
                {project.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meta row */}
      <section className="bg-section-navy py-8">
        <div className="container-st">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {metaItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <item.icon
                  size={16}
                  className="text-[var(--color-accent)] mt-0.5 flex-shrink-0"
                />
                <div>
                  <span className="text-xs font-body text-[var(--color-white)]/40 uppercase tracking-wider block">
                    {item.label}
                  </span>
                  <span className="text-sm font-body text-[var(--color-white)]">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <div className="max-w-3xl">
            <SectionLabel label="Overview" />
            <motion.p
              className="text-xl md:text-2xl font-body font-light text-[var(--color-navy)] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {project.overview}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Design Concept */}
      <section className="bg-section-burgundy section-padding">
        <div className="container-st">
          <div className="max-w-3xl">
            <SectionLabel label="Lighting Concept" light />
            <motion.p
              className="text-lg font-body text-[var(--color-white)]/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {project.designConcept}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <SectionLabel label="Gallery" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {project.gallery.map((img, i) => (
              <motion.button
                key={i}
                className="relative aspect-[16/10] rounded-[var(--radius-media)] overflow-hidden cursor-pointer group"
                onClick={() => {
                  setLightboxIndex(i);
                  setLightboxOpen(true);
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                aria-label={`View ${project.name} image ${i + 1} in gallery`}
              >
                <Image
                  src={img}
                  alt={`${project.name} — gallery image ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="bg-section-navy section-padding">
        <div className="container-st">
          <SectionLabel label="Project Credits" light />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {project.credits.map((credit, i) => (
              <motion.div
                key={credit.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="text-xs font-body text-[var(--color-accent)] uppercase tracking-wider block mb-1">
                  {credit.role}
                </span>
                <span className="text-base font-display text-[var(--color-white)]">
                  {credit.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-section-paper section-padding">
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
      <div className="bg-section-navy">
        <div className="container-st">
          <div className="flex items-stretch border-t border-white/10">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="flex-1 flex items-center gap-3 py-6 text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors group"
              >
                <ChevronLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                />
                <div>
                  <span className="text-xs uppercase tracking-wider block text-[var(--color-white)]/30">
                    Previous
                  </span>
                  <span className="text-sm font-display">
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
                className="flex-1 flex items-center justify-end gap-3 py-6 text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors group text-right"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider block text-[var(--color-white)]/30">
                    Next
                  </span>
                  <span className="text-sm font-display">
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

      {/* Lightbox */}
      <Lightbox
        images={project.gallery}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        alt={project.name}
      />
    </>
  );
}
