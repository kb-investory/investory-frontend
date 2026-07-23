/**
 * [Routes] 투자일지 모듈 라우트 정의
 * - 사용 위치: src/app/router/index.js
 * - 주요 기능: /journal (타임라인), /journal/stocks (종목별), /journal/create (일지 작성) 경로 정의
 */
import { ROUTE_NAMES } from '@/app/router/route-names'

export const journalRoutes = [
  {
    path: '/journal',
    name: ROUTE_NAMES.JOURNAL,
    component: () => import('@/modules/journal/pages/JournalTimelineListPage.vue'),
    meta: { title: '투자일지 - 타임라인', requiresAuth: true },
  },
  {
    path: '/journal/stocks',
    name: ROUTE_NAMES.JOURNAL_STOCK_LIST,
    component: () => import('@/modules/journal/pages/JournalStockListPage.vue'),
    meta: { title: '투자일지 - 종목별', requiresAuth: true },
  },
  {
    path: '/journal/create',
    name: ROUTE_NAMES.JOURNAL_CREATE,
    component: () => import('@/modules/journal/pages/JournalCreatePage.vue'),
    meta: { title: '투자일지 작성', requiresAuth: true },
  },
]
