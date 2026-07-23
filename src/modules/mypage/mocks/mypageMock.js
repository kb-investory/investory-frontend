export const mypageMock = {
  userId: 1,
  name: '김인베스트',
  email: 'investor@investory.test',
  profileImageUrl: 'https://placehold.co/160x160?text=INV',
  oauthProvider: 'KAKAO',
  investmentStyle: '장기 투자형',
}

export const accountMocks = [
  {
    accountId: 3,
    providerId: 1,
    providerName: 'KB증권',
    accountNumberMasked: '1234-****-5678',
    displayName: '주식 장기투자 계좌',
    valuationAmount: 28450000,
    syncStatus: 'SYNCED',
    lastSyncedAt: '2026-07-21T13:20:00+09:00',
  },
  {
    accountId: 7,
    providerId: 2,
    providerName: '한국투자증권',
    accountNumberMasked: '9876-****-4321',
    displayName: '배당 투자 계좌',
    valuationAmount: 12370000,
    syncStatus: 'SYNCED',
    lastSyncedAt: '2026-07-21T12:50:00+09:00',
  },
]
