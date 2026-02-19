'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { GlowCard } from '@/components/effects/GlowCard';

const ContactCta = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="relative py-20">
      <div ref={ref} className="mx-auto max-w-4xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <GlowCard className="rounded-2xl border border-surface-border bg-surface">
            {/* Animated gradient accent strip */}
            <motion.div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex flex-col items-center gap-8 px-8 py-16 text-center md:px-16">
              {/* Animated Icon */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet/20 bg-violet/10"
              >
                <Mail size={24} className="text-violet" />
              </motion.div>

              {/* Heading */}
              <div>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Let&apos;s Work Together
                </h2>
                <p className="mt-3 max-w-lg text-text-muted">
                  Have a project in mind or just want to say hi? I&apos;m always open to
                  discussing new opportunities and interesting ideas.
                </p>
              </div>

              {/* CTAs — no magnetic effect, simple hovers */}
              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <Link
                  href="/contact"
                  className="group flex items-center gap-3 rounded-lg bg-violet px-8 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-violet-glow"
                >
                  Get in Touch
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="mailto:rahullade935@gmail.com"
                  className="text-sm text-text-muted transition-colors duration-200 hover:text-violet"
                >
                  rahullade935@gmail.com
                </Link>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
};

export { ContactCta };
