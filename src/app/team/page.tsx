"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { TeamCard } from "@/components/ui/TeamCard";
import { teamMembers } from "@/data/team";

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-section-navy pt-40 pb-24 md:pt-64 md:pb-32 min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center">
        <div className="container-st">
          <SectionLabel label="Our People" light />
          <AnimatedHeading as="h1" className="text-[var(--color-white)] max-w-3xl">
            The Team Behind the Light
          </AnimatedHeading>
          <motion.p
            className="text-lg font-body text-[var(--color-white)]/60 mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A multidisciplinary team of lighting designers, architects, and engineers
            united by a shared passion for transforming space through light.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <SectionLabel label="Leadership & Team" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {teamMembers.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-section-burgundy section-padding">
        <div className="container-st max-w-3xl">
          <SectionLabel label="Team Philosophy" light />
          <motion.p
            className="text-xl md:text-2xl font-body font-light text-[var(--color-white)] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            We believe great lighting design emerges from collaboration — between
            disciplines, between perspectives, and between studio and site. Every
            team member brings a unique lens to the work, and our best projects
            are always the result of collective intelligence.
          </motion.p>
        </div>
      </section>

      {/* Careers */}
      <section className="bg-section-paper section-padding">
        <div className="container-st text-center max-w-2xl mx-auto">
          <SectionLabel label="Careers" />
          <AnimatedHeading as="h2">Join Our Studio</AnimatedHeading>
          <motion.p
            className="text-body text-[var(--color-grey)] mt-6 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            We&apos;re always looking for talented lighting designers, architects, and
            engineers who share our passion for design excellence. If you&apos;d like to
            be part of our team, we&apos;d love to hear from you.
          </motion.p>
          <motion.a
            href="mailto:careers@smithtait.com"
            className="btn-primary mt-8 inline-flex"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            careers@smithtait.com
          </motion.a>
        </div>
      </section>
    </>
  );
}
