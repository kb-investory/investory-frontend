import { journalMock } from '@/modules/journal/mocks/journalMock'

let journals = structuredClone(journalMock)

export async function getJournals({ stockId, period } = {}) {
  const filteredJournals = journals.filter((journal) => {
    if (stockId && journal.stockId !== Number(stockId)) return false
    if (period && !journal.tradeDate.startsWith(period)) return false
    return true
  })

  return structuredClone(filteredJournals)
}

export async function getJournal(journalId) {
  return structuredClone(
    journals.find((journal) => journal.journalId === Number(journalId)) ?? null,
  )
}

export async function getJournalVersion(journalId, journalVersionId) {
  const journal = journals.find((item) => item.journalId === Number(journalId))
  return structuredClone(
    journal?.versionDetails.find(
      (version) => version.journalVersionId === Number(journalVersionId),
    ) ?? null,
  )
}

export async function createJournal(payload) {
  const journalId = Math.max(...journals.map((journal) => journal.journalId), 0) + 1
  const journalVersionId =
    Math.max(
      ...journals.flatMap((journal) => journal.versions.map((version) => version.journalVersionId)),
      0,
    ) + 1
  const createdAt = new Date().toISOString()
  const initialVersion = payload.initialVersion ?? {}
  const journal = {
    ...payload,
    journalId,
    id: journalId,
    stock: payload.stock ?? '미지정 종목',
    investmentAction: payload.investmentAction ?? 'BUY',
    type: payload.type ?? '매수',
    tradeDate: payload.tradeDate ?? createdAt.slice(0, 10),
    journalStatus: payload.journalStatus ?? 'DRAFT',
    latestVersion: 1,
    title: initialVersion.title ?? payload.title,
    content: initialVersion.reasonText ?? payload.content,
    judgment: initialVersion.reasonText ?? payload.content,
    reasons: initialVersion.reasons ?? [],
    createdAt,
    versions: [
      {
        journalVersionId,
        title: initialVersion.title ?? payload.title,
        versionNo: 1,
        versionDate: createdAt.slice(0, 10),
        summary: initialVersion.summary ?? payload.content,
      },
    ],
    versionDetails: [],
  }

  journals.unshift(journal)
  return structuredClone(journal)
}

export async function updateJournal(journalId, payload) {
  const targetIndex = journals.findIndex((journal) => journal.journalId === Number(journalId))

  if (targetIndex < 0) return null

  const currentJournal = journals[targetIndex]
  const versionNo = currentJournal.latestVersion + 1
  const journalVersionId =
    Math.max(
      ...journals.flatMap((journal) => journal.versions.map((version) => version.journalVersionId)),
      0,
    ) + 1
  const versionDate = new Date().toISOString().slice(0, 10)

  journals[targetIndex] = {
    ...currentJournal,
    ...payload,
    latestVersion: versionNo,
    versions: [
      ...currentJournal.versions,
      {
        journalVersionId,
        title: payload.title ?? currentJournal.title,
        versionNo,
        versionDate,
        summary: payload.summary ?? payload.content ?? currentJournal.content,
      },
    ],
  }

  return {
    journalId: Number(journalId),
    journalVersionId,
    versionNo,
    versionDate,
    versionAction: 'CREATED',
  }
}
