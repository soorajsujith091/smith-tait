"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function NewsArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<any | null>(null);
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/data/news?t=${new Date().getTime()}`);
        const data = await res.json();
        if (data.success) {
          setNewsArticles(data.data);
          const found = data.data.find((a: any) => a.slug === slug);
          setArticle(found || null);
        }
      } catch (err) {
        console.error("Failed to load news", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-section-paper section-padding pt-32 min-h-screen flex items-center justify-center">
        <div className="container-st text-center">
          <h1 className="text-heading font-display">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <section className="bg-section-paper section-padding pt-32">
        <div className="container-st text-center">
          <h1 className="text-heading font-display">Article Not Found</h1>
          <Link href="/news" className="btn-primary mt-8 inline-flex">
            Back to News
          </Link>
        </div>
      </section>
    );
  }

  const relatedArticles = newsArticles
    .filter((a: any) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover img-cinematic"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-dark)]/80 via-[var(--color-ink-dark)]/30 to-[var(--color-ink-dark)]/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container-st max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-body text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors mb-4"
              >
                <ArrowLeft size={14} />
                All News
              </Link>
              <span className="text-caption text-[var(--color-accent)] block mb-3">
                {article.category}
              </span>
              <h1 className="text-heading md:text-section font-display text-[var(--color-white)]">
                {article.title}
              </h1>
              <div className="flex items-center gap-2 mt-4 text-sm font-body text-[var(--color-white)]/50">
                <Calendar size={14} />
                {new Date(article.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-section-paper section-padding">
        <div className="container-st max-w-3xl">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-xl font-body font-light text-[var(--color-navy)] leading-relaxed mb-8">
              {article.excerpt}
            </p>
            <div className="text-body font-body text-[var(--color-grey)] leading-relaxed space-y-6">
              <p>{article.body}</p>
              <p>
                For more information about this project or to discuss how Smith
                Tait can support your next development, please{" "}
                <Link
                  href="/contact"
                  className="text-[var(--color-accent)] underline underline-offset-4 hover:no-underline"
                >
                  get in touch
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-section-navy section-padding">
          <div className="container-st">
            <SectionLabel label="Related Articles" light />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((related, i) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <Link
                    href={`/news/${related.slug}`}
                    className="group flex gap-6 items-start"
                  >
                    <div className="relative w-32 h-24 flex-shrink-0 rounded-[var(--radius-card)] overflow-hidden">
                      <Image
                        src={related.coverImage}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="128px"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-body text-[var(--color-accent)] uppercase tracking-wider">
                        {related.category}
                      </span>
                      <h3 className="font-display text-base font-medium text-[var(--color-white)] group-hover:text-[var(--color-accent)] transition-colors mt-1 line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
