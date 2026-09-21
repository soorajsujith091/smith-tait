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
import { PrismaHero } from "@/components/ui/prisma-hero";
import { VisionSection } from "@/components/ui/VisionSection";
import { FilterBar } from "@/components/ui/FilterBar";

const heroImages = [
  "/images/projects/hotel-lobby-01.jpg",
  "/images/projects/facade-01.jpg",
  "/images/projects/landscape-01.jpg",
  "/images/projects/residential-01.jpg",
];

const defaultAreasFocused = [
  {
    category: "Specialist Areas",
    items: [
      { title: "Interiors", image: "/images/projects/hotel-lobby-01.jpg", href: "/expertise#interiors" },
      { title: "Facades", image: "/images/projects/facade-01.jpg", href: "/expertise#facades" },
      { title: "Landscape", image: "/images/projects/landscape-01.jpg", href: "/expertise#landscape" },
      { title: "Master Planning", image: "/images/projects/public-realm-01.jpg", href: "/expertise#master-planning" }
    ]
  },
  {
    category: "Project Types",
    items: [
      { title: "Residential", image: "/images/projects/residential-01.jpg", href: "/expertise#residential" },
      { title: "Hospitality", image: "/images/projects/hotel-lobby-01.jpg", href: "/expertise#hospitality" },
      { title: "Public Realm", image: "/images/projects/public-realm-01.jpg", href: "/expertise#public-realm" },
      { title: "Large-Scale Mixed-Use", image: "/images/projects/facade-02.jpg", href: "/expertise#mixed-use" }
    ]
  },
  {
    category: "Design Services",
    items: [
      { title: "Supervision", image: "/images/projects/facade-01.jpg", href: "/expertise#supervision" },
      { title: "Value Engineering", image: "/images/projects/landscape-01.jpg", href: "/expertise#value-engineering" }
    ]
  }
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [featuredTitles, setFeaturedTitles] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [areasFocused, setAreasFocused] = useState<any[]>(defaultAreasFocused);
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    // Fetch dynamic featured projects and all projects from local JSON API
    const fetchData = async () => {
      try {
        const [homeRes, projRes, newsRes, clientsRes, focusDataRes] = await Promise.all([
          fetch(`/api/home-data?t=${new Date().getTime()}`),
          fetch(`/api/data/projects?t=${new Date().getTime()}`),
          fetch(`/api/data/news?t=${new Date().getTime()}`),
          fetch(`/api/data/clients?t=${new Date().getTime()}`),
          fetch(`/api/data/focusData?t=${new Date().getTime()}`)
        ]);
        
        const homeDataJson = await homeRes.json();
        const projData = await projRes.json();
        const newsData = await newsRes.json();
        const clientsData = await clientsRes.json();
        const focusData = await focusDataRes.json();
        
        if (homeDataJson) {
          setHomeData(homeDataJson);
          if (homeDataJson.featuredProjects) {
            setFeaturedTitles(homeDataJson.featuredProjects.map((p: any) => p.title));
          }
        }
        if (projData.success) {
          setProjects(projData.data);
        }
        if (newsData.success) {
          setNewsArticles(newsData.data);
        }
        if (clientsData.success) {
          setClients(clientsData.data);
        }
        if (focusData.success && focusData.data.areasFocused) {
          setAreasFocused(focusData.data.areasFocused);
        }
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };
    fetchData();
  }, []);

  // When "All" is selected, show all projects (capped at 8 for the homepage).
  // When a specific category is selected, show ALL projects in that category (capped at 8).
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
      <PrismaHero heroImages={homeData?.heroImages} />


      {/* ===== FEATURED PROJECTS ===== */}
      <section className="bg-section-paper section-padding relative z-10">
        <div className="container-st">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Sticky Header Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:pr-8 z-10">
              <SectionLabel label="Featured Projects" />
              <AnimatedHeading as="h2" className="mt-4 text-4xl lg:text-5xl tracking-tight text-[var(--color-navy)]">
                Selected Work
              </AnimatedHeading>
              
              <div className="mt-8 mb-8 lg:mb-0">
                <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              </div>
              
              <div className="hidden lg:block mt-12">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm font-display tracking-wide uppercase text-[var(--color-accent)] hover:text-[var(--color-navy)] transition-colors group"
                >
                  View All Projects
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* Scrolling Content Column */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-6">
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
              <div className="mt-12 text-center lg:hidden">
                <Link href="/projects" className="btn-primary">
                  View All Projects
                  <ArrowRight size={14} className="ml-2 inline" />
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ===== AREAS FOCUSED ===== */}
      <section className="bg-section-paper section-padding relative">
        <div className="container-st">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Sticky Header Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:pr-8 z-10">
              <SectionLabel label="Our Focus" />
              <AnimatedHeading as="h2" className="mt-4 text-4xl lg:text-5xl tracking-tight">
                Areas Focused
              </AnimatedHeading>
              <motion.div 
                className="w-12 h-1 bg-[var(--color-accent)] mt-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
              <motion.p 
                className="text-body text-[var(--color-grey)] mt-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our expertise spans across specialized design services and diverse project types, ensuring comprehensive architectural lighting solutions.
              </motion.p>
            </div>

            {/* Scrolling Content Column */}
            <div className="lg:col-span-8 flex flex-col gap-16 lg:gap-20 relative z-0">
              {areasFocused.map((group, groupIdx) => (
                <div key={group.category} className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="md:w-16 flex-shrink-0 pt-4 flex items-start justify-start">
                    <h3 className="text-xs md:text-sm font-display font-medium tracking-widest text-[var(--color-navy)]/60 uppercase [writing-mode:horizontal-tb] md:[writing-mode:vertical-rl] md:rotate-180">
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-y-8">
                    {group.items.map((item: any, i: number) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="flex flex-col items-center text-center group"
                      >
                        <Link href={item.href} className="w-full flex flex-col items-center">
                          <div className="relative w-full max-w-[110px] md:max-w-[130px] xl:max-w-[150px] aspect-square rounded-xl overflow-hidden border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] mb-4 bg-white">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            {/* Inner ring overlay */}
                            <div className="absolute inset-0 rounded-xl border-4 md:border-8 border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] z-10 pointer-events-none transition-colors duration-500 group-hover:border-[var(--color-accent)]/80" />
                          </div>
                          <h4 className="text-[10px] md:text-xs font-display font-medium text-[var(--color-navy)] uppercase tracking-widest px-1 group-hover:text-[var(--color-accent)] transition-colors leading-relaxed">
                            {item.title}
                          </h4>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

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
              Our Background
            </motion.p>
            <motion.h2
              className="text-section font-display text-[var(--color-white)] mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              The Story of Smith Tait
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/legacy" className="btn-primary">
                Read Our Story
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ===== ACHIEVEMENTS & CLIENTS ===== */}
      <section className="bg-[#3f1b21] section-padding">
        <div className="container-st">
          <SectionLabel label="Selected Clients" light />
          <div className="mt-12">
            <LogoMarquee clients={clients} />
          </div>
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
