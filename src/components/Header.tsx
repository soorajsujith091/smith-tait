"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "./ui/SocialIcons";
import { MobileMenu } from "./MobileMenu";
import { MiniNavbar } from "./ui/mini-navbar";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "About Smith Tait", href: "/about" },
      { label: "Philosophy", href: "/about#philosophy" },
      { label: "Legacy", href: "/legacy" },
      { label: "Our Team", href: "/team" },
    ],
  },
  {
    label: "Expertise",
    href: "/expertise",
    dropdown: [
      { label: "Hospitality", href: "/expertise#hospitality" },
      { label: "Residential", href: "/expertise#residential" },
      { label: "Facade Lighting", href: "/expertise#facade" },
      { label: "Landscape Lighting", href: "/expertise#landscape" },
      { label: "Public Realm", href: "/expertise#public-realm" },
      { label: "Mixed-Use / Commercial", href: "/expertise#mixed-use" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Clients", href: "/clients" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-transparent">
          <div className="container-st">
            <div className="flex items-center justify-between h-20 lg:h-24">
              {/* Logo */}
              <Link
                href="/"
                className="relative z-10 flex items-center gap-3 group"
                aria-label="Smith Tait — Home"
              >
                <Image src="/images/general/logo.png" alt="Smith Tait Logo" width={140} height={40} className="object-contain" priority />
              </Link>

              {/* Desktop Navigation */}
              <nav
                className="desktop-only flex items-center gap-1"
                aria-label="Primary navigation"
              >
                {navLinks.map((link) => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() =>
                      link.dropdown && setActiveDropdown(link.label)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className="px-3 py-2 text-sm font-body font-light tracking-[0.04em] uppercase text-[var(--color-white)]/80 hover:text-[var(--color-accent)] transition-colors duration-300 relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {link.dropdown && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-2"
                        >
                          <div className="bg-[var(--color-navy)] border border-white/10 rounded-lg py-2 min-w-[220px] shadow-xl backdrop-blur-md">
                            {link.dropdown.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                className="block px-5 py-2.5 text-sm font-body text-[var(--color-white)]/70 hover:text-[var(--color-accent)] hover:bg-white/5 transition-all duration-200"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* Right side: CTA + Social + Mobile toggle */}
              <div className="flex items-center gap-4">
                <Link
                  href="/contact"
                  className="desktop-only btn-primary text-xs"
                >
                  Get in Touch
                </Link>

                <a
                  href="https://www.linkedin.com/company/smith-tait/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="desktop-only text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors duration-300"
                  aria-label="Smith Tait on LinkedIn"
                >
                  <LinkedInIcon size={18} />
                </a>

                <a
                  href="https://www.instagram.com/smith_tait_uae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="desktop-only text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors duration-300"
                  aria-label="Smith Tait on Instagram"
                >
                  <InstagramIcon size={18} />
                </a>

                {/* Mobile menu toggle */}
                <button
                  className="mobile-only relative z-[60] p-2 text-[var(--color-white)]"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            links={navLinks}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <MiniNavbar />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
