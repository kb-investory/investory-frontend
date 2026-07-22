<script setup>
const model = defineModel({ type: Boolean, default: false })

defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <button
    class="base-toggle"
    :class="{ 'base-toggle--active': model }"
    type="button"
    role="switch"
    :aria-checked="model"
    :aria-label="label"
    @click="model = !model"
  >
    <span class="base-toggle__knob" />
  </button>
</template>

<style scoped>
.base-toggle {
  display: flex;
  width: 42px;
  height: 24px;
  align-items: center;
  padding: 3px;
  border: 0;
  border-radius: 12px;
  background: var(--color-border);
  cursor: pointer;
  transition: background 160ms ease;
}

.base-toggle--active {
  justify-content: flex-end;
  background: var(--color-primary);
}

.base-toggle__knob {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgb(24 24 23 / 10%);
  background: var(--color-surface);
}
</style>
