<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="home-summary">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>
.home-summary {
  display: grid;
  gap: 16px;
  padding: 40px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface);
}

h1,
p {
  margin: 0;
}
</style>
