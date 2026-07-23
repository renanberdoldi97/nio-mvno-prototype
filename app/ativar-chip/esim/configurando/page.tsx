'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Message } from '@/components/ui/Message';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { useAppState } from '@/lib/state';

export default function ConfigurandoESIMPage() {
  const router = useRouter();
  const setEsimActivationStep = useAppState(s => s.setEsimActivationStep);
  const setEsimNumberAvailable = useAppState(s => s.setEsimNumberAvailable);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (!sheetOpen) return;
    const t = setTimeout(() => {
      setEsimNumberAvailable(true);
      router.push('/ativar-chip/esim/concluido');
    }, 2500);
    return () => clearTimeout(t);
  }, [sheetOpen, router, setEsimNumberAvailable]);

  function handleStartConfiguring() {
    setEsimActivationStep('configuring');
    setSheetOpen(true);
  }

  return (
    <JourneyLayout
      title="Ativar chip móvel"
      showBack={false}
      transition="fade"
      cta={
        <Button onClick={handleStartConfiguring}>Iniciar configuração</Button>
      }
      overlay={
        <BottomSheet isOpen={sheetOpen} onClose={() => {}} blocking>
          <div className="flex flex-col items-center py-6">
            <ProgressCircle size={64} />
            <p className="text-sm text-[var(--color-neutral-text-medium)] mt-5 text-center leading-relaxed">
              Configurando eSIM...
            </p>
          </div>
        </BottomSheet>
      }
    >
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight mb-3">
          Chip ativado! Agora vamos configurar seu eSIM
        </h1>

        <p className="text-sm text-[var(--color-neutral-text-medium)] leading-relaxed mb-5">
          Você vai sair do app para configurar o eSIM no seu aparelho.
        </p>

        <Message
          kind="info"
          title="Você vai sair do app"
          description="Vamos abrir as configurações do celular. Quando terminar de configurar, volte pro app Nio."
        />
      </div>
    </JourneyLayout>
  );
}
