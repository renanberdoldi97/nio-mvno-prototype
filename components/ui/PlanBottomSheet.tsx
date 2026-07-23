'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { NioIcon } from '@/components/icons';

type PlanBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Compartilhado entre a jornada padrão (resumo) e a jornada "outro aparelho" —
// editar aqui atualiza o conteúdo do plano nas duas.
export function PlanBottomSheet({ isOpen, onClose }: PlanBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <NioIcon name="info" size={28} />
          <h3 className="text-lg font-bold text-[var(--color-neutral-text)]">Plano 20 GB</h3>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 -mr-1"
        >
          <NioIcon name="x" size={24} />
        </button>
      </div>

      <Card variant="neutral" padding="md">
        <span className="text-sm text-[var(--color-neutral-text-medium)]">Seu plano</span>
        <p className="text-sm mt-2 text-[var(--color-neutral-text)]">
          Seu chip móvel inclui <strong>20 GB por mês</strong>. A franquia é separada da sua internet Nio Fibra.
        </p>

        <div className="flex flex-col gap-4 mt-5">
          <div className="flex items-start gap-3">
            <NioIcon name="smartphone" size={22} className="flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--color-neutral-text-medium)]">Ligações e SMS ilimitados</p>
              <p className="text-sm font-bold text-[var(--color-neutral-text)] mt-0.5">
                Pra qualquer operadora, em todo o Brasil
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <NioIcon name="whatsapp" size={22} className="flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--color-neutral-text-medium)]">WhatsApp ilimitado</p>
              <p className="text-sm font-bold text-[var(--color-neutral-text)] mt-0.5">
                Pra mensagens de texto e voz
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <NioIcon name="chip-sim" size={22} className="flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--color-neutral-text-medium)]">Escolha o DDD antes de ativar</p>
              <p className="text-sm font-bold text-[var(--color-neutral-text)] mt-0.5">
                Seu chip vem com DDD do endereço da sua Nio Fibra
              </p>
            </div>
          </div>
        </div>
      </Card>

      <p className="text-sm text-[var(--color-neutral-text-medium)] my-5">
        Quando os dados da franquia acabarem, a velocidade reduz.
      </p>

      <Button onClick={onClose}>Entendi</Button>
    </BottomSheet>
  );
}
