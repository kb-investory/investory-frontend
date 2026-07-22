import { mypageMock } from '@/modules/mypage/mocks/mypageMock'

export async function getProfile() {
  return structuredClone(mypageMock)
}
