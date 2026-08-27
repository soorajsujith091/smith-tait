"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = 'text-[var(--color-white)]/70';
  const hoverTextColor = 'text-[var(--color-accent)]';
  const textSizeClass = 'text-sm font-display tracking-widest uppercase';

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </a>
  );
};

export function MiniNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-2xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <a href="/" className="block">
      <Image src="/images/general/logo.png" alt="Smith Tait Logo" width={100} height={28} className="object-contain" />
    </a>
  );

  const navLinksData = [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      dropdown: [
        { label: "About Smith Tait", href: "/about" },
        { label: "Expertise", href: "/expertise" },
        { label: "Legacy", href: "/legacy" },
        { label: "Our Team", href: "/team" },
      ],
    },
    { label: "Projects", href: "/projects" },
    { label: "Clients", href: "/clients" },
    { label: "News", href: "/news" },
  ];

  const contactButtonElement = (
    <a href="/contact" className="px-5 py-2 text-xs sm:text-sm border border-white/20 bg-[var(--color-navy)]/80 text-[var(--color-white)] rounded-full hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300 w-full sm:w-auto font-display uppercase tracking-widest">
      Get in Touch
    </a>
  );

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50
                       flex flex-col items-center
                       pl-6 pr-6 py-3 backdrop-blur-md
                       ${headerShapeClass}
                       border border-white/10 bg-[var(--color-navy)]/90 shadow-2xl
                       w-[calc(100%-2rem)] md:w-[90%] lg:w-[85%] max-w-6xl
                       transition-[border-radius] duration-300 ease-in-out`}>

      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-12">
        <div className="flex items-center">
           {logoElement}
        </div>

        <nav className="hidden sm:flex items-center space-x-6">
          {navLinksData.map((link) => (
            <div
              key={link.label}
              className="relative py-2"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <AnimatedNavLink href={link.href}>
                {link.label}
              </AnimatedNavLink>

              <AnimatePresence>
                {link.dropdown && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-2 z-50"
                  >
                    <div className="bg-[var(--color-navy)] border border-white/10 rounded-lg py-2 min-w-[220px] shadow-xl backdrop-blur-md">
                      {link.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block px-5 py-2.5 text-sm font-body text-[var(--color-white)]/70 hover:text-[var(--color-accent)] hover:bg-white/5 transition-all duration-200"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          {contactButtonElement}
        </div>

        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-[var(--color-white)] focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? 'max-h-[500px] opacity-100 pt-6 pb-2' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-5 text-base w-full font-display uppercase tracking-widest">
          {navLinksData.map((link) => (
            <a key={link.href} href={link.href} className="text-[var(--color-white)]/80 hover:text-[var(--color-accent)] transition-colors w-full text-center">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-6 w-full">
          {contactButtonElement}
        </div>
      </div>
    </header>
  );
}
