'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/shell/AppShell';
import { NioIcon, type IconName } from '@/components/icons';
import { ChipTag } from '@/components/ui/ChipTag';
import { useAppState } from '@/lib/state';
import { MOCK_USER } from '@/lib/mock-data';

function resetDemoState() {
  useAppState.getState().reset();
  localStorage.removeItem('nio-mvno-state');
  window.location.reload();
}

type QuickLink = {
  key: string;
  label: string;
  icon: IconName;
  route: string;
};

const QUICK_LINKS: QuickLink[] = [
  { key: 'reparo', label: 'Fazer reparo\nda internet', icon: 'tool', route: '/suporte' },
  { key: 'senha-wifi', label: 'Trocar senha\ndo Wi-Fi', icon: 'password', route: '/suporte' },
  { key: 'dados-contato', label: 'Atualizar dados\nde contato', icon: 'user', route: '/mais' },
  { key: 'renomear-wifi', label: 'Renomear rede\nWi-Fi', icon: 'edit', route: '/suporte' },
];

export default function HomePage() {
  const router = useRouter();

  // Zustand persist hidrata o state do localStorage DEPOIS do primeiro render —
  // sem essa guarda, a home pisca com o initialState antes de trocar pro estado
  // real já persistido.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Permite limpar o state via querystring (?reset=1), útil pra demos/avaliação
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('reset=1')) {
      useAppState.getState().reset();
      localStorage.removeItem('nio-mvno-state');
      window.history.replaceState({}, '', '/');
      window.location.reload();
    }
  }, []);

  function handleChipMovelClick() {
    const { orderStatus } = useAppState.getState();

    if (orderStatus === 'not_started') {
      router.push('/pedir-chip');
    } else {
      router.push('/chip-movel');
    }
  }

  if (!hydrated) return (
    <div className="w-full h-full bg-white" />
  );

  return (
    <AppShell headerVariant="home">
      {/* Reinicia o protótipo pro estado inicial — visível em dev e produção
          pra facilitar demos e reavaliação da jornada do zero. */}
      <button
        onClick={resetDemoState}
        className="fixed bottom-24 right-4 z-50 bg-black/70 text-white text-[11px] font-medium px-3 py-2 rounded-full backdrop-blur-sm shadow-lg"
      >
        Reiniciar demo
      </button>

      <div className="px-6">
        {/* ============================================================
            FATURAS EM ABERTO
        ============================================================ */}
        <section className="mt-6">
          <h2 className="text-xl font-bold text-[var(--color-neutral-text)] mb-3">
            Faturas em aberto
          </h2>

          <div
            className="bg-white rounded-2xl p-6"
            style={{ border: '1px solid #D6D8D4' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[var(--color-neutral-text)]">R$ 135</span>
              <button
                onClick={() => router.push('/contas')}
                className="text-sm font-semibold text-[#124803]"
              >
                Acessar fatura
              </button>
            </div>

            <p className="text-lg font-bold text-[var(--color-neutral-text)] mt-3">
              {MOCK_USER.plan.name}
            </p>

            <div className="mt-2">
              <ChipTag
                variant="label"
                className="bg-[var(--color-neutral-border)] text-[var(--color-neutral-text-medium)]"
              >
                Em aberto
              </ChipTag>
            </div>

            <div
              className="mt-4 pt-4 flex flex-col gap-3"
              style={{ borderTop: '1px solid #E9E5D3' }}
            >
              <div className="flex items-center gap-2">
                <NioIcon name="calendar" size={20} />
                <span className="text-sm font-medium text-[#124803]">Vence em: 00/00/0000</span>
              </div>
              <div className="flex items-center gap-2">
                <NioIcon name="location" size={20} />
                <span className="text-sm text-[var(--color-neutral-text)]">R. São Clemente, 000, ap. 000</span>
              </div>
              <div className="flex items-center gap-2">
                <NioIcon name="barcode" size={20} />
                <span className="text-sm text-[var(--color-neutral-text)]">Boleto ou Pix</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            ACESSO RÁPIDO
        ============================================================ */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-[var(--color-neutral-text)] mb-3">
            Acesso rápido
          </h2>

          <button
            onClick={handleChipMovelClick}
            className="w-full bg-[#D6EBEA] rounded-2xl p-5 flex items-center gap-4 mb-3 text-left"
          >
            <div className="relative flex-shrink-0" style={{ width: 56, height: 56 }}>
              <Image
                src="/images/chip-flutuante.png"
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex-1 flex items-center gap-2 flex-wrap">
              <span className="text-lg font-bold text-[#124803]">Chip móvel</span>
              <ChipTag variant="new">NOVO</ChipTag>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map(link => (
              <button
                key={link.key}
                onClick={() => router.push(link.route)}
                className="bg-white rounded-2xl p-5 flex flex-col items-start gap-3 text-left"
                style={{ border: '1px solid #D6D8D4' }}
              >
                <NioIcon name={link.icon} size={24} />
                <span className="text-sm font-semibold text-[var(--color-neutral-text)] leading-tight whitespace-pre-line">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ============================================================
            OFERTAS NIO FIBRA
        ============================================================ */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-[var(--color-neutral-text)] mb-3">
            Ofertas Nio Fibra
          </h2>
          <div
            className="rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: '#124803', height: 200 }}
          >
            <span className="text-white font-semibold">Banner up</span>
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#31E000' }} />
            <span className="w-2 h-2 rounded-full bg-[var(--color-neutral-border)]" />
          </div>
        </section>

        {/* ============================================================
            OFERTAS PARCEIRAS
        ============================================================ */}
        <section className="mt-8 pb-8">
          <h2 className="text-xl font-bold text-[var(--color-neutral-text)] mb-3">
            Ofertas parceiras
          </h2>
          <div
            className="rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: '#124803', height: 200 }}
          >
            <span className="text-white font-semibold">Banner oferta 1</span>
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#31E000' }} />
            <span className="w-2 h-2 rounded-full bg-[var(--color-neutral-border)]" />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
