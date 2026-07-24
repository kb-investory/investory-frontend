import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  createBrokerConnection,
  getBrokerConnection,
  getBrokers,
} from '@/shared/services/brokerService'

export const useBrokerStore = defineStore('broker', () => {
  const providers = ref([])
  const selectedProvider = ref(null)
  const selectedConnection = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const connectionStatus = ref('idle')
  const connectionError = ref('')

  async function fetchBrokers(query) {
    loading.value = true
    error.value = null

    try {
      const response = await getBrokers({ query })
      providers.value = response.providers
      return response
    } catch (requestError) {
      error.value = requestError
      throw requestError
    } finally {
      loading.value = false
    }
  }

  function selectBroker(provider) {
    if (!provider?.active) {
      return
    }

    selectedProvider.value = provider
  }

  function clearSelectedBroker() {
    selectedProvider.value = null
  }

  async function connectBroker(payload) {
    connectionStatus.value = 'loading'
    connectionError.value = ''

    try {
      const response = await createBrokerConnection(payload)

      if (!response.connectionId || response.status === 'FAILED') {
        throw new Error('증권사 로그인 정보를 확인해 주세요.')
      }

      selectedConnection.value = await getBrokerConnection(response.connectionId)
      connectionStatus.value = 'success'
      return response
    } catch (requestError) {
      selectedConnection.value = null
      connectionStatus.value = 'error'
      connectionError.value =
        requestError instanceof Error
          ? requestError.message
          : '증권사 로그인 중 오류가 발생했습니다.'
      throw requestError
    }
  }

  function resetConnectionState() {
    selectedConnection.value = null
    connectionStatus.value = 'idle'
    connectionError.value = ''
  }

  async function fetchConnection(connectionId) {
    selectedConnection.value = await getBrokerConnection(connectionId)
    return selectedConnection.value
  }

  return {
    providers,
    selectedProvider,
    selectedConnection,
    loading,
    error,
    connectionStatus,
    connectionError,
    fetchBrokers,
    selectBroker,
    clearSelectedBroker,
    connectBroker,
    resetConnectionState,
    fetchConnection,
  }
})
