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
    dataAllowance: '20 GB',
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

export const MOCK_CARRIERS = ['Vivo', 'Claro', 'TIM', 'NuCel'];

export const MOCK_TRACKING = {
  confirmedAt: '18/07/2026 - 14:30',
};

export const MOCK_PORTABILITY = {
  protocol: '0000000',
  requestedAt: '18/07/2026',
  ticket: '000000',
};

export type DeviceModel = {
  brand: string;
  model: string;
  esimSupported: boolean;
};

export const DEVICE_MODELS: DeviceModel[] = [
  // Apple — todos iPhone XS+ suportam eSIM
  { brand: 'Apple', model: 'iPhone 16 Pro Max', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 16 Pro', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 16 Plus', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 16', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 16e', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 15 Pro Max', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 15 Pro', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 15 Plus', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 15', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 14 Pro Max', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 14 Pro', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 14 Plus', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 14', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 13 Pro Max', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 13 Pro', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 13', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 13 mini', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 12 Pro Max', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 12 Pro', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 12', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 12 mini', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 11 Pro Max', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 11 Pro', esimSupported: true },
  { brand: 'Apple', model: 'iPhone 11', esimSupported: true },
  { brand: 'Apple', model: 'iPhone SE (3ª geração)', esimSupported: true },
  { brand: 'Apple', model: 'iPhone SE (2ª geração)', esimSupported: true },
  { brand: 'Apple', model: 'iPhone XS Max', esimSupported: true },
  { brand: 'Apple', model: 'iPhone XS', esimSupported: true },
  { brand: 'Apple', model: 'iPhone XR', esimSupported: true },

  // Samsung Galaxy S — S20+ suporta eSIM
  { brand: 'Samsung', model: 'Galaxy S25 Ultra', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S25+', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S25', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S24 Ultra', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S24+', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S24', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S24 FE', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S23 Ultra', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S23+', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S23', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S23 FE', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy S22 Ultra', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S22+', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S22', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S21 Ultra', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S21+', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S21', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S20 Ultra', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S20+', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy S20', esimSupported: true },

  // Samsung Galaxy A — só A34, A35, A54, A55 suportam eSIM
  { brand: 'Samsung', model: 'Galaxy A56', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy A55', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy A54', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy A36', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy A35', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy A34', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy A25', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy A24', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy A16', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy A15 5G', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy A15', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy A14', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy A05s', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy A05', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy A04', esimSupported: false },

  // Samsung Galaxy M — nenhum suporta eSIM
  { brand: 'Samsung', model: 'Galaxy M55', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy M54', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy M34', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy M15', esimSupported: false },
  { brand: 'Samsung', model: 'Galaxy M14', esimSupported: false },

  // Samsung Foldables — todos suportam eSIM
  { brand: 'Samsung', model: 'Galaxy Z Fold6', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy Z Fold5', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy Z Fold4', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy Z Flip6', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy Z Flip5', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy Z Flip4', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy Note 20 Ultra', esimSupported: true },
  { brand: 'Samsung', model: 'Galaxy Note 20', esimSupported: true },

  // Motorola Edge — 40+ suporta eSIM
  { brand: 'Motorola', model: 'Edge 60 Pro', esimSupported: true },
  { brand: 'Motorola', model: 'Edge 60 Fusion', esimSupported: true },
  { brand: 'Motorola', model: 'Edge 50 Ultra', esimSupported: true },
  { brand: 'Motorola', model: 'Edge 50 Pro', esimSupported: true },
  { brand: 'Motorola', model: 'Edge 50 Fusion', esimSupported: true },
  { brand: 'Motorola', model: 'Edge 50 Neo', esimSupported: true },
  { brand: 'Motorola', model: 'Edge 40 Pro', esimSupported: true },
  { brand: 'Motorola', model: 'Edge 40 Neo', esimSupported: true },
  { brand: 'Motorola', model: 'Edge 40', esimSupported: true },
  { brand: 'Motorola', model: 'Edge 30 Ultra', esimSupported: false },
  { brand: 'Motorola', model: 'Edge 30 Pro', esimSupported: false },
  { brand: 'Motorola', model: 'Edge 30', esimSupported: false },

  // Motorola Razr — todos flip suportam eSIM
  { brand: 'Motorola', model: 'Razr 60 Ultra', esimSupported: true },
  { brand: 'Motorola', model: 'Razr 60', esimSupported: true },
  { brand: 'Motorola', model: 'Razr 50 Ultra', esimSupported: true },
  { brand: 'Motorola', model: 'Razr 50', esimSupported: true },
  { brand: 'Motorola', model: 'Razr 40 Ultra', esimSupported: true },
  { brand: 'Motorola', model: 'Razr 40', esimSupported: true },

  // Motorola Moto G — só alguns modelos recentes suportam eSIM
  { brand: 'Motorola', model: 'Moto G86', esimSupported: true },
  { brand: 'Motorola', model: 'Moto G85', esimSupported: true },
  { brand: 'Motorola', model: 'Moto G84', esimSupported: true },
  { brand: 'Motorola', model: 'Moto G75', esimSupported: true },
  { brand: 'Motorola', model: 'Moto G56', esimSupported: true },
  { brand: 'Motorola', model: 'Moto G55', esimSupported: true },
  { brand: 'Motorola', model: 'Moto G54', esimSupported: true },
  { brand: 'Motorola', model: 'Moto G53', esimSupported: true },
  { brand: 'Motorola', model: 'Moto G35', esimSupported: true },
  { brand: 'Motorola', model: 'Moto G34', esimSupported: true },
  { brand: 'Motorola', model: 'Moto G24', esimSupported: false },
  { brand: 'Motorola', model: 'Moto G15', esimSupported: false },
  { brand: 'Motorola', model: 'Moto G14', esimSupported: false },
  { brand: 'Motorola', model: 'Moto G05', esimSupported: false },
  { brand: 'Motorola', model: 'Moto G04', esimSupported: false },
  { brand: 'Motorola', model: 'Moto E14', esimSupported: false },
  { brand: 'Motorola', model: 'Moto E13', esimSupported: false },

  // Xiaomi — série numerada 12T Pro+ suporta eSIM (versão global)
  { brand: 'Xiaomi', model: 'Xiaomi 15 Ultra', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 15 Pro', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 15', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 14T Pro', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 14T', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 14 Ultra', esimSupported: false },
  { brand: 'Xiaomi', model: 'Xiaomi 14 Pro', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 14', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 13T Pro', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 13T', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 13 Pro', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 13', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 13 Lite', esimSupported: true },
  { brand: 'Xiaomi', model: 'Xiaomi 12T Pro', esimSupported: true },

  // Xiaomi Redmi — só Note 13 Pro/Pro+ e Note 14 Pro/Pro+ suportam
  { brand: 'Xiaomi', model: 'Redmi Note 14 Pro+', esimSupported: true },
  { brand: 'Xiaomi', model: 'Redmi Note 14 Pro', esimSupported: true },
  { brand: 'Xiaomi', model: 'Redmi Note 14', esimSupported: false },
  { brand: 'Xiaomi', model: 'Redmi Note 13 Pro+', esimSupported: true },
  { brand: 'Xiaomi', model: 'Redmi Note 13 Pro', esimSupported: true },
  { brand: 'Xiaomi', model: 'Redmi Note 13', esimSupported: false },
  { brand: 'Xiaomi', model: 'Redmi Note 12 Pro', esimSupported: false },
  { brand: 'Xiaomi', model: 'Redmi Note 12', esimSupported: false },
  { brand: 'Xiaomi', model: 'Redmi 13C', esimSupported: false },
  { brand: 'Xiaomi', model: 'Redmi 12', esimSupported: false },
  { brand: 'Xiaomi', model: 'Redmi A3', esimSupported: false },

  // POCO — só F6 e F6 Pro suportam eSIM
  { brand: 'Xiaomi', model: 'POCO F6 Pro', esimSupported: true },
  { brand: 'Xiaomi', model: 'POCO F6', esimSupported: true },
  { brand: 'Xiaomi', model: 'POCO X7 Pro', esimSupported: false },
  { brand: 'Xiaomi', model: 'POCO X6 Pro', esimSupported: false },
  { brand: 'Xiaomi', model: 'POCO X6', esimSupported: false },
  { brand: 'Xiaomi', model: 'POCO M6', esimSupported: false },

  // Google Pixel — Pixel 3+ suporta eSIM
  { brand: 'Google', model: 'Pixel 9 Pro XL', esimSupported: true },
  { brand: 'Google', model: 'Pixel 9 Pro', esimSupported: true },
  { brand: 'Google', model: 'Pixel 9', esimSupported: true },
  { brand: 'Google', model: 'Pixel 8 Pro', esimSupported: true },
  { brand: 'Google', model: 'Pixel 8', esimSupported: true },
  { brand: 'Google', model: 'Pixel 8a', esimSupported: true },
  { brand: 'Google', model: 'Pixel 7 Pro', esimSupported: true },
  { brand: 'Google', model: 'Pixel 7', esimSupported: true },
  { brand: 'Google', model: 'Pixel 7a', esimSupported: true },

  // Realme — entrada, geralmente sem eSIM
  { brand: 'Realme', model: 'Note 50', esimSupported: false },
  { brand: 'Realme', model: 'C67', esimSupported: false },
  { brand: 'Realme', model: 'C55', esimSupported: false },
];
