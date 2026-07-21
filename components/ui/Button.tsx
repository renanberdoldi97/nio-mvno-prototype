'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'destructive';
type ButtonKind = 'conversion';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  // kind sobrepõe variant pra estilos semânticos específicos (ex: CTA de oferta)
  kind?: ButtonKind;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-primary-background)] text-white font-semibold border-0',
  outline: 'bg-transparent text-text-primary font-semibold border-[1.5px] border-text-primary',
  ghost: 'bg-transparent text-[var(--color-primary-text)] font-semibold border-0',
  destructive: 'bg-error text-white font-semibold border-0',
};

const kindStyles: Record<ButtonKind, string> = {
  conversion: 'bg-[#E5507A] text-white font-bold border-0',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm rounded-full',
  md: 'h-14 px-6 text-base rounded-full',
  lg: 'h-14 px-8 text-base rounded-full',
};

export function Button({
  variant = 'primary',
  kind,
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
      whileTap={isDisabled || variant !== 'primary' ? {} : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={isDisabled ? undefined : onClick}
      className={cn(
        'flex items-center justify-center gap-2 transition-opacity',
        kind ? kindStyles[kind] : variantStyles[variant],
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
