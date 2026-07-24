import { ROUTE_NAMES } from '@/app/router/route-names'

export const mypageRoutes = [
  {
    path: '/mypage',
    name: ROUTE_NAMES.MYPAGE,
    component: () => import('@/modules/mypage/pages/MypagePage.vue'),
    meta: { title: '마이페이지', requiresAuth: true },
  },
  {
    path: '/mypage/edit',
    name: ROUTE_NAMES.MYPAGE_EDIT,
    component: () => import('@/modules/mypage/pages/ProfileEditPage.vue'),
    meta: { title: '프로필 수정', requiresAuth: true },
  },
  {
    path: '/mypage/accounts',
    name: ROUTE_NAMES.MYPAGE_ACCOUNTS,
    component: () => import('@/modules/mypage/pages/AccountManagementPage.vue'),
    meta: { title: '연결 계좌 관리', requiresAuth: true },
  },
]
