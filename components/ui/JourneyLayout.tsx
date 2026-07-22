'use client';

import { Header } from '@/components/ui/Header';
import { PageTransition } from '@/components/ui/PageTransition';
import { cn } from '@/lib/utils';

type JourneyLayoutProps = {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  showUser?: boolean;
  children: React.ReactNode;
  cta?: React.ReactNode;
  // BottomSheets/overlays precisam ficar fora do <main> com overflow-y-auto,
  // senão o clipping do scroll corta a sheet — renderizado como irmão do main.
  overlay?: React.ReactNode;
  transition?: 'slide' | 'fade';
  headerVariant?: 'white' | 'transparent';
  // Extra classes pro <main> scrollável — útil quando o rodapé fixo (cta) é
  // mais alto que o normal e o pb-40 padrão não é suficiente.
  mainClassName?: string;
};

// AppShell só aceita headerVariant fixo (home/journey/transparent) e não repassa
// title/showBack/onBack — por isso usamos <Header> direto aqui, fora do AppShell,
// mantendo a mesma estrutura de main scrollável + CTA fixo.
export function JourneyLayout({
  title,
  onBack,
  showBack = true,
  showUser = false,
  children,
  cta,
  overlay,
  transition = 'slide',
  headerVariant = 'white',
  mainClassName,
}: JourneyLayoutProps) {
  return (
    <PageTransition variant={transition}>
      <div className="w-full h-full flex flex-col bg-white relative">
        <Header
          variant={headerVariant}
          showUser={showUser}
          showBack={showBack}
          onBack={onBack}
          title={title}
        />
        <main className={cn('flex-1 overflow-y-auto no-scrollbar pt-4 pb-40', mainClassName)}>
          {children}
        </main>
        {cta && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--color-neutral-border)] p-4 flex flex-col gap-3">
            {cta}
          </div>
        )}
        {overlay}
      </div>
    </PageTransition>
  );
}
