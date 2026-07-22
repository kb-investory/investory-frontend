import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getPortfolios } from '@/modules/portfolio/services/portfolioService'

export const usePortfolioStore = defineStore('portfolio', () => {
  const portfolios = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchPortfolios() {
    loading.value = true
    error.value = null

    try {
      portfolios.value = await getPortfolios()
    } catch (requestError) {
      error.value = requestError
    } finally {
      loading.value = false
    }
  }

  return { portfolios, loading, error, fetchPortfolios }
})
