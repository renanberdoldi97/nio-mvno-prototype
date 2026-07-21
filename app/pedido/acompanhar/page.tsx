'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChipTag } from '@/components/ui/ChipTag';
import { Message } from '@/components/ui/Message';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { VerticalStepper, type VerticalStep } from '@/components/ui/VerticalStepper';
import { NioIcon } from '@/components/icons';
import { useAppState } from '@/lib/state';
import { MOCK_USER } from '@/lib/mock-data';

export default function AcompanharPedidoPage() {
  const router = useRouter();
  const trackingStatus = useAppState(s => s.trackingStatus);
  const setTrackingStatus = useAppState(s => s.setTrackingStatus);

  // Progressão automática — só o caminho feliz
  useEffect(() => {
    if (trackingStatus === 'confirmed') {
      const t = setTimeout(() => setTrackingStatus('in_transit'), 8000);
      return () => clearTimeout(t);
    }
    if (trackingStatus === 'in_transit') {
      const t = setTimeout(() => setTrackingStatus('delivered'), 8000);
      return () => clearTimeout(t);
    }
  }, [trackingStatus, setTrackingStatus]);

  const title = trackingStatus === 'in_transit'
    ? 'Seu chip está a caminho'
    : trackingStatus === 'delivered'
    ? 'Seu chip já chegou!'
    : 'Pedido confirmado';

  const steps: VerticalStep[] = [
    {
      key: 'confirmacao',
      title: 'Confirmação do pedido',
      description: '18/07/2026',
      status: 'completed',
    },
    {
      key: 'envio',
      title: 'Envio do pedido',
      description: trackingStatus === 'in_transit' || trackingStatus === 'delivered' ? '19/07/2026' : '-',
      status: trackingStatus === 'in_transit' || trackingStatus === 'delivered'
        ? 'completed'
        : trackingStatus === 'confirmed'
        ? 'active'
        : 'pending',
    },
    {
      key: 'entrega',
      title: 'Entrega',
      description: trackingStatus === 'delivered' ? '22/07/2026' : '-',
      status: trackingStatus === 'delivered' ? 'completed' : trackingStatus === 'in_transit' ? 'active' : 'pending',
    },
  ];

  return (
    <JourneyLayout
      title="Acompanhar pedido"
      onBack={() => router.push('/')}
      cta={
        <>
          {(trackingStatus === 'confirmed' || trackingStatus === 'in_transit') && (
            <Message
              kind="warning"
              title="Não jogue fora o cartão do chip"
              description="Você precisará do código que vem nesse cartão para ativar o chip."
              className="mb-0"
            />
          )}
          {trackingStatus === 'delivered' && (
            <Message
              kind="success"
              title="Ative seu chip e comece a usar seu novo número"
              description="Você precisará do código que vem no cartão do chip para fazer a ativação."
              className="mb-0"
            />
          )}
          {trackingStatus === 'in_transit' && (
            <Button onClick={() => setTrackingStatus('delivered')}>Já recebi o chip</Button>
          )}
          {trackingStatus === 'delivered' && (
            <Button onClick={() => router.push('/ativar-chip/fisico')}>Iniciar ativação</Button>
          )}
        </>
      }
    >
      <div className="px-6 pt-6">
        <Card variant="neutral">
          <h2 className="font-bold text-xl leading-tight text-[var(--color-neutral-text)]">
            {title}
          </h2>
          <p className="text-sm text-[var(--color-neutral-text-medium)] mt-1">
            Acompanhe seu pedido por aqui.
          </p>

          <div className="border-t border-[var(--color-neutral-border)] mt-4 pt-4 flex flex-col gap-3">
            <p className="text-sm font-bold text-[var(--color-neutral-text)]">Seu pedido:</p>
            <div className="flex items-center gap-2">
              <NioIcon name="chip-sim" size={24} />
              <span className="text-sm text-[var(--color-neutral-text)]">1 chip móvel de 50 GB</span>
            </div>
            <div className="flex items-center gap-2">
              <NioIcon name="home" size={24} />
              <span className="text-sm text-[var(--color-neutral-text)]">{MOCK_USER.address.short}</span>
            </div>
            <div className="flex items-center gap-2">
              <NioIcon name="calendar" size={24} />
              <span className="text-sm text-[var(--color-neutral-text)]">Chega até 22/07/2026</span>
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <Card variant="white">
            <VerticalStepper steps={steps} />
          </Card>
        </div>

        <div className="flex justify-center mt-6">
          <ChipTag variant="label" className="text-xs text-[var(--color-neutral-text-medium)] normal-case">
            Tela em construção — versão final pelo time de produtos
          </ChipTag>
        </div>
      </div>
    </JourneyLayout>
  );
}
