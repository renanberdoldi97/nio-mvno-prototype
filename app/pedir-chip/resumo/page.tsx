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
        >
          <div className="flex items-center gap-2 mb-4">
            <NioIcon name="info" size={28} />
            <h3 className="text-lg font-bold text-[var(--color-neutral-text)]">Plano 50 GB</h3>
          </div>

          <Card variant="neutral" padding="md">
            <span className="text-sm text-[var(--color-neutral-text-medium)]">Seu plano</span>
            <p className="text-sm mt-2 text-[var(--color-neutral-text)]">
              Seu chip móvel inclui <strong>50 GB por mês</strong>. A franquia é separada da sua internet Nio Fibra.
            </p>

            <div className="flex flex-col gap-4 mt-5">
              <div className="flex items-start gap-3">
                <NioIcon name="smartphone" size={22} className="flex-shrink-0" />
                <div>
                  <p className="text-xs text-[var(--color-neutral-text-medium)]">Ligações e SMS ilimitados</p>
                  <p className="text-sm font-bold text-[var(--color-neutral-text)] mt-0.5">
                    Pra qualquer operadora, em todo o Brasil
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <NioIcon name="whatsapp" size={22} className="flex-shrink-0" />
                <div>
                  <p className="text-xs text-[var(--color-neutral-text-medium)]">WhatsApp ilimitado</p>
                  <p className="text-sm font-bold text-[var(--color-neutral-text)] mt-0.5">
                    Pra mensagens de texto e voz
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <p className="text-xs text-[var(--color-neutral-text-medium)] my-5">
            Quando os dados da franquia acabarem, a velocidade reduz.
          </p>

          <Button onClick={() => setPlanSheetOpen(false)}>Entendi</Button>
        </BottomSheet>
      }
    >
      <div className="px-6 pt-6 pb-5">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight">
          Confira os detalhes<br />do seu pedido
        </h1>
      </div>

      <div className="px-6 flex flex-col gap-4">
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
        <Card variant="neutral" padding="md">
          <p className="text-xs text-[var(--color-neutral-text-medium)]">Número novo</p>
          <p className="text-sm font-semibold text-[var(--color-neutral-text)] mt-2 leading-relaxed">
            Seu chip vem com o DDD do endereço da sua instalação Nio Fibra.
          </p>
          <p className="text-xs text-[var(--color-neutral-text-medium)] mt-2">
            Você pode alterar o DDD antes de ativar.
          </p>
        </Card>

        {/* Card 3 — Plano */}
        <Card variant="neutral">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className="text-sm text-[var(--color-neutral-text-medium)]">Plano</span>
              <p className="font-bold text-[var(--color-neutral-text)] mt-2">50 GB + Ligações ilimitadas</p>
            </div>
            <button onClick={() => setPlanSheetOpen(true)} className="flex-shrink-0 ml-3">
              <NioIcon name="info" size={24} />
            </button>
          </div>
        </Card>
      </div>
    </JourneyLayout>
  );
}
