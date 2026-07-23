import { ROUTE_NAMES } from '@/app/router/route-names'

export const authRoutes = [
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: () => import('@/modules/auth/pages/LoginPage.vue'),
    meta: { title: '로그인' },
  },
]
