<script setup>
import AppIcon from '@/shared/components/AppIcon.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'notebook',
  },
})
</script>

<template>
  <button class="navigation-row" type="button">
    <span class="navigation-row__icon"><AppIcon :name="icon" :size="17" /></span>
    <span class="navigation-row__content">
      <strong>{{ title }}</strong>
      <small v-if="description">{{ description }}</small>
    </span>
    <AppIcon name="chevron-right" :size="16" />
  </button>
</template>

<style scoped>
.navigation-row {
  display: flex;
  width: 100%;
  min-height: 56px;
  align-items: center;
  gap: 10px;
  padding: 0;
  border: 0;
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-surface);
  cursor: pointer;
  text-align: left;
}

.navigation-row__icon {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--color-primary-subtle);
  color: var(--color-primary-strong);
}

.navigation-row__content {
  display: grid;
  flex: 1;
  gap: 2px;
}

strong {
  font-size: 12px;
}

small {
  color: var(--color-text-subtle);
  font-size: 9px;
}
</style>
