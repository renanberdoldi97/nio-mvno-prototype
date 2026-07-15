'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { PageTransition } from '@/components/ui/PageTransition';
import { NioIcon } from '@/components/icons';
import { useAppState } from '@/lib/state';
import { MOCK_USER } from '@/lib/mock-data';

export default function ResumoPage() {
  const router = useRouter();
  const selectedChipType = useAppState(s => s.selectedChipType);
  const [planSheetOpen, setPlanSheetOpen] = useState(false);

  const isEsim = selectedChipType !== 'physical';

  return (
    <PageTransition>
      <div className="w-full h-full flex flex-col relative bg-background">
        <Header showBack onBack={() => router.push('/pedir-chip/escolher-tipo')} />

        <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
          <h1 className="font-bold text-2xl px-5 pt-6 pb-5 text-text-primary">
            Confira os detalhes do seu pedido
          </h1>

          <div className="px-5 flex flex-col gap-3">
            {/* Card 1 — Tipo de chip */}
            <Card>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Tipo de chip</span>
                <button
                  onClick={() => router.push('/pedir-chip/escolher-tipo')}
                  className="text-primary text-sm font-semibold"
                >
                  Alterar
                </button>
              </div>
              {isEsim ? (
                <p className="font-semibold text-text-primary">eSIM</p>
              ) : (
                <>
                  <p className="font-semibold text-text-primary">Chip físico</p>
                  <p className="text-sm text-text-secondary mt-1">{MOCK_USER.address.short}</p>
                </>
              )}
            </Card>

            {/* Card 2 — Número novo */}
            <Card>
              <p className="text-sm text-text-secondary mb-2">Número novo</p>
              <p className="font-semibold text-text-primary">
                Seu chip vem com DDD ({MOCK_USER.ddd}), correspondente ao endereço da sua Nio Fibra.
              </p>
              <p className="text-xs text-text-secondary mt-2">
                Você pode trazer seu número de outra operadora depois de ativar.
              </p>
            </Card>

            {/* Card 3 — Plano */}
            <Card>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-sm text-text-secondary">Plano</span>
                <button onClick={() => setPlanSheetOpen(true)}>
                  <NioIcon name="info" size={16} />
                </button>
              </div>
              <p className="font-semibold text-text-primary">50 GB + Ligações ilimitadas</p>
            </Card>
          </div>
        </main>

        <div className="absolute bottom-0 left-0 right-0 bg-background px-5 pt-3 pb-6">
          <Button onClick={() => router.push('/pedir-chip/confirmando')}>
            Confirmar pedido
          </Button>
        </div>

        <BottomSheet
          isOpen={planSheetOpen}
          onClose={() => setPlanSheetOpen(false)}
          title="Plano 50 GB"
        >
          <p className="text-sm font-semibold text-text-secondary mb-1">Seu plano</p>
          <p className="text-sm text-text-primary mb-4">
            Seu chip móvel inclui 50 GB por mês. A franquia é separada da sua internet Nio Fibra.
          </p>

          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-start gap-3">
              <NioIcon name="check" size={18} className="mt-0.5 flex-shrink-0" />
              <p className="text-sm text-text-primary">
                Ligações e SMS ilimitados — Pra qualquer operadora, em todo o Brasil
              </p>
            </div>
            <div className="flex items-start gap-3">
              <NioIcon name="whatsapp" size={18} className="mt-0.5 flex-shrink-0" />
              <p className="text-sm text-text-primary">
                WhatsApp ilimitado — Pra mensagens de texto e voz
              </p>
            </div>
          </div>

          <p className="text-xs text-text-secondary mb-5">
            Quando os dados da franquia acabarem, a velocidade reduz.
          </p>

          <Button onClick={() => setPlanSheetOpen(false)}>Entendi</Button>
        </BottomSheet>
      </div>
    </PageTransition>
  );
}
