import { NioIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

type FeedbackBannerProps = {
  title: string;
  className?: string;
};

export function FeedbackBanner({ title, className }: FeedbackBannerProps) {
  return (
    <div className={cn(
      'flex items-center gap-4 px-4 rounded-lg',
      'bg-[#C5FCD1]',
      className
    )}
    style={{ height: 56, borderRadius: 8 }}
    >
      <div className="text-[#094B18] flex-shrink-0">
        <NioIcon name="check-circle" size={20} />
      </div>
      <p className="text-sm font-semibold text-[#094B18] leading-tight">
        {title}
      </p>
    </div>
  );
}
