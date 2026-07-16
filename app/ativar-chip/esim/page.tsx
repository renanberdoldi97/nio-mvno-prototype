'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Message } from '@/components/ui/Message';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { useAppState } from '@/lib/state';

type Step = 'idle' | 'activated' | 'configuring';

export default function AtivarEsimPage() {
  const router = useRouter();
  const selectedDDD = useAppState(s => s.selectedDDD);
  const setSelectedDDD = useAppState(s => s.setSelectedDDD);
  const setEsimNumberAvailable = useAppState(s => s.setEsimNumberAvailable);
  const [dddSheetOpen, setDddSheetOpen] = useState(false);
  const [step, setStep] = useState<Step>('idle');

  useEffect(() => {
    if (step !== 'configuring') return;
    const t = setTimeout(() => {
      setEsimNumberAvailable(true);
      router.push('/ativar-chip/esim/concluido');
    }, 2500);
    return () => clearTimeout(t);
  }, [step, router, setEsimNumberAvailable]);

  return (
    <JourneyLayout
      title="Ativar chip móvel"
      onBack={() => router.push('/')}
      cta={<Button onClick={() => setStep('activated')}>Ativar eSIM</Button>}
      overlay={
        <>
          <BottomSheet
            isOpen={dddSheetOpen}
            onClose={() => setDddSheetOpen(false)}
            blocking
            title="Antes de ativar, confirme o DDD"
          >
            <p className="text-sm text-[var(--color-neutral-text-medium)] mb-4">
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

            <Message
              kind="warning"
              title="O DDD não pode ser alterado depois. Se for portar um número, ele precisa ter o mesmo DDD."
              className="mb-4"
            />

            <Button onClick={() => setDddSheetOpen(false)}>Confirmar</Button>
          </BottomSheet>

          <BottomSheet
            isOpen={step === 'activated'}
            onClose={() => setStep('idle')}
            title="Chip ativado"
          >
            <p className="text-sm text-[var(--color-neutral-text-medium)] mb-4">
              Agora é só configurar o eSIM nas configurações do seu celular.
            </p>
            <Message
              kind="info"
              title="Você vai sair do app por um momento durante a configuração, quando terminar, volte aqui pra continuar."
              className="mb-4"
            />
            <Button onClick={() => setStep('configuring')}>Iniciar configuração</Button>
          </BottomSheet>

          <BottomSheet
            isOpen={step === 'configuring'}
            onClose={() => {}}
            blocking
            title="Configurando o eSIM"
          >
            <div className="flex flex-col items-center py-6">
              <ProgressCircle size={60} />
              <p className="text-sm text-[var(--color-neutral-text-medium)] mt-4 text-center">
                Quando terminar, é só voltar pra cá e ver seu novo número.
              </p>
            </div>
          </BottomSheet>
        </>
      }
    >
      <div className="px-6 pt-6">
        <div className="flex items-center gap-2">
          <Image src="/images/sucesso.png" alt="" width={28} height={28} unoptimized />
          <h1 className="text-2xl font-bold text-[var(--color-neutral-text)]">
            Pedido confirmado!
          </h1>
        </div>

        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
          Seu eSIM está pronto pra ser ativado. Garanta que seu aparelho está conectado a
          internet antes de começar a ativação.
        </p>

        <div className="mt-6">
          <Card variant="neutral">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--color-neutral-text-medium)]">Número novo</span>
              <button
                onClick={() => setDddSheetOpen(true)}
                className="text-sm font-semibold text-[var(--color-primary-background)]"
              >
                Alterar
              </button>
            </div>
            <p className="font-bold text-[var(--color-neutral-text)]">
              Ativando com DDD ({selectedDDD})
            </p>
            <p className="text-xs text-[var(--color-neutral-text-medium)] mt-2">
              O DDD não pode ser alterado depois. Pra fazer a portabilidade depois, o número
              precisa ter o DDD escolhido aqui.
            </p>
          </Card>
        </div>
      </div>
    </JourneyLayout>
  );
}
