<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
})

const formattedUnitPrice = computed(() => {
  return (props.item.unitPrice ?? 0).toLocaleString()
})

const returnRateClass = computed(() => {
  const rate = props.item.returnRate ?? 0
  if (rate > 0) return 'text-danger'
  if (rate < 0) return 'text-primary'
  return 'text-muted'
})

const formattedReturnRate = computed(() => {
  const rate = props.item.returnRate ?? 0
  return (rate > 0 ? '+' : '') + rate.toFixed(2) + '%'
})
</script>

<template>
  <article class="stock-journal-card" :class="{ 'stock-journal-card--border': !isLast }">
    <!-- 좌측 기록 요약 -->
    <div class="stock-journal-card__main">
      <div class="stock-journal-card__header">
        <span class="stock-journal-card__name">{{ item.stockName }}</span>
        <span v-if="item.groupTag" class="stock-journal-card__group">· {{ item.groupTag }}</span>
      </div>

      <p class="stock-journal-card__judgment">
        {{ item.latestJudgment }}
      </p>

      <div class="stock-journal-card__meta">
        <span class="stock-journal-card__time">
          {{ item.latestTimeLabel }} · 일지 {{ item.journalCount }}
        </span>
        <span class="stock-journal-card__price"> 평단 {{ formattedUnitPrice }}원 </span>
      </div>
    </div>

    <!-- 우측 수익 현황 -->
    <div class="stock-journal-card__stats">
      <div class="stock-journal-card__rate" :class="returnRateClass">
        {{ formattedReturnRate }}
      </div>
      <div class="stock-journal-card__holding-days">{{ item.holdingDays }}일째 보유</div>
    </div>
  </article>
</template>

<style scoped>
.stock-journal-card {
  display: flex;
  width: 100%;
  min-height: 94px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 0;
}

.stock-journal-card--border {
  border-bottom: 1px solid var(--color-border-subtle);
}

.stock-journal-card__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.stock-journal-card__header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stock-journal-card__name {
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
}

.stock-journal-card__group {
  color: var(--color-text-subtle);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
}

.stock-journal-card__judgment {
  margin: 0;
  color: var(--color-text-muted);
  font-family: var(--font-sans);
  font-size: 12px;
  line-height: 1.4;
  word-break: keep-all;
}

.stock-journal-card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stock-journal-card__time {
  color: var(--color-text-subtle);
  font-size: 10px;
}

.stock-journal-card__price {
  color: var(--color-text-muted);
  font-size: 10px;
  font-weight: 500;
}

.stock-journal-card__stats {
  display: flex;
  width: 98px;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
}

.stock-journal-card__rate {
  font-family: var(--font-inter);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.text-danger {
  color: var(--color-danger);
}

.text-primary {
  color: #3976d9;
}

.text-muted {
  color: var(--color-text-muted);
}

.stock-journal-card__holding-days {
  color: var(--color-text-muted);
  font-size: 10px;
  font-weight: 500;
}
</style>
