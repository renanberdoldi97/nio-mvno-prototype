import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDDD(ddd: string): string {
  return `(${ddd})`;
}

export function formatPhone(number: string, ddd: string = '11'): string {
  return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
}

// Delay helper pra simular latência de rede realista
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
