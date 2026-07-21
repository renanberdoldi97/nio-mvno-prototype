'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { useAppState } from '@/lib/state';
import { MOCK_USER } from '@/lib/mock-data';

export default function ConfirmadoPage() {
  const router = useRouter();
  const selectedChipType = useAppState(s => s.selectedChipType);
  const setOrderStatus = useAppState(s => s.setOrderStatus);
  const setTrackingStatus = useAppState(s => s.setTrackingStatus);

  // Tela exclusiva do chip físico — chip confirmado passa a aparecer como
  // entrega pendente na home.
  useEffect(() => {
    if (selectedChipType === 'physical') {
      setOrderStatus('pending_delivery');
      setTrackingStatus('confirmed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JourneyLayout
      title="Pedir chip móvel"
      onBack={() => router.push('/')}
      transition="fade"
      cta={
        <>
          <Button onClick={() => router.push('/pedido/acompanhar')}>
            Acompanhar entrega
          </Button>
          <Button variant="outline" onClick={() => router.push('/')}>
            Voltar pro início
          </Button>
        </>
      }
    >
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight">
          Pedido confirmado!
        </h1>
      </div>

      <p className="text-sm text-[var(--color-neutral-text-medium)] px-6 mt-2">
        Seu chip já está sendo separado. A gente te avisa por aqui até ele chegar na sua casa.
      </p>

      <div className="px-6 mt-6">
        <Card variant="neutral" padding="md">
          <p className="text-xs text-[var(--color-neutral-text-medium)]">Tipo de chip</p>
          <p className="font-bold text-[var(--color-neutral-text)] mt-1">Chip físico</p>
          <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
            {MOCK_USER.address.short}
          </p>
        </Card>
      </div>
    </JourneyLayout>
  );
}
