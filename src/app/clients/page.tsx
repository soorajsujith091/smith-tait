"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [heroImage, setHeroImage] = useState<string>("/images/general/vertical-distant-shot-singapore-marina-bay-sands-nighttime-singapore.jpg");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`/api/data/clients?t=${new Date().getTime()}`);
        const data = await res.json();
        if (data.success) {
          setClients(data.data);
        }
      } catch (err) {
        console.error("Failed to load clients", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchClientsPageData = async () => {
      try {
        const res = await fetch(`/api/data/clientsPageData?t=${new Date().getTime()}`);
        const data = await res.json();
        if (data.success && data.data && data.data.heroImage) {
          setHeroImage(data.data.heroImage);
        }
      } catch (err) {
        console.error("Failed to load clients page data", err);
      }
    };
    
    fetchClients();
    fetchClientsPageData();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-32 min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt="Singapore Marina Bay Sands Nighttime"
          fill
          className="object-cover img-cinematic"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-navy)]/80" />
        <div className="container-fluid relative z-10">
          <SectionLabel label="Clients" light />
          <AnimatedHeading as="h1" className="text-[var(--color-white)] max-w-3xl">
            Trusted Partnerships
          </AnimatedHeading>
          <motion.p
            className="text-lg font-body text-[var(--color-white)]/60 mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We work with the region&apos;s most ambitious developers, architects, and
            operators to deliver lighting environments of the highest quality.
          </motion.p>
        </div>
      </section>

      {/* Logo Wall */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <SectionLabel label="Our Clients" />
          {isLoading ? (
            <div className="text-center py-20 text-[var(--color-grey)]">Loading Clients...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {clients.map((client, i) => (
                <motion.div
                  key={client.name}
                  className="flex items-center justify-center p-6 rounded-[var(--radius-card)] border border-[var(--color-grey)]/10 hover:border-[var(--color-accent)]/30 transition-all duration-300 group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  {client.logo ? (
                    <div className="relative w-full h-24 flex items-center justify-center">
                      <Image 
                        src={client.logo} 
                        alt={`${client.name} logo`} 
                        fill
                        className="object-contain" 
                      />
                    </div>
                  ) : (
                    <span className="font-display text-lg tracking-[0.08em] uppercase text-[var(--color-grey)]/50 group-hover:text-[var(--color-accent)] transition-colors duration-300 text-center">
                      {client.name}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>



    </>
  );
}
