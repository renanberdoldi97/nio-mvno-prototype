'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StateCard } from '@/components/ui/StateCard';
import { Stepper } from '@/components/ui/Stepper';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { cn } from '@/lib/utils';
import { useAppState } from '@/lib/state';
import { MOCK_TRACKING } from '@/lib/mock-data';
import { TRACKING_TITLES, TRACKING_STEPPER, TRACKING_CTA_LABEL, type TrackingStatus } from '@/lib/tracking';

const STEP_LABELS = ['Pedido', 'Transporte', 'Entrega'];

const DEMO_OPTIONS: { label: string; value: TrackingStatus }[] = [
  { label: 'Confirmado', value: 'confirmed' },
  { label: 'Transporte', value: 'in_transit' },
  { label: 'Entregue', value: 'delivered' },
  { label: 'Falha', value: 'failed' },
];

export default function TrackingPage() {
  const router = useRouter();
  const trackingStatus = useAppState(s => s.trackingStatus);
  const setTrackingStatus = useAppState(s => s.setTrackingStatus);

  const steps = TRACKING_STEPPER[trackingStatus].map((status, i) => ({
    key: STEP_LABELS[i],
    label: STEP_LABELS[i],
    status,
  }));

  function handleCta() {
    switch (trackingStatus) {
      case 'confirmed':
        break;
      case 'in_transit':
        setTrackingStatus('delivered');
        break;
      case 'delivered':
        router.push('/ativar-chip/fisico');
        break;
      case 'failed':
        router.push('/suporte');
        break;
    }
  }

  return (
    <JourneyLayout
      title="Acompanhar entrega"
      onBack={() => router.push('/')}
      cta={
        trackingStatus === 'confirmed' ? undefined : (
          <Button onClick={handleCta}>{TRACKING_CTA_LABEL[trackingStatus]}</Button>
        )
      }
    >
      <div className="px-6 pt-4">
        {/* Toggle de demo — só pra avaliação do protótipo */}
        <div className="flex gap-2 flex-wrap mb-5">
          {DEMO_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setTrackingStatus(opt.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold',
                trackingStatus === opt.value
                  ? 'bg-[var(--color-primary-background)] text-white'
                  : 'border border-[var(--color-neutral-border)] text-[var(--color-neutral-text-medium)]'
              )}
            >
              Simular: {opt.label}
            </button>
          ))}
        </div>

        <Card variant="white" elevated>
          <p className="font-bold text-lg text-[var(--color-neutral-text)] mb-5">
            {TRACKING_TITLES[trackingStatus]}
          </p>

          <Stepper steps={steps} className="mb-6" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--color-neutral-text)]">Pedido confirmado</span>
              <span className="text-sm text-[var(--color-neutral-text-medium)]">{MOCK_TRACKING.confirmedAt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--color-neutral-text)]">Em transporte</span>
              <span className="text-sm text-[var(--color-neutral-text-medium)]">
                {trackingStatus === 'confirmed' ? 'Aguardando' : 'Chegando em breve'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--color-neutral-text)]">Entregue</span>
              <span className="text-sm text-[var(--color-neutral-text-medium)]">
                {trackingStatus === 'delivered' ? 'Concluído' : 'Aguardando'}
              </span>
            </div>
          </div>
        </Card>

        {trackingStatus === 'delivered' && (
          <div className="mt-4">
            <StateCard
              variant="highlight"
              title="Guarde o cartão do chip, nele está o código que você vai usar pra ativar. Sem ele, a ativação não acontece."
            />
          </div>
        )}
      </div>
    </JourneyLayout>
  );
}
