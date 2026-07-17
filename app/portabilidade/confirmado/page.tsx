'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Message } from '@/components/ui/Message';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { NioIcon } from '@/components/icons';

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
      <div className="px-6 pt-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-[var(--color-primary-background)]">
            <NioIcon name="check-circle" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-neutral-text)]">
            Pedido confirmado!
          </h1>
        </div>

        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
          O processo de portabilidade pode levar até 3 dias úteis. Enquanto isso, seus dois
          números ficam ativos.
        </p>

        <div className="mt-6">
          <Message
            kind="info"
            title="Um SMS de confirmação será enviado no número da operadora atual"
            description="É só responder SIM pra concluir o processo."
          />
        </div>
      </div>
    </JourneyLayout>
  );
}
