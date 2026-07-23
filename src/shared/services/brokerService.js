import { brokerConnectionMocks, brokerMocks } from '@/shared/mocks/brokerMock'

let connections = structuredClone(brokerConnectionMocks)

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

export async function createBrokerConnection({ providerId, loginId }) {
  const provider = brokerMocks.find((item) => item.providerId === Number(providerId))

  if (!provider?.active) {
    return { connectionId: null, status: 'FAILED' }
  }

  const connectionId = Math.max(...connections.map((item) => item.connectionId), 0) + 1
  const connection = {
    connectionId,
    providerId: provider.providerId,
    providerCode: provider.providerCode,
    providerName: provider.providerName,
    loginId,
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
