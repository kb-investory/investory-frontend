/**
 * [Pinia Store] 투자일지 전역 상태 관리 스토어
 * - 사용 위치: JournalTimelineListPage, JournalStockListPage 등 모듈 전반
 * - 주요 기능: 타임라인 목록, 종목 요약 데이터, 검색어 디바운싱, 날짜별 그룹화, 월간 요약 집계
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import {
  createJournal,
  getJournal,
  getJournals,
  getJournalVersion,
  getStockSummaries,
  getUnheldStocks,
  updateJournal,
} from '@/modules/journal/services/journalService'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export const useJournalStore = defineStore('journal', () => {
  const journals = ref([])
  const allMonthlyJournals = ref([])
  const selectedJournal = ref(null)
  const selectedVersion = ref(null)

  const stockSummaries = ref([])
  const unheldStocks = ref([])
  const selectedGroup = ref('전체')

  const selectedPeriod = ref('2026-07')
  const searchQuery = ref('')
  const debouncedQuery = ref('')

  const cursor = ref(null)
  const hasMore = ref(false)
  const totalCount = ref(0)
  const isLoading = ref(false)
  const isLoadingMore = ref(false)

  let debounceTimer = null

  function setSearchQuery(query) {
    searchQuery.value = query
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      debouncedQuery.value = query
      resetAndFetch()
    }, 300)
  }

  function setPeriod(period) {
    if (selectedPeriod.value === period) return
    selectedPeriod.value = period
    resetAndFetch()
  }

  function setSelectedGroup(groupName) {
    selectedGroup.value = groupName
  }

  async function fetchStockData() {
    stockSummaries.value = await getStockSummaries()
    unheldStocks.value = await getUnheldStocks()
  }

  function formatJournalDetail(journal) {
    if (!journal) return null

    const unitPrice = journal.unitPrice ?? 78500
    const quantity = journal.quantity ?? 20
    const returnRate = journal.returnRate ?? 8.24
    const isPositiveReturn = returnRate >= 0

    const act = journal.investmentAction || journal.type || 'BUY'
    let actionTypeLabel = '매수'
    if (act === 'SELL' || act === '매도') actionTypeLabel = '매도'
    if (act === 'HOLD' || act === '추가 의견') actionTypeLabel = '추가 의견'

    const dateStr =
      journal.tradeDate || journal.date || journal.createdAt?.split('T')[0] || '2025. 07. 18'
    const timeStr = journal.time || ''
    const tradeDateTime = timeStr ? `${dateStr} ${timeStr}` : dateStr

    const judgmentText =
      journal.judgment ||
      journal.content ||
      '실적 기대치 상향 흐름은 유효하지만 선반영 가능성을 고려해 목표 비중의 50%만 먼저 매수했다.'

    const reasonsList =
      journal.reasons && journal.reasons.length > 0
        ? journal.reasons
        : [
            '분할 매수 기준을 먼저 정한 접근은 합리적이다.',
            '2분기 실적 기대치 상향 흐름이 이어지고 있다.',
            '기대 실적이 주가에 선반영됐을 가능성은 확인이 필요하다.',
          ]

    const reviewMemoText =
      journal.reviewMemo ||
      journal.reviewCondition ||
      '계획한 비중을 지켜 변동성에 대응할 여유가 생겼다. 추가 매수는 실적 발표 후 수급을 확인하고 판단한다.'

    const reviewDateText = journal.reviewDate || '07. 25'

    return {
      ...journal,
      title: journal.title || '1차 분할 매수',
      stock: journal.stock || '삼성전자',
      formattedUnitPrice: unitPrice.toLocaleString(),
      formattedQuantity: quantity.toLocaleString(),
      formattedReturnRate: (returnRate > 0 ? '+' : '') + returnRate.toFixed(2) + '%',
      isPositiveReturn,
      actionTypeLabel,
      tradeDateTime,
      judgmentText,
      reasonsList,
      reviewMemoText,
      reviewDateText,
    }
  }

  async function resetAndFetch() {
    cursor.value = null
    journals.value = []
    await fetchJournals({ isInitial: true })
    await fetchStockData()
  }

  async function fetchJournals({ isInitial = false } = {}) {
    if (isInitial) {
      isLoading.value = true
    } else {
      isLoadingMore.value = true
    }

    try {
      // Fetch all for monthly summary stats
      const allResults = await getJournals({
        period: selectedPeriod.value,
        query: debouncedQuery.value,
      })
      allMonthlyJournals.value = Array.isArray(allResults) ? allResults : allResults.items

      // Fetch paginated page
      const res = await getJournals({
        period: selectedPeriod.value,
        query: debouncedQuery.value,
        cursor: cursor.value,
        limit: 4,
        withPagination: true,
      })

      if (isInitial) {
        journals.value = res.items
      } else {
        journals.value = [...journals.value, ...res.items]
      }

      cursor.value = res.nextCursor
      hasMore.value = res.hasMore
      totalCount.value = res.totalCount
    } finally {
      isLoading.value = false
      isLoadingMore.value = false
    }
  }

  async function fetchNextJournals() {
    if (!hasMore.value || isLoadingMore.value) return
    await fetchJournals({ isInitial: false })
  }

  async function fetchJournal(journalId) {
    selectedJournal.value = await getJournal(journalId)
  }

  async function fetchJournalVersion(journalId, journalVersionId) {
    selectedVersion.value = await getJournalVersion(journalId, journalVersionId)
  }

  async function addJournal(payload) {
    const journal = await createJournal(payload)
    await resetAndFetch()
    return journal
  }

  async function editJournal(journalId, payload) {
    const response = await updateJournal(journalId, payload)
    await resetAndFetch()
    return response
  }

  const unheldStockCount = computed(() => unheldStocks.value.length)

  const availableGroups = computed(() => {
    const groupsSet = new Set(['전체'])
    stockSummaries.value.forEach((item) => {
      if (item.groupTag) groupsSet.add(item.groupTag)
    })
    return Array.from(groupsSet)
  })

  const filteredStockSummaries = computed(() => {
    const queryStr = debouncedQuery.value.trim().toLowerCase()
    return stockSummaries.value.filter((item) => {
      if (selectedGroup.value !== '전체' && item.groupTag !== selectedGroup.value) {
        return false
      }
      if (queryStr) {
        const matchName = item.stockName?.toLowerCase().includes(queryStr)
        const matchTag = item.groupTag?.toLowerCase().includes(queryStr)
        const matchJudgment = item.latestJudgment?.toLowerCase().includes(queryStr)
        if (!matchName && !matchTag && !matchJudgment) return false
      }
      return true
    })
  })

  const monthlySummary = computed(() => {
    const periodJournals = allMonthlyJournals.value
    const count = periodJournals.length
    if (count === 0) {
      return {
        monthLabel: `${Number(selectedPeriod.value.split('-')[1])}월`,
        monthlyCount: 0,
        monthlyReturnRate: 0,
        formattedReturnRate: '0.00%',
        returnRateTone: 'neutral',
        additionalOpinionCount: 0,
      }
    }

    const additionalOpinionCount = periodJournals.filter(
      (j) => j.investmentAction === 'HOLD' || j.type === '추가 의견',
    ).length

    const returnSum = periodJournals.reduce((acc, j) => acc + (j.returnRate ?? 0), 0)
    const avgReturn = returnSum / count
    const formatted = (avgReturn > 0 ? '+' : '') + avgReturn.toFixed(2) + '%'
    const tone = avgReturn > 0 ? 'danger' : avgReturn < 0 ? 'primary' : 'neutral'

    return {
      monthLabel: `${Number(selectedPeriod.value.split('-')[1])}월`,
      monthlyCount: count,
      monthlyReturnRate: avgReturn,
      formattedReturnRate: formatted,
      returnRateTone: tone,
      additionalOpinionCount,
    }
  })

  function formatTime(isoString) {
    if (!isoString) return '00:00'
    const date = new Date(isoString)
    if (isNaN(date.getTime())) return '00:00'
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  function formatDateLabel(dateString) {
    if (!dateString) return ''
    const parts = dateString.split('-')
    if (parts.length < 3) return dateString
    const month = Number(parts[1])
    const day = Number(parts[2])
    const d = new Date(dateString)
    const weekday = WEEKDAYS[d.getDay()] || ''
    return `${month}월 ${day}일 · ${weekday}`
  }

  const dateGroupedJournals = computed(() => {
    const groupsMap = new Map()

    journals.value.forEach((item) => {
      const dateKey = item.tradeDate || item.createdAt.slice(0, 10)
      if (!groupsMap.has(dateKey)) {
        groupsMap.set(dateKey, {
          date: dateKey,
          dateLabel: formatDateLabel(dateKey),
          items: [],
        })
      }

      let actionTypeLabel = item.type || '매수'
      let actionType = 'buy'

      if (item.investmentAction === 'SELL' || item.type === '매도') {
        actionTypeLabel = '매도'
        actionType = 'sell'
      } else if (item.investmentAction === 'HOLD' || item.type === '추가 의견') {
        actionTypeLabel = '추가 의견'
        actionType = 'hold'
      }

      const returnRate = item.returnRate ?? 0
      const returnRateClass =
        returnRate > 0 ? 'text-[#E34B4B]' : returnRate < 0 ? 'text-[#3976D9]' : 'text-[#666662]'

      groupsMap.get(dateKey).items.push({
        ...item,
        time: formatTime(item.createdAt),
        actionTypeLabel,
        actionType,
        formattedUnitPrice: (item.unitPrice ?? 0).toLocaleString(),
        returnRate,
        returnRateClass,
      })
    })

    return Array.from(groupsMap.values())
  })

  return {
    journals,
    allMonthlyJournals,
    selectedJournal,
    selectedVersion,
    selectedPeriod,
    searchQuery,
    debouncedQuery,
    cursor,
    hasMore,
    totalCount,
    isLoading,
    isLoadingMore,
    stockSummaries,
    unheldStocks,
    selectedGroup,
    unheldStockCount,
    availableGroups,
    filteredStockSummaries,
    setSelectedGroup,
    fetchStockData,
    monthlySummary,
    dateGroupedJournals,
    setSearchQuery,
    setPeriod,
    fetchJournals,
    fetchNextJournals,
    fetchJournal,
    fetchJournalVersion,
    addJournal,
    editJournal,
    formatJournalDetail,
  }
})
