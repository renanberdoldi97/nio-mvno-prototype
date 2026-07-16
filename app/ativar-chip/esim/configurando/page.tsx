'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { StateCard } from '@/components/ui/StateCard';
import { PageTransition } from '@/components/ui/PageTransition';
import { NioIcon } from '@/components/icons';
import { useAppState } from '@/lib/state';
import { MOCK_ESIM } from '@/lib/mock-data';
import { sleep } from '@/lib/utils';

export default function ConfigurandoPage() {
  const router = useRouter();
  const setEsimNumberAvailable = useAppState(s => s.setEsimNumberAvailable);

  async function handleStartConfig() {
    try {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const deepLink = isIOS ? MOCK_ESIM.deepLinkIOS : MOCK_ESIM.deepLinkAndroid;
      window.location.href = deepLink;
    } catch {
      // Deep link intencionalmente não resolve em browser — segue o fluxo mock
    }

    await sleep(300);
    setEsimNumberAvailable(true);
    router.push('/ativar-chip/esim/concluido');
  }

  return (
    <PageTransition>
      <div className="w-full h-full flex flex-col relative bg-background">
        <Header variant="white" showUser={false} title="Ativar chip móvel" />

        <main className="flex-1 overflow-y-auto no-scrollbar pb-40 px-5 pt-5">
          <div className="bg-[#E8FFE0] rounded-2xl p-4 mb-5 flex items-center gap-2">
            <NioIcon name="check-circle" size={16} />
            <span className="text-sm font-semibold text-primary-darker">Linha confirmada!</span>
          </div>

          <h1 className="font-bold text-2xl mt-4 mb-2 text-text-primary">
            Agora é só configurar o eSIM
          </h1>

          <p className="text-sm text-text-secondary mb-5">
            A configuração vai acontecer nas configurações do seu celular. Quando terminar, volte
            aqui pra ver seu número.
          </p>

          <StateCard
            variant="info"
            title="Você vai sair do app"
            description="Vamos abrir as configurações do celular. Quando terminar de configurar, volte pro app Nio."
          />
        </main>

        <div className="absolute bottom-0 left-0 right-0 bg-background px-5 pt-3 pb-6 flex flex-col gap-3">
          <Button onClick={handleStartConfig}>Iniciar configuração</Button>
          <Button variant="outline" onClick={() => router.push('/ativar-chip/esim/fallback')}>
            Configurar manualmente
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
