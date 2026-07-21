'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { NioIcon } from '@/components/icons';
import { useAppState } from '@/lib/state';
import { MOCK_USER } from '@/lib/mock-data';

// Simplificação do protótipo: todo aparelho identificado suporta eSIM.
const isEsimSupported = true;

export default function OutroAparelhoEscolherTipoPage() {
  const router = useRouter();
  const identifiedDevice = useAppState(s => s.identifiedDevice);
  const selectedChipType = useAppState(s => s.selectedChipType);
  const setSelectedChipType = useAppState(s => s.setSelectedChipType);

  useEffect(() => {
    if (!selectedChipType && isEsimSupported) {
      setSelectedChipType('esim');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JourneyLayout
      title="Pedir chip móvel"
      onBack={() => router.push('/pedir-chip/outro-aparelho')}
      cta={
        <Button onClick={() => router.push('/pedir-chip/outro-aparelho/resumo')}>
          Continuar
        </Button>
      }
    >
      <div className="px-6 pt-6 pb-5">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight mb-4">
          Escolha a melhor opção<br />pra você
        </h1>

        <Card variant="neutral">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-neutral-text-medium)]">Aparelho identificado</p>
              <p className="font-bold text-base text-[var(--color-neutral-text)] mt-0.5">
                {identifiedDevice}
              </p>
            </div>
            <button
              onClick={() => router.push('/pedir-chip/outro-aparelho')}
              className="text-sm font-semibold text-[var(--color-primary-background)]"
            >
              Alterar
            </button>
          </div>
        </Card>
      </div>

      <div className="px-6 flex flex-col gap-4">
        {/* Card eSIM */}
        <Card
          variant={selectedChipType === 'esim' ? 'selected' : 'white'}
          onClick={() => setSelectedChipType('esim')}
          padding="md"
        >
          <div className="flex gap-3 items-start">
            <div className="w-11 h-11 rounded-full bg-[var(--color-primary-background-low)] flex items-center justify-center flex-shrink-0">
              <NioIcon name="chip-sim" size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--color-neutral-text-medium)]">eSIM</p>
              <p className="text-base font-bold text-[var(--color-neutral-text)] mt-0.5">Ativar agora</p>
              <p className="text-sm text-[var(--color-neutral-text-medium)] mt-1">
                Comece a usar seu plano em poucos minutos.
              </p>
              {isEsimSupported && (
                <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-[var(--color-primary-background)] text-white text-[11px] font-semibold">
                  Recomendado para este aparelho
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Card Chip Físico */}
        <Card
          variant={selectedChipType === 'physical' ? 'selected' : 'white'}
          onClick={() => setSelectedChipType('physical')}
          padding="md"
        >
          <div className="flex gap-3 items-start">
            <div className="w-11 h-11 rounded-full bg-[var(--color-primary-background-low)] flex items-center justify-center flex-shrink-0">
              <NioIcon name="chip" size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--color-neutral-text-medium)]">Chip físico</p>
              <p className="text-base font-bold text-[var(--color-neutral-text)] mt-0.5">Ativar após entrega</p>
              <p className="text-sm text-[var(--color-neutral-text-medium)] mt-1">
                Receba o chip em casa e ative pelo app.
              </p>
              <p className="text-base font-semibold text-[var(--color-neutral-text)] mt-3">
                {MOCK_USER.address.short}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </JourneyLayout>
  );
}
