'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ILogoProps {
  size?: 'sm' | 'md';
}

const Logo = ({ size = 'md' }: ILogoProps) => {
  const textSize = size === 'sm' ? 'text-base' : 'text-lg';
  const subSize = size === 'sm' ? 'text-[7px]' : 'text-[8px]';

  return (
    <Link href="/" className="group flex items-center gap-3">
      <motion.div
        className="relative flex flex-col items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-lg bg-violet/20 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span
          className={`${textSize} relative font-serif font-bold tracking-wide text-violet transition-colors duration-200`}
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          rahul
        </span>
        <span
          className={`${subSize} relative font-semibold tracking-[0.35em] text-violet/70 uppercase transition-colors duration-200`}
        >
          NOT TODAY
        </span>
      </motion.div>
    </Link>
  );
};

export { Logo };
