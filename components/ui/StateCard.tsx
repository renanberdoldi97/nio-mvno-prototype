import { cn } from '@/lib/utils';
import { Button } from './Button';

type StateCardVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

type StateCardProps = {
  variant?: StateCardVariant;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
  icon?: React.ReactNode;
  className?: string;
};

const borderColors: Record<StateCardVariant, string> = {
  success: 'border-l-success',
  warning: 'border-l-warning',
  error: 'border-l-error',
  info: 'border-l-info',
  neutral: 'border-l-border',
};

const bgColors: Record<StateCardVariant, string> = {
  success: 'bg-[#F0FFF0]',
  warning: 'bg-[#FFF8F0]',
  error: 'bg-[#FFF0F0]',
  info: 'bg-[#F0F8FF]',
  neutral: 'bg-white',
};

export function StateCard({
  variant = 'neutral',
  title,
  description,
  ctaLabel,
  onCta,
  icon,
  className,
}: StateCardProps) {
  return (
    <div className={cn(
      'rounded-2xl border-l-4 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
      borderColors[variant],
      bgColors[variant],
      className
    )}>
      <div className="flex items-start gap-3">
        {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-text-primary leading-tight">{title}</p>
          {description && (
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">{description}</p>
          )}
          {ctaLabel && onCta && (
            <Button
              variant="ghost"
              size="sm"
              fullWidth={false}
              onClick={onCta}
              className="mt-2 h-8 px-0 text-xs underline"
            >
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
