import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getStock, getStockPrices, getStocks } from '@/shared/services/stockService'

export const useStockStore = defineStore('stock', () => {
  const stocks = ref([])
  const selectedStock = ref(null)
  const prices = ref([])
  const nextCursor = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchStocks(filters = {}) {
    loading.value = true
    error.value = null

    try {
      const response = await getStocks(filters)
      stocks.value = response.stocks
      nextCursor.value = response.nextCursor
      return response
    } catch (requestError) {
      error.value = requestError
      throw requestError
    } finally {
      loading.value = false
    }
  }

  async function fetchStock(stockId) {
    selectedStock.value = await getStock(stockId)
    return selectedStock.value
  }

  async function fetchStockPrices(stockId, period) {
    const response = await getStockPrices(stockId, period)
    prices.value = response.prices
    return response
  }

  return {
    stocks,
    selectedStock,
    prices,
    nextCursor,
    loading,
    error,
    fetchStocks,
    fetchStock,
    fetchStockPrices,
  }
})
