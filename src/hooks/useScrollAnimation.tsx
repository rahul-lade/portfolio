'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface IScrollAnimationOptions {
  once?: boolean;
}

const useScrollAnimation = (options: IScrollAnimationOptions = {}) => {
  const { once = true } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  return { ref, isInView };
};

export { useScrollAnimation };
