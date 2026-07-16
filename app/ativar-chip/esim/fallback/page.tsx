'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/ui/PageTransition';
import { NioIcon } from '@/components/icons';
import { cn, sleep } from '@/lib/utils';
import { useAppState } from '@/lib/state';
import { MOCK_ESIM } from '@/lib/mock-data';

type Os = 'ios' | 'android';

const STEPS: Record<Os, string[]> = {
  ios: [
    'Abra o Ajustes do seu iPhone',
    'Toque em Celular',
    'Toque em Adicionar eSIM',
    'Escolha "Inserir detalhes manualmente"',
    'Cole o código acima',
  ],
  android: [
    'Abra as Configurações do seu celular',
    'Toque em Rede e Internet',
    'Toque em SIM e depois em Adicionar eSIM',
    'Escolha "Inserir código manualmente"',
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

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    setOs(isIOS ? 'ios' : 'android');
  }, []);

  async function handleCopy() {
    await navigator.clipboard.writeText(MOCK_ESIM.lpaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleGoToSettings() {
    try {
      const deepLink = os === 'ios' ? MOCK_ESIM.deepLinkIOS : MOCK_ESIM.deepLinkAndroid;
      window.location.href = deepLink;
    } catch {
      // Deep link intencionalmente não resolve em browser — segue o fluxo mock
    }

    await sleep(300);
    setEsimNumberAvailable(false);
    router.push('/ativar-chip/esim/concluido');
  }

  return (
    <PageTransition>
      <div className="w-full h-full flex flex-col relative bg-background">
        <Header
          variant="white"
          showBack
          onBack={() => router.push('/ativar-chip/esim/configurando')}
          title="Ativar chip móvel"
        />

        <main className="flex-1 overflow-y-auto no-scrollbar pb-32 px-5 pt-5">
          <h1 className="font-bold text-xl mt-4 mb-1 text-text-primary">
            Configure o eSIM manualmente
          </h1>
          <p className="text-sm text-text-secondary mb-4">
            Seu aparelho precisa de alguns passos extras. Copie o código abaixo e siga as
            instruções nas configurações do celular.
          </p>

          <div className="bg-background border border-border rounded-xl p-4 mb-5">
            <p className="text-xs text-text-secondary mb-1">Código de ativação</p>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-sm text-text-primary break-all">{LPA_DISPLAY}</span>
              <button onClick={handleCopy} className="flex-shrink-0">
                <NioIcon name={copied ? 'check' : 'copy'} size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setOs('ios')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-semibold',
                os === 'ios' ? 'bg-text-primary text-white' : 'border border-border text-text-secondary'
              )}
            >
              iOS
            </button>
            <button
              onClick={() => setOs('android')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-semibold',
                os === 'android' ? 'bg-text-primary text-white' : 'border border-border text-text-secondary'
              )}
            >
              Android
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {STEPS[os].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-border text-text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-text-primary">{step}</span>
              </div>
            ))}
          </div>
        </main>

        <div className="absolute bottom-0 left-0 right-0 bg-background px-5 pt-3 pb-6">
          <Button onClick={handleGoToSettings}>Ir pra configurações</Button>
        </div>
      </div>
    </PageTransition>
  );
}
