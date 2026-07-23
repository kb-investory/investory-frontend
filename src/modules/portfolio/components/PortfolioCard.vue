<script setup>
defineProps({
  portfolio: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="portfolio-card">
    <h2>{{ portfolio.name }}</h2>
    <p>수익률 {{ portfolio.returnRate }}%</p>
  </article>
</template>

<style scoped>
.portfolio-card {
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
}

h2,
p {
  margin: 0;
}

p {
  margin-top: 8px;
  color: var(--color-primary);
}
</style>
