'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NioIcon } from '@/components/icons';
import type { IconName } from '@/components/icons';

type NavItem = {
  key: string;
  label: string;
  route: string;
  icon: IconName;
};

const items: NavItem[] = [
  { key: 'home', label: 'Início', route: '/', icon: 'home' },
  { key: 'accounts', label: 'Contas', route: '/contas', icon: 'card' },
  { key: 'products', label: 'Produtos', route: '/produtos', icon: 'squares' },
  { key: 'support', label: 'Suporte', route: '/suporte', icon: 'tool' },
  { key: 'more', label: 'Mais', route: '/mais', icon: 'more' },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-[var(--color-neutral-background-inverse)] flex items-center justify-around h-16 pb-safe z-30">
      {items.map(item => {
        const active = pathname === item.route;
        return (
          <button
            key={item.key}
            onClick={() => router.push(item.route)}
            className="flex flex-col items-center gap-1 flex-1 h-full justify-center"
          >
            <div className={cn(
              'w-6 h-6 flex items-center justify-center',
              active ? 'opacity-100' : 'opacity-40'
            )}>
              <NioIcon name={item.icon} size={24} className="brightness-0 invert" />
            </div>
            <span className={cn(
              'text-[10px] font-medium',
              active ? 'text-[var(--color-primary-background-high)]' : 'text-white/60'
            )}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
