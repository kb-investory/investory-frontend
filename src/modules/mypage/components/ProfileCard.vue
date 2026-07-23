<script setup>
defineProps({
  profile: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="profile-card">
    <h2>{{ profile.name }}</h2>
    <p>{{ profile.email }}</p>
    <p>{{ profile.investmentStyle }}</p>
  </article>
</template>

<style scoped>
.profile-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
}
</style>
