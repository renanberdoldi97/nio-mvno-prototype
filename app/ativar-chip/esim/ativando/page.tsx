'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/ui/PageTransition';
import { useAppState } from '@/lib/state';
import { sleep } from '@/lib/utils';

function ProgressCircle() {
  const size = 80;
  const stroke = 6;
  const radius = (size - stroke) / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E0E0E0"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#32E000"
        strokeWidth={stroke}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function AtivandoPage() {
  const router = useRouter();
  const setEsimActivationStep = useAppState(s => s.setEsimActivationStep);

  useEffect(() => {
    let active = true;
    (async () => {
      await sleep(1600);
      if (!active) return;
      setEsimActivationStep('configuring');
      router.replace('/ativar-chip/esim/configurando');
    })();
    return () => {
      active = false;
    };
  }, [router, setEsimActivationStep]);

  return (
    <PageTransition variant="fade">
      <div className="w-full h-full flex flex-col items-center justify-center bg-background">
        <ProgressCircle />
        <p className="text-center text-text-secondary text-sm mt-4">
          Confirmando sua linha...
        </p>
      </div>
    </PageTransition>
  );
}
