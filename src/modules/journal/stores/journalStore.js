import { defineStore } from 'pinia'
import { ref } from 'vue'

import { createJournal, getJournals } from '@/modules/journal/services/journalService'

export const useJournalStore = defineStore('journal', () => {
  const journals = ref([])

  async function fetchJournals() {
    if (journals.value.length > 0) return

    journals.value = await getJournals()
  }

  async function addJournal(payload) {
    await fetchJournals()

    const journal = await createJournal(payload)
    journals.value.unshift(journal)
    return journal
  }

  return { journals, fetchJournals, addJournal }
})
