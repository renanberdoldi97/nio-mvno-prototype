'use client';

import { AppShell } from '@/components/shell/AppShell';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <AppShell headerVariant="primary">
      {/* Hero de descoberta — chip móvel */}
      <div className="bg-primary-darker text-white px-5 pt-4 pb-8 rounded-b-3xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-medium mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Benefício disponível
        </div>
        <h1 className="text-2xl font-bold leading-tight mb-2">
          Peça agora<br />seu chip móvel
        </h1>
        <p className="text-sm text-white/80 mb-5 max-w-[240px]">
          Internet que te acompanha, já inclusa no seu plano Nio Fibra.
        </p>
        <Link href="/pedir-chip">
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="bg-white text-primary-darker font-semibold px-6 py-3 rounded-full text-sm"
          >
            Pedir meu chip
          </motion.button>
        </Link>
      </div>

      {/* Quick actions grid */}
      <div className="px-5 pt-6">
        <div className="grid grid-cols-4 gap-3">
          {['Pedir meu chip', '2ª via de conta', 'Consultar contas pagas', 'Mudar de endereço'].map((label, i) => (
            <div key={i} className="flex flex-col items-center gap-2 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-[var(--shadow-card)] flex items-center justify-center">
                <div className="w-6 h-6 rounded bg-primary/10" />
              </div>
              <span className="text-[10px] font-medium text-text-primary leading-tight">{label}</span>
              {i === 0 && (
                <span className="text-[9px] font-bold text-primary-darker bg-primary px-1.5 py-0.5 rounded">
                  Novo
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card de oferta placeholder */}
      <div className="px-5 pt-8">
        <h2 className="text-base font-semibold mb-3">Ofertas e benefícios para você</h2>
        <div className="bg-[#E5EFDD] rounded-2xl p-5 flex items-center justify-between h-32">
          <div>
            <p className="font-bold text-lg leading-tight mb-2">Tem uma oferta<br />esperando você</p>
            <button className="bg-[#E5507A] text-white text-xs font-semibold px-4 py-2 rounded-full">
              Quero Conhecer
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
