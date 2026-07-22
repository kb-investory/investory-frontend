<script setup>
import { ref } from 'vue'

import { ROUTE_NAMES } from '@/app/router/route-names'
import JournalCard from '@/modules/journal/components/JournalCard.vue'
import ReviewCta from '@/modules/journal/components/ReviewCta.vue'
import TradeSummary from '@/modules/journal/components/TradeSummary.vue'
import AppBar from '@/shared/components/AppBar.vue'
import AppIcon from '@/shared/components/AppIcon.vue'
import BaseBadge from '@/shared/components/BaseBadge.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseCard from '@/shared/components/BaseCard.vue'
import BaseTextField from '@/shared/components/BaseTextField.vue'
import BaseTextarea from '@/shared/components/BaseTextarea.vue'
import BaseToggle from '@/shared/components/BaseToggle.vue'
import BottomTabBar from '@/shared/components/BottomTabBar.vue'
import FloatingActionButton from '@/shared/components/FloatingActionButton.vue'
import IconButton from '@/shared/components/IconButton.vue'
import MetricStrip from '@/shared/components/MetricStrip.vue'
import MobileStatusBar from '@/shared/components/MobileStatusBar.vue'
import NavigationRow from '@/shared/components/NavigationRow.vue'
import SearchInput from '@/shared/components/SearchInput.vue'
import StepRow from '@/shared/components/StepRow.vue'

const textField = ref('')
const search = ref('')
const textarea = ref('')
const toggle = ref(true)

const tabItems = [
  { label: '홈', icon: 'home', to: { name: ROUTE_NAMES.HOME } },
  { label: '자산', icon: 'chart-pie', to: { name: ROUTE_NAMES.PORTFOLIO } },
  { label: 'AI', icon: 'sparkles', to: { name: ROUTE_NAMES.AI_CONVERSATION } },
  { label: '일지', icon: 'notebook', to: { name: ROUTE_NAMES.JOURNAL } },
  { label: '설정', icon: 'settings', to: { name: ROUTE_NAMES.MYPAGE } },
]

const metrics = [
  { label: '기록 수', value: '12개' },
  { label: '현재 수익', value: '+8.24%', tone: 'danger' },
  { label: '추가 의견', value: '4개' },
]

const journal = {
  type: '매수',
  title: '조정 구간에서 1차 분할 매수',
  judgment: '실적 기대는 유효하지만 단기 변동성을 고려해 분할 진입하기로 했다.',
  reasons: ['영업이익 개선 가능성', '최근 고점 대비 7% 조정', '목표 비중의 절반만 우선 매수'],
  reviewCondition: '84,000원 이탈 또는 가이던스 하향',
  createdAt: '2026. 07. 18 · 14:32',
}
</script>

<template>
  <section class="ui-kit">
    <header class="ui-kit__header">
      <h1>Investory UI Kit</h1>
      <p>모바일 화면 공통 요소 · 390px 기준 · Noto Sans KR / Geist Mono</p>
    </header>

    <div class="ui-kit__catalog">
      <div class="ui-kit__column">
        <article class="ui-kit__section">
          <h2>Navigation</h2>
          <MobileStatusBar />
          <AppBar title="화면 제목" />
          <BottomTabBar :items="tabItems" />
        </article>

        <article class="ui-kit__section">
          <h2>Actions</h2>
          <BaseButton full-width>
            계속하기
            <template #icon><AppIcon name="arrow-right" :size="18" /></template>
          </BaseButton>
          <BaseButton variant="secondary" full-width>이전</BaseButton>
          <div class="ui-kit__inline">
            <IconButton label="더보기"><AppIcon name="ellipsis" /></IconButton>
            <FloatingActionButton label="추가"
              ><AppIcon name="plus" :size="24"
            /></FloatingActionButton>
          </div>
        </article>
      </div>

      <div class="ui-kit__column">
        <article class="ui-kit__section">
          <h2>Inputs</h2>
          <BaseTextField v-model="textField" label="입력 항목" />
          <SearchInput v-model="search" />
          <BaseTextarea v-model="textarea" />
        </article>

        <article class="ui-kit__section">
          <h2>States</h2>
          <BaseToggle v-model="toggle" label="알림 받기" />
          <BaseBadge label="매수" />
          <StepRow number="03" label="나의 핵심 판단" status="locked" />
        </article>
      </div>

      <div class="ui-kit__column">
        <article class="ui-kit__section">
          <h2>Cards</h2>
          <BaseCard title="카드 제목" description="카드의 핵심 정보를 설명하는 영역입니다." />
          <MetricStrip :metrics="metrics" />
          <NavigationRow title="목록 항목" description="항목에 대한 간단한 설명" />
        </article>

        <article class="ui-kit__section">
          <h2>Journal Domain</h2>
          <TradeSummary type="매수" summary="삼성전자 · 20주 · 평단 78,500원" />
          <ReviewCta />
          <StepRow number="01" label="제목" status="completed" result="작성 완료" />
          <JournalCard :journal="journal" />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ui-kit {
  display: grid;
  gap: 28px;
  padding: 40px;
  border-radius: 24px;
  background: var(--color-background);
}

.ui-kit__header {
  display: grid;
  gap: 8px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--color-border);
}

.ui-kit__header h1,
.ui-kit__header p,
.ui-kit__section h2 {
  margin: 0;
}

.ui-kit__header h1 {
  font-size: 32px;
}

.ui-kit__header p {
  color: var(--color-text-muted);
  font-size: 13px;
}

.ui-kit__catalog {
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 24px;
  align-items: start;
}

.ui-kit__column,
.ui-kit__section {
  display: grid;
  gap: 18px;
}

.ui-kit__section {
  gap: 14px;
  padding: 18px;
  border-radius: 16px;
  background: var(--color-surface-subtle);
}

.ui-kit__section h2 {
  font-size: 16px;
}

.ui-kit__inline {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 1100px) {
  .ui-kit__catalog {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .ui-kit {
    padding: 20px 0;
  }
}
</style>
