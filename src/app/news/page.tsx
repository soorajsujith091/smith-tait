"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { newsArticles } from "@/data/news";

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-32 min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center overflow-hidden">
        <Image
          src="/images/general/park-city.jpg"
          alt="News & Insights"
          fill
          className="object-cover img-cinematic"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-navy)]/80" />
        <div className="container-fluid relative z-10">
          <SectionLabel label="News & Insights" light />
          <AnimatedHeading as="h1" className="text-[var(--color-white)] max-w-3xl">
            Latest from the Studio
          </AnimatedHeading>
          <motion.p
            className="text-lg font-body text-[var(--color-white)]/60 mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Project updates, industry insights, awards, and events from the
            Smith Tait studio.
          </motion.p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link href={`/news/${article.slug}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-[var(--radius-media)] overflow-hidden mb-5">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-caption text-[var(--color-accent)]">
                      {article.category}
                    </span>
                    <span className="text-xs font-body text-[var(--color-grey)]/50">
                      {new Date(article.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-medium text-[var(--color-navy)] group-hover:text-[var(--color-accent)] transition-colors mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm font-body text-[var(--color-grey)] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
