'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Message } from '@/components/ui/Message';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { VerticalStepper, type VerticalStep } from '@/components/ui/VerticalStepper';
import { useAppState } from '@/lib/state';

const STEPS: VerticalStep[] = [
  { key: 'wifi', caption: 'Passo 1', icon: 'wifi-on', title: 'Garanta que seu Wi-Fi está conectado', status: 'completed' },
  { key: 'desligar', caption: 'Passo 2', icon: 'smartphone', title: 'Desligue o celular', status: 'completed' },
  { key: 'inserir', caption: 'Passo 3', icon: 'chip-sim', title: 'Insira o chip recebido', status: 'completed' },
  { key: 'ligar', caption: 'Passo 4', icon: 'smartphone', title: 'Ligue o celular novamente', status: 'completed' },
];

export default function AtivarFisicoPage() {
  const router = useRouter();
  const selectedDDD = useAppState(s => s.selectedDDD);
  const setSelectedDDD = useAppState(s => s.setSelectedDDD);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <JourneyLayout
      title="Ativar chip móvel"
      onBack={() => router.push('/')}
      mainClassName="pb-64"
      cta={
        <>
          <Message
            kind="warning"
            title="Não jogue fora o cartão do chip"
            description="Você precisará do código que vem nesse cartão para ativar o chip."
          />
          <Button onClick={() => router.push('/ativar-chip/fisico/scanner')}>
            Ativar chip
          </Button>
        </>
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

          <Message
            kind="warning"
            title="O DDD não pode ser alterado depois. Se for portar um número, ele precisa ter o mesmo DDD."
            className="mb-4"
          />

          <Button onClick={() => setSheetOpen(false)}>
            Confirmar
          </Button>
        </BottomSheet>
      }
    >
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] mb-2">
          Vamos ativar seu chip
        </h1>
        <p className="text-sm text-[var(--color-neutral-text-medium)] mb-5">
          Caso você já tenha realizado os passos abaixo, clique em Ativar chip
        </p>

        <div className="mb-5">
          <VerticalStepper variant="timeline" steps={STEPS} />
        </div>

        <Card variant="neutral" padding="md" className="mt-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-[var(--color-neutral-text-medium)]">
                Número novo
              </p>
              <p className="text-sm font-bold text-[var(--color-neutral-text)] mt-2">
                DDD atual: ({selectedDDD})
              </p>
              <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2 leading-relaxed">
                Confira seu DDD antes de ativar. Depois da ativação, ele não poderá ser alterado. Para portabilidade, escolha o mesmo DDD do número atual.
              </p>
            </div>
            <button
              onClick={() => setSheetOpen(true)}
              className="text-[var(--color-primary-text)] text-sm font-semibold ml-4 flex-shrink-0 mt-0.5"
            >
              Alterar
            </button>
          </div>
        </Card>
      </div>
    </JourneyLayout>
  );
}
