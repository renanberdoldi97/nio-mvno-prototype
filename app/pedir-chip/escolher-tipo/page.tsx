'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageTransition } from '@/components/ui/PageTransition';
import { cn } from '@/lib/utils';
import { useAppState } from '@/lib/state';
import { MOCK_USER } from '@/lib/mock-data';

export default function EscolherTipoPage() {
  const router = useRouter();
  const selectedChipType = useAppState(s => s.selectedChipType);
  const setSelectedChipType = useAppState(s => s.setSelectedChipType);

  useEffect(() => {
    if (selectedChipType === null && MOCK_USER.esimSupported) {
      setSelectedChipType('esim');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTransition>
      <div className="w-full h-full flex flex-col relative bg-background">
        <Header showBack onBack={() => router.push('/')} />

        <main className="flex-1 overflow-y-auto no-scrollbar pb-40">
          <h1 className="font-bold text-2xl px-5 pt-6 pb-4 text-text-primary">
            Escolha a melhor opção pra você
          </h1>
          <p className="px-5 pb-5 text-sm text-text-secondary">
            Pedindo pra outra pessoa? Confirme o modelo do aparelho dela antes de continuar.
          </p>

          <div className="px-5 flex flex-col gap-3">
            {/* Card eSIM */}
            <Card
              onClick={() => setSelectedChipType('esim')}
              className={cn(
                'border-2',
                selectedChipType === 'esim' ? 'border-primary' : 'border-border'
              )}
            >
              {MOCK_USER.esimSupported && (
                <span className="inline-block bg-[#E8FFE0] text-primary-dark text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                  Recomendado para este aparelho
                </span>
              )}
              <p className="font-bold text-lg text-text-primary">eSIM</p>
              <p className="text-sm text-text-secondary mt-0.5">Ativar agora</p>
              <p className="text-sm text-text-secondary mt-2">
                Comece a usar seu plano em poucos minutos.
              </p>
            </Card>

            {/* Card Chip físico */}
            <Card
              onClick={() => setSelectedChipType('physical')}
              className={cn(
                'border-2',
                selectedChipType === 'physical' ? 'border-primary' : 'border-border'
              )}
            >
              <p className="font-bold text-lg text-text-primary">Chip físico</p>
              <p className="text-sm text-text-secondary mt-0.5">Ativar após entrega</p>
              <p className="text-sm text-text-secondary mt-2">
                Receba o chip em casa e ative pelo app.
              </p>
              <p className="text-xs text-text-secondary mt-2">
                {MOCK_USER.address.short}
              </p>
            </Card>
          </div>
        </main>

        <div className="absolute bottom-0 left-0 right-0 bg-background px-5 pt-3 pb-6">
          <Button
            disabled={selectedChipType === null}
            onClick={() => router.push('/pedir-chip/resumo')}
          >
            Continuar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="mt-1 text-sm"
            onClick={() => router.push('/pedir-chip/resumo?outro=true')}
          >
            Quero chip pra outro aparelho
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
