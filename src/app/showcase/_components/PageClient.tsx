'use client';

import React from 'react';
import dynamic from 'next/dynamic';

/* Lazy-load all globe variants to avoid SSR issues */
const GlobeA = dynamic(
  () => import('@/components/effects/GlobeVariants').then((m) => {
    const Comp = () => (
      <m.GlobeCanvas>
        <m.EarthTextureGlobe />
      </m.GlobeCanvas>
    );
    Comp.displayName = 'GlobeA';
    return { default: Comp };
  }),
  { ssr: false }
);

const GlobeB = dynamic(
  () => import('@/components/effects/GlobeVariants').then((m) => {
    const Comp = () => (
      <m.GlobeCanvas>
        <m.PulseGlobe />
      </m.GlobeCanvas>
    );
    Comp.displayName = 'GlobeB';
    return { default: Comp };
  }),
  { ssr: false }
);

const GlobeC = dynamic(
  () => import('@/components/effects/GlobeVariants').then((m) => {
    const Comp = () => (
      <m.GlobeCanvas>
        <m.ParticleGlobe />
      </m.GlobeCanvas>
    );
    Comp.displayName = 'GlobeC';
    return { default: Comp };
  }),
  { ssr: false }
);

const GlobeD = dynamic(
  () => import('@/components/effects/GlobeVariants').then((m) => {
    const Comp = () => (
      <m.GlobeCanvas>
        <m.HoloGridGlobe />
      </m.GlobeCanvas>
    );
    Comp.displayName = 'GlobeD';
    return { default: Comp };
  }),
  { ssr: false }
);

const CobeGlobe = dynamic(
  () => import('@/components/effects/CobeGlobe').then((m) => m.CobeGlobe),
  { ssr: false }
);

interface IGlobeOption {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const GLOBE_OPTIONS: IGlobeOption[] = [
  {
    id: 'A',
    title: 'Earth Texture',
    description: 'Dark sphere with wireframe continent outlines and atmospheric glow. Gives a sci-fi command center feel.',
    tags: ['Minimal', 'Sci-Fi', 'Dark'],
  },
  {
    id: 'B',
    title: 'Pulse Arcs',
    description: 'Wireframe globe with bright cyan arcs connecting cities and glowing markers. Similar to GitHub\'s globe.',
    tags: ['Connected', 'GitHub-style', 'Bright Arcs'],
  },
  {
    id: 'C',
    title: 'Particle Cloud',
    description: '3000 dots forming a globe shape with violet-to-cyan gradient. Premium feel like Stripe\'s globe.',
    tags: ['Premium', 'Stripe-style', 'Particle'],
  },
  {
    id: 'D',
    title: 'Holographic Grid',
    description: 'Latitude/longitude grid lines with holographic colors and animated data points. Technical aesthetic.',
    tags: ['Technical', 'Grid', 'Holographic'],
  },
  {
    id: 'E',
    title: 'Cobe Globe',
    description: 'Lightweight auto-rotating globe with realistic shading and markers. Same lib used by Vercel. Only ~7KB.',
    tags: ['Vercel-style', 'Lightweight', 'Polished'],
  },
];

const GLOBE_COMPONENTS: Record<string, React.ComponentType> = {
  A: GlobeA,
  B: GlobeB,
  C: GlobeC,
  D: GlobeD,
};

const PageClient = () => {
  return (
    <div className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Globe Showcase
          </h1>
          <p className="mt-3 text-text-muted">
            Pick the globe style you like best. Drag to interact with each one.
          </p>
        </div>

        {/* Grid of globes */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {GLOBE_OPTIONS.map((option) => {
            const isCobeGlobe = option.id === 'E';
            const ThreeGlobe = !isCobeGlobe ? GLOBE_COMPONENTS[option.id] : null;

            return (
              <div
                key={option.id}
                className="group relative flex flex-col rounded-xl border border-surface-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-violet/40"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -inset-px rounded-xl bg-violet/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Globe render area */}
                <div className="relative aspect-square w-full overflow-hidden rounded-t-xl">
                  {isCobeGlobe ? (
                    <CobeGlobe className="h-full w-full" />
                  ) : ThreeGlobe ? (
                    <ThreeGlobe />
                  ) : null}
                </div>

                {/* Info */}
                <div className="relative flex flex-col gap-3 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet/20 bg-violet/10 text-sm font-bold text-violet">
                      {option.id}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">
                      {option.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {option.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {option.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-surface-border px-3 py-1 text-xs text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reference links */}
        <div className="mt-10 rounded-xl border border-surface-border bg-surface p-8">
          <h3 className="mb-5 text-lg font-semibold text-foreground">
            Reference Inspirations
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://github.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 rounded-lg border border-surface-border p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet/40"
            >
              <span className="font-medium text-foreground group-hover:text-violet">GitHub Globe</span>
              <span className="text-xs text-text-muted">Arc connections, dark sphere</span>
            </a>
            <a
              href="https://stripe.com/enterprise"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 rounded-lg border border-surface-border p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet/40"
            >
              <span className="font-medium text-foreground group-hover:text-violet">Stripe Globe</span>
              <span className="text-xs text-text-muted">Particle dots, colorful gradient</span>
            </a>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 rounded-lg border border-surface-border p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet/40"
            >
              <span className="font-medium text-foreground group-hover:text-violet">Vercel Globe (cobe)</span>
              <span className="text-xs text-text-muted">Lightweight, polished, realistic</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageClient };
