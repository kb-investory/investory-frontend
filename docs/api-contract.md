# API 계약 초안

## 기준과 운영 원칙

- 원본: `PJT_25반_4팀_investory_api_table.csv.csv` (2026-07-23 공유본)
- Base URL은 환경변수 `VITE_API_BASE_URL`로 관리한다. endpoint에는 버전 prefix를 임의로 붙이지 않는다.
- 인증이 필요한 요청은 `Authorization: Bearer {accessToken}`을 사용한다. OAuth URL 발급·콜백은 예외로 둔다.
- 요청과 응답 본문은 JSON을 사용한다. AI 스트리밍 endpoint만 `text/event-stream`을 사용한다.
- 날짜는 `YYYY-MM-DD`, 시각은 ISO 8601 문자열을 사용한다.
- `{id}`는 URL path parameter, `?`는 선택 query parameter를 뜻한다.

## 공통 미확정 항목

아래 항목은 백엔드와 합의한 뒤 이 문서를 갱신한다.

- 공통 성공 envelope 사용 여부
- 실패 응답 형식 (`code`, `message`, field error 등)과 HTTP status 기준
- 토큰 저장 위치 및 refresh 실패 시 로그아웃 처리
- 페이지네이션의 cursor 방향·정렬 기준·마지막 페이지 표현
- CORS 허용 origin 및 배포 환경별 API base URL

## Endpoint 목록

