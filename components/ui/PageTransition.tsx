'use client';

import { motion } from 'framer-motion';

type PageTransitionProps = {
  children: React.ReactNode;
  variant?: 'slide' | 'fade';
};

export function PageTransition({
  children,
  variant = 'slide',
}: PageTransitionProps) {
  if (variant === 'fade') {
    return (
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
