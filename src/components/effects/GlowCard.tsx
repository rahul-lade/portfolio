'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface IGlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlowCard = ({
  children,
  className = '',
  glowColor = 'rgba(139, 92, 246, 0.15)',
}: IGlowCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow gradient that follows cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`,
        }}
      />

      {/* Border glow that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.25), transparent 40%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {children}
    </motion.div>
  );
};

export { GlowCard };
