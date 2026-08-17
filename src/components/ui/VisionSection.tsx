"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function VisionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Setup elements
      gsap.set(".vision-text-1", { opacity: 0, y: 60, filter: "blur(10px)", scale: 0.95 });
      gsap.set(".vision-img-1", { opacity: 0, scale: 0.95 });
      gsap.set(".vision-text-2", { opacity: 0, y: 60, filter: "blur(10px)", scale: 0.95 });
      gsap.set(".vision-img-2", { opacity: 0, scale: 0.95 });

      // Trigger for block 1
      ScrollTrigger.create({
        trigger: ".vision-block-1",
        start: "top 80%",
        toggleActions: "play none none reverse",
        animation: gsap.timeline()
          .to(".vision-text-1", { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 2.0, ease: "expo.out" }, 0)
          .to(".vision-img-1", { opacity: 1, scale: 1, duration: 2.0, ease: "power3.out" }, 0.2)
      });

      // Trigger for block 2
      ScrollTrigger.create({
        trigger: ".vision-block-2",
        start: "top 80%",
        toggleActions: "play none none reverse",
        animation: gsap.timeline()
          .to(".vision-img-2", { opacity: 1, scale: 1, duration: 2.0, ease: "power3.out" }, 0)
          .to(".vision-text-2", { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 2.0, ease: "expo.out" }, 0.2)
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-section-paper text-[var(--color-navy)] pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Film grain style overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>")`
        }}
        aria-hidden="true" 
      />

      <div className="container-st max-w-[1400px] relative z-10">
        {/* Block 1 */}
        <div className="vision-block-1 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-24 md:mb-40">
          <div className="vision-text-1 order-2 md:order-1 flex flex-col justify-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.2] font-extralight tracking-tight text-[var(--color-navy)] drop-shadow-sm">
              where light reveals the <br className="hidden xl:block"/>
              true poetry of <br className="hidden xl:block"/>
              <span className="underline decoration-[var(--color-grey)]/30 underline-offset-8 decoration-1">architecture and space,</span><br className="hidden xl:block"/>
              <span className="underline decoration-[var(--color-grey)]/30 underline-offset-8 decoration-1">enriching human experience</span>
            </h2>
            <Link href="/about" className="mt-8 text-sm font-body text-[var(--color-grey)] hover:text-[var(--color-accent)] transition-colors">
              Find out more about the studio
            </Link>
          </div>
          <div className="vision-img-1 order-1 md:order-2">
            <div className="relative aspect-[4/5] md:aspect-square w-full md:w-[120%] md:-mr-[20%] shadow-xl rounded-none overflow-hidden">
              <Image src="/images/projects/landscape-01.jpg" alt="Joyful places" fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" />
            </div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="vision-block-2 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-12 md:mb-24">
          <div className="vision-img-2 order-1 md:order-1 pt-0 md:pt-12">
            <div className="relative aspect-[4/5] md:aspect-square w-full md:w-[120%] md:-ml-[20%] shadow-xl rounded-none overflow-hidden">
              <Image src="/images/general/aerial-view-streets-office-building-business-district.jpg" alt="Impactful projects" fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" />
            </div>
          </div>
          <div className="vision-text-2 order-2 md:order-2 flex flex-col justify-center md:pl-16 lg:pl-24">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.2] font-extralight tracking-tight text-[var(--color-navy)] drop-shadow-sm">
              We exist to craft <br className="hidden xl:block"/>
              illuminated environments <br className="hidden xl:block"/>
              that transform how <br className="hidden xl:block"/>
              people inhabit the night
            </h2>
            <Link href="/projects" className="mt-8 text-sm font-body text-[var(--color-grey)] hover:text-[var(--color-accent)] transition-colors">
              Find out more about our projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
