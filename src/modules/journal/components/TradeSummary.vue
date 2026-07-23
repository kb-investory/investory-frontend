<script setup>
import BaseBadge from '@/shared/components/BaseBadge.vue'

defineProps({
  type: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="trade-summary">
    <BaseBadge :label="type" />
    <span>{{ summary }}</span>
  </div>
</template>

<style scoped>
.trade-summary {
  display: flex;
  width: 100%;
  min-height: 36px;
  align-items: center;
  gap: 7px;
  padding: 0 11px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 10.5px;
  font-weight: 600;
}
</style>
