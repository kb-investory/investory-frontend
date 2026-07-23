<script setup>
import { computed } from 'vue'

import AppIcon from '@/shared/components/AppIcon.vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  selectedPeriod: {
    type: String,
    default: '2026-07',
  },
})

const emit = defineEmits(['close', 'select'])

const months = computed(() => {
  return [
    { label: '2026. 07', value: '2026-07' },
    { label: '2026. 06', value: '2026-06' },
    { label: '2026. 05', value: '2026-05' },
    { label: '2026. 04', value: '2026-04' },
    { label: '2026. 03', value: '2026-03' },
    { label: '2026. 02', value: '2026-02' },
    { label: '2026. 01', value: '2026-01' },
    { label: '2025. 12', value: '2025-12' },
    { label: '2025. 11', value: '2025-11' },
    { label: '2025. 10', value: '2025-10' },
  ]
})

function handleSelect(period) {
  emit('select', period)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="month-picker-overlay" @click.self="emit('close')">
      <div class="month-picker-modal" role="dialog" aria-modal="true" aria-label="월 선택 모달">
        <header class="month-picker-modal__header">
          <span class="month-picker-modal__title">조회 월 선택</span>
          <button class="month-picker-modal__close" type="button" aria-label="닫기" @click="emit('close')">
            <AppIcon name="check" :size="16" />
          </button>
        </header>

        <div class="month-picker-modal__grid">
          <button
            v-for="item in months"
            :key="item.value"
            type="button"
            class="month-picker-modal__item"
            :class="{ 'month-picker-modal__item--active': item.value === selectedPeriod }"
            @click="handleSelect(item.value)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.month-picker-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgb(0 0 0 / 40%);
  backdrop-filter: blur(2px);
}

.month-picker-modal {
  display: flex;
  width: min(340px, 100%);
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgb(0 0 0 / 15%);
  background: var(--color-surface);
}

.month-picker-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.month-picker-modal__title {
  color: var(--color-heading);
  font-size: 16px;
  font-weight: 700;
}

.month-picker-modal__close {
  display: flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  background: var(--color-surface-subtle);
  color: var(--color-text-muted);
  cursor: pointer;
}

.month-picker-modal__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-height: 280px;
  overflow-y: auto;
}

.month-picker-modal__item {
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.month-picker-modal__item:hover {
  border-color: var(--color-primary-strong);
  background: var(--color-primary-subtle);
}

.month-picker-modal__item--active {
  border-color: var(--color-primary-strong);
  background: var(--color-primary-subtle);
  color: var(--color-primary-strong);
  font-weight: 700;
}
</style>
