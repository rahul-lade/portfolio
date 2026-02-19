'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Terminal, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { GlowCard } from '@/components/effects/GlowCard';
import { TextReveal } from '@/components/effects/TextReveal';
import { PROJECTS } from '@/data/projects';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'Full-Stack': Layers,
  'Frontend': Terminal,
  'AI/ML': Sparkles,
};

const FeaturedProjects = () => {
  const { ref, isInView } = useScrollAnimation();
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-20">
      <div ref={ref} className="mx-auto max-w-6xl px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-sm font-medium text-violet">Work</span>
            <TextReveal
              as="h2"
              className="mt-3 text-3xl font-bold text-foreground md:text-4xl"
              delay={0.1}
            >
              Featured Projects
            </TextReveal>
          </div>
          <Link
            href="/projects"
            className="group hidden items-center gap-1 text-sm font-medium text-text-muted transition-colors hover:text-violet md:flex"
          >
            See all projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Project Cards — Developer-style */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => {
            const CategoryIcon = CATEGORY_ICONS[project.category] ?? Layers;
            const isHovered = hoveredId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <GlowCard className="group h-full rounded-xl border border-surface-border bg-surface transition-all hover:border-violet/30">
                  {/* Terminal-style Header Bar */}
                  <div className="flex items-center gap-3 border-b border-surface-border px-5 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="font-mono text-xs text-text-muted/60">
                      ~/projects/{project.id}
                    </span>
                  </div>

                  {/* Code-style Visual Area */}
                  <div className="relative h-40 overflow-hidden bg-background/50 p-5">
                    {/* Abstract code lines */}
                    <div className="flex flex-col gap-1.5 font-mono text-xs opacity-30">
                      <span className="text-violet">{'import'} <span className="text-cyan-accent">{`{ ${project.techStack[0]} }`}</span></span>
                      <span className="text-text-muted">{'const'} <span className="text-green-400">app</span> = <span className="text-violet">create</span>()</span>
                      <span className="text-text-muted/60">{'// '}{project.title}</span>
                      <span className="text-text-muted">{'export default'} <span className="text-amber-400">app</span></span>
                    </div>

                    {/* Hover overlay — project category icon */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-violet/30 bg-violet/10">
                              <CategoryIcon size={24} className="text-violet" />
                            </div>
                            <span className="text-xs font-medium text-violet">{project.category}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-5 p-5">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-violet">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-muted">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack — compact pills */}
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-surface-border bg-background px-3 py-1 font-mono text-xs text-text-muted transition-colors group-hover:border-violet/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-auto flex items-center gap-5 pt-3">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-violet"
                        >
                          <ExternalLink size={14} />
                          Live
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-violet"
                        >
                          <Github size={14} />
                          Code
                        </Link>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 text-sm font-medium text-text-muted transition-colors hover:text-violet"
          >
            See all projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export { FeaturedProjects };
