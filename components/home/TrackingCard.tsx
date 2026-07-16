'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { ChipTag } from '@/components/ui/ChipTag';
import { Button } from '@/components/ui/Button';
import { Stepper } from '@/components/ui/Stepper';
import { useAppState } from '@/lib/state';
import { TRACKING_TITLES, TRACKING_STEPPER, TRACKING_CTA_LABEL } from '@/lib/tracking';

const STEP_LABELS = ['Pedido', 'Transporte', 'Entrega'];

export function TrackingCard() {
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
        router.push('/tracking');
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
    <Card variant="white" elevated>
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-base text-[var(--color-neutral-text)]">
          {TRACKING_TITLES[trackingStatus]}
        </p>
        <ChipTag variant="label">Chip móvel</ChipTag>
      </div>

      <Stepper steps={steps} className="mb-4" />

      {trackingStatus === 'delivered' && (
        <div className="bg-[var(--color-primary-background-low)] text-[var(--color-primary-text)] rounded-full px-3 py-2 text-sm mb-4">
          Guarde o cartão, o código de ativação está nele.
        </div>
      )}

      <Button onClick={handleCta}>{TRACKING_CTA_LABEL[trackingStatus]}</Button>
    </Card>
  );
}
