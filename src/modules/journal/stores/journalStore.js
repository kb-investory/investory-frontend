import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  createJournal,
  getJournal,
  getJournals,
  getJournalVersion,
  updateJournal,
} from '@/modules/journal/services/journalService'

export const useJournalStore = defineStore('journal', () => {
  const journals = ref([])
  const selectedJournal = ref(null)
  const selectedVersion = ref(null)

  async function fetchJournals() {
    if (journals.value.length > 0) return

    journals.value = await getJournals()
  }

  async function fetchJournal(journalId) {
    selectedJournal.value = await getJournal(journalId)
  }

  async function fetchJournalVersion(journalId, journalVersionId) {
    selectedVersion.value = await getJournalVersion(journalId, journalVersionId)
  }

  async function addJournal(payload) {
    await fetchJournals()

    const journal = await createJournal(payload)
    journals.value.unshift(journal)
    return journal
  }

  async function editJournal(journalId, payload) {
    const response = await updateJournal(journalId, payload)
    journals.value = await getJournals()
    return response
  }

  return {
    journals,
    selectedJournal,
    selectedVersion,
    fetchJournals,
    fetchJournal,
    fetchJournalVersion,
    addJournal,
    editJournal,
  }
})
