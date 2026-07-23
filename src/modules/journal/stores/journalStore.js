/**
 * [Pinia Store] 투자일지 전역 상태 관리 스토어
 * - 사용 위치: JournalTimelineListPage, JournalStockListPage 등 모듈 전반
 * - 주요 기능: 타임라인 목록, 종목 요약 데이터, 검색어 디바운싱, 날짜별 그룹화, 월간 요약 집계, 상세 모달 전역 상태(activeJournalDetail) 관리
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

  // 모달 연동 전역 일지 ID 상태
  const selectedJournalId = ref(null)

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

  function openJournalDetail(id) {
    selectedJournalId.value = Number(id)
  }

  function closeJournalDetail() {
    selectedJournalId.value = null
  }

  // 스토어에서 직접 구독 및 관리하는 상세 모달 뷰 데이터 (하드코딩 기본값 100% 제거)
  const activeJournalDetail = computed(() => {
    if (!selectedJournalId.value) return null
    const target = journals.value.find(
      (j) => j.journalId === selectedJournalId.value || j.id === selectedJournalId.value,
    )
    if (!target) return null

    const unitPrice = target.unitPrice ?? 0
    const quantity = target.quantity ?? 0
    const returnRate = target.returnRate ?? 0
    const isPositiveReturn = returnRate >= 0

    const act = target.investmentAction || target.type || 'BUY'
    let actionTypeLabel = '매수'
    if (act === 'SELL' || act === '매도') actionTypeLabel = '매도'
    if (act === 'HOLD' || act === '추가 의견') actionTypeLabel = '추가 의견'

    const tradeDateTime = target.tradeDate || target.date || target.createdAt?.split('T')[0] || ''

    return {
      ...target,
      title: target.title,
      stock: target.stock,
      formattedUnitPrice: unitPrice.toLocaleString(),
      formattedQuantity: quantity.toLocaleString(),
      formattedReturnRate: (returnRate > 0 ? '+' : '') + returnRate.toFixed(2) + '%',
      isPositiveReturn,
      actionTypeLabel,
      tradeDateTime,
      judgmentText: target.judgment || target.content || '',
      reasonsList: target.reasons || [],
      reviewMemoText: target.reviewMemo || target.reviewCondition || '',
      reviewDateText: target.reviewDate || '',
    }
  })

  async function fetchStockData() {
    stockSummaries.value = await getStockSummaries()
    unheldStocks.value = await getUnheldStocks()
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
      if (isInitial) {
        isLoading.value = false
      } else {
        isLoadingMore.value = false
      }
    }
  }

  async function fetchNextJournals() {
    if (!hasMore.value || isLoadingMore.value) return
    await fetchJournals({ isInitial: false })
  }

  async function fetchJournal(id) {
    selectedJournal.value = await getJournal(id)
    return selectedJournal.value
  }

  async function fetchJournalVersion(journalId, versionId) {
    selectedVersion.value = await getJournalVersion(journalId, versionId)
    return selectedVersion.value
  }

  async function addJournal(payload) {
    const created = await createJournal(payload)
    await resetAndFetch()
    return created
  }

  async function editJournal(id, payload) {
    const updated = await updateJournal(id, payload)
    await resetAndFetch()
    return updated
  }

  const unheldStockCount = computed(() => unheldStocks.value.length)

  const availableGroups = computed(() => {
    const groups = new Set()
    stockSummaries.value.forEach((stock) => {
      if (stock.groupTheme) groups.add(stock.groupTheme)
    })
    return ['전체', ...Array.from(groups)]
  })

  const filteredStockSummaries = computed(() => {
    if (selectedGroup.value === '전체') {
      return stockSummaries.value
    }
    return stockSummaries.value.filter((stock) => stock.groupTheme === selectedGroup.value)
  })

  const monthlySummary = computed(() => {
    const list = allMonthlyJournals.value || []
    const monthlyCount = list.length

    let additionalOpinionCount = 0
    let totalReturnRate = 0
    let rateCount = 0

    list.forEach((item) => {
      if (item.investmentAction === 'HOLD' || item.type === '추가 의견') {
        additionalOpinionCount++
      }
      if (item.returnRate !== undefined && item.returnRate !== null) {
        totalReturnRate += item.returnRate
        rateCount++
      }
    })

    const avgReturnRate = rateCount > 0 ? totalReturnRate / rateCount : 0
    const formattedReturnRate = (avgReturnRate > 0 ? '+' : '') + avgReturnRate.toFixed(2) + '%'

    return {
      monthlyCount,
      monthlyReturnRate: avgReturnRate,
      formattedReturnRate,
      additionalOpinionCount,
    }
  })

  function formatDateLabel(dateStr) {
    if (!dateStr) return ''
    const dateObj = new Date(dateStr)
    if (isNaN(dateObj.getTime())) return dateStr

    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const weekday = WEEKDAYS[dateObj.getDay()]
    return `${month}월 ${day}일 · ${weekday}`
  }

  function formatTime(isoStr) {
    if (!isoStr) return ''
    const dateObj = new Date(isoStr)
    if (isNaN(dateObj.getTime())) return ''

    const hours = String(dateObj.getHours()).padStart(2, '0')
    const minutes = String(dateObj.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const dateGroupedJournals = computed(() => {
    const groupsMap = new Map()

    journals.value.forEach((item) => {
      const dateKey = item.tradeDate || item.createdAt?.split('T')[0] || '기타'
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
        time: item.time || formatTime(item.createdAt),
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
    selectedJournalId,
    activeJournalDetail,
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
    openJournalDetail,
    closeJournalDetail,
    setSearchQuery,
    setPeriod,
    fetchJournals,
    fetchNextJournals,
    fetchJournal,
    fetchJournalVersion,
    addJournal,
    editJournal,
  }
})
