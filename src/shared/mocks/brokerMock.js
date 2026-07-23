export const brokerMocks = [
  {
    providerId: 1,
    providerCode: 'KB_SEC',
    providerName: 'KB증권',
    active: true,
  },
  {
    providerId: 2,
    providerCode: 'KIS',
    providerName: '한국투자증권',
    active: true,
  },
  {
    providerId: 3,
    providerCode: 'NH_SEC',
    providerName: 'NH투자증권',
    active: true,
  },
  {
    providerId: 4,
    providerCode: 'MIRAE_ASSET',
    providerName: '미래에셋증권',
    active: false,
  },
]

export const brokerConnectionMocks = [
  {
    connectionId: 12,
    providerId: 1,
    providerCode: 'KB_SEC',
    providerName: 'KB증권',
    loginId: 'investory-user',
    status: 'CONNECTED',
    connectedAt: '2026-07-21T12:40:00+09:00',
  },
]
