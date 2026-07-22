import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  getPortfolioAnalysis,
  getPortfolioHoldings,
  getStockAnalysis,
} from '@/modules/portfolio/services/portfolioService'

export const usePortfolioStore = defineStore('portfolio', () => {
  const portfolios = ref([])
  const totalAmounts = ref(0)
  const analysis = ref(null)
  const selectedStockAnalysis = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchPortfolios() {
    loading.value = true
    error.value = null

    try {
      const response = await getPortfolioHoldings()
      portfolios.value = response.holdings
      totalAmounts.value = response.amounts
    } catch (requestError) {
      error.value = requestError
    } finally {
      loading.value = false
    }
  }

  async function fetchAnalysis() {
    analysis.value = await getPortfolioAnalysis()
  }

  async function fetchStockAnalysis(stockId) {
    selectedStockAnalysis.value = await getStockAnalysis(stockId)
  }

  return {
    portfolios,
    totalAmounts,
    analysis,
    selectedStockAnalysis,
    loading,
    error,
    fetchPortfolios,
    fetchAnalysis,
    fetchStockAnalysis,
  }
})
