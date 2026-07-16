'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { JourneyLayout } from '@/components/ui/JourneyLayout';

export default function ManualActivationPage() {
  const router = useRouter();
  const [code, setCode] = useState('');

  return (
    <JourneyLayout
      title="Ativar chip móvel"
      onBack={() => router.push('/ativar-chip/fisico/scanner')}
      cta={
        <Button
          disabled={code.length < 19}
          onClick={() => router.push('/ativar-chip/fisico/ativando')}
        >
          Ativar chip
        </Button>
      }
    >
      <div className="px-6 pt-4">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] mb-2">
          Seu código de ativação
        </h1>
        <p className="text-sm text-[var(--color-neutral-text-medium)] mb-5">
          Você encontra esse código no material que veio junto com o seu chip.
        </p>

        <Input
          label="Código de 19 dígitos"
          value={code}
          onChange={(v) => setCode(v.replace(/\D/g, '').slice(0, 19))}
          inputMode="numeric"
          maxLength={19}
          placeholder="0000000000000000000"
        />
      </div>
    </JourneyLayout>
  );
}
