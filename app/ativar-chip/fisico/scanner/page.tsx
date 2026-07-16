'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/ui/PageTransition';
import { NioIcon } from '@/components/icons';
import { sleep } from '@/lib/utils';

export default function ScannerPage() {
  const router = useRouter();

  // Simula a detecção automática do QR/código de barras depois de alguns segundos
  useEffect(() => {
    let active = true;
    (async () => {
      await sleep(3500);
      if (active) router.push('/ativar-chip/fisico/ativando');
    })();
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <PageTransition>
      <div className="w-full h-full flex flex-col relative bg-[#0F3D24] overflow-hidden">
        {/* Header transparente com X à direita */}
        <div className="w-full h-14 flex items-center justify-end px-6 flex-shrink-0">
          <button
            onClick={() => router.push('/ativar-chip/fisico')}
            className="w-8 h-8 flex items-center justify-center"
          >
            <NioIcon name="x" size={22} className="brightness-0 invert" />
          </button>
        </div>

        <main className="flex-1 flex flex-col items-center px-8 pt-4">
          <p className="text-white text-sm text-center mb-8">
            Aponte a câmera para o QR Code ou código de barras
          </p>

          {/* Visor de câmera fake */}
          <div
            className="relative border-2 border-[var(--color-primary-background-high)] rounded-2xl flex items-center justify-center"
            style={{ width: 220, height: 220 }}
          >
            <NioIcon name="barcode" size={64} className="brightness-0 invert opacity-70" />
          </div>
        </main>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={() => router.push('/ativar-chip/fisico/manual')}
            className="w-full h-14 rounded-full border-[1.5px] border-white text-white font-semibold text-base"
          >
            Ativar com o código de 19 dígitos
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
