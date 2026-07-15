'use client';

import { AppShell } from '@/components/shell/AppShell';
import { ChipTag } from '@/components/ui/ChipTag';
import { NioIcon } from '@/components/icons';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const quickActions = [
  { label: 'Pedir meu chip', icon: 'chip' as const, route: '/pedir-chip', isNew: true },
  { label: '2ª via de conta', icon: 'card' as const, route: '/contas' },
  { label: 'Consultar contas pagas', icon: 'clipboard' as const, route: '/contas/pagas' },
  { label: 'Mudar de endereço', icon: 'home' as const, route: '/endereco' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <AppShell headerVariant="primary">
      {/* Hero: Descoberta do chip móvel */}
      <div className="bg-primary-darker px-5 pt-5 pb-10 rounded-b-[32px] relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute right-8 top-0 w-20 h-20 rounded-full bg-white/5" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-semibold text-white">Benefício disponível</span>
          </div>
          <h1 className="text-[26px] font-bold text-white leading-tight mb-2">
            Peça agora<br />seu chip móvel
          </h1>
          <p className="text-[13px] text-white/75 mb-6 max-w-[220px] leading-relaxed">
            Internet que te acompanha, já inclusa no seu plano Nio Fibra.
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push('/pedir-chip')}
            className="bg-white text-primary-darker font-bold px-7 py-3 rounded-full text-sm"
          >
            Pedir meu chip
          </motion.button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 pt-6">
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.94 }}
              onClick={() => router.push(action.route)}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex items-center justify-center relative">
                <NioIcon name={action.icon} size={24} />
                {action.isNew && (
                  <div className="absolute -top-1.5 -right-1.5">
                    <ChipTag variant="new">Novo</ChipTag>
                  </div>
                )}
              </div>
              <span className="text-[10px] font-medium text-text-primary leading-tight text-center px-1">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Ofertas e benefícios */}
      <div className="px-5 pt-8 pb-4">
        <h2 className="text-base font-bold text-text-primary mb-3">
          Ofertas e benefícios para você
        </h2>
        <div className="bg-[#E5EFDD] rounded-2xl px-5 py-5 flex items-center justify-between min-h-[128px] overflow-hidden relative">
          <div className="z-10">
            <p className="font-bold text-[17px] text-text-primary leading-tight mb-3">
              Tem uma oferta<br />esperando você
            </p>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="bg-[#E5507A] text-white text-xs font-bold px-5 py-2.5 rounded-full"
            >
              Quero Conhecer
            </motion.button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
