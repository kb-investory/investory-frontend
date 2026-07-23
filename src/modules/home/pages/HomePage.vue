<script setup>
import { onMounted } from 'vue'

import HomeSummary from '@/modules/home/components/HomeSummary.vue'
import { useHomeStore } from '@/modules/home/stores/homeStore'
import BaseLoading from '@/shared/components/BaseLoading.vue'

const homeStore = useHomeStore()
onMounted(() => homeStore.fetchSummary())
</script>

<template>
  <section class="page-section">
    <p class="eyebrow">Home</p>
    <HomeSummary
      v-if="homeStore.summary"
      :title="homeStore.summary.title"
      :description="homeStore.summary.description"
    />
    <BaseLoading v-else />
  </section>
</template>
