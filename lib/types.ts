// Tipos globais do protótipo — expandidos em prompts futuros

export type ChipType = 'esim' | 'physical';

export type UserProfile = {
  name: string;
  ddd: string;
  address: string;
  planName: string;
  planSpeed: string;
  dataAllowance: string; // ex: "50 GB"
};

export type OrderStatus =
  | 'not_started'
  | 'pending_delivery'
  | 'in_transit'
  | 'delivered'
  | 'delivery_failed'
  | 'ready_to_activate'
  | 'activating'
  | 'active';

export type PortabilityStatus =
  | 'idle'
  | 'awaiting_release'
  | 'scheduled'
  | 'completed'
  | 'cancelled'
  | 'conflict'
  | 'number_unavailable'
  | 'invalid_data'
  | 'no_sms_response'
  | 'ddd_mismatch'
  | 'duplicate_request';

// Perfil default do protótipo
export const DEFAULT_USER: UserProfile = {
  name: 'Ana Silva',
  ddd: '11',
  address: 'R. dos Pinheiros, 1200, São Paulo — SP',
  planName: 'Nio Fibra Super',
  planSpeed: '700 Mega',
  dataAllowance: '50 GB',
};
