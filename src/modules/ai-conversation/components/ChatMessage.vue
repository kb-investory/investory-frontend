<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <p class="chat-message" :class="`chat-message--${message.role}`">
    {{ message.content }}
  </p>
</template>

<style scoped>
.chat-message {
  width: fit-content;
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--color-surface);
}

.chat-message--user {
  margin-left: auto;
  background: var(--color-primary);
  color: #fff;
}
</style>
