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

  // Tela exclusiva do chip físico — chip confirmado passa a aparecer como
  // entrega pendente na home.
  useEffect(() => {
    if (selectedChipType === 'physical') {
      setOrderStatus('pending_delivery');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JourneyLayout
      title="Pedir chip móvel"
      showBack={false}
      transition="fade"
      cta={
        <Button variant="secondary" onClick={() => router.push('/')}>
          Voltar para o início
        </Button>
      }
    >
      <div className="px-6 pt-6">
        <h1 className="text-3xl font-bold text-[var(--color-neutral-text)] leading-tight">
          Pedido confirmado!
        </h1>

        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
          Seu chip está sendo preparado, quando você receber, volte ao app pra ativar.
        </p>

        <Card variant="neutral" padding="md" className="mt-6">
          <p className="text-sm text-[var(--color-neutral-text-medium)]">Tipo de chip</p>
          <p className="font-bold text-[var(--color-neutral-text)] mt-1">Chip físico</p>
          <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
            {MOCK_USER.address.formatted}
          </p>
        </Card>
      </div>
    </JourneyLayout>
  );
}
