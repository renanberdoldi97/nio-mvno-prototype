'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderStatus, PortabilityStatus, ChipType } from './types';

type AppState = {
  // Chip principal
  chipType: ChipType | null;
  orderStatus: OrderStatus;
  chipDDD: string;
  chipNumber: string | null;

  // Portabilidade
  portabilityStatus: PortabilityStatus;
  originalNumber: string | null;
  originalCarrier: string | null;

  // Ações
  setChipType: (type: ChipType) => void;
  setOrderStatus: (status: OrderStatus) => void;
  setChipDDD: (ddd: string) => void;
  setChipNumber: (number: string) => void;
  setPortabilityStatus: (status: PortabilityStatus) => void;
  setOriginalLine: (number: string, carrier: string) => void;
  reset: () => void;
};

const initialState = {
  chipType: null,
  orderStatus: 'not_started' as OrderStatus,
  chipDDD: '11',
  chipNumber: null,
  portabilityStatus: 'idle' as PortabilityStatus,
  originalNumber: null,
  originalCarrier: null,
};

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      setChipType: (chipType) => set({ chipType }),
      setOrderStatus: (orderStatus) => set({ orderStatus }),
      setChipDDD: (chipDDD) => set({ chipDDD }),
      setChipNumber: (chipNumber) => set({ chipNumber }),
      setPortabilityStatus: (portabilityStatus) => set({ portabilityStatus }),
      setOriginalLine: (originalNumber, originalCarrier) =>
        set({ originalNumber, originalCarrier }),
      reset: () => set(initialState),
    }),
    { name: 'nio-mvno-state' }
  )
);
