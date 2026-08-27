"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Timeline } from "@/components/ui/Timeline";
import { QuoteBlock } from "@/components/ui/QuoteBlock";
import { timelineMilestones } from "@/data/timeline";

export default function LegacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image
          src="/images/general/legacy-01.jpg"
          alt="Thomas Smith Tait modernist architectural legacy"
          fill
          className="object-cover img-cinematic"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-dark)]/90 via-[var(--color-ink-dark)]/40 to-transparent" />
        <div className="relative z-10 container-st pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <SectionLabel label="Our Inspiration" light />
            <h1 className="text-section font-display text-[var(--color-white)]">
              The Story of Smith Tait
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Thomas Smith Tait */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel label="The Architect" />
              <h2 className="text-heading font-display text-[var(--color-navy)] mb-6">
                Thomas Smith Tait
                <span className="block text-lg font-light text-[var(--color-grey)] mt-2">
                  1882–1954
                </span>
              </h2>
              <p className="text-body text-[var(--color-grey)] leading-relaxed mb-4">
                Thomas Smith Tait was one of the most significant British architects of the
                interwar period. A champion of modernism when classical revivalism still dominated,
                he believed that architecture should express the spirit of its time — functional,
                honest, and forward-looking.
              </p>
              <p className="text-body text-[var(--color-grey)] leading-relaxed">
                His masterwork, St Andrew's House in Edinburgh (1939), remains one of the finest
                examples of Art Deco civic architecture in the United Kingdom. The Tower of Empire,
                designed for the 1938 Empire Exhibition in Glasgow, demonstrated his ambition to
                push engineering and aesthetics to their limits.
              </p>
              <p className="text-body text-[var(--color-navy)] font-medium leading-relaxed mt-6 border-l-2 border-[var(--color-accent)] pl-4">
                Today, our lighting design studio is named in honor of his uncompromising vision. We integrate his commitment to functional beauty and material honesty into every illuminated space we craft across the modern world.
              </p>
            </motion.div>
            <motion.div
              className="relative aspect-[3/4] rounded-[var(--radius-media)] overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/general/legacy-01.jpg"
                alt="Thomas Smith Tait's architectural works"
                fill
                className="object-cover img-cinematic"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="bg-section-burgundy section-padding">
        <div className="container-st">
          <div className="max-w-3xl mx-auto text-center">
            <SectionLabel label="Design Principles" light />
            <QuoteBlock
              quote="Architecture should be the honest expression of the materials and techniques of its own time, not a nostalgic recreation of the past."
              attribution="Thomas Smith Tait"
              role="Architect, 1882–1954"
              light
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Clarity of Purpose",
                text: "Every element of light serves a defined function — revealing form, guiding movement, or creating atmosphere.",
              },
              {
                title: "Material Honesty",
                text: "We work with light as a material in its own right, respecting its physics rather than forcing arbitrary effects.",
              },
              {
                title: "Contextual Sensitivity",
                text: "Lighting design must respond to climate, culture, and place — what works in London rarely translates directly to Dubai.",
              },
            ].map((principle, i) => (
              <motion.div
                key={principle.title}
                className="border border-white/10 rounded-[var(--radius-card)] p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <h3 className="font-display text-lg font-medium text-[var(--color-white)] mb-3">
                  {principle.title}
                </h3>
                <p className="text-sm font-body text-[var(--color-white)]/60 leading-relaxed">
                  {principle.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-section-navy section-padding overflow-hidden">
        <div className="container-st">
          <SectionLabel label="Our Journey" light />
          <AnimatedHeading as="h2" className="text-[var(--color-white)] mb-12">
            Evolution of Design
          </AnimatedHeading>
          <Timeline milestones={timelineMilestones} />
        </div>
      </section>
    </>
  );
}
