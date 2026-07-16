'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Message } from '@/components/ui/Message';
import { Stepper } from '@/components/ui/Stepper';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { useAppState } from '@/lib/state';
import { MOCK_TRACKING } from '@/lib/mock-data';
import { TRACKING_TITLES, TRACKING_STEPPER, TRACKING_CTA_LABEL } from '@/lib/tracking';

const STEP_LABELS = ['Pedido', 'Transporte', 'Entrega'];

export default function TrackingPage() {
  const router = useRouter();
  const trackingStatus = useAppState(s => s.trackingStatus);
  const setTrackingStatus = useAppState(s => s.setTrackingStatus);

  // Progressão automática — assume o caminho feliz da entrega
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    if (trackingStatus === 'confirmed') {
      timers.push(setTimeout(() => setTrackingStatus('in_transit'), 8000));
    } else if (trackingStatus === 'in_transit') {
      timers.push(setTimeout(() => setTrackingStatus('delivered'), 8000));
    }
    return () => timers.forEach(clearTimeout);
  }, [trackingStatus, setTrackingStatus]);

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
      <div className="px-6 pt-6">
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
            <Message
              kind="success"
              title="Guarde o cartão do chip, nele está o código que você vai usar pra ativar. Sem ele, a ativação não acontece."
            />
          </div>
        )}
      </div>
    </JourneyLayout>
  );
}
