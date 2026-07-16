'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { cn } from '@/lib/utils';
import { useAppState } from '@/lib/state';
import { MOCK_CHIP, MOCK_PORTABILITY } from '@/lib/mock-data';
import { PORTABILITY_BADGE, PORTABILITY_CONTENT } from '@/lib/portability';

export default function AcompanharPortabilidadePage() {
  const router = useRouter();
  const status = useAppState(s => s.portabilityStatus);
  const setPortabilityStatus = useAppState(s => s.setPortabilityStatus);

  // Progressão automática — só o caminho feliz: aguardando → agendado → concluído
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    if (status === 'awaiting_release' || status === 'idle') {
      timers.push(setTimeout(() => setPortabilityStatus('scheduled'), 8000));
    } else if (status === 'scheduled') {
      timers.push(setTimeout(() => setPortabilityStatus('completed'), 8000));
    }
    return () => timers.forEach(clearTimeout);
  }, [status, setPortabilityStatus]);

  const badge = PORTABILITY_BADGE[status];
  const content = PORTABILITY_CONTENT[status];

  return (
    <JourneyLayout title="Portabilidade" onBack={() => router.push('/')}>
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] mb-3">
          Acompanhe o seu pedido de portabilidade
        </h1>

        <span className={cn('inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-4', badge.className)}>
          {badge.label}
        </span>

        <Card variant="white" elevated>
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--color-neutral-border)]">
            <span className="text-sm text-[var(--color-neutral-text-medium)]">Número provisório</span>
            <span className="text-sm font-bold text-[var(--color-neutral-text)]">{MOCK_CHIP.fullNumber}</span>
          </div>

          <p className="font-bold text-base text-[var(--color-neutral-text)] mb-1">{content.title}</p>
          <p className="text-sm text-[var(--color-neutral-text-medium)]">{content.description}</p>
        </Card>

        <div className="mt-5 flex flex-col gap-1">
          <p className="text-xs text-[var(--color-neutral-text-medium)]">
            Protocolo: {MOCK_PORTABILITY.protocol}
          </p>
          <p className="text-xs text-[var(--color-neutral-text-medium)]">
            Data do pedido: {MOCK_PORTABILITY.requestedAt}
          </p>
          <p className="text-xs text-[var(--color-neutral-text-medium)]">
            Bilhete de portabilidade: {MOCK_PORTABILITY.ticket}
          </p>
        </div>
      </div>
    </JourneyLayout>
  );
}
