<script setup>
import { onMounted, ref } from 'vue'

import ChatMessage from '@/modules/ai-conversation/components/ChatMessage.vue'
import { useAiConversationStore } from '@/modules/ai-conversation/stores/aiConversationStore'
import BaseButton from '@/shared/components/BaseButton.vue'

const conversationStore = useAiConversationStore()
const message = ref('')

onMounted(() => conversationStore.fetchMessages())

async function handleSubmit() {
  if (!message.value.trim()) return

  await conversationStore.sendMessage(message.value)
  message.value = ''
}
</script>

<template>
  <section class="page-section">
    <p class="eyebrow">AI Conversation</p>
    <h1>AI 투자 대화</h1>
    <div>
      <ChatMessage
        v-for="chatMessage in conversationStore.messages"
        :key="chatMessage.id"
        :message="chatMessage"
      />
    </div>
    <form class="chat-form" @submit.prevent="handleSubmit">
      <input v-model="message" aria-label="메시지" placeholder="메시지를 입력하세요" />
      <BaseButton type="submit">전송</BaseButton>
    </form>
  </section>
</template>

<style scoped>
.chat-form {
  display: flex;
  gap: 8px;
}

.chat-form input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}
</style>
