import { cn } from '@/lib/utils';

type ChipTagVariant = 'new' | 'label' | 'status';

type ChipTagProps = {
  variant?: ChipTagVariant;
  children: React.ReactNode;
  className?: string;
};

export function ChipTag({ variant = 'label', children, className }: ChipTagProps) {
  const styles: Record<ChipTagVariant, string> = {
    new: 'bg-[var(--color-primary-background)] text-white font-bold text-[9px] px-2 py-0.5',
    label: 'bg-[#D6EBEA] text-[#024B41] font-medium text-[11px] px-2.5 py-1',
    status: 'bg-primary/10 text-primary-dark font-medium text-[11px] px-2.5 py-1',
  };

  return (
    <span className={cn('rounded-full inline-flex items-center', styles[variant], className)}>
      {children}
    </span>
  );
}
