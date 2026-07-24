import { brokerConnectionMocks, brokerMocks } from '@/shared/mocks/brokerMock'

let connections = structuredClone(brokerConnectionMocks)
const MOCK_REQUEST_DELAY = 700

function waitForMockRequest() {
  return new Promise((resolve) => globalThis.setTimeout(resolve, MOCK_REQUEST_DELAY))
}

export async function getBrokers({ query } = {}) {
  const normalizedQuery = query?.trim().toLowerCase()
  const providers = normalizedQuery
    ? brokerMocks.filter((provider) =>
        [provider.providerCode, provider.providerName].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      )
    : brokerMocks

  return { providers: structuredClone(providers) }
}

export async function createBrokerConnection({ providerId, loginId, password }) {
  await waitForMockRequest()

  const provider = brokerMocks.find((item) => item.providerId === Number(providerId))

  if (!provider?.active) {
    throw new Error('선택한 증권사는 현재 연결할 수 없습니다.')
  }

  if (!loginId?.trim() || !password) {
    throw new Error('아이디와 비밀번호를 모두 입력해 주세요.')
  }

  if (loginId.trim().toLowerCase() === 'fail' || password.toLowerCase() === 'fail') {
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
  }

  const connectionId = Math.max(...connections.map((item) => item.connectionId), 0) + 1
  const connection = {
    connectionId,
    providerId: provider.providerId,
    providerCode: provider.providerCode,
    providerName: provider.providerName,
    status: 'CONNECTED',
    connectedAt: new Date().toISOString(),
  }

  connections.push(connection)
  return { connectionId, status: connection.status }
}

export async function getBrokerConnection(connectionId) {
  return structuredClone(
    connections.find((connection) => connection.connectionId === Number(connectionId)) ?? null,
  )
}
