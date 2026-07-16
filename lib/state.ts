'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderStatus, PortabilityStatus, ChipType } from './types';

type AppState = {
  // Chip principal
  orderStatus: OrderStatus;
  chipDDD: string;
  chipNumber: string | null;

  // Portabilidade
  portabilityStatus: PortabilityStatus;
  originalNumber: string | null;
  originalCarrier: string | null;

  // Jornada de solicitação
  selectedChipType: ChipType | null;
  selectedDDD: string;

  // Ativação eSIM
  esimActivationStep: 'idle' | 'confirming' | 'configuring' | 'done';
  esimNumberAvailable: boolean; // true = número já disponível na conclusão

  // Ações
  setOrderStatus: (status: OrderStatus) => void;
  setChipDDD: (ddd: string) => void;
  setChipNumber: (number: string) => void;
  setPortabilityStatus: (status: PortabilityStatus) => void;
  setOriginalLine: (number: string, carrier: string) => void;
  setSelectedChipType: (type: ChipType) => void;
  setSelectedDDD: (ddd: string) => void;
  setEsimActivationStep: (step: AppState['esimActivationStep']) => void;
  setEsimNumberAvailable: (available: boolean) => void;
  reset: () => void;
};

const initialState = {
  orderStatus: 'not_started' as OrderStatus,
  chipDDD: '11',
  chipNumber: null,
  portabilityStatus: 'idle' as PortabilityStatus,
  originalNumber: null,
  originalCarrier: null,
  selectedChipType: null,
  selectedDDD: '11', // padrão = DDD da instalação
  esimActivationStep: 'idle' as const,
  esimNumberAvailable: false,
};

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      setOrderStatus: (orderStatus) => set({ orderStatus }),
      setChipDDD: (chipDDD) => set({ chipDDD }),
      setChipNumber: (chipNumber) => set({ chipNumber }),
      setPortabilityStatus: (portabilityStatus) => set({ portabilityStatus }),
      setOriginalLine: (originalNumber, originalCarrier) =>
        set({ originalNumber, originalCarrier }),
      setSelectedChipType: (selectedChipType) => set({ selectedChipType }),
      setSelectedDDD: (selectedDDD) => set({ selectedDDD }),
      setEsimActivationStep: (esimActivationStep) => set({ esimActivationStep }),
      setEsimNumberAvailable: (esimNumberAvailable) => set({ esimNumberAvailable }),
      reset: () => set(initialState),
    }),
    { name: 'nio-mvno-state' }
  )
);
