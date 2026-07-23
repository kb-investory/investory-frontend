import { ROUTE_NAMES } from '@/app/router/route-names'

export const authRoutes = [
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: () => import('@/modules/auth/pages/LoginPage.vue'),
    meta: { title: '로그인', layout: 'auth' },
  },
  {
    path: '/auth/callback/:provider',
    name: ROUTE_NAMES.OAUTH_CALLBACK,
    component: () => import('@/modules/auth/pages/OAuthCallbackPage.vue'),
    meta: { title: '로그인 처리', layout: 'auth' },
  },
]
