'use client';

import { NioIcon, type IconName } from '@/components/icons';
import { cn } from '@/lib/utils';

export type VerticalStep = {
  key: string;
  title: string;
  caption?: string;
  description?: string;
  icon?: IconName;
  status: 'completed' | 'active' | 'pending';
};

type VerticalStepperProps = {
  steps: VerticalStep[];
  // 'progress' = comportamento padrão com check/pending/active (tracking, portabilidade)
  // 'timeline' = todos os círculos ficam azul-clarinho (info) com ícone customizado dentro,
  // usado pra sequências informativas (não representam progresso real do usuário)
  variant?: 'progress' | 'timeline';
};

export function VerticalStepper({ steps, variant = 'progress' }: VerticalStepperProps) {
  const isTimeline = variant === 'timeline';

  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <div key={step.key} className="flex gap-4 items-start">
          {/* Coluna do círculo + linha */}
          <div className="flex flex-col items-center">
            {isTimeline ? (
              // Nota: os SVGs do DS usam fill fixo (#292C28), não currentColor —
              // não é possível recolorir o ícone via CSS sem alterar o asset.
              <div className="w-10 h-10 rounded-2xl bg-[#DBECEA] flex items-center justify-center flex-shrink-0">
                {step.icon && <NioIcon name={step.icon} size={24} />}
              </div>
            ) : step.status === 'completed' ? (
              <div className="w-6 h-6 rounded-full bg-[var(--color-primary-background)] flex items-center justify-center flex-shrink-0">
                <NioIcon
                  name={step.icon ?? 'check'}
                  size={14}
                  className="brightness-0 invert"
                />
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
                'w-0.5 flex-1 mt-1 mb-1',
                isTimeline ? 'min-h-[24px]' : 'min-h-[32px]',
                isTimeline
                  ? 'bg-[#DBECEA]'
                  : step.status === 'completed'
                  ? 'bg-[var(--color-primary-background)]'
                  : 'bg-[var(--color-neutral-border)]'
              )} />
            )}
          </div>

          {/* Conteúdo do step */}
          <div className={cn(
            'flex-1 pt-1',
            i < steps.length - 1 ? 'pb-5' : '',
            isTimeline ? 'flex flex-col justify-center items-start self-stretch' : ''
          )}>
            {step.caption && (
              <p className="text-xs text-[var(--color-neutral-text-medium)] mb-0.5">
                {step.caption}
              </p>
            )}
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
