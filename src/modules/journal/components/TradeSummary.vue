<!-- 
  [컴포넌트] 매매 요약 상자 칩
  - 사용 위치: UIKitView.vue 및 향후 투자일지 상세 보기/복기 작성 상단 칩
  - 주요 기능: 매매 유형 배지(매수/매도) + 매매 요약 문구(삼성전자 · 20주 · 평단 78,500원) 렌더링
-->
<script setup>
import BaseBadge from '@/shared/components/BaseBadge.vue'

defineProps({
  type: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="trade-summary">
    <BaseBadge :label="type" />
    <span>{{ summary }}</span>
  </div>
</template>

<style scoped>
.trade-summary {
  display: flex;
  width: 100%;
  min-height: 36px;
  align-items: center;
  gap: 7px;
  padding: 0 11px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 10.5px;
  font-weight: 600;
}
</style>
