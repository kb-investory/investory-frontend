<!-- 
  [컴포넌트] 투자일지 상세 정보 모달
  - 사용 위치: JournalTimelineListPage.vue (타임라인 목록에서 항목 클릭 시 팝업)
  - 주요 기능: 명세 디자인 시안 100% 동일 구현 - 거래 정보 태그 칩(매수/20주/평단 78,500원/+8.24%), 핵심 판단 노란 카드, 판단 근거 체크리스트(AI 보고서 3개 배지), 연결된 AI 대화 카드, 복기 메모, 하단 수정 및 종목 전체 기록 보기 액션
-->
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { ROUTE_NAMES } from '@/app/router/route-names'
import AppIcon from '@/shared/components/AppIcon.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  journal: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const router = useRouter()

const formattedUnitPrice = computed(() => {
  if (!props.journal || props.journal.unitPrice === undefined) return '78,500'
  return props.journal.unitPrice.toLocaleString()
})

const formattedQuantity = computed(() => {
  if (!props.journal || props.journal.quantity === undefined) return '20'
  return props.journal.quantity.toLocaleString()
})

const formattedReturnRate = computed(() => {
  if (!props.journal || props.journal.returnRate === undefined) return '+8.24%'
  const rate = props.journal.returnRate
  return (rate > 0 ? '+' : '') + rate.toFixed(2) + '%'
})

const isPositiveReturn = computed(() => {
  if (!props.journal || props.journal.returnRate === undefined) return true
  return props.journal.returnRate >= 0
})

const actionTypeLabel = computed(() => {
  if (!props.journal) return '매수'
  const act = props.journal.investmentAction || props.journal.type || 'BUY'
  if (act === 'SELL' || act === '매도') return '매도'
  if (act === 'HOLD' || act === '추가 의견') return '추가 의견'
  return '매수'
})

const journalTitle = computed(() => {
  if (!props.journal) return '1차 분할 매수'
  return props.journal.title || '1차 분할 매수'
})

const stockName = computed(() => {
  if (!props.journal) return '삼성전자'
  return props.journal.stock || '삼성전자'
})

const tradeDateTime = computed(() => {
  if (!props.journal) return '2025. 07. 18  15:32'
  if (props.journal.tradeDate) return props.journal.tradeDate
  const dateStr = props.journal.date || '2025. 07. 18'
  const timeStr = props.journal.time || '15:32'
  return `${dateStr}  ${timeStr}`
})

const judgmentText = computed(() => {
  if (!props.journal) {
    return '실적 기대치 상향 흐름은 유효하지만 선반영 가능성을 고려해 목표 비중의 50%만 먼저 매수했다.'
  }
  return (
    props.journal.judgment ||
    props.journal.content ||
    '실적 기대치 상향 흐름은 유효하지만 선반영 가능성을 고려해 목표 비중의 50%만 먼저 매수했다.'
  )
})

const reasonsList = computed(() => {
  if (props.journal?.reasons && props.journal.reasons.length > 0) {
    return props.journal.reasons
  }
  return [
    '분할 매수 기준을 먼저 정한 접근은 합리적이다.',
    '2분기 실적 기대치 상향 흐름이 이어지고 있다.',
    '기대 실적이 주가에 선반영됐을 가능성은 확인이 필요하다.',
  ]
})

const reviewMemoText = computed(() => {
  if (!props.journal) {
    return '계획한 비중을 지켜 변동성에 대응할 여유가 생겼다. 추가 매수는 실적 발표 후 수급을 확인하고 판단한다.'
  }
  return (
    props.journal.reviewMemo ||
    props.journal.reviewCondition ||
    '계획한 비중을 지켜 변동성에 대응할 여유가 생겼다. 추가 매수는 실적 발표 후 수급을 확인하고 판단한다.'
  )
})

const reviewDateText = computed(() => {
  if (props.journal?.reviewDate) return props.journal.reviewDate
  return '07. 25'
})

function handleGoToAiConversation() {
  router.push({ name: ROUTE_NAMES.AI_CONVERSATION })
  emit('close')
}

function handleGoToEdit() {
  if (props.journal) {
    router.push({
      name: ROUTE_NAMES.JOURNAL_CREATE,
      query: { editId: props.journal.journalId },
    })
    emit('close')
  }
}

