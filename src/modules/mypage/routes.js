import { ROUTE_NAMES } from '@/app/router/route-names'

export const mypageRoutes = [
  {
    path: '/mypage',
    name: ROUTE_NAMES.MYPAGE,
    component: () => import('@/modules/mypage/pages/MypagePage.vue'),
    meta: { title: '마이페이지', requiresAuth: true },
  },
]
