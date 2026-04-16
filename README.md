# 꿈초롱 어린이집 원아모집 랜딩페이지

정적 랜딩(static landing) 운영 배포 기준 문서입니다.

## Working Baseline

- domain: `daycare.dreamlabs.co.kr`
- canonical_namespace: `kr.co.dreamlabs.daycare.landing`
- repo_slug: `kr-co-dreamlabs-daycare-landing`
- repo: `ilhoko-dreamlabs/kr-co-dreamlabs-daycare-landing`
- working_path: `C:\dreamlabs\github\kr-co-dreamlabs-daycare-landing`

## Confirmed Content

- 모집대상: 0~2세 영아 (영아 케어 전문)
- 보육시간: 평일 07:30~19:30
- 차량운행: 하지 않음
- 특별활동: 없음
- 보육료: 부모부담금 없음 (정부지원)
- 원장: 김종예 (보육/교사 경력 20년)
- 전화번호: 010-6278-8456
- 상담시간: 09:00~18:00
- 카카오오픈대화: https://open.kakao.com/o/shlz2Aqi

## Local Preview

```powershell
cd C:\dreamlabs\github\kr-co-dreamlabs-daycare-landing
.\scripts\serve-local.ps1
```

기본 포트: `8080`

## Kakao Map Key Sync

`secret` 소스에서 Kakao JavaScript key를 읽어 `assets/js/site-config.js`에 동기화합니다.

```powershell
.\scripts\sync-kakao-secret.ps1
```

동기화 후 지도 로딩은 Kakao Developers의 도메인 허용 설정(`daycare.dreamlabs.co.kr`)에 따라 달라질 수 있습니다.

## Deploy Baseline

landing-only 기준:

1. GitHub Pages(main/root)
2. Custom domain: `daycare.dreamlabs.co.kr`
3. docker2 DNS CNAME 반영
4. 전파/응답 확인 후 live 처리

DNS record:

- host: `daycare`
- type: `CNAME`
- value: `ilhoko-dreamlabs.github.io`

## Status Labels

- `deployment_configured`
- `domain_added`
- `dns_configured`
- `domain_live`

`domain_added`와 `domain_live`는 별도 상태입니다.
