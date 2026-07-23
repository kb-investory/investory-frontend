import { ROUTE_NAMES } from '@/app/router/route-names'

export const homeRoutes = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: () => import('@/modules/home/pages/HomePage.vue'),
    meta: { title: '홈' },
  },
]
