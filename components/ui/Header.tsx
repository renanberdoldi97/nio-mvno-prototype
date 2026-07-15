'use client';

import { cn } from '@/lib/utils';
import { useAppState } from '@/lib/state';

type HeaderProps = {
  variant?: 'primary' | 'transparent';
  showUser?: boolean;
};

export function Header({ variant = 'primary', showUser = true }: HeaderProps) {
  const isPrimary = variant === 'primary';
  return (
    <header className={cn(
      'w-full px-5 pt-3 pb-4 flex items-center justify-between',
      isPrimary ? 'bg-primary-darker text-white' : 'bg-transparent text-text-primary'
    )}>
      <div className="text-2xl font-extrabold tracking-tight">nio</div>
      {showUser && (
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
            AS
          </div>
          <span>Ana</span>
        </div>
      )}
    </header>
  );
}
