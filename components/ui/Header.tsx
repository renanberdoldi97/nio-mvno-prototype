'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { NioIcon } from '@/components/icons';

type HeaderProps = {
  variant?: 'primary' | 'white' | 'transparent';
  showUser?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
};

export function Header({
  variant = 'primary',
  showUser = true,
  showBack = false,
  onBack,
  title,
}: HeaderProps) {
  const isPrimary = variant === 'primary';

  return (
    <header className={cn(
      'w-full px-5 h-14 flex items-center justify-between flex-shrink-0',
      isPrimary ? 'bg-primary-darker' : 'bg-white border-b border-border'
    )}>
      {/* Esquerda: back ou logo */}
      <div className="flex items-center gap-3 flex-1">
        {showBack ? (
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center -ml-1"
          >
            <NioIcon
              name="arrow-left"
              size={24}
              className={isPrimary ? 'invert brightness-0 invert' : ''}
            />
          </button>
        ) : (
          <Image
            src={isPrimary ? '/logo/Color=White.svg' : '/logo/Color=Default.svg'}
            alt="Nio"
            width={52}
            height={28}
            unoptimized
            priority
          />
        )}
        {title && (
          <span className={cn(
            'text-base font-semibold',
            isPrimary ? 'text-white' : 'text-text-primary'
          )}>
            {title}
          </span>
        )}
      </div>

      {/* Direita: usuário */}
      {showUser && !showBack && (
        <div className="flex items-center gap-2">
          <NioIcon
            name="user-circle"
            size={20}
            className={isPrimary ? 'opacity-90 invert brightness-0 invert' : ''}
          />
          <span className={cn(
            'text-sm font-medium',
            isPrimary ? 'text-white' : 'text-text-primary'
          )}>
            Ana
          </span>
        </div>
      )}
    </header>
  );
}
