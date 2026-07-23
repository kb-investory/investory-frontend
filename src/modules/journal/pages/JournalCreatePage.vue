<!-- 
  [페이지 컴포넌트] 투자일지 작성 페이지
  - 경로: /journal/create
  - 사용 위치: 타임라인/종목별 하단 '일지 추가' FAB 버튼 클릭 시 이동하는 화면
  - 주요 기능: 투자 일지 작성 및 폼 제출(JournalForm)
-->
<script setup>
import { useRouter } from 'vue-router'

import { ROUTE_NAMES } from '@/app/router/route-names'
import JournalForm from '@/modules/journal/components/JournalForm.vue'
import { useJournalStore } from '@/modules/journal/stores/journalStore'

const router = useRouter()
const journalStore = useJournalStore()

async function handleSubmit(payload) {
  await journalStore.addJournal(payload)
  await router.push({ name: ROUTE_NAMES.JOURNAL })
}
</script>

<template>
  <section class="page-section">
    <p class="eyebrow">Journal</p>
    <h1>투자일지 작성</h1>
    <JournalForm @submit="handleSubmit" />
  </section>
</template>
