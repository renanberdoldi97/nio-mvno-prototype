'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { NioIcon } from '@/components/icons';
import { cn, sleep } from '@/lib/utils';
import { useAppState } from '@/lib/state';
import { MOCK_ESIM } from '@/lib/mock-data';

type Os = 'ios' | 'android';

const STEPS: Record<Os, string[]> = {
  ios: [
    'Abra Ajustes',
    'Toque em Celular',
    'Adicionar eSIM',
    'Inserir detalhes manualmente',
    'Cole o código acima',
  ],
  android: [
    'Abra Configurações',
    'Rede e Internet',
    'SIM > Adicionar eSIM',
    'Inserir código manualmente',
    'Cole o código acima',
  ],
};

const LPA_DISPLAY =
  MOCK_ESIM.lpaCode.length > 32 ? `${MOCK_ESIM.lpaCode.slice(0, 32)}...` : MOCK_ESIM.lpaCode;

export default function FallbackPage() {
  const router = useRouter();
  const setEsimNumberAvailable = useAppState(s => s.setEsimNumberAvailable);
  const [os, setOs] = useState<Os>('ios');
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(MOCK_ESIM.lpaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleGoToSettings() {
    await sleep(300);
    setEsimNumberAvailable(false);
    router.push('/ativar-chip/esim/concluido');
  }

  return (
    <JourneyLayout
      title="Ativar chip móvel"
      onBack={() => router.push('/ativar-chip/esim')}
      cta={<Button onClick={handleGoToSettings}>Ir pra configurações</Button>}
    >
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] mb-1">
          Configure o eSIM manualmente
        </h1>
        <p className="text-sm text-[var(--color-neutral-text-medium)] mb-5">
          Seu aparelho precisa de alguns passos extras. Copie o código abaixo e siga as
          instruções nas configurações do celular.
        </p>

        <Card variant="neutral" className="mb-5">
          <p className="text-sm text-[var(--color-neutral-text-medium)] mb-1">Código de ativação</p>
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-sm text-[var(--color-neutral-text)] break-all">{LPA_DISPLAY}</span>
            <button onClick={handleCopy} className="flex-shrink-0">
              <NioIcon name={copied ? 'check' : 'copy'} size={24} />
            </button>
          </div>
        </Card>

        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setOs('ios')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold',
              os === 'ios'
                ? 'bg-[var(--color-primary-background)] text-white'
                : 'border border-[var(--color-neutral-border)] text-[var(--color-neutral-text-medium)]'
            )}
          >
            iOS
          </button>
          <button
            onClick={() => setOs('android')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold',
              os === 'android'
                ? 'bg-[var(--color-primary-background)] text-white'
                : 'border border-[var(--color-neutral-border)] text-[var(--color-neutral-text-medium)]'
            )}
          >
            Android
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {STEPS[os].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--color-neutral-background-low)] text-[var(--color-neutral-text)] text-sm font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-[var(--color-neutral-text)]">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </JourneyLayout>
  );
}
