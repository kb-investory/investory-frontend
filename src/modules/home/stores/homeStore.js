import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getHomeSummary } from '@/modules/home/services/homeService'

export const useHomeStore = defineStore('home', () => {
  const summary = ref(null)

  async function fetchSummary() {
    summary.value = await getHomeSummary()
  }

  return { summary, fetchSummary }
})
