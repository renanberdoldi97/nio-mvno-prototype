'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Message } from '@/components/ui/Message';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { NioIcon } from '@/components/icons';

export default function BloquearChipPage() {
  const router = useRouter();

  return (
    <JourneyLayout
      title="Bloquear chip"
      onBack={() => router.push('/chip-movel')}
      cta={
        <>
          <Button variant="primary" fullWidth>
            Falar no WhatsApp
          </Button>
          <Button variant="secondary" fullWidth>
            Ligar pra Nio
          </Button>
        </>
      }
    >
      <div className="px-6">
        <div className="mb-6">
          <NioIcon name="chip-sim" size={40} />
        </div>

        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight mb-2">
          Vamos bloquear seu chip agora
        </h1>

        <p className="text-base text-[var(--color-neutral-text-medium)] mb-6 leading-relaxed">
          A gente bloqueia sua linha na hora.
        </p>

        <Message
          kind="info"
          title="Atendimento em qualquer dia e horário."
        />
      </div>
    </JourneyLayout>
  );
}
