'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const items = [
  { key: 'home', label: 'Início', route: '/' },
  { key: 'accounts', label: 'Contas', route: '/contas' },
  { key: 'products', label: 'Produtos', route: '/produtos' },
  { key: 'support', label: 'Suporte', route: '/suporte' },
  { key: 'more', label: 'Mais', route: '/mais' },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-border h-16 flex items-center justify-around pb-safe">
      {items.map(item => {
        const active = pathname === item.route;
        return (
          <button
            key={item.key}
            onClick={() => router.push(item.route)}
            className={cn(
              'flex flex-col items-center gap-1 flex-1 h-full justify-center transition-colors',
              active ? 'text-primary' : 'text-text-secondary'
            )}
          >
            <div className={cn(
              'w-6 h-6 rounded flex items-center justify-center text-xs font-bold',
              active ? 'bg-primary/10' : 'bg-transparent'
            )}>
              {item.label[0]}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
