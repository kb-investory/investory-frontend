import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  createConversation,
  deleteConversation,
  getConversations,
  getMessages,
  sendMessage as sendMessageRequest,
  updateConversationStatus,
} from '@/modules/ai-conversation/services/aiConversationService'

export const useAiConversationStore = defineStore('ai-conversation', () => {
  const conversations = ref([])
  const activeConversationId = ref('conv-101')
  const messages = ref([])

  async function fetchConversations(filters) {
    const response = await getConversations(filters)
    conversations.value = response.conversations
    return response
  }

  async function startConversation(payload) {
    const conversation = await createConversation(payload)
    conversations.value.unshift(conversation)
    activeConversationId.value = conversation.conversationId
    messages.value = []
    return conversation
  }

  async function fetchMessages(conversationId = activeConversationId.value) {
    activeConversationId.value = conversationId
    const response = await getMessages(conversationId)
    messages.value = response.messages
    return response
  }

  async function sendMessage(content) {
    const response = await sendMessageRequest(activeConversationId.value, {
      content,
      clientMessageId: `client-${Date.now()}`,
    })
    messages.value.push(response.userMessage)
    return response
  }

  async function changeStatus(status) {
    const conversation = await updateConversationStatus(activeConversationId.value, status)
    const targetIndex = conversations.value.findIndex(
      (item) => item.conversationId === activeConversationId.value,
    )
    if (conversation && targetIndex >= 0) conversations.value[targetIndex] = conversation
    return conversation
  }

  async function removeConversation(conversationId) {
    const response = await deleteConversation(conversationId)
    if (response.success) {
      conversations.value = conversations.value.filter(
        (conversation) => conversation.conversationId !== conversationId,
      )
    }
    return response
  }

  return {
    conversations,
    activeConversationId,
    messages,
    fetchConversations,
    startConversation,
    fetchMessages,
    sendMessage,
    changeStatus,
    removeConversation,
  }
})
