'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { StateCard } from '@/components/ui/StateCard';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { SuccessIcon } from '@/components/ui/SuccessIcon';
import { useAppState } from '@/lib/state';
import { sleep } from '@/lib/utils';

export default function ConfigurandoPage() {
  const router = useRouter();
  const setEsimNumberAvailable = useAppState(s => s.setEsimNumberAvailable);

  async function handleStartConfig() {
    await sleep(300);
    setEsimNumberAvailable(true);
    router.push('/ativar-chip/esim/concluido');
  }

  return (
    <JourneyLayout
      title="Ativar chip móvel"
      showBack={false}
      cta={
        <>
          <Button onClick={handleStartConfig}>Iniciar configuração</Button>
          <Button variant="outline" onClick={() => router.push('/ativar-chip/esim/fallback')}>
            Configurar manualmente
          </Button>
        </>
      }
    >
      <div className="px-6 pt-4">
        <div className="bg-[var(--color-primary-background-low)] rounded-2xl p-3 flex items-center gap-2">
          <SuccessIcon size={20} className="mx-0 flex-shrink-0" />
          <span className="text-sm font-semibold text-[var(--color-primary-background)]">
            Linha confirmada!
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] mt-5 mb-2">
          Agora é só configurar o eSIM
        </h1>

        <p className="text-sm text-[var(--color-neutral-text-medium)] mb-5">
          A configuração vai acontecer nas configurações do seu celular. Quando terminar, volte
          aqui pra ver seu número.
        </p>

        <StateCard
          variant="info"
          title="Você vai sair do app"
          description="Vamos abrir as configurações do celular. Quando terminar, volte pro app Nio."
        />
      </div>
    </JourneyLayout>
  );
}
