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
  const isTransparent = variant === 'transparent';
  // Logo só aparece na home (variant="primary"). Telas de jornada (white/transparent)
  // nunca renderizam logo, mesmo sem back/title.
  const showLogo = isPrimary && !showBack && !title;

  return (
    <header className={cn(
      'w-full px-6 h-16 flex items-center relative flex-shrink-0',
      isPrimary ? 'bg-primary-darker' : isTransparent ? 'bg-transparent' : 'bg-white'
    )}>
      {/* Esquerda: back ou logo */}
      <div className="flex items-center flex-1 min-w-0">
        {showBack ? (
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center -ml-1 z-10"
          >
            <NioIcon
              name="arrow-left"
              size={24}
              className={isPrimary ? 'invert brightness-0 invert' : ''}
            />
          </button>
        ) : showLogo ? (
          <Image
            src={isPrimary ? '/logo/Color=White.svg' : '/logo/Color=Default.svg'}
            alt="Nio"
            width={52}
            height={28}
            unoptimized
            priority
          />
        ) : null}
      </div>

      {/* Centro: título — sempre centralizado no header, independente da largura do back/user */}
      {title && (
        <div className="absolute inset-0 flex items-center justify-center px-14 pointer-events-none">
          <span className={cn(
            'text-base font-semibold truncate',
            isPrimary ? 'text-white' : 'text-text-primary'
          )}>
            {title}
          </span>
        </div>
      )}

      {/* Direita: usuário */}
      <div className="flex items-center justify-end flex-1 min-w-0">
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
      </div>
    </header>
  );
}
