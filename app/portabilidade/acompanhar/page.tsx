'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Message } from '@/components/ui/Message';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { VerticalStepper, type VerticalStep } from '@/components/ui/VerticalStepper';
import { useAppState } from '@/lib/state';
import { MOCK_CHIP, MOCK_PORTABILITY } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { PortabilityStatus } from '@/lib/types';

function StatusBadge({ status }: { status: PortabilityStatus }) {
  // Só "completed" fecha o badge como concluído — "scheduled" já teve o número
  // liberado mas a portabilidade em si ainda está em andamento.
  const isDone = status === 'completed';
  const config = isDone
    ? { label: 'Concluído', bg: 'bg-[var(--color-primary-background)]', text: 'text-white' }
    : { label: 'Em andamento', bg: 'bg-[#D6EBEA]', text: 'text-[#024B41]' };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold',
      config.bg,
      config.text,
    )}>
      {config.label}
    </span>
  );
}

export default function AcompanharPortabilidadePage() {
  const router = useRouter();
  const rawStatus = useAppState(s => s.portabilityStatus);
  const setPortabilityStatus = useAppState(s => s.setPortabilityStatus);
  const setOrderStatus = useAppState(s => s.setOrderStatus);
  // Fora do caminho feliz, trata como "aguardando liberação" nesta tela
  const status: PortabilityStatus = rawStatus === 'idle' ? 'awaiting_release' : rawStatus;

  // Progressão automática — só o caminho feliz: aguardando → liberado → concluído
  useEffect(() => {
    if (status === 'awaiting_release') {
      const t = setTimeout(() => setPortabilityStatus('scheduled'), 8000);
      return () => clearTimeout(t);
    }
    if (status === 'scheduled') {
      const t = setTimeout(() => setPortabilityStatus('completed'), 8000);
      return () => clearTimeout(t);
    }
  }, [status, setPortabilityStatus]);

  function handleCancelRequest() {
    setPortabilityStatus('idle');
    router.push('/');
  }

  function handlePrimaryCta() {
    if (status === 'completed') {
      setOrderStatus('active');
      router.push('/chip-movel');
    } else {
      router.push('/');
    }
  }

  function handleBackHome() {
    if (status === 'completed') {
      setOrderStatus('active');
    }
    router.push('/');
  }

  const portabilitySteps: VerticalStep[] = [
    {
      key: 'provisional',
      title: 'Número provisório',
      description: MOCK_CHIP.fullNumber,
      status: 'completed',
    },
    {
      key: 'release',
      title: status === 'awaiting_release'
        ? 'Aguardando liberação'
        : 'Liberação do número na operadora atual',
      description: status === 'awaiting_release' ? 'Conclusão em até 3 dias úteis' : undefined,
      status: status === 'awaiting_release' ? 'active' : 'completed',
    },
    {
      key: 'ported',
      title: 'Número portado',
      description: status === 'completed' ? MOCK_CHIP.fullNumber : '(11) 0000-0000',
      status: status === 'completed' ? 'completed' : 'pending',
    },
  ];

  return (
    <JourneyLayout
      title="Portabilidade"
      onBack={() => router.push('/')}
      cta={
        status === 'awaiting_release' ? (
          <Button variant="outline" onClick={handleCancelRequest}>
            Solicitar cancelamento
          </Button>
        ) : (
          <>
            <Button onClick={handlePrimaryCta}>Informações do chip móvel</Button>
            <Button variant="outline" onClick={handleBackHome}>
              Voltar pro início
            </Button>
          </>
        )
      }
    >
      <div className="px-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight mb-6">
          Acompanhe o seu pedido<br />de portabilidade
        </h1>

        <Card variant="white" padding="lg">
          <div className="mb-5">
            <StatusBadge status={status} />
          </div>

          <VerticalStepper steps={portabilitySteps} />

          <div className="mt-6 pt-4 border-t border-[var(--color-neutral-border)] space-y-2">
            <p className="text-sm text-[var(--color-neutral-text-medium)]">
              Protocolo: {MOCK_PORTABILITY.protocol}
            </p>
            <p className="text-sm text-[var(--color-neutral-text-medium)]">
              Data do pedido: {MOCK_PORTABILITY.requestedAt}
            </p>
            <p className="text-sm text-[var(--color-neutral-text-medium)]">
              Bilhete de portabilidade: {MOCK_PORTABILITY.ticket}
            </p>
          </div>
        </Card>

        {status === 'awaiting_release' && (
          <Message
            kind="info"
            title="Um SMS de confirmação será enviado no número da operadora atual, é só responder SIM pra concluir o processo."
            className="mt-4"
          />
        )}
      </div>
    </JourneyLayout>
  );
}
