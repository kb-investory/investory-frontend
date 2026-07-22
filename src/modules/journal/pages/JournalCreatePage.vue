<script setup>
import { useRouter } from 'vue-router'

import { ROUTE_NAMES } from '@/app/router/route-names'
import JournalForm from '@/modules/journal/components/JournalForm.vue'
import { useJournalStore } from '@/modules/journal/stores/journalStore'

const router = useRouter()
const journalStore = useJournalStore()

async function handleSubmit(payload) {
  await journalStore.addJournal(payload)
  await router.push({ name: ROUTE_NAMES.JOURNAL })
}
</script>

<template>
  <section class="page-section">
    <p class="eyebrow">Journal</p>
    <h1>투자일지 작성</h1>
    <JournalForm @submit="handleSubmit" />
  </section>
</template>