| 도메인     | Method | Endpoint                                            | 화면/용도              | 핵심 요청                                                       | 핵심 응답                                                     |
| ---------- | ------ | --------------------------------------------------- | ---------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| 인증       | GET    | `/auth/oauth/{provider}/authorize`                  | 로그인: OAuth URL 발급 | `redirectUri`, `state`                                          | `authorizationUrl`                                            |
| 인증       | POST   | `/auth/oauth/{provider}/callback`                   | OAuth 완료             | `code`, `state`, `redirectUri`                                  | `accessToken`, `refreshToken`, `expiresIn`                    |
| 인증       | POST   | `/auth/token/refresh`                               | 토큰 갱신              | `refreshToken`                                                  | 새 토큰 쌍, `expiresIn`                                       |
| 인증       | POST   | `/auth/logout`                                      | 로그아웃               | `refreshToken`                                                  | 성공 여부                                                     |
| 사용자     | GET    | `/users/me`                                         | 내 프로필              | -                                                               | `userId`, `name`, `email`, `profileImageUrl`, `oauthProvider` |
| 사용자     | PATCH  | `/users/me`                                         | 프로필 수정            | `name`, `profileImageUrl`                                       | 수정된 프로필                                                 |
| 사용자     | DELETE | `/users/me`                                         | 회원 탈퇴              | `reasonCode`                                                    | 탈퇴 처리 결과                                                |
| 알림       | GET    | `/notifications`                                    | 알림 목록              | `unreadOnly?`, `cursor?`                                        | `notifications`, `nextCursor`                                 |
| 알림       | PATCH  | `/notifications/{changeEventId}/read`               | 알림 읽음              | path `changeEventId`                                            | 변경된 알림 상태                                              |
| 증권사     | GET    | `/brokers`                                          | 증권사 선택            | `query?`                                                        | `providers[]`                                                 |
| 증권사     | POST   | `/broker-connections`                               | 증권사 연결 시작       | `providerId`, `loginId`, `password`                             | `connectionId`, `status`                                      |
| 증권사     | GET    | `/broker-connections/{connectionId}`                | 연결 상태              | path `connectionId`                                             | `status`                                                      |
| 계좌       | GET    | `/accounts`                                         | 연결 계좌 목록         | -                                                               | 증권사·계좌명·평가액·동기화 상태                              |
| 계좌       | GET    | `/accounts/{accountId}`                             | 계좌 상세              | path `accountId`                                                | 계좌 상세                                                     |
| 계좌       | PATCH  | `/accounts/{accountId}`                             | 계좌 표시명 수정       | `displayName`                                                   | 수정된 계좌                                                   |
| 포트폴리오 | GET    | `/portfolio/holdings`                               | 보유 종목              | -                                                               | 총 주식 자산, `holdings[]`                                    |
| 포트폴리오 | GET    | `/portfolio/stock/analysis`                         | 종목 분석              | `stockId`                                                       | 수익률·보유량·기간별 수익/위험도                              |
| 포트폴리오 | GET    | `/portfolio/analysis`                               | 포트폴리오 분석        | -                                                               | 수익률·보유량·기간별 수익/위험도                              |
| 종목       | GET    | `/stocks`                                           | 종목 목록              | `query?`, `market?`, `cursor?`                                  | `stockId`, 코드·명칭·시장·섹터 목록                           |
| 종목       | GET    | `/stocks/{stockId}`                                 | 종목 통합 상세         | path `stockId`                                                  | 종목·시세·보유·일지·최신 판단                                 |
| 종목       | GET    | `/stocks/{stockId}/price`                           | 종목 시세              | `startDate?`, `endDate?`                                        | 날짜별 OHLCV 목록                                             |
| 일지       | GET    | `/journals`                                         | 투자 일지 타임라인     | `stockId?`, `period?`                                           | 일지 요약 배열                                                |
| 일지       | POST   | `/journals`                                         | 투자 일지 생성         | `stockId`, 거래 정보, `initialVersion`, `sourceConversationId?` | 일지·버전 ID와 생성된 일지                                    |
| 일지       | GET    | `/journals/{journalId}`                             | 일지 상세              | path `journalId`                                                | 기본 정보·최신 버전·`versions[]`                              |
| 일지       | PATCH  | `/journals/{journalId}`                             | 일지 수정              | 거래 정보, 판단·근거·목표                                       | 수정된 일지·적용 버전                                         |
| 일지       | GET    | `/journals/{journalId}/versions/{journalVersionId}` | 일지 버전 상세         | path ID 2개                                                     | 투자 판단·근거·목표                                           |
| AI         | GET    | `/ai/conversations`                                 | AI 세션 목록           | `stockId?`, `status?`, `cursor?`                                | 세션 요약 배열                                                |
| AI         | POST   | `/ai/conversations`                                 | AI 세션 생성           | `stockId`, `entryPoint`, `initialMessage?`                      | 생성 세션                                                     |
| AI         | GET    | `/ai/conversations/{conversationId}`                | AI 세션 상세           | path `conversationId`                                           | 세션 메타·연결 일지                                           |
| AI         | PATCH  | `/ai/conversations/{conversationId}`                | 세션 상태 변경         | `status`                                                        | 수정된 세션                                                   |
| AI         | DELETE | `/ai/conversations/{conversationId}`                | 세션 삭제              | path `conversationId`                                           | 삭제 결과                                                     |
| AI         | GET    | `/ai/conversations/{conversationId}/messages`       | 메시지 목록            | `cursor?`, `limit?`                                             | 메시지 배열                                                   |
| AI         | POST   | `/ai/conversations/{conversationId}/messages`       | 메시지 전송            | `content`, `clientMessageId`, `context?`                        | 사용자 메시지·답변 ID                                         |
| AI         | GET    | `/ai/messages/{assistantMessageId}/stream`          | AI 답변 스트리밍       | path `assistantMessageId`                                       | SSE: `delta`, `citation`, `action`, `done`                    |

## 도메인 규칙

- 증권사 로그인 정보(`loginId`, `password`)는 외부 증권사 인증에만 사용하며 DB에 저장하지 않는다.
- 계좌 원본 명칭과 사용자 표시명은 분리한다 (`accountName`, `displayName`).
- 일지 수정은 동일 날짜 버전이 있으면 수정하고, 없으면 새 버전을 생성한다.
- AI 메시지의 `clientMessageId`는 중복 요청 방지용이다. `context`는 해당 AI 호출에만 사용하며 저장하지 않는다.
- AI stream에서는 최종 답변만 저장하고, `citation`과 `action`은 실시간 UI 처리용으로 사용한다.

