<script setup>
import AppIcon from '@/shared/components/AppIcon.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  showBack: {
    type: Boolean,
    default: true,
  },
  showAction: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['back', 'action'])
</script>

<template>
  <header class="app-bar">
    <button
      class="app-bar__action"
      :class="{ 'app-bar__action--hidden': !showBack }"
      type="button"
      aria-label="뒤로 가기"
      @click="$emit('back')"
    >
      <AppIcon name="chevron-left" :size="22" />
    </button>
    <h1>{{ title }}</h1>
    <button
      class="app-bar__action"
      :class="{ 'app-bar__action--hidden': !showAction }"
      type="button"
      aria-label="더보기"
      @click="$emit('action')"
    >
      <AppIcon name="ellipsis" :size="20" />
    </button>
  </header>
</template>

<style scoped>
.app-bar {
  display: grid;
  width: 100%;
  height: 52px;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-surface);
}

h1 {
  margin: 0;
  color: var(--color-heading);
  font-size: 18px;
  text-align: center;
}

.app-bar__action {
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.app-bar__action--hidden {
  visibility: hidden;
  pointer-events: none;
}
</style>
