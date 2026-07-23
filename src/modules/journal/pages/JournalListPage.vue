<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { ROUTE_NAMES } from '@/app/router/route-names'
import JournalCard from '@/modules/journal/components/JournalCard.vue'
import { useJournalStore } from '@/modules/journal/stores/journalStore'

const journalStore = useJournalStore()
onMounted(() => journalStore.fetchJournals())
</script>

<template>
  <section class="page-section">
    <p class="eyebrow">Journal</p>
    <h1>투자일지</h1>
    <RouterLink :to="{ name: ROUTE_NAMES.JOURNAL_CREATE }">새 투자일지 작성</RouterLink>
    <div class="card-grid">
      <JournalCard v-for="journal in journalStore.journals" :key="journal.id" :journal="journal" />
    </div>
  </section>
</template>
