'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ITechItem {
  label: string;
  color: string;
  icon?: React.ComponentType<{ size?: number | string }>;
}

interface ITechMarqueeProps {
  items: ITechItem[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

const TechMarquee = ({
  items,
  direction = 'left',
  speed = 25,
  className = '',
}: ITechMarqueeProps) => {
  const duplicated = [...items, ...items];
  const xFrom = direction === 'left' ? '0%' : '-50%';
  const xTo = direction === 'left' ? '-50%' : '0%';

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max gap-5"
        animate={{ x: [xFrom, xTo] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.label}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-surface-border bg-surface px-5 py-3 transition-colors duration-200 hover:border-violet/30"
            >
              {Icon ? (
                <Icon size={20} />
              ) : null}
              <span className="whitespace-nowrap font-mono text-sm text-text-muted transition-colors duration-200 hover:text-foreground">
                {tech.label}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export { TechMarquee };
export type { ITechItem };
