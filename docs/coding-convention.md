<aside>
💡

### Git 저장소

- **프론트엔드** - https://github.com/KB7-FinanceTylenol/financetylenol-frontend
- **백엔드** - https://github.com/KB7-FinanceTylenol/financetylenol-backend

### GitHub 아이디

상우 : Dev-SangWoo / 서연 : seoyeeon / 은솔 : nsol0215

동호 : Chris-758 / 태수 : arbreol / 윤혁 : yunhyeokd

</aside>

<aside>
🔥

## 절대 금지

브랜치 Push 전에 꼭 다시 확인할 것

- API키, 비밀번호와 같은 값들은 소스코드에 직접 작성금지(무조건 환경변수로 이용)
</aside>

## 1. 브랜치 흐름

```
로컬 작업 → 로컬 커밋 → develop PR → merge → develop → main PR
```

모든 작업은 개인 로컬 브랜치에서 진행 후 `develop`으로 PR을 올린다. `develop`에 변경 사항이 쌓이면 `develop → main` PR로 릴리즈한다.

## 2. hotfix 흐름 (예외 케이스)

```
main ──────●──────────────●───────► main
             \                    ↗
              hotfix/버그명 ──────
```

- **발동 조건**: `develop`이 `main`보다 앞서 있어 정상 플로우(develop → main PR)로 배포하면 아직 검증되지 않은 변경 사항까지 함께 배포되는 상황일 때만 사용한다. `develop`과 `main`의 차이가 크지 않다면 hotfix 없이 `develop`에서 평소대로 `fix/` 브랜치를 파서 처리한다.
- **분기 기준**: `main`에서 직접 분기한다 (develop 경유하지 않음).
- **네이밍**: `hotfix/버그내용` (예: `hotfix/payment-crash`)
- **머지 대상**: 반드시 두 곳 모두에 머지한다.
    1. `main` ← hotfix PR (squash merge) → 배포
    2. `develop` ← hotfix PR (squash merge)
- **머지 순서**: `main` 먼저 → 배포 → 그 다음 `develop`
- **버전 태깅**: `main` 머지 시점에 patch 버전을 올린다 (예: `v1.2.0` → `v1.2.1`)
- **충돌 처리**: hotfix 작성자가 책임지고 rebase/충돌 해결 후 머지한다.

## 3. PR 규칙

- **머지 방식**: 무조건 Squash merge. squash 머지 시 PR 제목이 최종 커밋 메시지가 되므로, PR 제목도 커밋 컨벤션을 그대로 적용한다.
- **리뷰**: 최소 1명 이상 승인 필수, self-merge 금지
- **CI**: 현재 미설정 (개발 초기 단계). 대신 리뷰어가 머지 전 로컬에서 빌드/실행 확인. 프로젝트 안정화 후 GitHub Actions 등으로 최소 빌드 체크 도입 권장
- **PR 크기**: 숫자로 제한하지 않으나, 가능하면 작은 단위로 쪼개는 것을 권장

## 4. 커밋 / PR 제목 컨벤션 (Conventional Commits)

```
<type>: <subject>

<body>
```

| type | 의미 |
| --- | --- |
| feat | 새 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 포맷팅 (동작 변화 없음) |
| refactor | 리팩토링 |
| test | 테스트 추가/수정 |
| chore | 빌드, 패키지 매니저 설정 등 |
| perf | 성능 개선 |

**규칙**

- subject는 50자 이내, 명령형으로 작성 ("추가함" ❌ → "추가" ✓)
- subject 끝에 마침표 붙이지 않음
- body에는 무엇을, 왜 바꿨는지 작성 (어떻게는 코드가 설명)
- squash 전제이므로 작업 중 커밋 메시지(WIP 등)는 자유롭게 사용 가능. 대신 PR 제목만 엄격하게 관리

**예시**

```
feat: 소셜 로그인 기능 추가

카카오, 네이버 OAuth 연동
기존 이메일 로그인과 병행 사용 가능

Resolves: #123
```

## 5. 브랜치 네이밍

```
feature/기능명    예) feature/login-page
fix/버그명        예) fix/header-overflow
hotfix/버그명     예) hotfix/payment-crash
```

## 6. 버전 태깅

- **시점**: `develop → main` 머지 시마다 (hotfix 포함)
- **방식**: 수동 태깅. PR을 머지한 담당자가 그 자리에서 태그 생성
- **규칙**: Semantic Versioning (`v<major>.<minor>.<patch>`)
    - major: 호환되지 않는 큰 변경
    - minor: 기능 추가, 호환 유지
    - patch: 버그 수정 (hotfix는 여기 해당)

```bash
git checkout main
git pull
git tag -a v1.2.0 -m "release: 1.2.0"
git push origin v1.2.0
```

## 7. CHANGELOG

현재 미사용 (프로젝트 초기 단계이므로 생략). 추후 필요 시 수동 작성 또는 자동 생성 도구(release-please, standard-version 등) 도입 검토

## 8. PR / 이슈 템플릿

### PR 템플릿(`.github/PULL_REQUEST_TEMPLATE.md`)

```markdown
## 변경 사항
<!-- 무엇을 왜 바꿨는지 -->

## 관련 이슈
<!-- Closes #123 / Resolves #123 -->

## 테스트 방법
<!-- 리뷰어가 확인할 방법 -->
1.
2.

## 스크린샷 (UI 변경 시)

## 체크리스트
- [ ] 로컬에서 빌드/실행 확인
- [ ] 리뷰어 1명 이상 지정
```

### 이슈 템플릿(`.github/ISSUE_TEMPLATE/`)

**버그 리포트** — `bug_report.md`

```markdown
---
name: 버그 리포트
about: 버그를 발견했을 때
labels: bug
---

## 버그 설명

## 재현 방법
1.
2.

## 예상 동작

## 실제 동작

## 환경
- OS:
- 브라우저/버전:
```

**기능 요청** — `feature_request.md`

```markdown
---
name: 기능 요청
about: 새 기능 제안
labels: enhancement
---

## 해결하려는 문제

## 제안하는 해결 방법

## 대안 검토
```

**참고**

- PR 본문에 `Closes #123`을 넣으면 머지 시 관련 이슈가 자동으로 종료됨
- 이슈 템플릿에 `labels:`를 지정해두면 이슈 생성 시 자동으로 라벨이 붙음

---

## 향후 검토 항목

- CI/CD 파이프라인 도입 (branch protection에 빌드 성공 조건 추가)
- CHANGELOG 자동화 도구 도입
- 팀 규모 확대 시 리뷰어 수, PR 크기 제한 재검토