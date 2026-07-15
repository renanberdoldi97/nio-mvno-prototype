'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevated?: boolean;
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

export function Card({
  children,
  className,
  onClick,
  padding = 'md',
  elevated = false,
}: CardProps) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl',
        elevated
          ? 'shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
          : 'shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
        paddingStyles[padding],
        onClick ? 'cursor-pointer' : '',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
