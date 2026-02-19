'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
] as const;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-surface-border bg-background/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors hover:text-foreground ${
                pathname === link.href ? 'text-foreground' : 'text-text-muted'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-violet"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden rounded-lg border border-violet/30 bg-violet/10 px-5 py-2 text-sm font-medium text-violet transition-all hover:border-violet/50 hover:bg-violet/20 md:block"
        >
          Get in Touch
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-surface-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-violet/10 text-violet'
                      : 'text-text-muted hover:bg-surface hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-3 rounded-lg border border-violet/30 bg-violet/10 px-5 py-3 text-center text-sm font-medium text-violet transition-all hover:border-violet/50 hover:bg-violet/20"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export { Header };