function handleGoToStockRecords() {
  router.push({ name: ROUTE_NAMES.JOURNAL_STOCK_LIST })
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen && journal" class="modal-backdrop" @click.self="$emit('close')">
      <div class="journal-detail-sheet" role="dialog" aria-modal="true">
        <!-- 1. 최상단 서브 헤더 (투자 일지 배지 & 닫기 버튼) -->
        <div class="sheet-top-bar">
          <div class="journal-tag-badge">
            <AppIcon name="notebook-tabs" :size="14" />
            <span>투자 일지</span>
          </div>
          <button
            type="button"
            class="sheet-close-btn"
            aria-label="모달 닫기"
            @click="$emit('close')"
          >
            <AppIcon name="x" :size="20" />
          </button>
        </div>

        <!-- 스크롤 가능 영역 -->
        <div class="sheet-scroll-content">
          <!-- 2. 종목명 및 시각 메타 -->
          <div class="stock-meta-row">
            <span class="stock-meta-name">{{ stockName }}</span>
            <span class="stock-meta-dot">·</span>
            <span class="stock-meta-time font-mono">{{ tradeDateTime }}</span>
          </div>

          <!-- 3. 일지 대형 제목 -->
          <h2 class="journal-main-title">{{ journalTitle }}</h2>

          <!-- 4. 거래 메타 칩 (매수, 수량, 평단가, 수익률) -->
          <div class="meta-chips-row">
            <span class="meta-chip meta-chip--action">{{ actionTypeLabel }}</span>
            <span class="meta-chip meta-chip--gray font-mono">{{ formattedQuantity }}주</span>
            <span class="meta-chip meta-chip--gray font-mono">평단 {{ formattedUnitPrice }}원</span>
            <span
              class="meta-chip font-mono"
              :class="isPositiveReturn ? 'meta-chip--danger' : 'meta-chip--primary'"
            >
              {{ formattedReturnRate }}
            </span>
          </div>

          <!-- 5. 핵심 판단 카드 (노란 박스) -->
          <section class="judgment-card">
            <div class="judgment-card__header">
              <AppIcon name="lightbulb" :size="16" class="bulb-icon" />
              <span>핵심 판단</span>
            </div>
            <p class="judgment-card__body">
              {{ judgmentText }}
            </p>
          </section>

          <!-- 6. 판단 근거 (체크리스트) -->
          <section class="reasons-section">
            <div class="reasons-header">
              <h3 class="reasons-title">판단 근거</h3>
              <button type="button" class="ai-report-badge" @click="handleGoToAiConversation">
                <AppIcon name="sparkles" :size="13" />
                <span>AI 보고서 3개</span>
              </button>
            </div>

            <ul class="reasons-checklist">
              <li v-for="(reason, idx) in reasonsList" :key="idx" class="checklist-item">
                <div class="check-box-icon">
                  <AppIcon name="check" :size="12" />
                </div>
                <span class="checklist-text">{{ reason }}</span>
              </li>
            </ul>
          </section>

          <!-- 7. 연결된 AI 대화 카드 -->
          <section class="ai-conv-card" @click="handleGoToAiConversation">
            <div class="ai-conv-card__icon-box">
              <AppIcon name="sparkles" :size="18" />
            </div>
            <div class="ai-conv-card__info">
              <span class="ai-conv-card__sub">연결된 AI 대화</span>
              <strong class="ai-conv-card__title">실적 발표 전 분할 매수 근거 점검</strong>
            </div>
            <AppIcon name="chevron-right" :size="18" class="ai-conv-card__arrow" />
          </section>

          <!-- 8. 복기 메모 -->
          <section class="review-memo-section">
            <div class="review-memo-header">
              <h3 class="review-memo-title">복기 메모</h3>
              <span class="review-memo-date font-mono">{{ reviewDateText }}</span>
            </div>
            <p class="review-memo-body">
              {{ reviewMemoText }}
            </p>
          </section>
        </div>

        <!-- 9. 하단 버튼 영역 (수정 & 종목 전체 기록 보기) -->
        <div class="sheet-bottom-actions">
          <button type="button" class="btn-action-edit" @click="handleGoToEdit">
            <span>수정</span>
          </button>
          <button type="button" class="btn-action-stock-records" @click="handleGoToStockRecords">
            <span>{{ stockName }} 전체 기록 보기</span>
            <AppIcon name="arrow-right" :size="16" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 40%);
  backdrop-filter: blur(2px);
}

