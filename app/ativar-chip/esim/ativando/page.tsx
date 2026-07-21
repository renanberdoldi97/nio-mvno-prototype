'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/ui/PageTransition';
import { ProgressCircle } from '@/components/ui/ProgressCircle';

export default function AtivandoEsimPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('/ativar-chip/esim/configurando');
    }, 1600);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <PageTransition variant="fade">
      <div className="w-full h-full flex flex-col items-center justify-center bg-white px-8">
        <ProgressCircle />
        <p className="text-center font-semibold text-[var(--color-neutral-text)] text-base mt-4">
          Confirmando ativação da linha
        </p>
        <p className="text-center text-[var(--color-neutral-text-medium)] text-sm mt-1">
          Isso leva só um instante.
        </p>
      </div>
    </PageTransition>
  );
}
