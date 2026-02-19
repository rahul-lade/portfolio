'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ITextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const TextReveal = ({
  children,
  className = '',
  delay = 0,
  as: Tag = 'span',
}: ITextRevealProps) => {
  const { ref, isInView } = useScrollAnimation();
  const words = children.split(' ');

  return (
    <Tag ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="overflow-hidden mr-[0.3em]">
          <motion.span
            initial={{ y: '110%', opacity: 0, rotateX: 45 }}
            animate={isInView ? { y: '0%', opacity: 1, rotateX: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.04,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export { TextReveal };
