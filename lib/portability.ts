import type { PortabilityStatus } from './types';

type Badge = { label: string; className: string };

const IN_PROGRESS: Badge = { label: 'Em andamento', className: 'bg-[#FFF8E0] text-[#8A6D00]' };
const DONE: Badge = { label: 'Concluído', className: 'bg-[#E5EFDD] text-[#0F3D24]' };
const NOT_DONE: Badge = { label: 'Não concluído', className: 'bg-[#FFE0E0] text-[#8A0000]' };

export const PORTABILITY_BADGE: Record<PortabilityStatus, Badge> = {
  idle: IN_PROGRESS,
  awaiting_release: IN_PROGRESS,
  scheduled: IN_PROGRESS,
  completed: DONE,
  cancelled: NOT_DONE,
  conflict: NOT_DONE,
  number_unavailable: NOT_DONE,
  invalid_data: NOT_DONE,
  no_sms_response: NOT_DONE,
  ddd_mismatch: NOT_DONE,
  duplicate_request: NOT_DONE,
};

export type PortabilityContent = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const PORTABILITY_CONTENT: Record<PortabilityStatus, PortabilityContent> = {
  idle: {
    title: 'Aguardando liberação',
    description: 'Conclusão em até 3 dias úteis.',
  },
  awaiting_release: {
    title: 'Aguardando liberação',
    description: 'Conclusão em até 3 dias úteis.',
  },
  scheduled: {
    title: 'Liberação do número na operadora atual',
    description: 'Conclusão em até 3 dias úteis.',
  },
  completed: {
    title: 'Número portado',
    description: 'Seu número antigo já é Nio.',
  },
  cancelled: {
    title: 'Portabilidade cancelada',
    description: 'Você pode solicitar novamente quando quiser.',
    ctaLabel: 'Solicitar novamente',
    ctaHref: '/portabilidade',
  },
  conflict: {
    title: 'Encontramos um conflito no pedido',
    description: 'Nossa equipe precisa revisar sua solicitação com você.',
    ctaLabel: 'Falar com a Nio',
    ctaHref: '/suporte',
  },
  number_unavailable: {
    title: 'Sua operadora atual ainda não liberou esse número',
    description: 'Aguarde ou fale com a gente pra entender o que houve.',
    ctaLabel: 'Falar com a Nio',
    ctaHref: '/suporte',
  },
  invalid_data: {
    title: 'Necessário correção de dados',
    description: 'Alguns dados da sua solicitação precisam ser corrigidos.',
    ctaLabel: 'Refazer solicitação',
    ctaHref: '/portabilidade',
  },
  no_sms_response: {
    title: 'Não recebemos sua confirmação por SMS',
    description: 'Responda SIM na mensagem que enviamos pra concluir o processo.',
    ctaLabel: 'Voltar pro início',
    ctaHref: '/',
  },
  ddd_mismatch: {
    title: 'O número tem DDD diferente do seu chip',
    description: 'Só é possível portar números com o mesmo DDD do seu chip Nio.',
    ctaLabel: 'Refazer a solicitação',
    ctaHref: '/portabilidade',
  },
  duplicate_request: {
    title: 'Já existe um pedido de portabilidade pra esse número',
    description: 'Fale com a gente pra entender o que aconteceu.',
    ctaLabel: 'Falar com a Nio',
    ctaHref: '/suporte',
  },
};
