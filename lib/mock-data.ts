export const MOCK_USER = {
  name: 'Ana Silva',
  firstName: 'Ana',
  ddd: '11',
  address: {
    street: 'R. dos Pinheiros',
    number: '1200',
    city: 'São Paulo',
    state: 'SP',
    zip: '05422-001',
    formatted: 'R. dos Pinheiros, 1200, São Paulo — SP (05422-001)',
    short: 'R. dos Pinheiros, 1200 — São Paulo, SP',
  },
  plan: {
    name: 'Nio Fibra Super',
    speed: '700 Mega',
    dataAllowance: '50 GB',
  },
  esimSupported: true, // dispositivo suporta eSIM
};

export const MOCK_CHIP = {
  ddd: '11',
  number: '9 8765-4321', // número gerado após ativação
  fullNumber: '(11) 9 8765-4321',
};
