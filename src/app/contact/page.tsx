"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ContactForm } from "@/components/ui/ContactForm";

const offices = [
  {
    city: "Dubai",
    address: "Dubai Design District\nBuilding 4, Office 301\nDubai, UAE",
    phone: "+971 4 585 0000",
    email: "dubai@smithtait.com",
    hours: "Sun–Thu: 9:00 AM – 6:00 PM",
  },
  {
    city: "London",
    address: "175 Gray's Inn Road\nWC1X 8UE\nLondon, UK",
    phone: "+44 20 7000 0000",
    email: "london@smithtait.com",
    hours: "Mon–Fri: 9:00 AM – 5:30 PM",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-section-navy pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-st">
          <SectionLabel label="Contact" light />
          <AnimatedHeading as="h1" className="text-[var(--color-white)] max-w-3xl">
            Let&apos;s Work Together
          </AnimatedHeading>
          <motion.p
            className="text-lg font-body text-[var(--color-white)]/60 mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Whether you&apos;re planning a new development or seeking specialist
            lighting design expertise for an existing project, we&apos;d love to
            hear from you.
          </motion.p>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-section-paper section-padding">
        <div className="container-st">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Office locations */}
            <div className="lg:col-span-1">
              <SectionLabel label="Our Offices" />
              <div className="space-y-10">
                {offices.map((office, i) => (
                  <motion.div
                    key={office.city}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                  >
                    <h3 className="font-display text-xl font-medium text-[var(--color-navy)] mb-4">
                      {office.city}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm font-body text-[var(--color-grey)]">
                        <MapPin size={14} className="mt-1 flex-shrink-0 text-[var(--color-accent)]" />
                        <span className="whitespace-pre-line">{office.address}</span>
                      </div>
                      <a
                        href={`tel:${office.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 text-sm font-body text-[var(--color-grey)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <Phone size={14} className="flex-shrink-0 text-[var(--color-accent)]" />
                        {office.phone}
                      </a>
                      <a
                        href={`mailto:${office.email}`}
                        className="flex items-center gap-3 text-sm font-body text-[var(--color-grey)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <Mail size={14} className="flex-shrink-0 text-[var(--color-accent)]" />
                        {office.email}
                      </a>
                      <div className="flex items-center gap-3 text-sm font-body text-[var(--color-grey)]">
                        <Clock size={14} className="flex-shrink-0 text-[var(--color-accent)]" />
                        {office.hours}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <SectionLabel label="Send an Enquiry" />
              <h2 className="text-heading font-display text-[var(--color-navy)] mb-8">
                Tell Us About Your Project
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-section-burgundy section-padding">
        <div className="container-st text-center max-w-2xl mx-auto">
          <motion.p
            className="text-xl md:text-2xl font-display font-light text-[var(--color-white)] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Every great project begins with a conversation. Reach out today and
            let&apos;s explore how light can transform your vision.
          </motion.p>
          <motion.a
            href="mailto:info@smithtait.com"
            className="inline-block mt-8 text-lg font-display text-[var(--color-accent)] underline underline-offset-8 hover:no-underline transition-all"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            info@smithtait.com
          </motion.a>
        </div>
      </section>
    </>
  );
}
