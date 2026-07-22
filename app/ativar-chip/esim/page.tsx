'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Message } from '@/components/ui/Message';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { DDDCard } from '@/components/ui/DDDCard';
import { useAppState } from '@/lib/state';

type OtherDeviceStep = 'idle' | 'qr' | 'configuring';

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
  const [otherDeviceStep, setOtherDeviceStep] = useState<OtherDeviceStep>('idle');

  function handleAlreadyConfigured() {
    setEsimNumberAvailable(true);
    router.push('/ativar-chip/esim/concluido');
  }

  return (
    <JourneyLayout
      title={isOtherDevice ? 'Pedir chip móvel' : 'Ativar chip móvel'}
      onBack={() => router.push('/')}
      cta={
        <>
          <Button
            onClick={() => {
              if (isOtherDevice) {
                setOtherDeviceStep('qr');
              } else {
                router.push('/ativar-chip/esim/ativando');
              }
            }}
          >
            Ativar eSIM
          </Button>
          {!isOtherDevice && (
            <Button variant="secondary" onClick={() => router.push('/')}>
              Voltar para o início
            </Button>
          )}
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
                isOpen={otherDeviceStep === 'qr'}
                onClose={() => setOtherDeviceStep('idle')}
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
                <Button className="mt-4" onClick={() => setOtherDeviceStep('configuring')}>
                  Já foi escaneado
                </Button>
              </BottomSheet>

              <BottomSheet
                isOpen={otherDeviceStep === 'configuring'}
                onClose={() => setOtherDeviceStep('idle')}
                title="Configurando o eSIM"
              >
                <div className="flex justify-center py-4">
                  <ProgressCircle size={64} />
                </div>
                <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2 text-center leading-relaxed">
                  No outro aparelho serão exibidas instruções pra ativar o eSIM, é só seguir até o fim. Quando terminar, volte aqui pra finalizar a configuração.
                </p>
                <Button className="mt-4" onClick={handleAlreadyConfigured}>
                  Já foi configurado
                </Button>
              </BottomSheet>
            </>
          )}
        </>
      }
    >
      <div className="px-6 pt-6">
        <h1 className="text-3xl font-bold text-[var(--color-neutral-text)] leading-tight mb-2">
          {isOtherDevice ? 'Vamos ativar o eSIM no outro aparelho' : 'Pedido confirmado! Ative agora seu eSIM'}
        </h1>

        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2 leading-relaxed">
          {isOtherDevice
            ? 'Vamos exibir um QR Code pra você escanear com o aparelho de origem do outro chip.'
            : 'Garanta que seu aparelho está conectado a internet antes de começar a ativação.'}
        </p>

        <div className="mt-5">
          <DDDCard onAlterarClick={() => setDddSheetOpen(true)} />
        </div>

        <Message
          kind="warning"
          title="O DDD não poderá ser alterado depois da ativação do chip"
          description="Se quiser pedir portabilidade depois, ative seu chip com o mesmo DDD do número que você vai trazer pra Nio."
          className="mt-4"
        />
      </div>
    </JourneyLayout>
  );
}
