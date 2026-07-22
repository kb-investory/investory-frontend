<script setup>
import { reactive } from 'vue'

import BaseButton from '@/shared/components/BaseButton.vue'

const emit = defineEmits(['submit'])
const form = reactive({ title: '', content: '' })

function handleSubmit() {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="journal-form" @submit.prevent="handleSubmit">
    <label>
      제목
      <input v-model="form.title" required />
    </label>
    <label>
      내용
      <textarea v-model="form.content" rows="8" required />
    </label>
    <BaseButton type="submit">저장</BaseButton>
  </form>
</template>

<style scoped>
.journal-form,
.journal-form label {
  display: grid;
  gap: 8px;
}

.journal-form {
  gap: 16px;
}

input,
textarea {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}
</style>
