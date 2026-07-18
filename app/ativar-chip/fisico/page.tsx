'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Message } from '@/components/ui/Message';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { VerticalStepper, type VerticalStep } from '@/components/ui/VerticalStepper';
import { useAppState } from '@/lib/state';

const STEPS: VerticalStep[] = [
  { key: 'wifi', icon: 'wifi-on', title: 'Garanta que seu Wi-Fi está conectado', status: 'completed' },
  { key: 'desligar', icon: 'smartphone', title: 'Desligue o celular', status: 'completed' },
  { key: 'inserir', icon: 'chip-sim', title: 'Insira o chip recebido', status: 'completed' },
  { key: 'ligar', icon: 'smartphone', title: 'Ligue o celular novamente', status: 'completed' },
];

export default function AtivarFisicoPage() {
  const router = useRouter();
  const selectedDDD = useAppState(s => s.selectedDDD);
  const setSelectedDDD = useAppState(s => s.setSelectedDDD);
  const [dddConfirmed, setDddConfirmed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Confirmação de DDD aparece automaticamente na primeira visita da tela
  useEffect(() => {
    if (!dddConfirmed) setSheetOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JourneyLayout
      title="Ativar chip móvel"
      onBack={() => router.push('/')}
      cta={
        <>
          <Message
            kind="info"
            title="Guarde o cartão do chip, nele está o código pra ativar."
            className="mb-0"
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

          <Button
            onClick={() => {
              setDddConfirmed(true);
              setSheetOpen(false);
            }}
          >
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
      </div>
    </JourneyLayout>
  );
}
