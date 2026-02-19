'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { BorderBeam } from '@/components/effects/BorderBeam';

import dynamic from 'next/dynamic';

const FloatingCrystal = dynamic(
  () => import('@/components/effects/FloatingCrystal').then((m) => m.FloatingCrystal),
  { ssr: false }
);

const PageClient = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-dvh pt-24">
      <div className="mx-auto max-w-6xl px-5 py-10">
        {/* Header with 3D Element */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <span className="text-sm font-medium text-violet">Portfolio</span>
            <h1 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
              All Projects
            </h1>
            <p className="mt-3 max-w-2xl text-text-muted">
              A collection of projects I&apos;ve built, ranging from full-stack
              applications to AI-powered tools and creative frontends.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-64 w-full lg:h-80 lg:w-1/3"
          >
            <FloatingCrystal />
            {/* Gradient overlay for blending */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-l" />
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer rounded-lg px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'border border-violet/30 bg-violet/10 text-violet'
                  : 'border border-surface-border bg-surface text-text-muted hover:border-violet/20 hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-surface-border bg-surface transition-all hover:border-violet/30"
            >
              {/* Border Beam on Hover */}
              <div className="opacity-0 transition-opacity group-hover:opacity-100">
                <BorderBeam size={150} duration={8} />
              </div>

              {/* Image Placeholder */}
              <div className="flex h-44 items-center justify-center border-b border-surface-border bg-background">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-violet/20 bg-violet/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-violet"
                  >
                    <path d="m18 16 4-4-4-4" />
                    <path d="m6 8-4 4 4 4" />
                    <path d="m14.5 4-5 16" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-5 p-8">
                <span className="text-xs font-medium text-violet">
                  {project.category}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-surface-border bg-background px-3 py-1 font-mono text-xs text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { PageClient };
