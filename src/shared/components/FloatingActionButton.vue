<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <button class="floating-action-button" type="button" :aria-label="label" :title="label">
    <slot />
  </button>
</template>

<style scoped>
.floating-action-button {
  display: inline-flex;
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  box-shadow: 0 6px 16px rgb(24 24 23 / 18%);
  background: var(--color-primary);
  cursor: pointer;
}
</style>