.journal-detail-sheet {
  display: flex;
  width: min(350px, 92vw);
  max-height: 90vh;
  flex-direction: column;
  border-radius: 28px;
  box-shadow: 0 16px 40px rgb(0 0 0 / 18%);
  background: #ffffff;
  overflow: hidden;
  padding: 20px 20px 16px;
}

/* 1. 최상단 서브 헤더 */
.sheet-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.journal-tag-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 14px;
  background: #fff9e7;
  color: #a77900;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 700;
}

.sheet-close-btn {
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: #666662;
  cursor: pointer;
}

/* 스크롤 가능 영역 */
.sheet-scroll-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 2px;
}

.sheet-scroll-content::-webkit-scrollbar {
  width: 4px;
}

.sheet-scroll-content::-webkit-scrollbar-thumb {
  background: #e5e5e0;
  border-radius: 2px;
}

/* 2. 종목 메타 */
.stock-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94948e;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 6px;
}

.stock-meta-name {
  color: #666662;
  font-weight: 600;
}

.stock-meta-dot {
  color: #cccccc;
}

.stock-meta-time {
  font-family: var(--font-mono);
  font-size: 11px;
}

/* 3. 메인 일지 제목 */
.journal-main-title {
  margin: 0 0 14px 0;
  color: #181817;
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.4px;
  line-height: 1.25;
}

/* 4. 메타 칩 행 */
.meta-chips-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
}

.meta-chip {
  display: inline-flex;
  height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.meta-chip--action {
  background: #fde8e8;
  color: #e34b4b;
}

.meta-chip--gray {
  background: #f4f4f1;
  color: #666662;
  font-weight: 600;
}

.meta-chip--danger {
  background: #fde8e8;
  color: #e34b4b;
}

.meta-chip--primary {
  background: #eef4ff;
  color: #3976d9;
}

/* 5. 핵심 판단 카드 */
.judgment-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #fff9e7;
  margin-bottom: 22px;
}

.judgment-card__header {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #a77900;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
}

.bulb-icon {
  color: #a77900;
}

.judgment-card__body {
  margin: 0;
  color: #181817;
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.5;
}

/* 6. 판단 근거 리스트 */
.reasons-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.reasons-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reasons-title {
  margin: 0;
  color: #181817;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 700;
}

.ai-report-badge {
  display: flex;
  height: 26px;
  align-items: center;
  gap: 4px;
  padding: 0 9px;
  border: 0;
  border-radius: 6px;
  background: #f4f4f1;
  color: #666662;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.reasons-checklist {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.check-box-icon {
  display: flex;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #fff2bd;
  color: #a77900;
  margin-top: 1px;
}

.checklist-text {
  color: #181817;
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1.45;
}

/* 7. 연결된 AI 대화 카드 */
.ai-conv-card {
  display: flex;
  height: 60px;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  border: 1px solid #eeeea;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgb(0 0 0 / 4%);
  margin-bottom: 22px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.ai-conv-card:hover {
  background: #fafaf8;
}

.ai-conv-card__icon-box {
  display: flex;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #181817;
  color: #e8b931;
}

.ai-conv-card__info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
}

.ai-conv-card__sub {
  color: #94948e;
  font-size: 10px;
  font-weight: 500;
}

.ai-conv-card__title {
  color: #181817;
  font-size: 12.5px;
  font-weight: 700;
}

.ai-conv-card__arrow {
  color: #94948e;
}

/* 8. 복기 메모 */
.review-memo-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.review-memo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.review-memo-title {
  margin: 0;
  color: #181817;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 700;
}

.review-memo-date {
  color: #94948e;
  font-family: var(--font-mono);
  font-size: 11px;
}

.review-memo-body {
  margin: 0;
  color: #666662;
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 400;
  line-height: 1.5;
}

/* 9. 하단 액션 버튼 */
.sheet-bottom-actions {
  display: flex;
  height: 48px;
  align-items: center;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid #eeeea;
  flex-shrink: 0;
}

.btn-action-edit {
  display: flex;
  width: 76px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e5e0;
  border-radius: 12px;
  background: #ffffff;
  color: #666662;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-action-stock-records {
  display: flex;
  height: 44px;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 0;
  border-radius: 12px;
  background: #e8b931;
  color: #181817;
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.btn-action-stock-records:hover {
  opacity: 0.9;
}

.font-mono {
  font-family: var(--font-mono);
}
</style>
