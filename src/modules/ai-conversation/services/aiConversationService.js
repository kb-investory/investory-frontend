import { aiConversationMock } from '@/modules/ai-conversation/mocks/aiConversationMock'

export async function getMessages() {
  return structuredClone(aiConversationMock)
}

export async function sendMessage(content) {
  return { id: Date.now(), role: 'user', content }
}
