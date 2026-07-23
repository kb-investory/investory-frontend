<!-- 
  [페이지 컴포넌트] 투자일지 - 종목별 목록 페이지
  - 경로: /journal/stocks
  - 사용 위치: 투자일지 상단 '종목별' 탭 클릭 시 이동하는 화면
  - 주요 기능: 미보유 종목 배지, 사용자 종목 그룹 필터 칩 바, 종목 요약 카드(StockJournalCard) 목록
-->
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { ROUTE_NAMES } from '@/app/router/route-names'
import StockJournalCard from '@/modules/journal/components/StockJournalCard.vue'
import { useJournalStore } from '@/modules/journal/stores/journalStore'
import AppIcon from '@/shared/components/AppIcon.vue'
import SearchInput from '@/shared/components/SearchInput.vue'

const router = useRouter()
const journalStore = useJournalStore()

onMounted(() => {
  journalStore.fetchStockData()
})

function handleSearchInput(value) {
  journalStore.setSearchQuery(value)
}

function goToTimeline() {
  router.push({ name: ROUTE_NAMES.JOURNAL })
}

function goToCreate() {
  router.push({ name: ROUTE_NAMES.JOURNAL_CREATE })
}

function handleUnheldClick() {
  alert(`현재 미보유 관심 종목이 ${journalStore.unheldStockCount}개 있습니다.`)
}

function handleAddGroup() {
  const groupName = prompt('새로 추가할 종목 그룹명을 입력하세요:')
  if (groupName && groupName.trim()) {
    journalStore.setSelectedGroup(groupName.trim())
  }
}
</script>

<template>
  <div class="journal-stock-container">
    <div class="journal-stock-card">
      <div class="stock-content">
        <!-- 화면 헤더 -->
        <header class="stock-header">
          <h1 class="stock-title">투자 일지</h1>

          <!-- 미보유 종목 버튼 -->
          <button
            class="unheld-stocks-btn"
            type="button"
            aria-label="미보유 종목 보기"
            @click="handleUnheldClick"
          >
            <span class="unheld-stocks-btn__label">미보유 종목</span>
            <div class="unheld-stocks-btn__badge">
              <span>{{ journalStore.unheldStockCount }}</span>
            </div>
          </button>
        </header>

        <!-- 보기 전환 (탭) -->
        <nav class="view-tabs" aria-label="보기 전환 메뉴">
          <button type="button" class="tab-btn" @click="goToTimeline">
            <span>타임라인</span>
          </button>
          <button type="button" class="tab-btn tab-btn--active">
            <span>종목별</span>
            <div class="tab-indicator" />
          </button>
        </nav>

        <!-- 검색 바 -->
        <div class="search-section">
          <SearchInput
            :model-value="journalStore.searchQuery"
            placeholder="종목명, 태그, 메모 검색"
            @update:model-value="handleSearchInput"
          />
        </div>

        <!-- 사용자 종목 그룹 필터 칩 -->
        <section class="group-filter-section" aria-label="종목 그룹 필터">
          <div class="group-chips-scroll">
            <button
              v-for="group in journalStore.availableGroups"
              :key="group"
              type="button"
              class="group-chip"
              :class="{ 'group-chip--active': journalStore.selectedGroup === group }"
              @click="journalStore.setSelectedGroup(group)"
            >
              {{ group }}
            </button>
          </div>
          <button
            class="add-group-btn"
            type="button"
            title="새 그룹 만들기"
            aria-label="새 그룹 만들기"
            @click="handleAddGroup"
          >
            <AppIcon name="plus" :size="16" />
          </button>
        </section>

        <!-- 종목별 목록 메인 영역 -->
        <main class="stock-list">
          <template v-if="journalStore.filteredStockSummaries.length > 0">
            <div class="stock-cards-list">
              <StockJournalCard
                v-for="(item, idx) in journalStore.filteredStockSummaries"
                :key="item.stockId"
                :item="item"
                :is-last="idx === journalStore.filteredStockSummaries.length - 1"
              />
            </div>
          </template>
          <div v-else class="state-message">해당 조건의 종목 일지가 없습니다.</div>
        </main>

        <!-- 하단 일지 추가 액션 버튼 -->
        <footer class="action-footer">
          <button class="add-journal-fab" type="button" @click="goToCreate">
            <AppIcon name="plus" :size="18" />
            <span>일지 추가</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.journal-stock-container {
  display: flex;
  width: 100%;
  justify-content: center;
}

.journal-stock-card {
  display: flex;
  width: min(390px, 100%);
  min-height: 740px;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgb(0 0 0 / 6%);
  background: var(--color-background);
  overflow: hidden;
}

.stock-content {
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px;
}

/* 화면 헤더 */
.stock-header {
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.stock-title {
  margin: 0;
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.unheld-stocks-btn {
  display: flex;
  height: 44px;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface-subtle);
  cursor: pointer;
}

.unheld-stocks-btn__label {
  color: var(--color-text-muted);
  font-size: 12px;
  font-weight: 600;
}

.unheld-stocks-btn__badge {
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #ffffff;
  color: var(--color-heading);
  font-family: var(--font-inter);
  font-size: 10px;
  font-weight: 700;
}

/* 보기 전환 (탭) */
.view-tabs {
  display: flex;
  width: 100%;
  height: 44px;
  align-items: flex-end;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.tab-btn {
  position: relative;
  display: flex;
  height: 44px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.tab-btn--active {
  color: var(--color-primary-strong);
  font-weight: 700;
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  width: 56px;
  height: 2px;
  background: var(--color-primary);
}

/* 검색 */
.search-section {
  width: 100%;
  height: 44px;
  flex-shrink: 0;
}

/* 사용자 종목 그룹 필터 */
.group-filter-section {
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.group-chips-scroll {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding: 0 2px;
}

.group-chips-scroll::-webkit-scrollbar {
  display: none;
}

.group-chip {
  height: 32px;
  flex-shrink: 0;
  padding: 0 12px;
  border: 0;
  border-radius: 8px;
  background: var(--color-surface-subtle);
  color: var(--color-text-muted);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.group-chip--active {
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
  font-weight: 700;
}

.add-group-btn {
  display: flex;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: #ffffff;
  color: var(--color-heading);
  cursor: pointer;
}

/* 목록 영역 */
.stock-list {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
}

.stock-cards-list {
  display: flex;
  flex-direction: column;
}

.state-message {
  padding: 40px 0;
  color: var(--color-text-muted);
  font-size: 14px;
  text-align: center;
}

/* 하단 일지 추가 액션 버튼 */
.action-footer {
  display: flex;
  height: 52px;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
}

.add-journal-fab {
  display: flex;
  height: 44px;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  border: 0;
  border-radius: 22px;
  box-shadow: 0 5px 14px rgb(24 24 23 / 14%);
  background: #181817;
  color: #ffffff;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.add-journal-fab:hover {
  opacity: 0.9;
}

.add-journal-fab :deep(.app-icon) {
  color: #e8b931;
}
</style>
