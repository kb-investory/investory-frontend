export const oauthProviderMock = 'kakao'

export const oauthAuthorizationMock = {
  authorizationUrl:
    'https://kauth.kakao.com/oauth/authorize?client_id=investory-mock&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback&response_type=code&state=investory-mock-state',
}

export const authTokenMock = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  expiresIn: 3600,
}

export const authMock = {
  userId: 1,
  id: 1,
  name: '김인베스트',
  email: 'investor@investory.test',
  profileImageUrl: 'https://placehold.co/160x160?text=INV',
  oauthProvider: 'KAKAO',
}
