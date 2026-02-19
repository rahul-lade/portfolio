'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TextReveal } from '@/components/effects/TextReveal';
import { GlowCard } from '@/components/effects/GlowCard';
import { EXPERIENCES } from '@/data/experience';

const ExperienceTimeline = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="experience" className="relative py-20">
      <div ref={ref} className="mx-auto max-w-5xl px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-sm font-medium text-violet">Career</span>
          <TextReveal
            as="h2"
            className="mt-3 text-3xl font-bold text-foreground md:text-4xl"
            delay={0.1}
          >
            Work Experience
          </TextReveal>
        </motion.div>

        {/* Compact stacked cards */}
        <div className="flex flex-col gap-5">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <GlowCard className="rounded-xl border border-surface-border bg-surface transition-colors duration-200 hover:border-violet/30">
                <div className="flex flex-col gap-5 p-8 md:flex-row md:gap-10">
                  {/* Left — Meta */}
                  <div className="flex shrink-0 flex-col gap-1 md:w-48">
                    <span className="inline-flex w-fit rounded-md border border-violet/20 bg-violet/5 px-3 py-1 text-xs font-medium text-violet">
                      {exp.duration}
                    </span>
                    <p className="mt-1 text-sm text-text-muted">{exp.company}</p>
                  </div>

                  {/* Right — Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">
                      {exp.description}
                    </p>

                    {/* Achievements — compact inline */}
                    <div className="mt-5 flex flex-col gap-1">
                      {exp.achievements.map((achievement) => (
                        <p
                          key={achievement}
                          className="text-sm text-text-muted"
                        >
                          <span className="mr-1 text-violet">→</span>
                          {achievement}
                        </p>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="mt-5 flex flex-wrap gap-3">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-surface-border bg-background px-3 py-1 font-mono text-xs text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ExperienceTimeline };
