export const portfolioMock = {
  amounts: 40820000,
  holdings: [
    {
      id: 1,
      stockId: 1,
      stockCode: '005930',
      name: '삼성전자',
      sector: '전기전자',
      holding: 120,
      amount: 10320000,
      weight: 25.28,
      returnRate: 8.4,
    },
    {
      id: 2,
      stockId: 2,
      stockCode: '035420',
      name: 'NAVER',
      sector: '서비스업',
      holding: 45,
      amount: 9720000,
      weight: 23.81,
      returnRate: 4.1,
    },
    {
      id: 3,
      stockId: 3,
      stockCode: '000660',
      name: 'SK하이닉스',
      sector: '전기전자',
      holding: 60,
      amount: 20780000,
      weight: 50.91,
      returnRate: 12.7,
    },
  ],
}

export const portfolioAnalysisMock = {
  analysis: {
    return: 8.92,
    dailyReturn: 0.34,
    halfYearReturn: 9.8,
    yearReturn: 17.6,
    dailyRisk: 1.18,
    halfYearRisk: 12.4,
    yearRisk: 18.9,
  },
}

export const stockAnalysisMocks = [
  {
    stockId: 1,
    name: '삼성전자',
    analysis: {
      return: 8.4,
      amount: 10320000,
      dailyReturn: 0.21,
      halfYearReturn: 8.9,
      yearReturn: 15.2,
      dailyRisk: 1.05,
      halfYearRisk: 10.8,
      yearRisk: 16.4,
    },
  },
  {
    stockId: 2,
    name: 'NAVER',
    analysis: {
      return: 4.1,
      amount: 9720000,
      dailyReturn: -0.12,
      halfYearReturn: 5.6,
      yearReturn: 11.3,
      dailyRisk: 1.42,
      halfYearRisk: 14.6,
      yearRisk: 21.8,
    },
  },
]
