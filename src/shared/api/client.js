const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API 요청에 실패했습니다. (${response.status})`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}
