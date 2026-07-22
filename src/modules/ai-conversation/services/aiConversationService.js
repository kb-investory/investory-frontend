import {
  aiConversationMocks,
  aiMessageMocks,
} from '@/modules/ai-conversation/mocks/aiConversationMock'

let conversations = structuredClone(aiConversationMocks)
const messagesByConversation = structuredClone(aiMessageMocks)

export async function getConversations({ stockId, status, cursor } = {}) {
  const filteredConversations = conversations.filter((conversation) => {
    if (stockId && conversation.stockId !== Number(stockId)) return false
    if (status && conversation.status !== status) return false
    if (cursor && conversation.conversationId >= cursor) return false
    return true
  })

  return {
    conversations: structuredClone(filteredConversations),
    nextCursor: filteredConversations.at(-1)?.conversationId ?? null,
  }
}

export async function createConversation(payload) {
  const conversationId = `conv-${Date.now()}`
  const createdAt = new Date().toISOString()
  const conversation = {
    conversationId,
    stockId: payload.stockId,
    stockName: payload.stockName ?? '미지정 종목',
    title: payload.title ?? '새 투자 대화',
    entryPoint: payload.entryPoint,
    status: 'ACTIVE',
    linkedJournalId: null,
    createdAt,
    updatedAt: createdAt,
  }

  conversations.unshift(conversation)
  messagesByConversation[conversationId] = []

  if (payload.initialMessage) {
    await sendMessage(conversationId, {
      content: payload.initialMessage,
      clientMessageId: `initial-${Date.now()}`,
    })
  }

  return structuredClone(conversation)
}

export async function getConversation(conversationId) {
  return structuredClone(
    conversations.find((conversation) => conversation.conversationId === conversationId) ?? null,
  )
}

export async function getMessages(conversationId = 'conv-101', { cursor, limit = 20 } = {}) {
  const messages = messagesByConversation[conversationId] ?? []
  const startIndex = cursor
    ? Math.max(messages.findIndex((message) => message.messageId === cursor) + 1, 0)
    : 0
  const page = messages.slice(startIndex, startIndex + limit)

  return {
    messages: structuredClone(page),
    nextCursor: page.length === limit ? page.at(-1)?.messageId : null,
  }
}

export async function sendMessage(
  conversationId = 'conv-101',
  { content, clientMessageId, context } = {},
) {
  const messageId = `msg-${Date.now()}`
  const userMessage = {
    id: messageId,
    messageId,
    clientMessageId,
    role: 'user',
    content,
    context: context ?? null,
    createdAt: new Date().toISOString(),
  }
  const assistantMessageId = `assistant-${Date.now()}`

  messagesByConversation[conversationId] ??= []
  messagesByConversation[conversationId].push(userMessage)

  return { userMessage: structuredClone(userMessage), assistantMessageId }
}

export async function updateConversationStatus(conversationId, status) {
  const targetIndex = conversations.findIndex(
    (conversation) => conversation.conversationId === conversationId,
  )

  if (targetIndex < 0) return null

  conversations[targetIndex] = {
    ...conversations[targetIndex],
    status,
    updatedAt: new Date().toISOString(),
  }
  return structuredClone(conversations[targetIndex])
}

export async function deleteConversation(conversationId) {
  const previousLength = conversations.length
  conversations = conversations.filter(
    (conversation) => conversation.conversationId !== conversationId,
  )
  delete messagesByConversation[conversationId]
  return { success: conversations.length < previousLength, conversationId }
}

export async function getMessageStream(assistantMessageId) {
  return structuredClone([
    { event: 'delta', assistantMessageId, delta: '투자 판단을 ' },
    { event: 'delta', assistantMessageId, delta: '일지 형태로 정리했습니다.' },
    { event: 'action', assistantMessageId, action: 'CREATE_JOURNAL_DRAFT' },
    { event: 'done', assistantMessageId, done: true },
  ])
}
