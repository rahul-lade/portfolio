'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

const SOCIAL_LINKS = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com', icon: Twitter, label: 'X (Twitter)' },
  { href: 'mailto:hello@example.com', icon: Mail, label: 'Email' },
] as const;

const PageClient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-dvh pt-24">
      <div className="mx-auto max-w-6xl px-5 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-medium text-violet">Contact</span>
          <h1 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-3 max-w-2xl text-text-muted">
            Have a project in mind or want to collaborate? Send me a message
            and I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5 md:col-span-3"
          >
            {/* Name */}
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Your name"
                className="rounded-lg border border-surface-border bg-surface px-5 py-3 text-sm text-foreground placeholder:text-text-muted focus:border-violet/50 focus:outline-none focus:ring-1 focus:ring-violet/30"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="your@email.com"
                className="rounded-lg border border-surface-border bg-surface px-5 py-3 text-sm text-foreground placeholder:text-text-muted focus:border-violet/50 focus:outline-none focus:ring-1 focus:ring-violet/30"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-3">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Tell me about your project..."
                rows={6}
                className="resize-none rounded-lg border border-surface-border bg-surface px-5 py-3 text-sm text-foreground placeholder:text-text-muted focus:border-violet/50 focus:outline-none focus:ring-1 focus:ring-violet/30"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-violet px-8 py-3 text-sm font-medium text-white transition-all hover:bg-violet-glow"
            >
              Send Message
              <Send size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-8 md:col-span-2"
          >
            {/* Email Card */}
            <div className="rounded-xl border border-surface-border bg-surface p-8">
              <h3 className="text-lg font-semibold text-foreground">Email</h3>
              <Link
                href="mailto:hello@example.com"
                className="mt-3 block text-sm text-text-muted transition-colors hover:text-violet"
              >
                hello@example.com
              </Link>
            </div>

            {/* Social Links */}
            <div className="rounded-xl border border-surface-border bg-surface p-8">
              <h3 className="text-lg font-semibold text-foreground">
                Socials
              </h3>
              <div className="mt-5 flex flex-col gap-5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-violet"
                    >
                      <Icon size={16} />
                      {social.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Availability Card */}
            <div className="rounded-xl border border-violet/20 bg-violet/5 p-8">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  Available for work
                </span>
              </div>
              <p className="mt-3 text-sm text-text-muted">
                I&apos;m currently available for freelance projects and full-time
                opportunities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export { PageClient };
