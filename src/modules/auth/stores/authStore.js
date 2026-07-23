import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  completeOauth,
  getOauthAuthorizationUrl,
  login,
  logout,
  refreshAccessToken,
} from '@/modules/auth/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const tokens = ref(null)
  const loading = ref(false)

  async function signIn(credentials) {
    loading.value = true

    try {
      user.value = await login(credentials)
    } finally {
      loading.value = false
    }
  }

  async function requestOauthUrl(provider, redirectUri, state) {
    return getOauthAuthorizationUrl({ provider, redirectUri, state })
  }

  async function signInWithOauth(payload) {
    const response = await completeOauth(payload)
    const { user: signedInUser, ...issuedTokens } = response

    user.value = signedInUser
    tokens.value = issuedTokens
    return response
  }

  async function refreshTokens() {
    tokens.value = await refreshAccessToken(tokens.value?.refreshToken)
    return tokens.value
  }

  async function signOut() {
    const response = await logout(tokens.value?.refreshToken)
    user.value = null
    tokens.value = null
    return response
  }

  return {
    user,
    tokens,
    loading,
    signIn,
    requestOauthUrl,
    signInWithOauth,
    refreshTokens,
    signOut,
  }
})
