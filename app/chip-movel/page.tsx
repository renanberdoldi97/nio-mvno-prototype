'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChipTag } from '@/components/ui/ChipTag';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { NioIcon } from '@/components/icons';
import { MOCK_USER, MOCK_CHIP } from '@/lib/mock-data';

const DATA_ALLOWANCE_GB = 50;
const DATA_USAGE_GB = 12.4;

type ActionItem = {
  key: string;
  icon: 'swap' | 'warning-shield' | 'chip-sim' | 'info';
  title: string;
  subtitle: string;
  onClick: () => void;
};

export default function ChipMovelPage() {
  const router = useRouter();
  const [planSheetOpen, setPlanSheetOpen] = useState(false);

  const usagePercent = Math.min(100, Math.round((DATA_USAGE_GB / DATA_ALLOWANCE_GB) * 100));

  function handleUnavailable() {
    alert('Ação não disponível no protótipo');
  }

  const actions: ActionItem[] = [
    {
      key: 'portabilidade',
      icon: 'swap',
      title: 'Pedir portabilidade',
      subtitle: 'Trazer um número de outra operadora',
      onClick: () => router.push('/portabilidade'),
    },
    {
      key: 'bloquear',
      icon: 'warning-shield',
      title: 'Bloquear chip',
      subtitle: 'Bloqueio temporário do chip',
      onClick: handleUnavailable,
    },
    {
      key: 'outro-chip',
      icon: 'chip-sim',
      title: 'Solicitar outro chip',
      subtitle: 'Chip adicional pra outro aparelho',
      onClick: () => router.push('/pedir-chip/outro-aparelho'),
    },
    {
      key: 'plano',
      icon: 'info',
      title: 'Detalhes do plano',
      subtitle: 'Ver o que está incluso',
      onClick: () => setPlanSheetOpen(true),
    },
  ];

  return (
    <JourneyLayout
      title="Meu chip móvel"
      onBack={() => router.push('/')}
      overlay={
        <BottomSheet isOpen={planSheetOpen} onClose={() => setPlanSheetOpen(false)}>
          <div className="flex items-center gap-2 mb-4">
            <NioIcon name="info" size={20} />
            <h3 className="text-lg font-bold text-[var(--color-neutral-text)]">Plano 50 GB</h3>
          </div>

          <Card variant="neutral" padding="md">
            <span className="text-sm text-[var(--color-neutral-text-medium)]">Seu plano</span>
            <p className="text-sm mt-2 text-[var(--color-neutral-text)]">
              Seu chip móvel inclui <strong>50 GB por mês</strong>. A franquia é separada da sua internet Nio Fibra.
            </p>

            <div className="flex flex-col gap-4 mt-5">
              <div className="flex items-start gap-3">
                <NioIcon name="smartphone" size={22} className="flex-shrink-0" />
                <div>
                  <p className="text-xs text-[var(--color-neutral-text-medium)]">Ligações e SMS ilimitados</p>
                  <p className="text-sm font-bold text-[var(--color-neutral-text)] mt-0.5">
                    Pra qualquer operadora, em todo o Brasil
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <NioIcon name="whatsapp" size={22} className="flex-shrink-0" />
                <div>
                  <p className="text-xs text-[var(--color-neutral-text-medium)]">WhatsApp ilimitado</p>
                  <p className="text-sm font-bold text-[var(--color-neutral-text)] mt-0.5">
                    Pra mensagens de texto e voz
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <p className="text-xs text-[var(--color-neutral-text-medium)] my-5">
            Quando os dados da franquia acabarem, a velocidade reduz.
          </p>

          <Button onClick={() => setPlanSheetOpen(false)}>Entendi</Button>
        </BottomSheet>
      }
    >
      <div className="px-6 pt-6 pb-8">
        <Card variant="neutral">
          <div className="flex items-center justify-between mb-3">
            <ChipTag variant="status">Chip ativo</ChipTag>
            <button
              onClick={handleUnavailable}
              className="text-sm font-semibold text-[var(--color-primary-background)]"
            >
              Ver detalhes
            </button>
          </div>

          <h2 className="font-bold text-xl text-[var(--color-neutral-text)]">{MOCK_USER.plan.name}</h2>
          <p className="text-sm text-[var(--color-neutral-text-medium)] mt-1">{MOCK_CHIP.fullNumber}</p>

          <div className="border-t border-[var(--color-neutral-border)] mt-4 pt-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-[var(--color-neutral-text-medium)]">Franquia</p>
                <p className="font-bold text-base text-[var(--color-neutral-text)]">{DATA_ALLOWANCE_GB} GB</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-neutral-text-medium)]">Consumo</p>
                <p className="font-bold text-base text-[var(--color-neutral-text)]">
                  {DATA_USAGE_GB.toString().replace('.', ',')} GB
                </p>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--color-neutral-border)] overflow-hidden">
              <div
                className="h-full bg-[var(--color-primary-background)] rounded-full"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>
        </Card>

        <p className="font-bold text-base text-[var(--color-neutral-text)] mt-6 mb-3">
          O que você pode fazer
        </p>

        <div className="flex flex-col gap-3">
          {actions.map(action => (
            <Card key={action.key} variant="white" padding="md" onClick={action.onClick}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-background-low)] flex items-center justify-center flex-shrink-0">
                  <NioIcon name={action.icon} size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[var(--color-neutral-text)]">{action.title}</p>
                  <p className="text-sm text-[var(--color-neutral-text-medium)] mt-0.5">{action.subtitle}</p>
                </div>
                <NioIcon name="arrow-right" size={16} />
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <ChipTag variant="label" className="text-xs text-[var(--color-neutral-text-medium)] normal-case">
            Tela em construção — versão final pelo time de produtos
          </ChipTag>
        </div>
      </div>
    </JourneyLayout>
  );
}
