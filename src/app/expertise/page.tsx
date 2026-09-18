"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

const expertiseAreas = [
  {
    id: "hospitality",
    title: "Hospitality",
    subtitle: "Hotels, Resorts & Fine Dining",
    description:
      "We create lighting environments that define the guest experience — from the drama of a grand lobby to the intimacy of a private dining room. Our hospitality work spans five-star hotels, boutique resorts, and destination restaurants across the Gulf region.",
    image: "/images/projects/hotel-lobby-01.jpg",
    stats: "50+ five-star hotel projects",
  },
  {
    id: "residential",
    title: "Residential",
    subtitle: "Luxury Villas & Residential Towers",
    description:
      "Residential lighting must respond to the rhythms of daily life — energising in the morning, calming at night. We design integrated lighting and control systems for ultra-luxury villas, penthouses, and branded residential towers.",
    image: "/images/projects/residential-01.jpg",
    stats: "30+ luxury residential projects",
  },
  {
    id: "facade",
    title: "Facade Lighting",
    subtitle: "Building Envelope Illumination",
    description:
      "The facade is a building's public face after dark. Our facade lighting schemes reveal architectural form, create nocturnal identities, and establish visual hierarchy within urban skylines — from subtle wash lighting to programmable media facades.",
    image: "/images/projects/facade-01.jpg",
    stats: "40+ facade projects delivered",
  },
  {
    id: "landscape",
    title: "Landscape Lighting",
    subtitle: "Parks, Gardens & Outdoor Spaces",
    description:
      "We approach landscape lighting with ecological sensitivity, balancing the need for safety and ambience with dark-sky principles. Our schemes extend the usability of outdoor spaces while preserving natural nocturnal environments.",
    image: "/images/projects/landscape-01.jpg",
    stats: "20+ landscape projects",
  },
  {
    id: "public-realm",
    title: "Public Realm",
    subtitle: "Plazas, Promenades & Civic Spaces",
    description:
      "Public realm lighting shapes the character of cities after dark. We design lighting masterplans for plazas, waterfronts, pedestrian districts, and civic spaces that are welcoming, safe, and visually cohesive.",
    image: "/images/projects/public-realm-01.jpg",
    stats: "15+ public realm masterplans",
  },
  {
    id: "mixed-use",
    title: "Mixed-Use / Commercial",
    subtitle: "Integrated Development Lighting",
    description:
      "Mixed-use developments demand a unified lighting strategy across multiple programmes — retail, office, residential, and hospitality — creating a coherent nocturnal identity while respecting the unique character of each component.",
    image: "/images/projects/facade-02.jpg",
    stats: "25+ mixed-use developments",
  },
];

export default function ExpertisePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-32 min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center overflow-hidden">
        <Image
          src="/images/general/texture-perspective-transport-motion-roadside-travel.jpg"
          alt="Our Expertise"
          fill
          className="object-cover img-cinematic"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-navy)]/80" />
        <div className="container-fluid relative z-10">
          <SectionLabel label="Expertise" light />
          <AnimatedHeading as="h1" className="text-[var(--color-white)] max-w-4xl">
            Six Disciplines of Light
          </AnimatedHeading>
          <motion.p
            className="text-lg font-body text-[var(--color-white)]/60 mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Our expertise spans the full spectrum of architectural lighting — from intimate
            residential interiors to city-scale public realm masterplans.
          </motion.p>
        </div>
      </section>

      {/* Expertise sections */}
      {expertiseAreas.map((area, i) => (
        <section
          key={area.id}
          id={area.id}
          className={`section-padding ${
            i % 2 === 0 ? "bg-section-paper" : "bg-section-navy"
          }`}
        >
          <div className="container-st">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                i % 2 !== 0 ? "lg:[direction:rtl] lg:[&>*]:[direction:ltr]" : ""
              }`}
            >
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <SectionLabel label={area.subtitle} light={i % 2 !== 0} />
                <h2
                  className={`text-heading font-display mb-4 ${
                    i % 2 !== 0 ? "text-[var(--color-white)]" : "text-[var(--color-navy)]"
                  }`}
                >
                  {area.title}
                </h2>
                <p
                  className={`text-body leading-relaxed mb-6 ${
                    i % 2 !== 0 ? "text-[var(--color-white)]/70" : "text-[var(--color-grey)]"
                  }`}
                >
                  {area.description}
                </p>
                <p className="text-sm font-display font-medium text-[var(--color-accent)] mb-6">
                  {area.stats}
                </p>
                <Link
                  href={`/projects?category=${area.title}`}
                  className={`inline-flex items-center gap-2 text-sm font-display tracking-wide uppercase transition-colors group ${
                    i % 2 !== 0
                      ? "text-[var(--color-accent)] hover:text-[var(--color-white)]"
                      : "text-[var(--color-navy)] hover:text-[var(--color-accent)]"
                  }`}
                >
                  View {area.title} Projects
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              {/* Image */}
              <motion.div
                className="relative aspect-[4/3] rounded-[var(--radius-media)] overflow-hidden"
                initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={area.image}
                  alt={`${area.title} lighting design by Smith Tait`}
                  fill
                  className="object-cover img-cinematic"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
