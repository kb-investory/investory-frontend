import { authMock } from '@/modules/auth/mocks/authMock'

export async function login() {
  return structuredClone(authMock)
}
