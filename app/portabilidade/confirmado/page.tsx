'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { StateCard } from '@/components/ui/StateCard';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { SuccessIcon } from '@/components/ui/SuccessIcon';

export default function PortabilidadeConfirmadoPage() {
  const router = useRouter();

  return (
    <JourneyLayout
      title="Portabilidade"
      showBack={false}
      transition="fade"
      cta={
        <>
          <Button onClick={() => router.push('/portabilidade/acompanhar')}>
            Acompanhar portabilidade
          </Button>
          <Button variant="outline" onClick={() => router.push('/')}>
            Voltar para o início
          </Button>
        </>
      }
    >
      <div className="px-6 pt-6 flex flex-col items-center text-center">
        <SuccessIcon />

        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] mt-4">
          Pedido confirmado!
        </h1>

        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
          O processo de portabilidade pode levar até 3 dias úteis. Enquanto isso, seus dois
          números ficam ativos.
        </p>

        <div className="w-full mt-6 text-left">
          <StateCard
            variant="info"
            title="Um SMS de confirmação será enviado no número da operadora atual"
            description="É só responder SIM pra concluir o processo."
          />
        </div>
      </div>
    </JourneyLayout>
  );
}
