import { cn } from '@/lib/utils';

export function SuccessIcon({ size = 56, className }: { size?: number; className?: string }) {
  return (
    <div
      className={cn('bg-primary mx-auto', className)}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: 'url(/icons/CheckCircular.svg)',
        maskImage: 'url(/icons/CheckCircular.svg)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}
