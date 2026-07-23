<script setup>
import AppIcon from '@/shared/components/AppIcon.vue'

const model = defineModel({ type: String, default: '' })

defineProps({
  placeholder: {
    type: String,
    default: '검색어를 입력하세요',
  },
})
</script>

<template>
  <label class="search-input">
    <AppIcon name="search" :size="18" />
    <span class="sr-only">검색</span>
    <input v-model="model" type="search" :placeholder="placeholder" />
  </label>
</template>

<style scoped>
.search-input {
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border-radius: 12px;
  background: var(--color-surface-subtle);
  color: var(--color-text-subtle);
}

.search-input input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--color-text);
  font-size: 14px;
}

.search-input input::placeholder {
  color: var(--color-text-subtle);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
</style>
