'use client';

import { Header } from '@/components/ui/Header';
import { BottomNav } from '@/components/ui/BottomNav';

type AppShellProps = {
  children: React.ReactNode;
  headerVariant?: 'primary' | 'transparent';
  showBottomNav?: boolean;
  showUser?: boolean;
};

export function AppShell({
  children,
  headerVariant = 'primary',
  showBottomNav = true,
  showUser = true,
}: AppShellProps) {
  return (
    <div className="w-full h-full flex flex-col bg-background">
      <Header variant={headerVariant} showUser={showUser} />
      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
