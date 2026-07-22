import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  getMessages,
  sendMessage as sendMessageRequest,
} from '@/modules/ai-conversation/services/aiConversationService'

export const useAiConversationStore = defineStore('ai-conversation', () => {
  const messages = ref([])

  async function fetchMessages() {
    messages.value = await getMessages()
  }

  async function sendMessage(content) {
    const message = await sendMessageRequest(content)
    messages.value.push(message)
  }

  return { messages, fetchMessages, sendMessage }
})
