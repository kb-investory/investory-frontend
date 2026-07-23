import { ROUTE_NAMES } from '@/app/router/route-names'

export const aiConversationRoutes = [
  {
    path: '/ai-conversation',
    name: ROUTE_NAMES.AI_CONVERSATION,
    component: () => import('@/modules/ai-conversation/pages/AiConversationPage.vue'),
    meta: { title: 'AI 투자 대화', requiresAuth: true },
  },
]
