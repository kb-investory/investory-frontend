import { homeMock } from '@/modules/home/mocks/homeMock'

export async function getHomeSummary() {
  return structuredClone(homeMock)
}
