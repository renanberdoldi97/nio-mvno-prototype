'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Message } from '@/components/ui/Message';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
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
  const [dddConfirmed, setDddConfirmed] = useState(false);
  const [step, setStep] = useState<Step>('idle');

  // Sheet de confirmação de DDD abre automaticamente ao carregar a tela
  useEffect(() => {
    if (!dddConfirmed) {
      const t = setTimeout(() => setDddSheetOpen(true), 400);
      return () => clearTimeout(t);
    }
  }, [dddConfirmed]);

  // Fluxo padrão (mesmo aparelho): configuração automática via ProgressCircle
  useEffect(() => {
    if (isOtherDevice) return;
    if (step !== 'configuring') return;
    const t = setTimeout(() => {
      setEsimNumberAvailable(true);
      router.push('/ativar-chip/esim/concluido');
    }, 2500);
    return () => clearTimeout(t);
  }, [step, router, setEsimNumberAvailable, isOtherDevice]);

  function handleAlreadyConfigured() {
    setEsimNumberAvailable(true);
    router.push('/ativar-chip/esim/concluido');
  }

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

            <Button
              onClick={() => {
                setDddSheetOpen(false);
                setDddConfirmed(true);
              }}
            >
              Confirmar
            </Button>
          </BottomSheet>

          {!isOtherDevice ? (
            <>
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
          ) : (
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

        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
          {isOtherDevice
            ? 'Vamos exibir um QR Code pra você escanear com o aparelho de origem do outro chip.'
            : 'Seu eSIM está pronto pra ser ativado. Garanta que seu aparelho está conectado a internet antes de começar a ativação.'}
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
