# 공통 UI 컴포넌트

첨부된 `Investory UI Kit` HTML을 Vue 컴포넌트로 변환한 목록입니다.

## 확인 방법

개발 서버 실행 후 `/ui-kit`에서 전체 컴포넌트를 확인할 수 있습니다.

```powershell
npm.cmd run dev
```

## 공통 컴포넌트

| 분류       | 컴포넌트               | 역할                            |
| ---------- | ---------------------- | ------------------------------- |
| Icon       | `AppIcon`              | `@lucide/vue` 기반 공통 아이콘  |
| Navigation | `MobileStatusBar`      | 모바일 상태바 예시              |
| Navigation | `AppBar`               | 제목, 뒤로 가기, 더보기 액션    |
| Navigation | `BottomTabBar`         | 모바일 하단 탭 메뉴             |
| Action     | `BaseButton`           | Primary/Secondary 버튼          |
| Action     | `IconButton`           | 아이콘 전용 버튼                |
| Action     | `FloatingActionButton` | 주요 추가 액션 FAB              |
| Input      | `BaseTextField`        | 라벨이 있는 한 줄 입력          |
| Input      | `SearchInput`          | 검색어 입력                     |
| Input      | `BaseTextarea`         | 글자 수가 표시되는 여러 줄 입력 |
| State      | `BaseToggle`           | Boolean 토글                    |
| State      | `BaseBadge`            | 강조 배지                       |
| State      | `StepRow`              | 완료/잠금 단계 표시             |
| Card       | `BaseCard`             | 기본 카드 컨테이너              |
| Card       | `MetricStrip`          | 지표 목록                       |
| List       | `NavigationRow`        | 아이콘과 설명이 있는 이동 행    |

공통 컴포넌트는 `src/shared/components`에 위치하며 특정 도메인의 Store나 Service를 참조하지 않습니다.

아이콘은 SVG path를 직접 관리하지 않고 `@lucide/vue`에서 필요한 아이콘만 import합니다. 화면에서는 아이콘 라이브러리를 직접 사용하지 않고 `AppIcon`을 통해 이름과 크기를 통일합니다.

## 투자일지 전용 컴포넌트

다음 컴포넌트는 투자일지 도메인에 종속되므로 `src/modules/journal/components`에 위치합니다.

- `JournalCard`
- `TradeSummary`
- `ReviewCta`
- `JournalForm`

## 디자인 토큰

색상, 폰트, 테두리 값은 `src/shared/styles/base.css`의 CSS 변수로 관리합니다.

- 기본 배경: `#FAFAF8`
- 기본 텍스트: `#181817`
- 강조 색상: `#E8B931`
- 강조 배경: `#FFF2BD`, `#FFF9E7`
- 기본 폰트: Noto Sans KR
- 숫자 및 날짜: Geist Mono
