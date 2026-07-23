<script setup>
import AppIcon from '@/shared/components/AppIcon.vue'

defineProps({
  number: {
    type: [Number, String],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'locked',
    validator: (value) => ['locked', 'completed'].includes(value),
  },
  result: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <button class="step-row" :class="`step-row--${status}`" type="button">
    <span class="step-row__content">
      <span class="step-row__number">
        <AppIcon v-if="status === 'completed'" name="check" :size="13" />
        <span v-else>{{ String(number).padStart(2, '0') }}</span>
      </span>
      <span>{{ label }}</span>
    </span>
    <span class="step-row__state">
      <span>{{ status === 'locked' ? '이전 단계 완료 후' : result || '작성 완료' }}</span>
      <AppIcon :name="status === 'locked' ? 'lock' : 'chevron-down'" :size="16" />
    </span>
  </button>
</template>

<style scoped>
.step-row {
  display: flex;
  width: 100%;
  min-height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
  cursor: pointer;
}

.step-row--locked {
  border-color: var(--color-border-subtle);
  background: var(--color-surface-subtle);
  color: var(--color-text-muted);
}

.step-row__content,
.step-row__state {
  display: flex;
  align-items: center;
}

.step-row__content {
  gap: 9px;
  font-size: 11px;
  font-weight: 700;
}

.step-row__number {
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 8px;
  font-weight: 700;
}

.step-row--locked .step-row__number {
  background: var(--color-border);
  color: var(--color-text-subtle);
}

.step-row__state {
  gap: 6px;
  color: var(--color-text-subtle);
  font-size: 8px;
}

.step-row--completed .step-row__state {
  color: var(--color-text-muted);
  font-size: 9px;
  font-weight: 600;
}
</style>
