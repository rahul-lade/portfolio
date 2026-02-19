'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Code2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TextReveal } from '@/components/effects/TextReveal';
import { TechMarquee } from '@/components/effects/TechMarquee';
import {
  ReactOriginal,
  NextjsOriginal,
  TypescriptOriginal,
  JavascriptOriginal,
  NodejsOriginal,
  TailwindcssOriginal,
  PostgresqlOriginal,
  MongodbOriginal,
  PrismaOriginal,
  GitOriginal,
  DockerOriginal,
  FigmaOriginal,
  ExpressOriginal,
  VercelOriginal,
  RedisOriginal,
  GraphqlPlain,
} from 'devicons-react';
import type { ITechItem } from '@/components/effects/TechMarquee';

/* ── Lazy-load the 3D Globe to avoid SSR issues ── */
const GlobeScene = dynamic(
  () => import('@/components/effects/GlobeScene').then((m) => m.GlobeScene),
  { ssr: false }
);

/* ── Quick stat badges ── */
interface IStatBadge {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}

const STATS: IStatBadge[] = [
  { icon: Code2, label: 'Role', value: 'Full-Stack Developer' },
  { icon: MapPin, label: 'Based in', value: 'India 🇮🇳' },
  { icon: Briefcase, label: 'Experience', value: '3+ Years' },
];

/* ── Summary paragraphs (placeholder — user fills in later) ── */
const SUMMARY_PARAGRAPHS = [
  'Passionate full-stack developer with 3+ years of experience building scalable, high-performance web applications. I specialize in React, Next.js, and Node.js ecosystems, delivering end-to-end solutions that are both technically robust and visually refined.',
  'I believe in clean code, thoughtful architecture, and user-first design. Every project I take on is driven by a commitment to craft — from pixel-perfect interfaces to well-structured APIs. I thrive in fast-paced environments where attention to detail and creative problem-solving make all the difference.',
  'Currently open to remote opportunities worldwide. Whether it\'s a startup MVP or an enterprise-grade platform, I bring the same level of dedication and quality to every build.',
];

/* ── Tech stack rows with icons ── */
const TECH_ROW_1: ITechItem[] = [
  { label: 'React', color: '#61DAFB', icon: ReactOriginal },
  { label: 'Next.js', color: '#ffffff', icon: NextjsOriginal },
  { label: 'TypeScript', color: '#3178C6', icon: TypescriptOriginal },
  { label: 'JavaScript', color: '#F7DF1E', icon: JavascriptOriginal },
  { label: 'Node.js', color: '#339933', icon: NodejsOriginal },
  { label: 'Tailwind CSS', color: '#06B6D4', icon: TailwindcssOriginal },
  { label: 'PostgreSQL', color: '#4169E1', icon: PostgresqlOriginal },
  { label: 'MongoDB', color: '#47A248', icon: MongodbOriginal },
];

const TECH_ROW_2: ITechItem[] = [
  { label: 'Prisma', color: '#2D3748', icon: PrismaOriginal },
  { label: 'Git', color: '#F05032', icon: GitOriginal },
  { label: 'Docker', color: '#2496ED', icon: DockerOriginal },
  { label: 'Figma', color: '#F24E1E', icon: FigmaOriginal },
  { label: 'Express', color: '#ffffff', icon: ExpressOriginal },
  { label: 'Vercel', color: '#ffffff', icon: VercelOriginal },
  { label: 'Redis', color: '#DC382D', icon: RedisOriginal },
  { label: 'GraphQL', color: '#E10098', icon: GraphqlPlain },
];

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const BentoGrid = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="about" className="relative py-20">
      <div ref={ref} className="mx-auto max-w-6xl px-5">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={FADE_UP}
          custom={0}
          className="mb-10"
        >
          <span className="text-sm font-medium text-violet">About Me</span>
          <TextReveal
            as="h2"
            className="mt-3 text-3xl font-bold text-foreground md:text-4xl"
            delay={0.1}
          >
            Who I Am
          </TextReveal>
        </motion.div>

        {/* Main Content: Globe + Summary */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* 3D Globe — left panel */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={FADE_UP}
            custom={0.1}
            className="relative flex items-center justify-center lg:col-span-2"
          >
            <div className="relative aspect-square w-full max-w-sm">
              <GlobeScene className="h-full w-full" />
              {/* Subtle gradient overlay at bottom for blending */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
            </div>
          </motion.div>

          {/* Summary — right panel */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={FADE_UP}
            custom={0.2}
            className="flex flex-col gap-5 lg:col-span-3"
          >
            <div className="group relative rounded-xl border border-surface-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40">
              {/* Hover glow behind card */}
              <div className="pointer-events-none absolute -inset-px rounded-xl bg-violet/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="relative mb-5 text-lg font-semibold text-foreground">
                Summary
              </h3>
              <div className="flex flex-col gap-5">
                {SUMMARY_PARAGRAPHS.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={FADE_UP}
          custom={0.3}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group flex cursor-default items-center gap-3 rounded-xl border border-surface-border bg-surface px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:bg-surface/80"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet/20 bg-violet/10 transition-all duration-300 group-hover:border-violet/40 group-hover:bg-violet/20">
                  <Icon size={18} className="text-violet transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-text-muted">{stat.label}</span>
                  <span className="text-sm font-semibold text-foreground">
                    {stat.value}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Tech Stack — Infinite Scrolling Marquee */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={FADE_UP}
          custom={0.5}
          className="mt-10"
        >
          <h3 className="mb-5 text-lg font-semibold text-foreground">
            Tech Stack
          </h3>
          <div className="relative flex flex-col gap-5">
            {/* Left-fading edge mask */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
            {/* Right-fading edge mask */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

            {/* Row 1 — scrolls left */}
            <TechMarquee items={TECH_ROW_1} direction="left" speed={30} />

            {/* Row 2 — scrolls right */}
            <TechMarquee items={TECH_ROW_2} direction="right" speed={35} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { BentoGrid };
