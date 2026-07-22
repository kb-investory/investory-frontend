import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getProfile } from '@/modules/mypage/services/mypageService'

export const useMypageStore = defineStore('mypage', () => {
  const profile = ref(null)

  async function fetchProfile() {
    profile.value = await getProfile()
  }

  return { profile, fetchProfile }
})
