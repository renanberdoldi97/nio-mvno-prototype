'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChipTag } from '@/components/ui/ChipTag';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { VerticalStepper, type VerticalStep } from '@/components/ui/VerticalStepper';
import { NioIcon } from '@/components/icons';
import { MOCK_USER } from '@/lib/mock-data';

const HOW_IT_WORKS_STEPS: VerticalStep[] = [
  {
    key: 'pedir',
    caption: 'Passo 1',
    title: 'Peça o seu chip',
    icon: 'chip-sim',
    status: 'completed',
  },
  {
    key: 'ativar',
    caption: 'Passo 2',
    title: 'Ative pelo app',
    icon: 'check-circle',
    status: 'completed',
  },
  {
    key: 'usar',
    caption: 'Passo 3',
    title: 'Receba seu número novo e comece a usar',
    icon: 'smartphone',
    status: 'completed',
  },
  {
    key: 'portar',
    caption: 'Etapa opcional após ativação',
    title: 'Troque seu número pelo que você já utiliza em outra operadora',
    icon: 'swap',
    status: 'completed',
  },
];

export default function PedirChipIntroPage() {
  const router = useRouter();
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <JourneyLayout
      title="Chip móvel"
      onBack={() => router.push('/')}
      overlay={
        <BottomSheet isOpen={detailsOpen} onClose={() => setDetailsOpen(false)}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-bold text-[var(--color-neutral-text)]">
              Mais detalhes
            </h3>
            <button
              onClick={() => setDetailsOpen(false)}
              className="w-8 h-8 flex items-center justify-center"
            >
              <NioIcon name="x" size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <Card variant="neutral">
              <p className="text-xs text-[var(--color-neutral-text-medium)] mb-2">Seu benefício</p>
              <ul className="flex flex-col gap-2">
                <li className="text-sm text-[var(--color-primary-text)] flex gap-2">
                  <span>•</span>
                  <span>O chip já está <strong>incluso no seu plano</strong>, sem custo extra.</span>
                </li>
              </ul>
            </Card>

            <Card variant="neutral">
              <p className="text-xs text-[var(--color-neutral-text-medium)] mb-2">Como funciona</p>
              <ul className="flex flex-col gap-2">
                <li className="text-sm text-[var(--color-primary-text)] flex gap-2">
                  <span>•</span>
                  <span>Escolha entre <strong>chip físico ou eSIM</strong>;</span>
                </li>
                <li className="text-sm text-[var(--color-primary-text)] flex gap-2">
                  <span>•</span>
                  <span>Tem <strong>franquia de dados própria</strong>, separada da internet de casa.</span>
                </li>
                <li className="text-sm text-[var(--color-primary-text)] flex gap-2">
                  <span>•</span>
                  <span>Você pode <strong>acompanhar seu consumo</strong> e outras informações <strong>pelo app</strong>.</span>
                </li>
              </ul>
            </Card>

            <Card variant="neutral">
              <p className="text-xs text-[var(--color-neutral-text-medium)] mb-2">O que é bom saber</p>
              <ul className="flex flex-col gap-2">
                <li className="text-sm text-[var(--color-primary-text)] flex gap-2">
                  <span>•</span>
                  <span>O chip fica ativo enquanto sua Nio Fibra estiver ativa.</span>
                </li>
                <li className="text-sm text-[var(--color-primary-text)] flex gap-2">
                  <span>•</span>
                  <span>Se você <strong>cancelar a fibra</strong>, a <strong>linha móvel é encerrada</strong> junto.</span>
                </li>
                <li className="text-sm text-[var(--color-primary-text)] flex gap-2">
                  <span>•</span>
                  <span>É possível fazer a <strong>portabilidade</strong>.</span>
                </li>
                <li className="text-sm text-[var(--color-primary-text)] flex gap-2">
                  <span>•</span>
                  <span>Pode <strong>suspender o chip</strong> quando quiser, sem mudar o seu plano.</span>
                </li>
              </ul>
            </Card>
          </div>
        </BottomSheet>
      }
      cta={
        <div className="w-full flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-neutral-text-medium)]">Chip móvel</p>
            <p className="font-bold text-base text-[var(--color-neutral-text)]">20 GB</p>
          </div>
          <Button fullWidth={false} onClick={() => router.push('/pedir-chip/escolher-tipo')}>
            Pedir meu chip
          </Button>
        </div>
      }
    >
      <div className="px-6 pt-6 pb-24">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl text-[var(--color-neutral-text)]">{MOCK_USER.plan.name}</h1>
          <ChipTag variant="status">Plano ativo</ChipTag>
        </div>

        <h2 className="font-bold text-xl text-[var(--color-neutral-text)] mt-4">
          Peça agora seu chip móvel
        </h2>
        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
          Chamadas ilimitadas e 20GB de internet pro seu celular, tudo incluso no seu plano.
        </p>

        <p className="font-bold text-base text-[var(--color-neutral-text)] mt-6 mb-4">
          Como funciona:
        </p>
        <VerticalStepper variant="timeline" steps={HOW_IT_WORKS_STEPS} />

        <div className="flex justify-center mt-6">
          <Button variant="ghost" fullWidth={false} onClick={() => setDetailsOpen(true)}>
            Mais detalhes
          </Button>
        </div>
      </div>
    </JourneyLayout>
  );
}
