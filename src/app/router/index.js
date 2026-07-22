import { createRouter, createWebHistory } from 'vue-router'

import { setupRouterGuards } from '@/app/router/guards'
import { ROUTE_NAMES } from '@/app/router/route-names'
import { aiConversationRoutes } from '@/modules/ai-conversation/routes'
import { authRoutes } from '@/modules/auth/routes'
import { homeRoutes } from '@/modules/home/routes'
import { journalRoutes } from '@/modules/journal/routes'
import { mypageRoutes } from '@/modules/mypage/routes'
import { portfolioRoutes } from '@/modules/portfolio/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...authRoutes,
    ...portfolioRoutes,
    ...mypageRoutes,
    ...journalRoutes,
    ...aiConversationRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: ROUTE_NAMES.NOT_FOUND,
      component: () => import('@/app/views/NotFoundView.vue'),
      meta: { title: '페이지를 찾을 수 없음' },
    },
  ],
})

setupRouterGuards(router)

export default router
