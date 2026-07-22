import { journalMock } from '@/modules/journal/mocks/journalMock'

export async function getJournals() {
  return structuredClone(journalMock)
}

export async function createJournal(payload) {
  return {
    id: Date.now(),
    ...payload,
    createdAt: new Date().toISOString().slice(0, 10),
  }
}
