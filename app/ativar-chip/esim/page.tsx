'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { StateCard } from '@/components/ui/StateCard';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { SuccessIcon } from '@/components/ui/SuccessIcon';
import { useAppState } from '@/lib/state';

export default function AtivarEsimPage() {
  const router = useRouter();
  const selectedDDD = useAppState(s => s.selectedDDD);
  const setSelectedDDD = useAppState(s => s.setSelectedDDD);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <JourneyLayout
      title="Ativar chip móvel"
      onBack={() => router.push('/')}
      cta={
        <Button onClick={() => router.push('/ativar-chip/esim/ativando')}>
          Ativar eSIM
        </Button>
      }
      overlay={
        <BottomSheet
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          blocking
          title="Antes de ativar, confirme o DDD"
        >
          <p className="text-sm text-[var(--color-neutral-text-medium)] mb-4">
            O chip vem com DDD ({selectedDDD}), da sua Nio Fibra. Se quiser outro, é só alterar abaixo.
          </p>

          <Input
            label="DDD desejado"
            value={selectedDDD}
            onChange={setSelectedDDD}
            inputMode="numeric"
            maxLength={2}
            className="mb-4"
          />

          <StateCard
            variant="warning"
            title="O DDD não pode ser alterado depois. Se for portar um número, ele precisa ter o mesmo DDD."
            className="mb-4"
          />

          <Button onClick={() => setSheetOpen(false)}>Confirmar</Button>
        </BottomSheet>
      }
    >
      <div className="px-6 pt-4">
        <div className="flex items-center gap-2">
          <SuccessIcon size={24} className="mx-0 flex-shrink-0" />
          <h1 className="text-2xl font-bold text-[var(--color-neutral-text)]">
            Pedido confirmado!
          </h1>
        </div>

        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
          Seu eSIM está pronto pra ser ativado. Garanta que seu aparelho está conectado a
          internet antes de começar a ativação.
        </p>

        <div className="mt-6">
          <Card variant="neutral">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--color-neutral-text-medium)]">Número novo</span>
              <button
                onClick={() => setSheetOpen(true)}
                className="text-sm font-semibold text-[var(--color-primary-background)]"
              >
                Alterar
              </button>
            </div>
            <p className="font-bold text-[var(--color-neutral-text)]">
              Ativando com DDD ({selectedDDD})
            </p>
            <p className="text-xs text-[var(--color-neutral-text-medium)] mt-2">
              O DDD não pode ser alterado depois. Pra fazer a portabilidade depois, o número
              precisa ter o DDD escolhido aqui.
            </p>
          </Card>
        </div>
      </div>
    </JourneyLayout>
  );
}
