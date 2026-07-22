export const aiConversationMocks = [
  {
    conversationId: 'conv-101',
    stockId: 1,
    stockName: '삼성전자',
    title: '삼성전자 분할 매수 판단',
    entryPoint: 'STOCK_DETAIL',
    status: 'ACTIVE',
    linkedJournalId: 12,
    createdAt: '2026-07-18T14:20:00+09:00',
    updatedAt: '2026-07-18T14:32:00+09:00',
  },
  {
    conversationId: 'conv-102',
    stockId: 3,
    stockName: 'SK하이닉스',
    title: '실적 발표 전 보유 전략',
    entryPoint: 'PORTFOLIO',
    status: 'COMPLETED',
    linkedJournalId: 13,
    createdAt: '2026-07-20T09:50:00+09:00',
    updatedAt: '2026-07-20T10:15:00+09:00',
  },
]

export const aiMessageMocks = {
  'conv-101': [
    {
      id: 'msg-101',
      messageId: 'msg-101',
      role: 'assistant',
      content: '삼성전자 매수를 고민한 핵심 근거부터 정리해볼까요?',
      createdAt: '2026-07-18T14:20:00+09:00',
    },
    {
      id: 'msg-102',
      messageId: 'msg-102',
      role: 'user',
      content: '실적 개선 기대와 최근 가격 조정을 보고 1차 매수했어요.',
      createdAt: '2026-07-18T14:21:00+09:00',
    },
    {
      id: 'msg-103',
      messageId: 'msg-103',
      role: 'assistant',
      content: '단기 변동성을 고려하면 목표 비중의 절반만 먼저 진입한 판단이 핵심이네요.',
      createdAt: '2026-07-18T14:21:05+09:00',
      citations: [{ type: 'PORTFOLIO', referenceId: 'holding-1' }],
    },
  ],
  'conv-102': [
    {
      id: 'msg-201',
      messageId: 'msg-201',
      role: 'assistant',
      content: '실적 발표 전 보유 전략을 점검해보겠습니다.',
      createdAt: '2026-07-20T09:50:00+09:00',
    },
  ],
}

export const aiConversationMock = aiMessageMocks['conv-101']
