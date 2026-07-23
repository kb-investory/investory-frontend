import { stockDetailMocks, stockMocks, stockPriceMocks } from '@/shared/mocks/stockMock'

export async function getStocks({ query, market, cursor, limit = 20 } = {}) {
  const normalizedQuery = query?.trim().toLowerCase()
  const filteredStocks = stockMocks.filter((stock) => {
    if (market && stock.market !== market) return false
    if (cursor && stock.stockId <= Number(cursor)) return false

    if (normalizedQuery) {
      return [stock.stockCode, stock.stockName].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      )
    }

    return true
  })
  const stocks = filteredStocks.slice(0, limit)

  return {
    stocks: structuredClone(stocks),
    nextCursor: filteredStocks.length > limit ? stocks.at(-1)?.stockId : null,
  }
}

export async function getStock(stockId) {
  return structuredClone(
    stockDetailMocks.find((stock) => stock.stockId === Number(stockId)) ?? null,
  )
}

export async function getStockPrices(stockId, { startDate, endDate } = {}) {
  const prices = stockPriceMocks[Number(stockId)] ?? []
  const filteredPrices = prices.filter((price) => {
    if (startDate && price.date < startDate) return false
    if (endDate && price.date > endDate) return false
    return true
  })

  return { prices: structuredClone(filteredPrices) }
}
