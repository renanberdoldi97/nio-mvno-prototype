'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { StateCard } from '@/components/ui/StateCard';
import { SuccessIcon } from '@/components/ui/SuccessIcon';
import { PageTransition } from '@/components/ui/PageTransition';
import { NioIcon } from '@/components/icons';
import { useAppState } from '@/lib/state';
import { MOCK_CHIP } from '@/lib/mock-data';

export default function ConcluidoPage() {
  const router = useRouter();
  const esimNumberAvailable = useAppState(s => s.esimNumberAvailable);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(MOCK_CHIP.fullNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <PageTransition variant="fade">
      <div className="w-full h-full flex flex-col relative bg-background">
        <Header showBack={false} showUser={false} />

        <main className="flex-1 overflow-y-auto no-scrollbar pb-40 flex flex-col items-center">
          <div className="mt-8">
            <SuccessIcon />
          </div>

          <h1 className="font-bold text-2xl text-center mt-4 text-text-primary">
            Configuração concluída!
          </h1>

          {esimNumberAvailable ? (
            <>
              <p className="text-center text-text-secondary text-sm mt-2 px-6">
                Você já pode usar o seu novo chip móvel e fazer a portabilidade do seu número.
              </p>

              <div className="w-full px-5 mt-6">
                <div className="bg-background border border-border rounded-xl p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-text-secondary mb-1">Seu novo número é</p>
                    <p className="font-bold text-xl text-text-primary">{MOCK_CHIP.fullNumber}</p>
                  </div>
                  <button onClick={handleCopy} className="flex-shrink-0">
                    <NioIcon name={copied ? 'check' : 'copy'} size={20} />
                  </button>
                </div>
              </div>

              <div className="w-full px-5 mt-3">
                <StateCard
                  variant="info"
                  title="Quer continuar usando seu número antigo?"
                  description="Peça a portabilidade e volte a usar o seu número em até 3 dias úteis."
                />
              </div>
            </>
          ) : (
            <>
              <p className="text-center text-text-secondary text-sm mt-2 px-6">
                Seu chip já está ativo e pronto pra usar.
              </p>
              <p className="text-center text-text-secondary text-xs mt-1 px-6">
                Seu número fica disponível em alguns instantes.
              </p>

              <div className="w-full px-5 mt-6">
                <StateCard
                  variant="info"
                  title="Quer continuar usando seu número antigo?"
                  description="Peça a portabilidade e volte a usar o seu número em até 3 dias úteis."
                />
              </div>
            </>
          )}
        </main>

        <div className="absolute bottom-0 left-0 right-0 bg-background px-5 pt-3 pb-6 flex flex-col gap-3">
          {esimNumberAvailable ? (
            <>
              <Button onClick={() => router.push('/')}>Informações do chip móvel</Button>
              <Button variant="outline" onClick={() => router.push('/portabilidade')}>
                Pedir portabilidade
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => router.push('/')}>Meu chip móvel</Button>
              <Button variant="outline" onClick={() => router.push('/portabilidade')}>
                Pedir portabilidade
              </Button>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
