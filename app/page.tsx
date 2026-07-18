'use client';

import { AppShell } from '@/components/shell/AppShell';
import { NioIcon, IconName } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { TrackingCard } from '@/components/home/TrackingCard';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppState } from '@/lib/state';

// ============================================================
// QUICK ACTIONS — 8 atalhos horizontal scroll
// ============================================================
type QuickAction = {
  label: string;
  icon: IconName;
  route: string;
  isNew?: boolean;
};

export default function HomePage() {
  const router = useRouter();
  const orderStatus = useAppState(s => s.orderStatus);
  const selectedChipType = useAppState(s => s.selectedChipType);

  // Hero de descoberta só aparece pro cliente que nunca pediu chip
  const showHero = orderStatus === 'not_started';
  // Card de tracking só aparece pra pedido físico ainda em curso
  const showTracking = selectedChipType === 'physical' &&
    ['pending_delivery', 'in_transit', 'delivered', 'ready_to_activate'].includes(orderStatus);

  const quickActions: QuickAction[] = [
    orderStatus === 'active'
      ? { label: 'Meu chip\nmóvel', icon: 'shortcut-pedir-chip', route: '/chip-movel', isNew: false }
      : { label: 'Pedir\nmeu chip', icon: 'shortcut-pedir-chip', route: '/pedir-chip', isNew: true },
    { label: '2ª via\nde conta', icon: 'shortcut-segunda-via', route: '/contas' },
    { label: 'Consultar\ncontas pagas', icon: 'shortcut-contas-pagas', route: '/contas/pagas' },
    { label: 'Mudar de\nendereço', icon: 'shortcut-mudar-endereco', route: '/endereco' },
    { label: 'Alterar meio\nde pagamento', icon: 'shortcut-meio-pagamento', route: '/pagamento' },
    { label: 'Gerenciar\nprodutos', icon: 'shortcut-gerenciar-produtos', route: '/produtos' },
    { label: 'Diagnosticar\nrede', icon: 'shortcut-diagnosticar-rede', route: '/suporte' },
    { label: 'Trocar senha\ndo Wi-Fi', icon: 'shortcut-trocar-senha-wifi', route: '/suporte' },
  ];

  return (
    <AppShell headerVariant="home">
      {/* ============================================================
          HERO — banner de descoberta do chip móvel
          Fundo verde escuro, alinhado à esquerda, chip flutuante à direita
      ============================================================ */}
      {showHero && (
        <section className="bg-[var(--color-primary-background)] px-6 pt-4 pb-10 rounded-b-2xl relative overflow-hidden">
          {/* Rastro decorativo — único SVG grande, muito sutil, atrás do chip */}
          <div
            className="absolute -right-12 -top-8 pointer-events-none z-0 opacity-20"
            style={{ width: 320, height: 320 }}
            aria-hidden
          >
            <Image
              src="/images/rastro-tornado-neon.svg"
              alt=""
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Chip flutuante — canto superior direito, ligeiramente rotacionado */}
          <motion.div
            initial={{ opacity: 0, y: -10, rotate: -15 }}
            animate={{ opacity: 1, y: 0, rotate: -12 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute -right-4 top-1 z-10 pointer-events-none"
            style={{ width: 260, height: 290 }}
          >
            <Image
              src="/images/chip-flutuante.png"
              alt=""
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </motion.div>

          {/* Conteúdo do hero — alinhado à esquerda */}
          <div className="relative z-20 max-w-[220px]">
            {/* Badge "Benefício disponível" */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-primary-background-high)]/20 mb-4">
              <NioIcon
                name="check-circle"
                size={14}
                className="brightness-0 invert opacity-90"
              />
              <span className="text-[11px] font-semibold text-white">Benefício disponível</span>
            </div>

            {/* Título */}
            <h1 className="text-[26px] font-bold text-white leading-[1.15] mb-2">
              Peça agora<br />seu chip móvel
            </h1>

            {/* Descrição */}
            <p className="text-[13px] text-white/80 mb-5 leading-relaxed">
              Internet que te acompanha, já inclusa no seu plano Nio Fibra.
            </p>

            {/* CTA branco arredondado, alinhado à esquerda */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => router.push('/pedir-chip')}
              className="bg-white text-[var(--color-primary-text)] font-bold px-6 py-3 rounded-full text-sm"
            >
              Pedir meu chip
            </motion.button>
          </div>
        </section>
      )}

      {/* ============================================================
          TRACKING — card de acompanhamento do chip físico em entrega
          Aparece só quando há um pedido físico pendente de entrega.
      ============================================================ */}
      {showTracking && (
        <div className="px-6 mt-4">
          <TrackingCard />
        </div>
      )}

      {/* ============================================================
          QUICK ACTIONS — 8 atalhos em scroll horizontal
          Sem borda, sem card ao redor. Ícone é o botão.
          Tag "Novo" ABAIXO do label, não acima do ícone.
      ============================================================ */}
      <section className="pt-7 pb-4">
        <div className="flex gap-5 overflow-x-auto no-scrollbar px-6 pb-2">
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.92 }}
              onClick={() => router.push(action.route)}
              className="flex flex-col items-center flex-shrink-0 gap-2 w-[72px]"
            >
              {/* Ícone SEM card/borda — o próprio SVG é o botão */}
              <div className="w-12 h-12 flex items-center justify-center">
                <NioIcon name={action.icon} size={44} />
              </div>

              {/* Label — 2 linhas fixas via whitespace-pre-line */}
              <span className="text-[11px] font-medium text-[var(--color-neutral-text)] leading-tight text-center whitespace-pre-line">
                {action.label}
              </span>

              {/* Tag Novo ABAIXO do label */}
              {action.isNew && (
                <span className="mt-0.5 inline-flex items-center px-2 py-0.5 rounded-full bg-[var(--color-primary-background)] text-white text-[9px] font-bold uppercase tracking-wide">
                  Novo
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ============================================================
          OFERTAS E BENEFÍCIOS — card com boneco flutuante
      ============================================================ */}
      <section className="px-6 pt-6 pb-4">
        <h2 className="text-base font-bold text-[var(--color-neutral-text)] mb-3">
          Ofertas e benefícios para você
        </h2>

        <div className="bg-[var(--color-primary-background-low)] rounded-2xl px-5 py-5 flex items-center justify-between min-h-[140px] overflow-hidden relative">
          {/* Conteúdo à esquerda */}
          <div className="relative z-10 max-w-[180px]">
            <p className="font-bold text-[17px] text-[var(--color-neutral-text)] leading-tight mb-3">
              Tem uma oferta<br />esperando você
            </p>
            <Button
              kind="conversion"
              size="sm"
              fullWidth={false}
              onClick={() => router.push('/ofertas')}
              className="px-4"
            >
              Quero Conhecer
            </Button>
          </div>

          {/* Boneco flutuante à direita */}
          <div className="absolute right-0 bottom-0 pointer-events-none" style={{ width: 140, height: 140 }}>
            <Image
              src="/images/boneco-oferta.png"
              alt=""
              fill
              className="object-contain object-bottom"
              unoptimized
            />
          </div>
        </div>
      </section>
    </AppShell>
  );
}
