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
    short: 'R. dos Pinheiros, 1200, São Paulo, SP',
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

export const MOCK_ESIM = {
  lpaCode: 'LPA:1$rsp.provider.com$ABCD-1234-EFGH-5678-IJKL-9012',
  // deep link pra iOS Settings (não vai funcionar no browser — proposital)
  deepLinkIOS: 'App-prefs:MOBILE_DATA_SETTINGS_ID',
  deepLinkAndroid: 'intent:#Intent;action=android.settings.NETWORK_OPERATOR_SETTINGS;end',
};

export const MOCK_CARRIERS = ['Vivo', 'Claro', 'TIM', 'NuCel', 'Não encontrei minha operadora'];

export const MOCK_TRACKING = {
  confirmedAt: '18/07/2026 - 14:30',
};

export const MOCK_PORTABILITY = {
  protocol: '0000000',
  requestedAt: '18/07/2026',
  ticket: '000000',
};
