import { ROUTE_NAMES } from '@/app/router/route-names'

export const journalRoutes = [
  {
    path: '/journal',
    name: ROUTE_NAMES.JOURNAL,
    component: () => import('@/modules/journal/pages/JournalListPage.vue'),
    meta: { title: '투자일지', requiresAuth: true },
  },
  {
    path: '/journal/create',
    name: ROUTE_NAMES.JOURNAL_CREATE,
    component: () => import('@/modules/journal/pages/JournalCreatePage.vue'),
    meta: { title: '투자일지 작성', requiresAuth: true },
  },
]
