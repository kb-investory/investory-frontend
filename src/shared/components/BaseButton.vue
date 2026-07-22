<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button class="base-button" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: 10px 16px;
  border: 0;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
