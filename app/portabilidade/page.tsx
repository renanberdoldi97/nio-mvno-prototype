'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Message } from '@/components/ui/Message';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { NioIcon } from '@/components/icons';
import { useAppState } from '@/lib/state';
import { MOCK_CARRIERS } from '@/lib/mock-data';

export default function PortabilidadePage() {
  const router = useRouter();
  const setOriginalLine = useAppState(s => s.setOriginalLine);
  const setPortabilityStatus = useAppState(s => s.setPortabilityStatus);

  const [number, setNumber] = useState('');
  const [carrier, setCarrier] = useState<string | null>(null);
  const [carrierSheetOpen, setCarrierSheetOpen] = useState(false);
  const [operadoraManual, setOperadoraManual] = useState(false);

  const canSubmit = number.length > 0 && carrier !== null;

  function handleConfirm() {
    setOriginalLine(number, carrier ?? '');
    setPortabilityStatus('awaiting_release');
    router.push('/portabilidade/confirmado');
  }

  return (
    <JourneyLayout
      title="Portabilidade"
      onBack={() => router.push('/')}
      cta={
        <>
          <Button disabled={!canSubmit} onClick={handleConfirm}>
            Confirmar pedido
          </Button>
          <Button variant="ghost" size="sm" fullWidth={false} onClick={() => {}} className="self-center">
            Preciso de ajuda
          </Button>
        </>
      }
      overlay={
        <BottomSheet
          isOpen={carrierSheetOpen}
          onClose={() => setCarrierSheetOpen(false)}
          title="Operadora atual"
        >
          <div className="flex flex-col gap-1">
            {MOCK_CARRIERS.map(c => (
              <button
                key={c}
                onClick={() => {
                  setCarrier(c);
                  setCarrierSheetOpen(false);
                }}
                className="text-left py-3 text-base text-[var(--color-neutral-text)] border-b border-[var(--color-neutral-border)] last:border-b-0"
              >
                {c}
              </button>
            ))}
            <button
              onClick={() => {
                setOperadoraManual(true);
                setCarrier('');
                setCarrierSheetOpen(false);
              }}
              className="text-left py-3 text-base font-semibold text-[var(--color-primary-text)]"
            >
              Não encontrei minha operadora
            </button>
          </div>
        </BottomSheet>
      }
    >
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] mb-2">
          Vamos trazer seu número
        </h1>
        <p className="text-sm text-[var(--color-neutral-text-medium)] mb-5">
          Precisamos dos dados da sua linha atual pra iniciar o pedido. Você não ficará sem
          linha em nenhum momento.
        </p>

        <div className="mb-4">
          <Input
            label="Digite o número da outra operadora"
            value={number}
            onChange={setNumber}
            inputMode="tel"
          />
          <p className="text-xs text-[var(--color-neutral-text-medium)] mt-1 px-1">
            Exemplo: (11) 9 0000-0000
          </p>
        </div>

        {operadoraManual ? (
          <Input
            label="Digite o nome da operadora"
            value={carrier ?? ''}
            onChange={setCarrier}
            autoFocus
            className="mb-4"
          />
        ) : (
          <button
            onClick={() => setCarrierSheetOpen(true)}
            className="w-full h-14 rounded-md border-[1.5px] border-[var(--color-neutral-border)] bg-white flex items-center justify-between px-4 mb-4"
          >
            <span className={carrier ? 'text-base text-[var(--color-neutral-text)]' : 'text-base text-[var(--color-neutral-text-medium)]'}>
              {carrier ?? 'Operadora atual'}
            </span>
            <NioIcon name="chevron-down" size={24} />
          </button>
        )}

        <Message
          kind="info"
          title="Importante saber"
          description="Você continua com o mesmo DDD e número da operadora atual. Para o mesmo CPF do titular da Nio Fibra."
        />
      </div>
    </JourneyLayout>
  );
}
