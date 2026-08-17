"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { DestinationCard } from "@/components/ui/card-21";
import { StatBlock } from "@/components/ui/StatBlock";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { ProgressiveBlurCard } from "@/components/ui/progressive-blur-card";
import { projects } from "@/data/projects";
import { clients } from "@/data/clients";
import { newsArticles } from "@/data/news";
import { PrismaHero } from "@/components/ui/prisma-hero";
import { VisionSection } from "@/components/ui/VisionSection";
import { FilterBar } from "@/components/ui/FilterBar";

const heroImages = [
  "/images/projects/hotel-lobby-01.jpg",
  "/images/projects/facade-01.jpg",
  "/images/projects/landscape-01.jpg",
  "/images/projects/residential-01.jpg",
];

const expertiseAreas = [
  {
    title: "Hospitality",
    description: "Hotels, resorts & fine dining",
    href: "/expertise#hospitality",
    image: "/images/projects/hotel-lobby-01.jpg",
  },
  {
    title: "Residential",
    description: "Luxury villas & residential towers",
    href: "/expertise#residential",
    image: "/images/projects/residential-01.jpg",
  },
  {
    title: "Facade",
    description: "Building envelope illumination",
    href: "/expertise#facade",
    image: "/images/projects/facade-01.jpg",
  },
  {
    title: "Landscape",
    description: "Parks, gardens & outdoor spaces",
    href: "/expertise#landscape",
    image: "/images/projects/landscape-01.jpg",
  },
  {
    title: "Public Realm",
    description: "Plazas, promenades & civic spaces",
    href: "/expertise#public-realm",
    image: "/images/projects/public-realm-01.jpg",
  },
  {
    title: "Mixed-Use",
    description: "Integrated commercial developments",
    href: "/expertise#mixed-use",
    image: "/images/projects/facade-02.jpg",
  },
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects.slice(0, 8) 
    : projects.filter(p => p.category === activeFilter).slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <PrismaHero />

      {/* ===== VISION STATEMENT ===== */}
      <VisionSection />

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="bg-section-paper section-padding pt-0">
        <div className="container-st">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionLabel label="About the Studio" />
              <AnimatedHeading as="h2">
                Where Heritage Meets Innovation
              </AnimatedHeading>
              <motion.p
                className="text-body text-[var(--color-grey)] mt-6 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Founded on the modernist principles of Thomas Smith Tait in 1933,
                Smith Tait has evolved into a leading architectural lighting design
                studio. From our base in Dubai, we shape the nocturnal identity of
                hospitality, residential, and public realm projects across the
                MENA region and beyond.
              </motion.p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-display font-medium tracking-wide uppercase text-[var(--color-navy)] hover:text-[var(--color-accent)] transition-colors group"
                >
                  Learn Our Story
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="relative aspect-square md:aspect-[5/4] lg:aspect-[4/4] rounded-[var(--radius-media)] overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/general/about-01.jpg"
                alt="Smith Tait studio — architectural lighting design team at work"
                fill
                className="object-cover img-cinematic"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="bg-section-navy section-padding">
        <div className="container-st">
          <SectionLabel label="Featured Projects" light />
          <div className="flex items-end justify-between mb-8">
            <AnimatedHeading as="h2" className="text-[var(--color-white)]">
              Selected Work
            </AnimatedHeading>
            <Link
              href="/projects"
              className="desktop-only inline-flex items-center gap-2 text-sm font-display tracking-wide uppercase text-[var(--color-accent)] hover:text-[var(--color-white)] transition-colors group"
            >
              View All
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} light />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filteredProjects.map((project, i) => {
              // Cycle through rich architectural colors
              const colors = ["220 30% 20%", "350 30% 25%", "45 40% 25%", "210 20% 30%"];
              const themeColor = colors[i % colors.length];
              
              return (
                <DestinationCard 
                  key={project.slug} 
                  imageUrl={project.heroImage || project.gallery?.[0] || ""} 
                  location={project.name}
                  flag=""
                  stats={`${project.category} • ${project.location}`}
                  href={`/projects/${project.slug}`}
                  themeColor={themeColor}
                />
              );
            })}
          </div>
          <div className="mt-8 text-center mobile-only">
            <Link href="/projects" className="btn-outline">
              View All Projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== EXPERTISE ===== */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <SectionLabel label="Our Expertise" />
          <AnimatedHeading as="h2">Six Disciplines of Light</AnimatedHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 mt-12">
            {expertiseAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <ProgressiveBlurCard
                  title={area.title}
                  description={area.description}
                  image={area.image}
                  href={area.href}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEGACY TEASER ===== */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[60vh] min-h-[400px] flex items-center">
          <Image
            src="/images/general/park-city.jpg"
            alt="Thomas Smith Tait's modernist architectural legacy"
            fill
            className="object-cover img-cinematic"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--color-burgundy)]/70" />
          <div className="relative z-10 container-st text-center">
            <motion.p
              className="text-caption text-[var(--color-accent)] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Since 1933
            </motion.p>
            <motion.h2
              className="text-section font-display text-[var(--color-white)] mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              90 Years of Design Legacy
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/legacy" className="btn-primary">
                Explore Our Heritage
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS & CLIENTS ===== */}
      <section className="bg-section-dark section-padding">
        <div className="container-st">
          <SectionLabel label="Impact" light />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
            <StatBlock value={90} suffix="+" label="Years of Design" light />
            <StatBlock value={250} suffix="+" label="Projects Delivered" light />
            <StatBlock value={15} label="Countries" light />
            <StatBlock value={12} label="Industry Awards" light />
          </div>
          <div className="divider mb-8" />
          <LogoMarquee clients={clients} />
        </div>
      </section>

      {/* ===== LATEST NEWS ===== */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <SectionLabel label="News & Insights" />
          <div className="flex items-end justify-between mb-12">
            <AnimatedHeading as="h2">Latest Updates</AnimatedHeading>
            <Link
              href="/news"
              className="desktop-only inline-flex items-center gap-2 text-sm font-display tracking-wide uppercase text-[var(--color-navy)] hover:text-[var(--color-accent)] transition-colors group"
            >
              View All
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {newsArticles.slice(0, 3).map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link
                  href={`/news/${article.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] rounded-[var(--radius-media)] overflow-hidden mb-4">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <span className="text-caption text-[var(--color-accent)] mb-2 block">
                    {article.category}
                  </span>
                  <h3 className="font-display text-lg font-medium text-[var(--color-navy)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm font-body text-[var(--color-grey)] mt-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA BAND ===== */}
      <section className="relative section-padding overflow-hidden">
        {/* Background Image & Overlay */}
        <Image
          src="/images/general/view-light-lamp-with-futuristic-design.jpg"
          alt="Futuristic lighting design"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--color-navy)]/80" />
        
        <div className="relative z-10 container-st text-center">
          <motion.h2
            className="text-section font-display text-[var(--color-white)] mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Transform Your Space with Light?
          </motion.h2>
          <motion.p
            className="text-lg font-body text-[var(--color-white)]/60 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Let&apos;s discuss how lighting can elevate your next project.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/contact" className="btn-primary text-base px-10 py-4">
              Get in Touch
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
