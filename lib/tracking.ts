export type TrackingStatus = 'confirmed' | 'in_transit' | 'delivered' | 'failed';
export type StepStatus = 'completed' | 'active' | 'pending' | 'failed';

export const TRACKING_TITLES: Record<TrackingStatus, string> = {
  confirmed: 'Pedido confirmado',
  in_transit: 'Seu chip está a caminho',
  delivered: 'Seu chip já chegou!',
  failed: 'A entrega falhou!',
};

export const TRACKING_STEPPER: Record<TrackingStatus, [StepStatus, StepStatus, StepStatus]> = {
  confirmed: ['completed', 'pending', 'pending'],
  in_transit: ['completed', 'completed', 'pending'],
  delivered: ['completed', 'completed', 'completed'],
  failed: ['completed', 'completed', 'failed'],
};

export const TRACKING_CTA_LABEL: Record<TrackingStatus, string> = {
  confirmed: 'Acompanhar entrega',
  in_transit: 'Recebi o chip',
  delivered: 'Ativar o chip',
  failed: 'Falar com a Nio',
};
