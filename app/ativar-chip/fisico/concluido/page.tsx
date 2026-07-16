'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StateCard } from '@/components/ui/StateCard';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { NioIcon } from '@/components/icons';
import { MOCK_CHIP } from '@/lib/mock-data';

export default function ConcluidoFisicoPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(MOCK_CHIP.fullNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <JourneyLayout
      headerVariant="transparent"
      showBack={false}
      showUser={false}
      transition="fade"
      cta={
        <>
          <Button onClick={() => router.push('/')}>Meu chip móvel</Button>
          <Button variant="outline" onClick={() => router.push('/portabilidade')}>
            Pedir portabilidade
          </Button>
        </>
      }
    >
      <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] px-6 pt-6">
        Ativação concluída!
      </h1>

      <p className="text-sm text-[var(--color-neutral-text-medium)] px-6 mt-2">
        Você já pode utilizar o seu novo chip móvel e fazer a portabilidade do seu número.
      </p>

      <div className="px-6 mt-6">
        <Card variant="neutral" className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[var(--color-neutral-text-medium)] mb-1">Seu novo número é</p>
            <p className="font-bold text-xl text-[var(--color-neutral-text)]">{MOCK_CHIP.fullNumber}</p>
          </div>
          <button onClick={handleCopy} className="flex-shrink-0">
            <NioIcon name={copied ? 'check' : 'copy'} size={20} />
          </button>
        </Card>
      </div>

      <div className="px-6 mt-3">
        <StateCard
          variant="info"
          title="Quer continuar usando seu número antigo?"
          description="Peça a portabilidade e volte a usar o seu número em até 3 dias úteis."
        />
      </div>
    </JourneyLayout>
  );
}
