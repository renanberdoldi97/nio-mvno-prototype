'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChipTag } from '@/components/ui/ChipTag';
import { FeedbackBanner } from '@/components/ui/FeedbackBanner';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { NioIcon } from '@/components/icons';
import { useAppState } from '@/lib/state';
import { MOCK_USER } from '@/lib/mock-data';

export default function ChipMovelPage() {
  const router = useRouter();
  const selectedChipType = useAppState(s => s.selectedChipType);

  const isEsim = selectedChipType === 'esim';

  return (
    <JourneyLayout
      title="Chip móvel"
      onBack={() => router.push('/')}
      rightAction={
        <button
          onClick={() => router.push('/suporte')}
          className="w-8 h-8 flex items-center justify-center"
        >
          <NioIcon name="call" size={24} />
        </button>
      }
      cta={
        <>
          <FeedbackBanner
            title="Ative seu chip e comece a usar seu novo número"
            description="Você precisará do código que vem no cartão do chip para fazer a ativação."
            autoHideMs={0}
          />
          <Button onClick={() => router.push(isEsim ? '/ativar-chip/esim' : '/ativar-chip/fisico')}>
            Iniciar ativação
          </Button>
        </>
      }
    >
      <div className="px-6 pt-6 h-full flex flex-col">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h1 className="text-3xl font-bold text-[var(--color-neutral-text)]">
            {MOCK_USER.plan.name}
          </h1>
          <ChipTag
            variant="label"
            className="bg-[var(--color-neutral-border)] text-[var(--color-neutral-text-medium)]"
          >
            Plano ativo
          </ChipTag>
        </div>

        <h2 className="text-xl font-bold text-[var(--color-neutral-text)] mt-4">
          {isEsim ? 'eSIM solicitado' : 'Chip físico solicitado'}
        </h2>
        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
          Acompanhe seu pedido por aqui.
        </p>

        <Card variant="neutral" padding="lg" className="mt-6">
          <p className="text-sm text-[var(--color-neutral-text-medium)] mb-3">Seu pedido:</p>
          <div className="flex items-center gap-2 mb-2">
            <NioIcon name="chip-sim" size={22} />
            <span className="text-sm font-semibold text-[var(--color-neutral-text)]">1 chip móvel de 20GB</span>
          </div>
          <div className="flex items-center gap-2">
            <NioIcon name="location" size={22} />
            <span className="text-sm text-[var(--color-neutral-text)]">{MOCK_USER.address.short}</span>
          </div>
        </Card>

        <div className="flex-1" />
      </div>
    </JourneyLayout>
  );
}
