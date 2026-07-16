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

export const MOCK_ESIM = {
  lpaCode: 'LPA:1$rsp.provider.com$ABCD-1234-EFGH-5678-IJKL-9012',
  // deep link pra iOS Settings (não vai funcionar no browser — proposital)
  deepLinkIOS: 'App-prefs:MOBILE_DATA_SETTINGS_ID',
  deepLinkAndroid: 'intent:#Intent;action=android.settings.NETWORK_OPERATOR_SETTINGS;end',
};
