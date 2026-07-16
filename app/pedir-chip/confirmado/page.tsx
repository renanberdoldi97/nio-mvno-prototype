'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/ui/PageTransition';
import { SuccessIcon } from '@/components/ui/SuccessIcon';
import { useAppState } from '@/lib/state';
import { MOCK_USER } from '@/lib/mock-data';

export default function ConfirmadoPage() {
  const router = useRouter();
  const selectedChipType = useAppState(s => s.selectedChipType);
  // Acesso direto à URL sem seleção prévia cai na variante eSIM
  const isPhysical = selectedChipType === 'physical';

  return (
    <PageTransition variant="fade">
      <div className="w-full h-full flex flex-col relative bg-background">
        <Header showBack={false} showUser={false} />

        <main className="flex-1 overflow-y-auto no-scrollbar pb-40 flex flex-col items-center">
          <div className="mt-8">
            <SuccessIcon />
          </div>

          <h1 className="font-bold text-2xl text-center mt-4 text-text-primary">
            Pedido confirmado!
          </h1>

          <p className="text-center text-text-secondary text-sm mt-2 px-8">
            {isPhysical
              ? 'Seu chip já está sendo separado. A gente te avisa por aqui até ele chegar na sua casa.'
              : 'Seu eSIM está pronto pra ser ativado. Garanta que seu aparelho está conectado à internet antes de começar a ativação.'}
          </p>

          <div className="w-full px-5 mt-6">
            <div className="bg-background border border-border rounded-2xl p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Tipo de chip</span>
                <span className="text-sm font-semibold text-text-primary">
                  {isPhysical ? 'Chip físico' : 'eSIM'}
                </span>
              </div>
              {isPhysical && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-text-secondary flex-shrink-0">Endereço</span>
                  <span className="text-sm font-semibold text-text-primary text-right">
                    {MOCK_USER.address.short}
                  </span>
                </div>
              )}
            </div>
          </div>
        </main>

        <div className="absolute bottom-0 left-0 right-0 bg-background px-5 pt-3 pb-6 flex flex-col gap-3">
          {isPhysical ? (
            <>
              <Button onClick={() => router.push('/')}>Acompanhar entrega</Button>
              <Button variant="outline" onClick={() => router.push('/')}>
                Voltar para o início
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => router.push('/ativar-chip/esim')}>Ativar eSIM</Button>
              <Button variant="outline" onClick={() => router.push('/')}>
                Voltar para o início
              </Button>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
