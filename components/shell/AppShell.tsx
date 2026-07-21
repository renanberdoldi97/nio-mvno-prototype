'use client';

import { Header } from '@/components/ui/Header';
import { BottomNav } from '@/components/ui/BottomNav';

type AppShellProps = {
  children: React.ReactNode;
  headerVariant?: 'home' | 'journey' | 'transparent';
  showBottomNav?: boolean;
};

// Header ainda expõe seu vocabulário antigo (primary/white/transparent) —
// telas de jornada usam <Header> direto e serão migradas no Prompt Refactor C.
const headerVariantMap = {
  home: { variant: 'primary', showUser: true },
  journey: { variant: 'white', showUser: false },
  transparent: { variant: 'transparent', showUser: false },
} as const;

export function AppShell({
  children,
  headerVariant = 'home',
  showBottomNav = true,
}: AppShellProps) {
  const { variant, showUser } = headerVariantMap[headerVariant];

  return (
    <div className="w-full h-full flex flex-col bg-[var(--color-neutral-background)] relative">
      <Header variant={variant} showUser={showUser} />
      <main className="flex-1 overflow-y-auto no-scrollbar pt-4 pb-40">
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
