<!-- 
  [컴포넌트] 투자일지 작성/수정 폼
  - 사용 위치: JournalCreatePage.vue (일지 작성 전용)
  - 주요 기능: 종목 선택, 매매 유형, 작성 내용/이유 입력 폼
-->
<script setup>
import { reactive } from 'vue'

import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTextarea from '@/shared/components/BaseTextarea.vue'
import BaseTextField from '@/shared/components/BaseTextField.vue'

const emit = defineEmits(['submit'])
const form = reactive({ title: '', content: '' })

function handleSubmit() {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="journal-form" @submit.prevent="handleSubmit">
    <BaseTextField v-model="form.title" label="제목" required />
    <BaseTextarea v-model="form.content" label="내용" :rows="8" required />
    <BaseButton type="submit" full-width>저장</BaseButton>
  </form>
</template>

<style scoped>
.journal-form {
  display: grid;
  gap: 16px;
}
</style>
