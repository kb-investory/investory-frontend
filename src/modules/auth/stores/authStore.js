import { defineStore } from 'pinia'
import { ref } from 'vue'

import { login } from '@/modules/auth/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)

  async function signIn(credentials) {
    loading.value = true

    try {
      user.value = await login(credentials)
    } finally {
      loading.value = false
    }
  }

  return { user, loading, signIn }
})
