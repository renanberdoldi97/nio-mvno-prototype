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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
    >
      {children}
    </motion.div>
  );
}
