'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import { AnimatedText } from '@/components/effects/AnimatedText';
import { StarfieldCanvas } from '@/components/effects/StarfieldCanvas';

const ROTATING_WORDS = ['Scalable', 'Modern', 'Performant', 'Beautiful'];

const STAGGER_CHILDREN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const HeroSection = () => {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      {/* Galaxy Starfield Background */}
      <StarfieldCanvas />

      {/* Content */}
      <motion.div
        variants={STAGGER_CHILDREN}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 text-center"
      >
        {/* Status Badge */}
        <motion.div
          variants={FADE_UP}
          className="flex items-center gap-3 rounded-full border border-violet/20 bg-violet/5 px-5 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-sm text-text-muted">Available for new projects</span>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={FADE_UP} className="relative">
          {/* Blur glow behind heading — famous "text glow" technique */}
          <h1
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 select-none text-4xl font-bold leading-tight tracking-tight text-violet blur-2xl sm:text-5xl md:text-7xl"
            style={{ opacity: 0.4 }}
          >
            Building Modern
            <br />
            Web Applications
          </h1>
          <h1 className="relative text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-7xl">
            Building{' '}
            <AnimatedText
              words={ROTATING_WORDS}
              className="text-violet"
            />{' '}
            <br />
            Web Applications
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={FADE_UP}
          className="max-w-2xl text-lg text-text-muted md:text-xl"
        >
          Full-Stack Developer crafting elegant, high-performance digital
          experiences with modern technologies.
        </motion.p>

        {/* CTAs — clean, no magnetic effect */}
        <motion.div
          variants={FADE_UP}
          className="flex flex-col items-center gap-5 sm:flex-row"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-3 rounded-lg bg-violet px-8 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-violet-glow"
          >
            View Projects
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-lg border border-surface-border bg-surface/50 px-8 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-violet/30 hover:text-violet"
          >
            <Download size={16} />
            Download Resume
          </Link>
        </motion.div>


      </motion.div>
    </section>
  );
};

export { HeroSection };
