'use client';

import { NioIcon, IconName } from '@/components/icons';
import { cn } from '@/lib/utils';

type MessageKind = 'success' | 'error' | 'warning' | 'info';

type MessageProps = {
  kind: MessageKind;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
  onClose?: () => void;
  className?: string;
};

const kindStyles: Record<MessageKind, { bg: string; text: string; icon: IconName }> = {
  success: {
    bg: 'bg-[#DFF5D8]',
    text: 'text-[#094B18]',
    icon: 'check-circle',
  },
  error: {
    bg: 'bg-[#F5DDD9]',
    text: 'text-[#841802]',
    icon: 'times-circle',
  },
  warning: {
    bg: 'bg-[#FFF5C8]',
    text: 'text-[#574700]',
    icon: 'warning-circle',
  },
  info: {
    bg: 'bg-[#D6EBEA]',
    text: 'text-[#024B41]',
    icon: 'info',
  },
};

export function Message({
  kind,
  title,
  description,
  ctaLabel,
  onCta,
  onClose,
  className,
}: MessageProps) {
  const styles = kindStyles[kind];

  return (
    <div className={cn(
      'rounded-2xl p-4 flex items-start gap-3',
      styles.bg,
      className,
    )}>
      <div className={cn('flex-shrink-0 mt-0.5', styles.text)}>
        <NioIcon name={styles.icon} size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-bold leading-tight', styles.text)}>{title}</p>
        {description && (
          <p className={cn('text-sm font-normal mt-1 leading-relaxed', styles.text)}>
            {description}
          </p>
        )}
        {ctaLabel && onCta && (
          <button
            onClick={onCta}
            className={cn('text-sm font-bold underline mt-4', styles.text)}
          >
            {ctaLabel}
          </button>
        )}
      </div>
      {onClose && (
        <button onClick={onClose} className={cn('flex-shrink-0 mt-0.5', styles.text)}>
          <NioIcon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
