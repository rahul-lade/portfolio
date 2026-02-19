import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

const SOCIAL_LINKS = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com', icon: Twitter, label: 'X (Twitter)' },
  { href: 'mailto:rahullade935@gmail.com', icon: Mail, label: 'Email' },
] as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-10 md:flex-row md:justify-between">
        {/* Left — Branding */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted">
            © {currentYear} Rahul Lade. All rights reserved.
          </span>
        </div>

        {/* Right — Social Links */}
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-violet"
                aria-label={social.label}
              >
                <Icon size={18} />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export { Footer };
