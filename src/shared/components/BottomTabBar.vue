<script setup>
import { RouterLink } from 'vue-router'

import AppIcon from '@/shared/components/AppIcon.vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <nav class="bottom-tab-bar" aria-label="하단 메뉴">
    <RouterLink v-for="item in items" :key="item.label" class="bottom-tab-bar__item" :to="item.to">
      <AppIcon :name="item.icon" :size="18" />
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.bottom-tab-bar {
  display: flex;
  width: 100%;
  min-height: 56px;
  align-items: center;
  gap: 2px;
  padding: 6px;
  border: 1px solid var(--color-border-subtle);
  border-radius: 28px;
  box-shadow: 0 4px 18px rgb(24 24 23 / 8%);
  background: rgb(255 255 255 / 91%);
}

.bottom-tab-bar__item {
  display: flex;
  min-width: 0;
  height: 44px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 22px;
  color: var(--color-text-subtle);
  font-size: 8.5px;
  font-weight: 500;
}

.bottom-tab-bar__item.router-link-active {
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
  font-weight: 700;
}
</style>
