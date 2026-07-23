'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/ui/PageTransition';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { useAppState } from '@/lib/state';
import { sleep } from '@/lib/utils';

export default function ConfirmandoPage() {
  const router = useRouter();
  const selectedChipType = useAppState(s => s.selectedChipType);
  const setActivationEntryPoint = useAppState(s => s.setActivationEntryPoint);
  const isEsim = selectedChipType !== 'physical';

  useEffect(() => {
    let active = true;
    (async () => {
      await sleep(1400);
      if (active) {
        if (selectedChipType === 'physical') {
          router.replace('/pedir-chip/confirmado');
        } else {
          setActivationEntryPoint('flow');
          router.replace('/ativar-chip/esim');
        }
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, selectedChipType]);

  return (
    <PageTransition variant="fade">
      <div className="w-full h-full flex flex-col items-center justify-center bg-white">
        <ProgressCircle />
        <p className="text-center text-[var(--color-neutral-text-medium)] text-sm mt-4 whitespace-pre-line">
          {`Confirmando o pedido\ne preparando seu ${isEsim ? 'eSIM' : 'chip'}...`}
        </p>
      </div>
    </PageTransition>
  );
}
