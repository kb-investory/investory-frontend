# 프로젝트 디렉터리 구조

## 기본 구조

```text
src/
├─ app/                    # 앱 전체 설정과 조립
│  ├─ layouts/
│  ├─ providers/
│  ├─ router/
│  └─ views/
├─ shared/                 # 도메인에 종속되지 않는 공통 코드
│  ├─ api/
│  ├─ components/
│  ├─ mocks/               # 증권사·종목 등 공통 목 데이터
│  ├─ services/            # 공통 목 API 접근
│  ├─ stores/              # 공통 데이터용 Pinia 상태
│  └─ styles/
├─ modules/                # 기능별 독립 모듈
│  ├─ auth/
│  ├─ home/
│  ├─ portfolio/
│  ├─ mypage/
│  ├─ journal/
│  └─ ai-conversation/
└─ main.js
```

## 모듈 내부 구조

각 모듈은 필요한 디렉터리만 생성하며 다음 구성을 기준으로 합니다.

```text
modules/{domain}/
├─ pages/                  # 라우터에 직접 연결되는 화면
├─ components/             # 해당 도메인에서만 사용하는 UI
├─ stores/                 # Pinia 상태와 액션
├─ services/               # 목업 또는 실제 API 접근
├─ mocks/                  # 개발용 목업 원본 데이터
└─ routes.js               # 해당 도메인의 라우트 정의
```

## 데이터 흐름

```text
Page/Component → Pinia Store → Service → Mock 또는 실제 API
```

- 컴포넌트에서 목업 데이터를 직접 import하지 않습니다.
- Store는 상태와 사용자 액션 흐름을 관리합니다.
- Service는 데이터 출처를 감추며, 실제 API 도입 시 이 계층을 교체합니다.
- Mock은 서버 응답 형태에 맞춘 원본 fixture만 제공합니다.
- 증권사·종목처럼 여러 모듈에서 공유하는 기준 데이터는 `shared`에서 같은 흐름으로 관리합니다.

`portfolio` 모듈은 로딩과 오류 상태까지 포함한 기본 참고 구현입니다.

## 의존성 규칙

```text
app → modules, shared 사용 가능
modules → shared 사용 가능
shared → modules 사용 금지
module A → module B 직접 참조 지양
```

- 여러 모듈에서 재사용하는 코드는 `shared`로 이동합니다.
- 특정 모듈의 비즈니스 로직을 `shared`에 넣지 않습니다.
- 모듈 간 데이터 공유가 필요하면 먼저 도메인 소유권을 결정합니다.

## 라우팅 규칙

- 각 담당자는 자신의 모듈에 있는 `routes.js`를 수정합니다.
- `app/router/index.js`는 모듈 라우트를 취합하고 404 및 공통 가드를 설정합니다.
- route name은 `app/router/route-names.js`에서 관리합니다.
- URL은 소문자 kebab-case를 사용합니다.
- 페이지 컴포넌트는 lazy import를 사용합니다.

## 네이밍 규칙

- 페이지: `PortfolioPage.vue`, `JournalCreatePage.vue`
- 기능 컴포넌트: `PortfolioCard.vue`, `JournalForm.vue`
- 공통 컴포넌트: `BaseButton.vue`, `BaseLoading.vue`
- Store 파일: `portfolioStore.js`
- Store 함수: `usePortfolioStore`
- Service 파일: `portfolioService.js`
- Mock 파일: `portfolioMock.js`

## 기능 소유권

- 1번 담당: `auth`, `home`
- 2번 담당: `portfolio`, `mypage`
- 3번 담당: `journal`
- `ai-conversation`: 담당자 확정 필요

`journal-create`는 별도 모듈로 만들지 않고 `journal` 도메인의 페이지로 관리합니다.
