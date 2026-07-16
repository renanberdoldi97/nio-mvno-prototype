'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StateCard } from '@/components/ui/StateCard';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { PageTransition } from '@/components/ui/PageTransition';
import { NioIcon } from '@/components/icons';
import { useAppState } from '@/lib/state';

export default function AtivarEsimPage() {
  const router = useRouter();
  const selectedDDD = useAppState(s => s.selectedDDD);
  const setSelectedDDD = useAppState(s => s.setSelectedDDD);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <PageTransition>
      <div className="w-full h-full flex flex-col relative bg-background">
        <Header
          variant="white"
          showBack
          onBack={() => router.push('/')}
          title="Ativar chip móvel"
        />

        <main className="flex-1 overflow-y-auto no-scrollbar pb-32 px-5 pt-5">
          <div className="bg-[#E8FFE0] rounded-2xl p-4 mb-5 flex items-center gap-2">
            <NioIcon name="check-circle" size={16} />
            <span className="text-sm font-semibold text-primary-darker">Pedido confirmado</span>
          </div>

          <h1 className="font-bold text-2xl mt-2 mb-3 text-text-primary">
            Vamos ativar seu eSIM
          </h1>

          <div className="flex flex-col gap-4 mb-5">
            <div className="flex items-center gap-3">
              <NioIcon name="wifi-on" size={22} />
              <span className="text-sm text-text-primary">Garanta que seu Wi-Fi está conectado</span>
            </div>
            <div className="flex items-center gap-3">
              <NioIcon name="smartphone" size={22} />
              <span className="text-sm text-text-primary">Verifique se o app Nio está atualizado</span>
            </div>
            <div className="flex items-center gap-3">
              <NioIcon name="chip-sim" size={22} />
              <span className="text-sm text-text-primary">Tenha o aparelho em mãos</span>
            </div>
          </div>

          <StateCard
            variant="warning"
            title="Você vai sair do app por um momento"
            description="Durante a configuração, o app pode fechar. Quando terminar, volte aqui pra continuar."
          />
        </main>

        <div className="absolute bottom-0 left-0 right-0 bg-background px-5 pt-3 pb-6">
          <Button onClick={() => setSheetOpen(true)}>Ativar eSIM</Button>
        </div>

        <BottomSheet
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          blocking
          title="Antes de ativar, confirme o DDD"
        >
          <p className="text-sm text-text-secondary mb-4">
            O chip vem com DDD ({selectedDDD}), da sua Nio Fibra. Se quiser outro, é só alterar abaixo.
          </p>

          <Input
            label="DDD desejado"
            value={selectedDDD}
            onChange={setSelectedDDD}
            inputMode="numeric"
            maxLength={2}
            className="mb-4"
          />

          <StateCard
            variant="warning"
            title="O DDD não pode ser alterado depois. Se for portar um número, ele precisa ter o mesmo DDD."
            className="mb-4"
          />

          <Button
            onClick={() => {
              setSheetOpen(false);
              router.push('/ativar-chip/esim/ativando');
            }}
          >
            Confirmar
          </Button>
        </BottomSheet>
      </div>
    </PageTransition>
  );
}
