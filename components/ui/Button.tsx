'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-black font-semibold border-0',
  outline: 'bg-transparent text-text-primary font-semibold border-[1.5px] border-text-primary',
  ghost: 'bg-transparent text-primary font-semibold border-0',
  destructive: 'bg-error text-white font-semibold border-0',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm rounded-full',
  md: 'h-14 px-6 text-base rounded-full',
  lg: 'h-14 px-8 text-base rounded-full',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  loading = false,
  disabled = false,
  children,
  onClick,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileTap={isDisabled ? {} : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={isDisabled ? undefined : onClick}
      className={cn(
        'flex items-center justify-center gap-2 transition-opacity',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : 'w-auto',
        isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      {loading ? (
        <span className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : children}
    </motion.button>
  );
}
