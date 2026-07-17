'use client';

import { NioIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

export type VerticalStep = {
  key: string;
  title: string;
  description?: string;
  status: 'completed' | 'active' | 'pending';
};

export function VerticalStepper({ steps }: { steps: VerticalStep[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <div key={step.key} className="flex gap-3">
          {/* Coluna do círculo + linha */}
          <div className="flex flex-col items-center">
            {step.status === 'completed' ? (
              <div className="w-6 h-6 rounded-full bg-[var(--color-primary-background)] flex items-center justify-center flex-shrink-0">
                <NioIcon name="check" size={14} className="brightness-0 invert" />
              </div>
            ) : step.status === 'active' ? (
              <div className="w-6 h-6 rounded-full border-2 border-[var(--color-primary-background)] bg-white flex items-center justify-center flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary-background)]" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-[var(--color-neutral-border)] flex-shrink-0" />
            )}

            {/* Linha conectora — não renderiza no último */}
            {i < steps.length - 1 && (
              <div className={cn(
                'w-0.5 flex-1 min-h-[32px] mt-1 mb-1',
                step.status === 'completed'
                  ? 'bg-[var(--color-primary-background)]'
                  : 'bg-[var(--color-neutral-border)]'
              )} />
            )}
          </div>

          {/* Conteúdo do step */}
          <div className={cn(
            'flex-1',
            i < steps.length - 1 ? 'pb-5' : ''
          )}>
            <p className={cn(
              'text-base font-bold leading-tight',
              step.status === 'pending'
                ? 'text-text-disabled'
                : 'text-[var(--color-neutral-text)]'
            )}>
              {step.title}
            </p>
            {step.description && (
              <p className={cn(
                'text-sm mt-0.5',
                step.status === 'pending'
                  ? 'text-text-disabled'
                  : 'text-[var(--color-neutral-text-medium)]'
              )}>
                {step.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
