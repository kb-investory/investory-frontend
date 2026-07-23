import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  deleteProfile,
  getAccounts,
  getProfile,
  updateAccount,
  updateProfile,
} from '@/modules/mypage/services/mypageService'

export const useMypageStore = defineStore('mypage', () => {
  const profile = ref(null)
  const accounts = ref([])

  async function fetchProfile() {
    profile.value = await getProfile()
  }

  async function saveProfile(payload) {
    profile.value = await updateProfile(payload)
    return profile.value
  }

  async function withdraw(reasonCode) {
    const response = await deleteProfile(reasonCode)
    if (response.success) profile.value = null
    return response
  }

  async function fetchAccounts() {
    accounts.value = await getAccounts()
  }

  async function renameAccount(accountId, displayName) {
    const updatedAccount = await updateAccount(accountId, { displayName })
    const targetIndex = accounts.value.findIndex((account) => account.accountId === accountId)

    if (updatedAccount && targetIndex >= 0) accounts.value[targetIndex] = updatedAccount
    return updatedAccount
  }

  return {
    profile,
    accounts,
    fetchProfile,
    saveProfile,
    withdraw,
    fetchAccounts,
    renameAccount,
  }
})
