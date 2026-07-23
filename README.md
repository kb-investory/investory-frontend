# Investory Frontend

투자 포트폴리오와 투자일지, AI 대화 기능을 제공하는 Investory 프론트엔드 프로젝트입니다.

## 기술 스택

- Vue 3
- Vite
- Vue Router
- Pinia
- ESLint
- Prettier

## 실행 환경

- Node.js: `^22.18.0` 또는 `>=24.12.0`
- 패키지 관리자: npm
- 권장 IDE: VS Code
- 권장 확장 프로그램: Vue Official, ESLint, Prettier

## 프로젝트 실행

의존성을 설치합니다.

```powershell
npm.cmd install
```

개발 서버를 실행합니다.

```powershell
npm.cmd run dev
```

프로덕션 빌드를 생성합니다.

```powershell
npm.cmd run build
```

빌드 결과물을 로컬에서 확인합니다.

```powershell
npm.cmd run preview
```

> PowerShell 실행 정책에 따라 `npm` 명령이 차단될 수 있으므로 이 프로젝트에서는 `npm.cmd` 사용을 권장합니다.

## 코드 검사 및 포맷

```powershell
# ESLint 검사
npm.cmd run lint

# ESLint 자동 수정
npm.cmd run lint:fix

# Prettier 자동 포맷
npm.cmd run format

# Prettier 포맷 검사
npm.cmd run format:check
```

PR을 올리기 전 다음 명령이 모두 통과하는지 확인합니다.

```powershell
npm.cmd run lint
npm.cmd run format:check
npm.cmd run build
```

## 디렉터리 구조

```text
src/
├─ app/                         # 앱 전체 설정과 조립
│  ├─ layouts/                  # 공통 페이지 레이아웃
│  ├─ providers/                # Pinia 등 앱 전역 provider
│  ├─ router/                   # 라우터 취합, 가드, route name
│  └─ views/                    # 404 등 앱 공통 화면
├─ shared/                      # 특정 도메인에 종속되지 않는 공통 코드
│  ├─ api/                      # 공통 API 클라이언트
│  ├─ components/               # BaseButton 등 공통 UI
│  ├─ mocks/                    # 여러 기능이 공유하는 증권사·종목 목 데이터
│  ├─ services/                 # 공통 목 API 접근 함수
│  ├─ stores/                   # 공통 데이터용 Pinia 상태와 액션
│  └─ styles/                   # 전역 스타일과 CSS 변수
├─ modules/                     # 기능별 독립 모듈
│  ├─ auth/                     # 인증
│  ├─ home/                     # 홈
│  ├─ portfolio/                # 포트폴리오
│  ├─ mypage/                   # 마이페이지
│  ├─ journal/                  # 투자일지 및 투자일지 작성
│  └─ ai-conversation/          # AI 투자 대화
└─ main.js                      # 애플리케이션 진입점
```

### 모듈 내부 구조

각 기능 모듈은 다음 구조를 기준으로 하며, 실제로 필요한 디렉터리만 생성합니다.

```text
modules/{domain}/
├─ pages/                       # 라우터에 직접 연결되는 화면
├─ components/                  # 해당 기능에서만 사용하는 UI
├─ stores/                      # Pinia 상태와 액션
├─ services/                    # 목업 또는 실제 API 접근
├─ mocks/                       # 개발용 목업 데이터
└─ routes.js                    # 해당 기능의 라우트 정의
```

데이터는 다음 방향으로 흐릅니다.

```text
Page/Component → Pinia Store → Service → Mock 또는 실제 API
```

증권사와 종목처럼 여러 기능에서 함께 사용하는 기준 데이터는 `shared`의 동일한 흐름을
사용합니다. 특정 기능에만 속하는 데이터는 해당 `modules/{domain}` 내부에서 관리합니다.

- 컴포넌트에서 목업 데이터를 직접 가져오지 않습니다.
- Store는 상태와 사용자 액션 흐름을 관리합니다.
- Service는 데이터 출처를 관리하며 실제 API 도입 시 이 계층을 교체합니다.
- 여러 모듈에서 재사용하는 코드는 `shared`로 이동합니다.
- `shared`에서는 특정 `modules`의 코드를 참조하지 않습니다.
- 다른 모듈의 내부 파일을 직접 참조하는 것은 지양합니다.

## 라우팅 규칙

- 각 담당자는 자신의 모듈에 있는 `routes.js`를 관리합니다.
- `src/app/router/index.js`에서 각 모듈의 라우트를 취합합니다.
- route name은 `src/app/router/route-names.js`에서 관리합니다.
- URL은 소문자 kebab-case를 사용합니다.
- 페이지 컴포넌트는 lazy import를 사용합니다.
- `journal-create`는 별도 모듈이 아닌 `journal` 모듈의 페이지로 관리합니다.

## 기능 담당

- 1번 담당: `auth`, `home`
- 2번 담당: `portfolio`, `mypage`
- 3번 담당: `journal`
- `ai-conversation`: 담당자 확정 필요

## 팀 문서

- [코딩 및 Git 컨벤션](./docs/coding-convention.md)
- [프로젝트 디렉터리 구조](./docs/project-structure.md)
- [공통 UI 컴포넌트](./docs/ui-components.md)
- [API 계약 초안](./docs/api-contract.md)

## CI/CD

`main` 브랜치 대상 PR과 push에서 다음 검사를 수행합니다.

1. 의존성 설치
2. ESLint 검사
3. Prettier 포맷 검사
4. 프로덕션 빌드

`main` 브랜치에 push되면 빌드 결과물을 GitHub Actions artifact로 생성하고 설정된 VM으로 배포합니다.

## UI Kit 확인

홈(`/`)은 `HomePage`로 연결되어 있습니다. 공통 컴포넌트를 확인하는 UI Kit은 `/ui-kit`에서 확인할 수 있습니다.

## 테스트 (추후 도입)

<!-- TODO: Vitest로 service/store 단위 테스트를 추가한다. -->
<!-- TODO: Playwright로 로그인 → 홈 → 투자일지 작성 핵심 흐름 E2E를 추가한다. -->
<!-- TODO: CI에 단위 테스트와 E2E 실행 조건을 추가한다. -->
