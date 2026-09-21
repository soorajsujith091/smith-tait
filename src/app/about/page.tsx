"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { QuoteBlock } from "@/components/ui/QuoteBlock";
import { TeamCard } from "@/components/ui/TeamCard";

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [aboutData, setAboutData] = useState<any>({
    heroHeading: "Defining Space Through Light",
    storyHeading: "From 1930s Modernism to Contemporary Light",
    storyParagraph1: "Smith Tait traces its origins...",
    storyParagraph2: "Today, Smith Tait carries that same conviction...",
    storyImage: "/images/general/about-01.jpg"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, aboutRes] = await Promise.all([
          fetch(`/api/data/team?t=${new Date().getTime()}`),
          fetch(`/api/data/aboutData?t=${new Date().getTime()}`)
        ]);
        
        const teamData = await teamRes.json();
        const aboutDataRes = await aboutRes.json();
        
        if (teamData.success) {
          setTeamMembers(teamData.data.slice(0, 4));
        }
        if (aboutDataRes.success) {
          setAboutData(aboutDataRes.data);
        }
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-32 min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center overflow-hidden">
        <Image
          src={aboutData.heroImage || "/images/general/about-01.jpg"}
          alt="About Smith Tait"
          fill
          className="object-cover img-cinematic"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-navy)]/80" />
        <div className="container-fluid relative z-10">
          <SectionLabel label="About" light />
          <AnimatedHeading as="h1" className="text-[var(--color-white)] max-w-4xl">
            {aboutData.heroHeading}
          </AnimatedHeading>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel label="Our Story" />
              <h2 className="text-heading font-display text-[var(--color-navy)] mb-6">
                {aboutData.storyHeading}
              </h2>
              <p className="text-body text-[var(--color-grey)] leading-relaxed mb-4">
                {aboutData.storyParagraph1}
              </p>
              <p className="text-body text-[var(--color-grey)] leading-relaxed">
                {aboutData.storyParagraph2}
              </p>
            </motion.div>
            <motion.div
              className="relative aspect-[4/3] rounded-[var(--radius-media)] overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={aboutData.storyImage || "/images/general/about-01.jpg"}
                alt="Smith Tait studio workspace"
                fill
                className="object-cover img-cinematic"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="bg-section-burgundy section-padding">
        <div className="container-st">
          <div className="max-w-3xl mx-auto">
            <SectionLabel label="Philosophy" light />
            <QuoteBlock
              quote="Light is not simply illumination — it is the medium through which architecture speaks after dark. Our role is to ensure that every space communicates its intention, its atmosphere, and its humanity through carefully considered light."
              attribution="James Hartley"
              role="Founder & Principal, Smith Tait"
              light
            />
          </div>
        </div>
      </section>

      {/* Why Smith Tait */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <SectionLabel label="Why Smith Tait" />
          <AnimatedHeading as="h2">
            What Sets Us Apart
          </AnimatedHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Heritage & Vision",
                text: "90 years of design legacy inform every project. We bring historical perspective to contemporary challenges.",
              },
              {
                title: "Regional Expertise",
                text: "Deep understanding of MENA climate, culture, and building practices. We design for this region, not despite it.",
              },
              {
                title: "End-to-End Service",
                text: "From concept through to commissioning, we manage every stage of the lighting design process with precision.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="p-8 rounded-[var(--radius-card)] border border-[var(--color-grey)]/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <h3 className="font-display text-xl font-medium text-[var(--color-navy)] mb-3">
                  {item.title}
                </h3>
                <p className="text-body text-[var(--color-grey)] leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel label="Our People" />
              <AnimatedHeading as="h2">Meet the Team</AnimatedHeading>
            </div>
            <Link
              href="/team"
              className="desktop-only inline-flex items-center gap-2 text-sm font-display tracking-wide uppercase text-[var(--color-navy)] hover:text-[var(--color-accent)] transition-colors group"
            >
              Full Team
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          {isLoading ? (
            <div className="text-center py-10 text-[var(--color-grey)]">Loading Team...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {teamMembers.map((member, i) => (
                <TeamCard key={member.name} member={member} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
