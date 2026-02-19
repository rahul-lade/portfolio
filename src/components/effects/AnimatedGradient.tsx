'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface IAnimatedGradientProps {
  className?: string;
}

const AnimatedGradient = ({ className = '' }: IAnimatedGradientProps) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Primary orb — violet, top-left */}
      <motion.div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        animate={{
          x: [0, 40, -20, 30, 0],
          y: [0, -30, 20, -10, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Secondary orb — cyan, bottom-right */}
      <motion.div
        className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }}
        animate={{
          x: [0, -30, 25, -15, 0],
          y: [0, 25, -20, 15, 0],
          scale: [1, 0.95, 1.1, 1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Tertiary orb — magenta, center */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }}
        animate={{
          x: [0, 20, -30, 15, 0],
          y: [0, -20, 15, -25, 0],
          scale: [0.9, 1.05, 0.95, 1.1, 0.9],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export { AnimatedGradient };
