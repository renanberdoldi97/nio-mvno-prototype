'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChipTag } from '@/components/ui/ChipTag';
import { FeedbackBanner } from '@/components/ui/FeedbackBanner';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { BottomNav } from '@/components/ui/BottomNav';
import { NioIcon, type IconName } from '@/components/icons';
import { useAppState } from '@/lib/state';
import { MOCK_USER, MOCK_CHIP } from '@/lib/mock-data';

type ActionItem = {
  key: string;
  icon: IconName;
  title: string;
  subtitle: string;
  onClick: () => void;
};

const HEADER_RIGHT_ACTION_ROUTE = '/suporte';

export default function ChipMovelPage() {
  const router = useRouter();
  const orderStatus = useAppState(s => s.orderStatus);
  const selectedChipType = useAppState(s => s.selectedChipType);
  const setActivationEntryPoint = useAppState(s => s.setActivationEntryPoint);

  const isEsim = selectedChipType === 'esim';
  const isActive = orderStatus === 'active';

  function handleIniciarAtivacao() {
    setActivationEntryPoint('management');
    router.push(isEsim ? '/ativar-chip/esim' : '/ativar-chip/fisico');
  }

  const rightAction = (
    <button
      onClick={() => router.push(HEADER_RIGHT_ACTION_ROUTE)}
      className="w-8 h-8 flex items-center justify-center"
    >
      <NioIcon name="call" size={24} />
    </button>
  );

  if (isActive) {
    const actions: ActionItem[] = [
      {
        key: 'portabilidade',
        icon: 'swap',
        title: 'Pedir portabilidade',
        subtitle: 'Traga seu número antigo pra Nio',
        onClick: () => router.push('/portabilidade'),
      },
      {
        key: 'bloquear',
        icon: 'warning-shield',
        title: 'Bloquear chip',
        subtitle: 'Em caso de perda ou roubo',
        onClick: () => router.push('/chip-movel/bloqueio'),
      },
      {
        key: 'outro-chip',
        icon: 'chip-sim',
        title: 'Solicitar outro chip',
        subtitle: 'Pra usar em outro aparelho',
        onClick: () => {},
      },
      {
        key: 'plano',
        icon: 'info',
        title: 'Detalhes do plano',
        subtitle: 'Veja o que está incluído',
        onClick: () => {},
      },
    ];

    return (
      <JourneyLayout
        title="Chip móvel"
        onBack={() => router.push('/')}
        rightAction={rightAction}
        overlay={<BottomNav />}
      >
        <div className="px-6 pt-6 pb-8">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h1 className="text-3xl font-bold text-[var(--color-neutral-text)]">
              {MOCK_USER.plan.name}
            </h1>
            <ChipTag
              variant="label"
              className="bg-[var(--color-neutral-border)] text-[var(--color-neutral-text-medium)]"
            >
              Plano ativo
            </ChipTag>
          </div>

          <div
            className="bg-white rounded-2xl p-5 mt-6"
            style={{ border: '1px solid #D6D8D4' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-neutral-text-medium)]">Seu número</span>
              <span className="text-sm font-bold text-[var(--color-neutral-text)]">{MOCK_CHIP.fullNumber}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-[var(--color-neutral-text-medium)]">Seu plano</span>
              <span className="text-sm font-bold text-[var(--color-neutral-text)]">20 GB + Ligações ilimitadas</span>
            </div>

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E9E5D3' }}>
              <p className="text-sm text-[var(--color-neutral-text-medium)] mb-2">Consumo do mês:</p>
              <div className="w-full h-2 rounded-full bg-[#F0F0F0] overflow-hidden">
                <div className="h-full rounded-full bg-[#124803]" style={{ width: '16%' }} />
              </div>
              <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">3.2 GB de 20 GB usados</p>
              <p className="text-xs text-[var(--color-neutral-text-medium)] mt-1">Renova em 15/12</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-[var(--color-neutral-text)] mt-8 mb-3">
            O que você quer fazer?
          </h2>

          <div className="flex flex-col gap-3">
            {actions.map(action => (
              <button
                key={action.key}
                onClick={action.onClick}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 text-left"
                style={{ border: '1px solid #D6D8D4' }}
              >
                <NioIcon name={action.icon} size={24} className="flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-[var(--color-neutral-text)]">{action.title}</p>
                  <p className="text-sm text-[var(--color-neutral-text-medium)] mt-0.5">{action.subtitle}</p>
                </div>
                <NioIcon name="arrow-right" size={24} className="flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </JourneyLayout>
    );
  }

  return (
    <JourneyLayout
      title="Chip móvel"
      onBack={() => router.push('/')}
      rightAction={rightAction}
      cta={
        <>
          <FeedbackBanner
            title="Ative seu chip e comece a usar seu novo número"
            description="Você precisará do código que vem no cartão do chip para fazer a ativação."
            autoHideMs={0}
          />
          <Button onClick={handleIniciarAtivacao}>
            Iniciar ativação
          </Button>
        </>
      }
    >
      <div className="px-6 pt-6 h-full flex flex-col">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h1 className="text-3xl font-bold text-[var(--color-neutral-text)]">
            {MOCK_USER.plan.name}
          </h1>
          <ChipTag
            variant="label"
            className="bg-[var(--color-neutral-border)] text-[var(--color-neutral-text-medium)]"
          >
            Plano ativo
          </ChipTag>
        </div>

        <h2 className="text-xl font-bold text-[var(--color-neutral-text)] mt-4">
          {isEsim ? 'eSIM solicitado' : 'Chip físico solicitado'}
        </h2>
        <p className="text-sm text-[var(--color-neutral-text-medium)] mt-2">
          Acompanhe seu pedido por aqui.
        </p>

        <Card variant="neutral" padding="lg" className="mt-6">
          <p className="text-sm text-[var(--color-neutral-text-medium)] mb-3">Seu pedido:</p>
          <div className="flex items-center gap-2 mb-2">
            <NioIcon name="chip-sim" size={22} />
            <span className="text-sm font-semibold text-[var(--color-neutral-text)]">1 chip móvel de 20GB</span>
          </div>
          <div className="flex items-center gap-2">
            <NioIcon name="location" size={22} />
            <span className="text-sm text-[var(--color-neutral-text)]">{MOCK_USER.address.short}</span>
          </div>
        </Card>

        <div className="flex-1" />
      </div>
    </JourneyLayout>
  );
}
