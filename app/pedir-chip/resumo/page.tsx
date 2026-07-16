'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { NioIcon } from '@/components/icons';
import { useAppState } from '@/lib/state';
import { MOCK_USER } from '@/lib/mock-data';

export default function ResumoPage() {
  const router = useRouter();
  const selectedChipType = useAppState(s => s.selectedChipType);
  const selectedDDD = useAppState(s => s.selectedDDD);
  const [planSheetOpen, setPlanSheetOpen] = useState(false);

  const isEsim = selectedChipType !== 'physical';

  return (
    <JourneyLayout
      title="Pedir chip móvel"
      onBack={() => router.push('/pedir-chip/escolher-tipo')}
      cta={
        <Button onClick={() => router.push('/pedir-chip/confirmando')}>
          Confirmar pedido
        </Button>
      }
      overlay={
        <BottomSheet
          isOpen={planSheetOpen}
          onClose={() => setPlanSheetOpen(false)}
          title="Plano 50 GB"
        >
          <NioIcon name="info" size={24} className="mb-3" />

          <div className="bg-[var(--color-neutral-background-low)] rounded-2xl p-4">
            <p className="text-sm font-semibold text-[var(--color-neutral-text-medium)] mb-1">Seu plano</p>
            <p className="text-sm text-[var(--color-neutral-text)] mb-4">
              Seu chip móvel inclui 50 GB por mês. A franquia é separada da sua internet Nio Fibra.
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <NioIcon name="smartphone" size={18} className="mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[var(--color-neutral-text)]">
                  Ligações e SMS ilimitados — Pra qualquer operadora, em todo o Brasil
                </p>
              </div>
              <div className="flex items-start gap-3">
                <NioIcon name="whatsapp" size={18} className="mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[var(--color-neutral-text)]">
                  WhatsApp ilimitado — Pra mensagens de texto e voz
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-[var(--color-neutral-text-medium)] my-5">
            Quando os dados da franquia acabarem, a velocidade reduz.
          </p>

          <Button onClick={() => setPlanSheetOpen(false)}>Entendi</Button>
        </BottomSheet>
      }
    >
      <div className="px-6 pt-4 pb-5">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight">
          Confira os detalhes<br />do seu pedido
        </h1>
      </div>

      <div className="px-6 flex flex-col gap-3">
        {/* Card 1 — Tipo de chip */}
        <Card variant="neutral">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-neutral-text-medium)]">Tipo de chip</span>
            <button
              onClick={() => router.push('/pedir-chip/escolher-tipo')}
              className="text-sm font-semibold text-[var(--color-primary-background)]"
            >
              Alterar
            </button>
          </div>
          {isEsim ? (
            <p className="font-bold text-[var(--color-neutral-text)]">eSIM</p>
          ) : (
            <>
              <p className="font-bold text-[var(--color-neutral-text)]">Chip físico</p>
              <p className="text-sm text-[var(--color-neutral-text-medium)] mt-1">{MOCK_USER.address.short}</p>
            </>
          )}
        </Card>

        {/* Card 2 — Número novo */}
        <Card variant="neutral">
          <p className="text-sm text-[var(--color-neutral-text-medium)] mb-2">Número novo</p>
          <p className="font-bold text-[var(--color-neutral-text)]">
            Seu chip vem com DDD ({selectedDDD}), correspondente ao endereço da sua Nio Fibra.
          </p>
          <p className="text-xs text-[var(--color-neutral-text-medium)] mt-2">
            Você pode trazer seu número de outra operadora depois de ativar.
          </p>
        </Card>

        {/* Card 3 — Plano */}
        <Card variant="neutral">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-[var(--color-neutral-text-medium)]">Plano</span>
              <button onClick={() => setPlanSheetOpen(true)}>
                <NioIcon name="info" size={16} />
              </button>
            </div>
          </div>
          <p className="font-bold text-[var(--color-neutral-text)]">50 GB + Ligações ilimitadas</p>
        </Card>
      </div>
    </JourneyLayout>
  );
}
