"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Client } from "@/types";

type LogoMarqueeProps = {
  clients: Client[];
};

export function LogoMarquee({ clients }: LogoMarqueeProps) {
  // Double the array for seamless loop
  const doubled = [...clients, ...clients];

  return (
    <div className="overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black,transparent)] w-full">
      <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
        {doubled.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex-shrink-0 px-8 md:px-12 flex items-center justify-center"
          >
            {client.logo ? (
              <Image 
                src={client.logo} 
                alt={client.name} 
                width={200} 
                height={100} 
                className="object-contain w-auto h-16 md:h-24 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500 brightness-0 invert" 
              />
            ) : (
              <span className="font-display text-lg md:text-xl tracking-[0.1em] uppercase text-[var(--color-grey)]/80 hover:text-[var(--color-accent)] transition-colors duration-500 whitespace-nowrap cursor-default select-none">
                {client.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
