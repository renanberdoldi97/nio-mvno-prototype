'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/ui/PageTransition';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { sleep } from '@/lib/utils';

export default function IdentificandoAparelhoPage() {
  const router = useRouter();

  useEffect(() => {
    let active = true;
    (async () => {
      await sleep(1800);
      if (active) router.replace('/pedir-chip/outro-aparelho/escolher-tipo');
    })();
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <PageTransition variant="fade">
      <div className="w-full h-full flex flex-col items-center justify-center bg-white">
        <ProgressCircle />
        <p className="text-center text-[var(--color-neutral-text-medium)] text-sm mt-4">
          Estamos identificando o dispositivo...
        </p>
      </div>
    </PageTransition>
  );
}
