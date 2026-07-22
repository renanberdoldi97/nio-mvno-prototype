'use client';

import { useAppState } from '@/lib/state';

type DDDCardProps = {
  onAlterarClick: () => void;
};

export function DDDCard({ onAlterarClick }: DDDCardProps) {
  const selectedDDD = useAppState(s => s.selectedDDD);

  return (
    <div
      className="flex items-center justify-between rounded-[8px] border p-4"
      style={{
        backgroundColor: '#F8F7F1',
        borderColor: '#E9E5D3',
        borderWidth: '1px',
      }}
    >
      <span className="text-base font-bold text-[var(--color-neutral-text)]">
        DDD do chip: ({selectedDDD})
      </span>
      <button
        onClick={onAlterarClick}
        className="text-base font-semibold text-[#124803]"
      >
        Alterar
      </button>
    </div>
  );
}
