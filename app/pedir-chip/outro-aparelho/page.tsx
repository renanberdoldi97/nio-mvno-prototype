'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Message } from '@/components/ui/Message';
import { JourneyLayout } from '@/components/ui/JourneyLayout';
import { useAppState } from '@/lib/state';
import { DEVICE_MODELS, type DeviceModel } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const NOT_FOUND = 'Não encontrei o modelo na lista';

type Selection = DeviceModel | typeof NOT_FOUND;

export default function OutroAparelhoPage() {
  const router = useRouter();
  const setIdentifiedDevice = useAppState(s => s.setIdentifiedDevice);
  const setIsOtherDevice = useAppState(s => s.setIsOtherDevice);
  const setEsimSupported = useAppState(s => s.setEsimSupported);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Selection | null>(null);
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const q = query.toLowerCase();
    const filtered = !q
      ? DEVICE_MODELS
      : DEVICE_MODELS.filter(
          d => d.model.toLowerCase().includes(q) || d.brand.toLowerCase().includes(q)
        );

    return [...filtered].sort((a, b) => {
      const brandCompare = a.brand.localeCompare(b.brand);
      return brandCompare !== 0 ? brandCompare : a.model.localeCompare(b.model);
    });
  }, [query]);

  const selectedLabel = selected
    ? selected === NOT_FOUND
      ? NOT_FOUND
      : `${selected.brand} ${selected.model}`
    : null;

  const showDropdown = focused && query.length > 0 && selectedLabel !== query;
  const isNotFound = selected === NOT_FOUND;
  const canContinue = selected !== null && !isNotFound;

  function handleSelect(device: Selection) {
    setSelected(device);
    setQuery(device === NOT_FOUND ? NOT_FOUND : `${device.brand} ${device.model}`);
    setFocused(false);
  }

  function handleContinue() {
    if (!selected || isNotFound) return;
    const device = selected as DeviceModel;
    setIdentifiedDevice(`${device.brand} ${device.model}`);
    setEsimSupported(device.esimSupported);
    setIsOtherDevice(true);
    router.push('/pedir-chip/outro-aparelho/identificando');
  }

  return (
    <JourneyLayout
      title="Pedir chip móvel"
      onBack={() => router.push('/pedir-chip/escolher-tipo')}
      cta={
        <Button disabled={!canContinue} onClick={handleContinue}>
          Continuar
        </Button>
      }
    >
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-text)] leading-tight mb-5">
          O chip será utilizado em qual aparelho?
        </h1>

        <div className="relative">
          <div className={cn(
            'relative border-[1.5px] rounded-md bg-white h-14 flex items-center px-4',
            focused ? 'border-text-primary' : 'border-border'
          )}>
            <input
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setSelected(null);
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Digite marca ou modelo do celular"
              className="flex-1 bg-transparent outline-none text-text-primary text-base"
            />
          </div>

          {showDropdown && (
            <div className="absolute left-0 right-0 top-[60px] bg-white rounded-md border border-[var(--color-neutral-border)] shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-10 max-h-64 overflow-y-auto no-scrollbar">
              {suggestions.map(d => (
                <button
                  key={`${d.brand}-${d.model}`}
                  onClick={() => handleSelect(d)}
                  className="w-full text-left px-4 py-3 text-sm text-[var(--color-neutral-text)] border-b border-[var(--color-neutral-border)] last:border-b-0"
                >
                  {d.brand} {d.model}
                </button>
              ))}
              <button
                onClick={() => handleSelect(NOT_FOUND)}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-[var(--color-primary-text)]"
              >
                {NOT_FOUND}
              </button>
            </div>
          )}
        </div>

        {isNotFound && (
          <Message
            kind="info"
            title="Entre em contato com o suporte pra continuar com o pedido."
            ctaLabel="Falar com a Nio"
            onCta={() => {}}
            className="mt-4"
          />
        )}
      </div>
    </JourneyLayout>
  );
}
