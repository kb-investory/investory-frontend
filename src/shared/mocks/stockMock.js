export const stockMocks = [
  {
    stockId: 1,
    stockCode: '005930',
    stockName: '삼성전자',
    market: 'KOSPI',
    sector: '전기전자',
  },
  {
    stockId: 2,
    stockCode: '035420',
    stockName: 'NAVER',
    market: 'KOSPI',
    sector: '서비스업',
  },
  {
    stockId: 3,
    stockCode: '000660',
    stockName: 'SK하이닉스',
    market: 'KOSPI',
    sector: '전기전자',
  },
  {
    stockId: 4,
    stockCode: '247540',
    stockName: '에코프로비엠',
    market: 'KOSDAQ',
    sector: '일반전기전자',
  },
]

export const stockDetailMocks = [
  {
    ...stockMocks[0],
    price: {
      date: '2026-07-22',
      open: 85400,
      close: 86000,
      low: 84800,
      high: 86700,
      trade: 18230450,
    },
    holding: {
      quantity: 120,
      averagePrice: 79300,
      valuationAmount: 10320000,
      returnRate: 8.45,
      weight: 25.28,
    },
    journalSummary: {
      count: 3,
      latestJournalId: 12,
      latestTitle: '조정 구간에서 1차 분할 매수',
    },
    latestDecision: {
      action: 'BUY',
      reason: '실적 개선 기대와 가격 조정을 근거로 분할 매수',
      decidedAt: '2026-07-18T14:32:00+09:00',
    },
  },
  {
    ...stockMocks[1],
    price: {
      date: '2026-07-22',
      open: 214000,
      close: 216000,
      low: 211500,
      high: 217500,
      trade: 784230,
    },
    holding: {
      quantity: 45,
      averagePrice: 207500,
      valuationAmount: 9720000,
      returnRate: 4.1,
      weight: 23.81,
    },
    journalSummary: { count: 1, latestJournalId: 14, latestTitle: '플랫폼 성장성 재점검' },
    latestDecision: {
      action: 'HOLD',
      reason: '광고 매출 회복을 확인하며 기존 비중 유지',
      decidedAt: '2026-07-15T09:10:00+09:00',
    },
  },
  {
    ...stockMocks[2],
    price: {
      date: '2026-07-22',
      open: 342000,
      close: 346500,
      low: 338500,
      high: 349000,
      trade: 3950280,
    },
    holding: {
      quantity: 60,
      averagePrice: 307800,
      valuationAmount: 20790000,
      returnRate: 12.57,
      weight: 50.91,
    },
    journalSummary: { count: 2, latestJournalId: 13, latestTitle: '실적 발표 전 보유 판단' },
    latestDecision: {
      action: 'HOLD',
      reason: '실적 발표 전까지 현재 비중 유지',
      decidedAt: '2026-07-20T10:15:00+09:00',
    },
  },
  {
    ...stockMocks[3],
    price: {
      date: '2026-07-22',
      open: 108500,
      close: 106800,
      low: 105200,
      high: 109300,
      trade: 1180420,
    },
    holding: null,
    journalSummary: { count: 0, latestJournalId: null, latestTitle: null },
    latestDecision: null,
  },
]

export const stockPriceMocks = {
  1: [
    { date: '2026-07-18', open: 84200, close: 84900, low: 83800, high: 85200, trade: 15320840 },
    { date: '2026-07-19', open: 85000, close: 84600, low: 84100, high: 85500, trade: 12840730 },
    { date: '2026-07-20', open: 84800, close: 85500, low: 84500, high: 85800, trade: 14630550 },
    { date: '2026-07-21', open: 85700, close: 85200, low: 84900, high: 86100, trade: 13950820 },
    { date: '2026-07-22', open: 85400, close: 86000, low: 84800, high: 86700, trade: 18230450 },
  ],
  2: [
    { date: '2026-07-18', open: 209500, close: 211000, low: 208000, high: 212500, trade: 645200 },
    { date: '2026-07-21', open: 212000, close: 213500, low: 210500, high: 215000, trade: 702100 },
    { date: '2026-07-22', open: 214000, close: 216000, low: 211500, high: 217500, trade: 784230 },
  ],
  3: [
    { date: '2026-07-18', open: 329000, close: 334500, low: 327000, high: 337000, trade: 3180420 },
    { date: '2026-07-21', open: 336000, close: 340500, low: 333500, high: 343000, trade: 3520910 },
    { date: '2026-07-22', open: 342000, close: 346500, low: 338500, high: 349000, trade: 3950280 },
  ],
  4: [
    { date: '2026-07-18', open: 112000, close: 110500, low: 109000, high: 113500, trade: 1050410 },
    { date: '2026-07-21', open: 110000, close: 108800, low: 107500, high: 111000, trade: 1105200 },
    { date: '2026-07-22', open: 108500, close: 106800, low: 105200, high: 109300, trade: 1180420 },
  ],
}
