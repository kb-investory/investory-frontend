import {
  portfolioAnalysisMock,
  portfolioMock,
  stockAnalysisMocks,
} from '@/modules/portfolio/mocks/portfolioMock'

export async function getPortfolioHoldings() {
  return structuredClone(portfolioMock)
}

export async function getPortfolios() {
  const { holdings } = await getPortfolioHoldings()
  return holdings
}

export async function getPortfolioAnalysis() {
  return structuredClone(portfolioAnalysisMock)
}

export async function getStockAnalysis(stockId) {
  return structuredClone(
    stockAnalysisMocks.find((stock) => stock.stockId === Number(stockId)) ?? null,
  )
}
