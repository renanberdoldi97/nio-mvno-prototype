'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/ui/PageTransition';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { useAppState } from '@/lib/state';
import { sleep } from '@/lib/utils';

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
      <div className="w-full h-full flex flex-col items-center justify-center bg-white">
        <ProgressCircle />
        <p className="text-center text-[var(--color-neutral-text-medium)] text-sm mt-4">
          Confirmando sua linha...
        </p>
      </div>
    </PageTransition>
  );
}
