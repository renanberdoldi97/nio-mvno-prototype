'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { useAppState } from '@/lib/state';

export default function ConfirmadoPage() {
  const router = useRouter();
  const selectedChipType = useAppState(s => s.selectedChipType);
  const orderStatus = useAppState(s => s.orderStatus);
  const setOrderStatus = useAppState(s => s.setOrderStatus);
  const setTrackingStatus = useAppState(s => s.setTrackingStatus);
  // Acesso direto à URL sem seleção prévia cai na variante eSIM
  const isPhysical = selectedChipType === 'physical';

  // Chip físico confirmado passa a aparecer como entrega pendente na home.
  // Roda só uma vez no mount e só se ainda não havia pedido em curso — evita
  // que o state fique sendo re-setado indevidamente ao revisitar a tela.
  useEffect(() => {
    if (selectedChipType === 'physical' && orderStatus === 'not_started') {
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
        isPhysical ? (
          <>
            <Button onClick={() => router.push('/pedido/acompanhar')}>
              Acompanhar entrega
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Voltar pro início
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => router.push('/ativar-chip/esim')}>Ativar eSIM</Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Voltar para o início
            </Button>
          </>
        )
      }
    >
      <div className="px-6 pt-6">
        {isPhysical ? (
          <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight">
            Pedido confirmado!
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] mb-2">
            Tudo pronto!
          </h1>
        )}
      </div>

      <p className="text-sm text-[var(--color-neutral-text-medium)] px-6 mt-2">
        {isPhysical
          ? 'Seu chip já está sendo separado. A gente te avisa por aqui até ele chegar na sua casa.'
          : 'Seu chip móvel foi solicitado. É só ativar o eSIM agora pra começar a usar.'}
      </p>

      {!isPhysical && (
        <div className="px-6 mt-6">
          <Card variant="neutral">
            <span className="text-sm text-[var(--color-neutral-text-medium)]">Tipo de chip</span>
            <p className="font-bold text-[var(--color-neutral-text)] mt-2">eSIM</p>
          </Card>
        </div>
      )}
    </JourneyLayout>
  );
}
