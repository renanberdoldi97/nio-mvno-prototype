'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Message } from '@/components/ui/Message';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { useAppState } from '@/lib/state';

type Step = 'idle' | 'activated' | 'configuring';

// Padrão fixo (não randômico — evita mismatch de hidratação) representando
// um QR Code fake pro fluxo de "outro aparelho".
const QR_PATTERN = [
  [1, 1, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 0, 0, 1],
  [0, 0, 1, 0, 0, 1, 1, 0],
  [1, 0, 1, 1, 0, 0, 1, 1],
  [0, 1, 0, 1, 1, 0, 1, 0],
].flat();

export default function AtivarEsimPage() {
  const router = useRouter();
  const selectedDDD = useAppState(s => s.selectedDDD);
  const setSelectedDDD = useAppState(s => s.setSelectedDDD);
  const setEsimNumberAvailable = useAppState(s => s.setEsimNumberAvailable);
  const isOtherDevice = useAppState(s => s.isOtherDevice);
  const [dddSheetOpen, setDddSheetOpen] = useState(false);
  const [step, setStep] = useState<Step>('idle');

  function handleAlreadyConfigured() {
    setEsimNumberAvailable(true);
    router.push('/ativar-chip/esim/concluido');
  }

  return (
    <JourneyLayout
      title="Ativar chip móvel"
      onBack={() => router.push('/')}
      cta={
        <>
          <Message
            kind="info"
            title={`Você está ativando com DDD (${selectedDDD}). Quer alterar?`}
            ctaLabel="Alterar DDD"
            onCta={() => setDddSheetOpen(true)}
          />

          <Button
            onClick={() => {
              if (isOtherDevice) {
                setStep('activated');
              } else {
                router.push('/ativar-chip/esim/ativando');
              }
            }}
          >
            Ativar eSIM
          </Button>
        </>
      }
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

            <Button onClick={() => setDddSheetOpen(false)}>
              Confirmar
            </Button>
          </BottomSheet>

          {isOtherDevice && (
            <>
              <BottomSheet
                isOpen={step === 'activated'}
                onClose={() => setStep('idle')}
                title="Escaneie pra ativar seu eSIM"
              >
                <div className="mx-auto grid grid-cols-8 gap-0 border-[6px] border-white rounded-lg overflow-hidden" style={{ width: 240, height: 240 }}>
                  {QR_PATTERN.map((cell, i) => (
                    <div key={i} className={cell ? 'bg-black' : 'bg-white'} />
                  ))}
                </div>
                <p className="text-sm text-[var(--color-neutral-text-medium)] mt-4 text-center">
                  Aponte a câmera do dispositivo que o eSIM será ativado.
                </p>
                <Button className="mt-4" onClick={() => setStep('configuring')}>
                  Já foi escaneado
                </Button>
              </BottomSheet>

              <BottomSheet
                isOpen={step === 'configuring'}
                onClose={() => {}}
                blocking
                title="Configurando o eSIM"
              >
                <p className="text-sm text-[var(--color-neutral-text-medium)] mb-4">
                  No outro aparelho serão exibidas instruções pra ativar o eSIM, é só seguir
                  até o fim. Quando terminar, volte aqui pra finalizar a configuração.
                </p>
                <Button onClick={handleAlreadyConfigured}>Já foi configurado</Button>
              </BottomSheet>
            </>
          )}
        </>
      }
    >
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight">
          {isOtherDevice ? 'Vamos ativar o eSIM no outro aparelho' : 'Pedido confirmado!'}
        </h1>

        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2 leading-relaxed">
          {isOtherDevice
            ? 'Vamos exibir um QR Code pra você escanear com o aparelho de origem do outro chip.'
            : 'Seu eSIM está pronto pra ser ativado. Garanta que seu aparelho está conectado à internet antes de começar a ativação.'}
        </p>

        <Card variant="neutral" padding="md" className="mt-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-[var(--color-neutral-text-medium)]">Número novo</p>
              <p className="font-bold text-[var(--color-neutral-text)] mt-1">
                Ativando com DDD ({selectedDDD})
              </p>
              <p className="text-xs text-[var(--color-neutral-text-medium)] mt-1">
                O DDD não pode ser alterado depois. Pra fazer a portabilidade depois,
                o número precisa ter o DDD escolhido aqui.
              </p>
            </div>
            <button
              onClick={() => setDddSheetOpen(true)}
              className="text-[var(--color-primary-text)] text-sm font-semibold ml-3 flex-shrink-0"
            >
              Alterar
            </button>
          </div>
        </Card>
      </div>
    </JourneyLayout>
  );
}
