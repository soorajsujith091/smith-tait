"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { clients } from "@/data/clients";
import { projects } from "@/data/projects";

export default function ClientsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-section-navy pt-40 pb-24 md:pt-64 md:pb-32 min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center">
        <div className="container-st">
          <SectionLabel label="Clients" light />
          <AnimatedHeading as="h1" className="text-[var(--color-white)] max-w-3xl">
            Trusted Partnerships
          </AnimatedHeading>
          <motion.p
            className="text-lg font-body text-[var(--color-white)]/60 mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We work with the region&apos;s most ambitious developers, architects, and
            operators to deliver lighting environments of the highest quality.
          </motion.p>
        </div>
      </section>

      {/* Logo Wall */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <SectionLabel label="Our Clients" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                className="flex items-center justify-center p-6 rounded-[var(--radius-card)] border border-[var(--color-grey)]/10 hover:border-[var(--color-accent)]/30 transition-all duration-300 group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <span className="font-display text-sm tracking-[0.08em] uppercase text-[var(--color-grey)]/50 group-hover:text-[var(--color-accent)] transition-colors duration-300 text-center">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-section-dark py-12">
        <LogoMarquee clients={clients} />
      </section>

      {/* Selected Relationships */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <SectionLabel label="Selected Relationships" />
          <AnimatedHeading as="h2">Featured Client Work</AnimatedHeading>
          <motion.p
            className="text-body text-[var(--color-grey)] mt-4 mb-12 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Long-standing collaborations with leading developers and operators
            allow us to refine and evolve our lighting approach across multiple
            projects.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {projects.slice(0, 3).map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
