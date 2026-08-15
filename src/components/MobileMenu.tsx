"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "./ui/SocialIcons";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

type MobileMenuProps = {
  links: NavLink[];
  onClose: () => void;
};

export function MobileMenu({ links, onClose }: MobileMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[var(--color-navy)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
        <motion.nav
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <motion.li key={link.label} variants={itemVariants}>
                {link.dropdown ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-3 text-2xl font-display font-light tracking-[0.05em] uppercase text-[var(--color-white)] hover:text-[var(--color-accent)] transition-colors"
                      onClick={() =>
                        setOpenAccordion(
                          openAccordion === link.label ? null : link.label
                        )
                      }
                      aria-expanded={openAccordion === link.label}
                    >
                      {link.label}
                      <motion.span
                        animate={{
                          rotate: openAccordion === link.label ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} />
                      </motion.span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openAccordion === link.label ? "auto" : 0,
                        opacity: openAccordion === link.label ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-2 space-y-1">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={onClose}
                            className="block py-2 text-base font-body text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3 text-2xl font-display font-light tracking-[0.05em] uppercase text-[var(--color-white)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Bottom section */}
        <motion.div
          className="mt-auto pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-6 mb-6">
            <a
              href="https://www.linkedin.com/company/smith-tait/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={22} />
            </a>
            <a
              href="https://www.instagram.com/smith_tait_uae/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={22} />
            </a>
          </div>
          <p className="text-sm font-body text-[var(--color-white)]/40">
            info@smithtait.com
          </p>
          <p className="text-sm font-body text-[var(--color-white)]/40 mt-1">
            Dubai, UAE
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
