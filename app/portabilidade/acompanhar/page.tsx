'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { cn } from '@/lib/utils';
import { useAppState } from '@/lib/state';
import { MOCK_CHIP, MOCK_PORTABILITY } from '@/lib/mock-data';
import { PORTABILITY_BADGE, PORTABILITY_CONTENT } from '@/lib/portability';
import type { PortabilityStatus } from '@/lib/types';

const DEMO_STATUSES: PortabilityStatus[] = [
  'awaiting_release',
  'scheduled',
  'completed',
  'cancelled',
  'conflict',
  'number_unavailable',
  'invalid_data',
  'no_sms_response',
  'ddd_mismatch',
  'duplicate_request',
];

export default function AcompanharPortabilidadePage() {
  const router = useRouter();
  const status = useAppState(s => s.portabilityStatus);
  const setPortabilityStatus = useAppState(s => s.setPortabilityStatus);

  const badge = PORTABILITY_BADGE[status];
  const content = PORTABILITY_CONTENT[status];

  return (
    <JourneyLayout title="Portabilidade" onBack={() => router.push('/')}>
      <div className="px-6 pt-4">
        {/* Toggle de demo — só pra avaliação do protótipo */}
        <div className="flex gap-2 flex-wrap mb-5">
          {DEMO_STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setPortabilityStatus(s)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold',
                status === s
                  ? 'bg-[var(--color-primary-background)] text-white'
                  : 'border border-[var(--color-neutral-border)] text-[var(--color-neutral-text-medium)]'
              )}
            >
              {PORTABILITY_CONTENT[s].title}
            </button>
          ))}
        </div>

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
          <p className="text-sm text-[var(--color-neutral-text-medium)] mb-3">{content.description}</p>

          {content.ctaLabel && content.ctaHref && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(content.ctaHref!)}
            >
              {content.ctaLabel}
            </Button>
          )}
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
