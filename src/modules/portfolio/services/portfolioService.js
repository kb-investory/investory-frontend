import { portfolioMock } from '@/modules/portfolio/mocks/portfolioMock'

export async function getPortfolios() {
  return structuredClone(portfolioMock)
}
