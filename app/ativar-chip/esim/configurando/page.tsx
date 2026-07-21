'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Message } from '@/components/ui/Message';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { useAppState } from '@/lib/state';

export default function ConfigurandoESIMPage() {
  const router = useRouter();
  const setEsimNumberAvailable = useAppState(s => s.setEsimNumberAvailable);
  const [step, setStep] = useState<'instructions' | 'configuring'>('instructions');

  useEffect(() => {
    if (step !== 'configuring') return;
    const t = setTimeout(() => {
      setEsimNumberAvailable(true);
      router.push('/ativar-chip/esim/concluido');
    }, 2500);
    return () => clearTimeout(t);
  }, [step, router, setEsimNumberAvailable]);

  return (
    <JourneyLayout
      title="Ativar chip móvel"
      showBack={false}
      transition="fade"
      cta={
        step === 'instructions' ? (
          <Button onClick={() => setStep('configuring')}>Iniciar configuração</Button>
        ) : undefined
      }
    >
      <div className="px-6">
        {step === 'instructions' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl
              bg-[var(--color-primary-background-low)] mb-5">
              <span className="text-sm font-semibold
                text-[var(--color-primary-background)]">
                ✓ Chip ativado
              </span>
            </div>

            <h1 className="text-2xl font-bold text-[var(--color-neutral-text)]
              leading-tight mb-3">
              Agora é só configurar o eSIM
            </h1>

            <p className="text-sm text-[var(--color-neutral-text-medium)]
              leading-relaxed mb-5">
              A configuração vai acontecer nas configurações do seu celular.
              Quando terminar, volte aqui pra ver seu número.
            </p>

            <Message
              kind="info"
              title="Você vai sair do app"
              description="Vamos abrir as configurações do celular. Quando terminar de configurar, volte pro app Nio."
            />
          </motion.div>
        )}

        {step === 'configuring' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full py-16"
          >
            <ProgressCircle size={64} />
            <p className="text-sm text-[var(--color-neutral-text-medium)]
              mt-5 text-center leading-relaxed">
              Quando terminar, é só voltar pra cá e ver seu novo número.
            </p>
          </motion.div>
        )}
      </div>
    </JourneyLayout>
  );
}
