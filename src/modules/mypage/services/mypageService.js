import { accountMocks, mypageMock } from '@/modules/mypage/mocks/mypageMock'

let profile = structuredClone(mypageMock)
let accounts = structuredClone(accountMocks)

export async function getProfile() {
  return structuredClone(profile)
}

export async function updateProfile(payload) {
  profile = { ...profile, ...payload }
  return structuredClone(profile)
}

export async function deleteProfile(reasonCode) {
  return { success: true, reasonCode }
}

export async function getAccounts() {
  return structuredClone(accounts)
}

export async function getAccount(accountId) {
  return structuredClone(
    accounts.find((account) => account.accountId === Number(accountId)) ?? null,
  )
}

export async function updateAccount(accountId, payload) {
  const targetIndex = accounts.findIndex((account) => account.accountId === Number(accountId))

  if (targetIndex < 0) return null

  accounts[targetIndex] = { ...accounts[targetIndex], ...payload }
  return structuredClone(accounts[targetIndex])
}
