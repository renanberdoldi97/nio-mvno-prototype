'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardVariant = 'neutral' | 'white' | 'selected';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevated?: boolean;
  variant?: CardVariant;
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

const variantStyles: Record<CardVariant, string> = {
  neutral: 'bg-[var(--color-neutral-background-low)] border border-transparent',
  white: 'bg-white border border-[var(--color-neutral-border)]',
  selected: 'bg-[var(--color-primary-background-low)] border border-[var(--color-primary-background)]',
};

export function Card({
  children,
  className,
  onClick,
  padding = 'md',
  elevated = false,
  variant = 'neutral',
}: CardProps) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={cn(
        'rounded-2xl',
        variantStyles[variant],
        elevated
          ? 'shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
          : '',
        paddingStyles[padding],
        onClick ? 'cursor-pointer' : '',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
