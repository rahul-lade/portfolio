'use client';

import { motion } from 'framer-motion';

interface IBorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

const BorderBeam = ({
  className = '',
  size = 200,
  duration = 12,
  delay = 0,
}: IBorderBeamProps) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, #8b5cf6 80%, #06b6d4 90%, transparent 100%)`,
          maskImage: `radial-gradient(${size}px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(${size}px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`,
        }}
        animate={{
          '--x': ['0%', '100%', '100%', '0%', '0%'],
          '--y': ['0%', '0%', '100%', '100%', '0%'],
        } as Record<string, string[]>}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export { BorderBeam };
