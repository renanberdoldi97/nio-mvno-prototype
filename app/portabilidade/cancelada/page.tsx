'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { useAppState } from '@/lib/state';

export default function PortabilidadeCanceladaPage() {
  const router = useRouter();
  const setOrderStatus = useAppState(s => s.setOrderStatus);

  function goToChipMovel() {
    setOrderStatus('active');
    router.push('/chip-movel');
  }

  return (
    <JourneyLayout
      title="Portabilidade"
      onBack={() => router.push('/')}
      transition="fade"
      cta={
        <>
          <Button onClick={goToChipMovel}>Informações do chip móvel</Button>
          <Button variant="outline" onClick={() => router.push('/')}>
            Voltar pro início
          </Button>
        </>
      }
    >
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight">
          Portabilidade cancelada
        </h1>

        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2 leading-relaxed">
          Seu número atual continua funcionando normalmente. Você também pode pedir a
          portabilidade mais tarde.
        </p>
      </div>
    </JourneyLayout>
  );
}
