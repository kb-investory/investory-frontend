<script setup>
defineProps({
  journal: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="journal-card">
    <time :datetime="journal.createdAt">{{ journal.createdAt }}</time>
    <h2>{{ journal.title }}</h2>
    <p>{{ journal.content }}</p>
  </article>
</template>

<style scoped>
.journal-card {
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
}

time {
  color: var(--color-text-muted);
  font-size: 14px;
}
</style>