## API 표 상세

### 인증

| Method | Endpoint                           | 핵심 요청                          | 핵심 응답                                                   |
| ------ | ---------------------------------- | ---------------------------------- | ----------------------------------------------------------- |
| GET    | `/auth/oauth/{provider}/authorize` | `provider`, `redirectUri`, `state` | `authorizationUrl`: 사용자를 이동시킬 OAuth 인증 페이지 URL |
| POST   | `/auth/oauth/{provider}/callback`  | `code`, `state`, `redirectUri`     | `accessToken`, `refreshToken`, `expiresIn`                  |
| POST   | `/auth/token/refresh`              | `refreshToken`                     | `accessToken`, `refreshToken`, `expiresIn`                  |
| POST   | `/auth/logout`                     | `refreshToken`                     | 성공 여부                                                   |

### 사용자

| Method | Endpoint    | 핵심 요청                 | 핵심 응답                                                     |
| ------ | ----------- | ------------------------- | ------------------------------------------------------------- |
| GET    | `/users/me` | -                         | `userId`, `name`, `email`, `profileImageUrl`, `oauthProvider` |
| PATCH  | `/users/me` | `name`, `profileImageUrl` | 수정된 프로필                                                 |
| DELETE | `/users/me` | `reasonCode`              | 탈퇴 처리 결과                                                |

### 알림

| Method | Endpoint                              | 핵심 요청                | 핵심 응답                                                                      |
| ------ | ------------------------------------- | ------------------------ | ------------------------------------------------------------------------------ |
| GET    | `/notifications`                      | `unreadOnly?`, `cursor?` | `changeEventId`, `accountId`, `changeType`, `notificationStatus`, `detectedAt` |
| PATCH  | `/notifications/{changeEventId}/read` | path `changeEventId`     | 읽음 처리된 알림                                                               |

`GET /notifications` 응답 형식:

```json
{
  "notifications": [
    {
      "changeEventId": 15,
      "accountId": 3,
      "changeType": "HOLDING_CHANGED",
      "notificationStatus": "SENT",
      "detectedAt": "2026-07-21T13:20:00"
    }
  ],
  "nextCursor": 15
}
```

`PATCH /notifications/{changeEventId}/read` 응답 형식:

```json
{
  "changeEventId": 15,
  "notificationStatus": "READ"
}
```

### 증권사

| Method | Endpoint                             | 핵심 요청                           | 핵심 응답                                              |
| ------ | ------------------------------------ | ----------------------------------- | ------------------------------------------------------ |
| GET    | `/brokers`                           | `query?`                            | `providerId`, `providerCode`, `providerName`, `active` |
| POST   | `/broker-connections`                | `providerId`, `loginId`, `password` | `connectionId`, `status`                               |
| GET    | `/broker-connections/{connectionId}` | path `connectionId`                 | `status`                                               |

`GET /brokers` 응답 형식:

```json
{
  "providers": [
    {
      "providerId": 1,
      "providerCode": "KB_SEC",
      "providerName": "KB증권",
      "active": true
    }
  ]
}
```

`POST /broker-connections` 요청 및 응답 형식:

```json
{
  "providerId": 1,
  "loginId": "사용자 증권사 ID",
  "password": "사용자 증권사 비밀번호"
}
```

```json
{
  "connectionId": 12,
  "status": "CONNECTED"
}
```

> `loginId`, `password`는 외부 증권사 인증 요청에만 사용하고 DB에는 저장하지 않는다.

### 계좌

| Method | Endpoint                | 핵심 요청        | 핵심 응답                           | 비고                                                                                |
| ------ | ----------------------- | ---------------- | ----------------------------------- | ----------------------------------------------------------------------------------- |
| GET    | `/accounts`             | -                | 증권사, 계좌명, 평가액, 동기화 상태 | 평가액은 `ACCOUNT_HOLDINGS`와 `DAILY_PRICE_HISTORIES`의 최신 종가를 이용해 계산     |
| GET    | `/accounts/{accountId}` | path `accountId` | 증권사, 계좌명, 평가액, 동기화 상태 | 평가액은 `ACCOUNT_HOLDINGS`와 `DAILY_PRICE_HISTORIES`의 최신 종가를 이용해 계산     |
| PATCH  | `/accounts/{accountId}` | `displayName`    | 수정된 계좌                         | 원본 계좌명은 `account_name`, 사용자가 수정한 화면 표시명은 `display_name`으로 분리 |

