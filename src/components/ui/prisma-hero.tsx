import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- Hero ---------------- */
const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Expertise", href: "/expertise" },
  { label: "Legacy", href: "/legacy" },
  { label: "Contact", href: "/contact" }
];

export const PrismaHero = () => {
  return (
    <section className="h-screen w-full p-2 sm:p-4">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        
        {/* Background image */}
        <Image
          src="/images/general/aerial-view-streets-office-building-business-district.jpg"
          alt="Aerial view of business district"
          fill
          priority
          className="absolute inset-0 object-cover"
        />

        {/* Noise overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/40 via-transparent to-[var(--color-navy)]/80" />



        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-6 md:px-10 md:pb-10">
          <div className="grid grid-cols-12 items-end gap-6">
            
            <div className="col-span-12 lg:col-span-8">
              <p className="text-[var(--color-accent)] font-display text-sm md:text-base uppercase tracking-widest mb-4">
                Since 1933
              </p>
              <h1
                className="font-display font-medium leading-[1] tracking-[0.05em] uppercase text-[15vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[9vw] text-[var(--color-white)]"
              >
                <WordsPullUp text="SMITH TAIT" />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-2 lg:col-span-4 lg:pb-4">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-[var(--color-white)]/80 sm:text-base md:text-lg font-body font-light"
                style={{ lineHeight: 1.4 }}
              >
                We create lighting environments that reveal architecture, enrich experience, and transform the way people inhabit space across the MENA region and beyond.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] py-1.5 pl-6 pr-1.5 text-sm font-display font-medium text-[var(--color-ink-dark)] transition-all hover:gap-4 sm:text-base uppercase tracking-wider"
                >
                  View Our Work
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-ink-dark)] transition-transform group-hover:scale-105 sm:h-12 sm:w-12">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-accent)]" />
                  </span>
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
