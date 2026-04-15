# 꿈초롱 어린이집 원아모집 랜딩페이지

정적 랜딩(static landing) 기준의 로컬 우선(local-first) 패키지입니다.

## Working Baseline

- domain: `daycare.dreamlabs.co.kr`
- canonical_namespace: `kr.co.dreamlabs.daycare.landing`
- repo_slug: `kr-co-dreamlabs-daycare-landing`
- working_path: `C:\dreamlabs\github\kr-co-dreamlabs-daycare-landing`

## Confirmed

- 어린이집명: 꿈초롱 어린이집
- 주소: 서울 강서구 가양아파트 9단지 912동 106호
- 유형: 가정어린이집
- 정원: 13명
- 최근 보수공사 완료 후 신규 원아 모집
- 업로드된 내부 사진 반영
- Kakao 지도 섹션 포함

## Verification Required

- 전화번호
- 상담 가능 시간
- 상담 채널(카카오채널/네이버폼/전화 등)
- 모집 대상 연령/반 구성
- 운영시간/연장보육 여부
- 원장 소개/보육 철학
- GitHub 원격 저장소 URL
- DNS 반영 권한(docker2)
- DreamLabs Notion 표준 문서 접근 확인

## Local Preview

PowerShell:

```powershell
cd C:\dreamlabs\github\kr-co-dreamlabs-daycare-landing
.\scripts\serve-local.ps1
```

기본 포트는 `8080`이며, 브라우저에서 `http://localhost:8080`으로 확인합니다.

포트 변경:

```powershell
.\scripts\serve-local.ps1 -Port 3000
```

## Kakao Map Key

`index.html`의 `window.__KAKAO_MAP_APP_KEY__` 값은 비워둔 상태입니다.
실운영 전 Kakao Developers에서 JavaScript 키를 발급하고, 운영 도메인(`daycare.dreamlabs.co.kr`)을 등록한 뒤 키를 입력하세요.

## Deploy Baseline (Landing-Only)

DreamLabs 기준상 landing-only는 GitHub 경로를 기본으로 사용합니다.

1. GitHub Pages 배포
2. GitHub custom domain 설정(`daycare.dreamlabs.co.kr`)
3. `docker2` DNS에 CNAME 반영
4. 실제 응답 확인 후 live 처리

DNS record 예시:

- host: `daycare`
- type: `CNAME`
- value: `{github-user}.github.io`

## Status Labels

아래 상태를 구분해서 보고합니다.

- `deployment_configured`
- `domain_added`
- `dns_configured`
- `domain_live`

`domain_added`와 `domain_live`는 동일하지 않습니다.

## Git Ops

이 작업 폴더는 `git init -b main`까지 완료된 상태입니다.
remote 연결/push는 명시 입력이 있을 때만 수행합니다.

원격 설정 예시:

```powershell
git remote add origin <YOUR_GITHUB_REMOTE_URL>
git push -u origin main
```

## Helper Script

`scripts/deploy-one-shot.ps1`는 다음 작업을 보조합니다.

- 필수 파일 점검
- git 저장소 초기화/브랜치 정렬
- 선택적 커밋(`-CreateCommit`)
- 선택적 remote/push(`-GitRemoteUrl`, `-Push`)

예시:

```powershell
.\scripts\deploy-one-shot.ps1 -CreateCommit
.\scripts\deploy-one-shot.ps1 -GitRemoteUrl https://github.com/<org>/<repo>.git -CreateCommit -Push
```
