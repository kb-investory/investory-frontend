<script setup>
import { reactive } from 'vue'

import BaseButton from '@/shared/components/BaseButton.vue'

const emit = defineEmits(['submit'])
const form = reactive({ email: '', password: '' })

function handleSubmit() {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <label>
      이메일
      <input v-model="form.email" type="email" required />
    </label>
    <label>
      비밀번호
      <input v-model="form.password" type="password" required />
    </label>
    <BaseButton type="submit">로그인</BaseButton>
  </form>
</template>

<style scoped>
.login-form,
.login-form label {
  display: grid;
  gap: 8px;
}

.login-form {
  width: min(100%, 420px);
  gap: 16px;
}

input {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}
</style>
