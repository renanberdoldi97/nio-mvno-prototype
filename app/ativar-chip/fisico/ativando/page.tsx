'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/ui/PageTransition';
import { ProgressCircle } from '@/components/ui/ProgressCircle';
import { sleep } from '@/lib/utils';

export default function AtivandoFisicoPage() {
  const router = useRouter();

  useEffect(() => {
    let active = true;
    (async () => {
      await sleep(2000);
      if (active) router.replace('/ativar-chip/fisico/concluido');
    })();
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <PageTransition variant="fade">
      <div className="w-full h-full flex flex-col items-center justify-center bg-white px-8">
        <ProgressCircle />
        <p className="text-center font-semibold text-[var(--color-neutral-text)] text-base mt-4">
          Ativando seu chip
        </p>
        <p className="text-center text-[var(--color-neutral-text-medium)] text-sm mt-1">
          Isso pode levar até alguns minutos. Não feche o app enquanto isso.
        </p>
      </div>
    </PageTransition>
  );
}
