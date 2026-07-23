import { authMock, authTokenMock, oauthAuthorizationMock } from '@/modules/auth/mocks/authMock'

export async function getOauthAuthorizationUrl() {
  return structuredClone(oauthAuthorizationMock)
}

export async function completeOauth() {
  return {
    ...structuredClone(authTokenMock),
    user: structuredClone(authMock),
  }
}

export async function refreshAccessToken() {
  return {
    ...structuredClone(authTokenMock),
    accessToken: 'mock-refreshed-access-token',
  }
}

export async function logout() {
  return { success: true }
}

export async function login() {
  return structuredClone(authMock)
}
