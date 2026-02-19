'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface IParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface IFloatingParticlesProps {
  count?: number;
  className?: string;
}

const FloatingParticles = ({
  count = 30,
  className = '',
}: IFloatingParticlesProps) => {
  const particles: IParticle[] = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-violet/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export { FloatingParticles };
