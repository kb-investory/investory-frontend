import { ROUTE_NAMES } from '@/app/router/route-names'

export const portfolioRoutes = [
  {
    path: '/portfolio',
    name: ROUTE_NAMES.PORTFOLIO,
    component: () => import('@/modules/portfolio/pages/PortfolioPage.vue'),
    meta: { title: '포트폴리오', requiresAuth: true },
  },
]