`PATCH /accounts/{accountId}` 요청 형식:

```json
{
  "displayName": "내 ISA 계좌"
}
```

### 포트폴리오

| Method | Endpoint                    | 핵심 요청 | 핵심 응답                                           |
| ------ | --------------------------- | --------- | --------------------------------------------------- |
| GET    | `/portfolio/holdings`       | -         | 보유 종목별 종목명, 그룹명, 보유수, 보유량, 비중    |
| GET    | `/portfolio/stock/analysis` | `stockId` | 현재 수익률, 현재 보유량, 기간별 예상 수익률·위험도 |
| GET    | `/portfolio/analysis`       | -         | 현재 수익률, 현재 보유량, 기간별 예상 수익률·위험도 |

`GET /portfolio/holdings` 응답 필드:

```text
amounts: 총 주식 자산
holdings[].name: 종목명
holdings[].sector: 그룹명
holdings[].holding: 보유수
holdings[].amount: 보유량
holdings[].weight: 비중
```

`GET /portfolio/stock/analysis` 및 `GET /portfolio/analysis` 응답에는 다음 분석 필드가 표기되어 있다.

```text
name: 종목명 (종목별 분석만 해당)
analysis.return: 현재 수익률
analysis.amount: 현재 보유량
analysis.dailyReturn: 일별 예상 수익률
analysis.halfYearReturn: 6개월 예상 수익률
analysis.yearReturn: 12개월 예상 수익률
analysis.dailyRisk: 일별 위험도
analysis.halfYearReturn: 6개월 위험도 (원본 표기)
analysis.yearReturn: 12개월 위험도 (원본 표기)
```

> 원본 표는 `halfYearReturn`, `yearReturn`을 수익률과 위험도에 중복 사용한다. 실제 API 필드명은 백엔드와 확정이 필요하다.

### 종목

| Method | Endpoint                  | 핵심 요청                                                                             | 핵심 응답                                                    |
| ------ | ------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| GET    | `/stocks`                 | `query?`(종목명·종목코드 검색어), `market?`(시장 구분), `cursor?`(다음 페이지 기준값) | `stockId`, `stockCode`, `stockName`, `market`, `sector` 목록 |
| GET    | `/stocks/{stockId}`       | path `stockId`                                                                        | 종목 정보, 최신 시세, 보유 현황, 투자일지 및 최신 판단 근거  |
| GET    | `/stocks/{stockId}/price` | path `stockId`, `startDate?`, `endDate?`                                              | 날짜, 시가, 종가(현재가), 최저가, 최고가, 거래량 목록        |

`GET /stocks` 응답 형식:

```json
{
  "stocks": [
    {
      "stockId": 1,
      "stockCode": "005930",
      "stockName": "삼성전자",
      "market": "KOSPI",
      "sector": "전기전자"
    }
  ],
  "nextCursor": 1
}
```

`GET /stocks/{stockId}` 시세 객체 필드:

```text
price.date: 날짜
price.open: 시작가
price.close: 종가 또는 현재가
price.low: 최저가
price.high: 최고가
price.trade: 거래량
```

## 프론트 연동 전 확인할 사항

- `/portfolio/stock/analysis`의 `stockId` 전달 위치(query 또는 path)를 백엔드와 확정한다.
- API 표에 비어 있는 AI 보고서 작성 endpoint는 확정 전까지 프론트 기능 범위에서 제외한다.
- 알림 endpoint는 현재 프론트 모듈이 없으므로 알림 UI 작업을 시작할 때 module과 mock을 함께 추가한다.
