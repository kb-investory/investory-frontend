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
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    class="base-button"
    :class="[`base-button--${variant}`, { 'base-button--full': fullWidth }]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
    <slot name="icon" />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 14px;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
}

.base-button--primary {
  background: var(--color-primary);
  color: var(--color-heading);
}

.base-button--secondary {
  border-color: var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-muted);
}

.base-button--full {
  width: 100%;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
