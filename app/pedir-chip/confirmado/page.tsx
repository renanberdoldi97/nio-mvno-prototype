'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { NioIcon } from '@/components/icons';
import { useAppState } from '@/lib/state';
import { MOCK_USER } from '@/lib/mock-data';
import { sleep } from '@/lib/utils';

export default function ConfirmadoPage() {
  const router = useRouter();
  const selectedChipType = useAppState(s => s.selectedChipType);
  const setOrderStatus = useAppState(s => s.setOrderStatus);
  const setTrackingStatus = useAppState(s => s.setTrackingStatus);
  // Acesso direto à URL sem seleção prévia cai na variante eSIM
  const isPhysical = selectedChipType === 'physical';

  // Chip físico confirmado passa a aparecer como entrega pendente na home
  useEffect(() => {
    if (!isPhysical) return;
    let active = true;
    (async () => {
      await sleep(200);
      if (!active) return;
      setOrderStatus('pending_delivery');
      setTrackingStatus('confirmed');
    })();
    return () => {
      active = false;
    };
  }, [isPhysical, setOrderStatus, setTrackingStatus]);

  return (
    <JourneyLayout
      title="Pedir chip móvel"
      onBack={() => router.push('/')}
      transition="fade"
      cta={
        isPhysical ? (
          <Button variant="outline" onClick={() => router.push('/')}>
            Voltar para o início
          </Button>
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
          <div className="flex items-center gap-2 mb-2">
            <div className="text-[var(--color-primary-background)]">
              <NioIcon name="check-circle" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-neutral-text)]">
              Pedido confirmado!
            </h1>
          </div>
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

      <div className="px-6 mt-6">
        <Card variant="neutral">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-neutral-text-medium)]">Tipo de chip</span>
            {isPhysical && (
              <span className="text-sm text-[var(--color-neutral-text-medium)]">Alterar</span>
            )}
          </div>
          {isPhysical ? (
            <>
              <p className="font-bold text-[var(--color-neutral-text)]">Chip físico</p>
              <p className="text-sm text-[var(--color-neutral-text-medium)] mt-1">
                {MOCK_USER.address.short}
              </p>
            </>
          ) : (
            <p className="font-bold text-[var(--color-neutral-text)]">eSIM</p>
          )}
        </Card>
      </div>
    </JourneyLayout>
  );
}
