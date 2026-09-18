"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "./ui/SocialIcons";

const footerLinks = {
  studio: [
    { label: "About", href: "/about" },
    { label: "Expertise", href: "/expertise" },
    { label: "Legacy", href: "/legacy" },
    { label: "Our Team", href: "/team" },
  ],
  work: [
    { label: "Projects", href: "/projects" },
    { label: "Clients", href: "/clients" },
    { label: "News & Insights", href: "/news" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-section-navy relative overflow-hidden" role="contentinfo">
      {/* Gold accent divider */}
      <div className="divider-accent" />

      <div className="container-st pt-16 pb-8 lg:pt-20 lg:pb-10 relative z-10 flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12 max-w-7xl mx-auto w-full">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-8">
              <Image src="/images/general/logo.png" alt="Smith Tait Logo" width={160} height={50} className="object-contain" />
            </Link>
            <p className="text-base font-body font-medium text-[var(--color-white)]/90 mb-8 leading-relaxed max-w-xs">
              Premium Architectural Lighting Design Studio creating transformative spaces across the MENA region.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:info@smithtait.com"
                className="flex items-center gap-4 text-sm font-body font-medium text-[var(--color-white)]/90 hover:text-[var(--color-accent)] transition-colors"
              >
                <Mail size={16} />
                info@smithtait.com
              </a>
              <a
                href="tel:+97145850000"
                className="flex items-center gap-4 text-sm font-body font-medium text-[var(--color-white)]/90 hover:text-[var(--color-accent)] transition-colors"
              >
                <Phone size={16} />
                +971 4 585 0000
              </a>
              <div className="flex items-start gap-4 text-sm font-body font-medium text-[var(--color-white)]/90">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  Dubai Design District<br />
                  Building 7, Office 102<br />
                  Dubai, UAE
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Studio Links */}
          <div>
            <h3 className="text-caption text-[var(--color-accent)] mb-8">
              Studio
            </h3>
            <ul className="space-y-4">
              {footerLinks.studio.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base font-body font-medium text-[var(--color-white)]/90 hover:text-[var(--color-accent)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Work Links */}
          <div>
            <h3 className="text-caption text-[var(--color-accent)] mb-8">
              Work
            </h3>
            <ul className="space-y-4">
              {footerLinks.work.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base font-body font-medium text-[var(--color-white)]/90 hover:text-[var(--color-accent)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-caption text-[var(--color-accent)] mb-8">
              Connect
            </h3>
            <div className="flex items-center gap-5 mb-8">
              <a
                href="https://www.linkedin.com/company/smith-tait/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-[var(--color-white)]/90 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={20} />
              </a>
              <a
                href="https://www.instagram.com/smith_tait_uae/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-[var(--color-white)]/90 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
            </div>
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
          </div>
        </div>

        {/* The Large Name Background Effect */}
        <div className="w-full flex items-center justify-center mt-auto mb-6 overflow-hidden">
          <h1 className="text-center text-[22vw] sm:text-[18vw] lg:text-[15vw] font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-white/20 to-white/5 select-none tracking-tighter leading-none whitespace-nowrap">
            SMITH TAIT
          </h1>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto w-full">
          <p className="text-sm font-body font-medium text-[var(--color-white)]/60">
            Copyright {new Date().getFullYear()} © Smith Tait | Made with ❤️ Creatox Designs
          </p>
          <div className="flex items-center gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-body font-medium text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[var(--color-white)]/70 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
