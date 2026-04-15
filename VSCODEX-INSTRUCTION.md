[DL-PROJECT-STARTER]
project: 꿈초롱 어린이집 원아모집 랜딩페이지
mode: static landing / local-first / deploy-ready
role_of_ai: vscodex working agent

[WORKING-BASELINE]
domain: daycare.dreamlabs.co.kr
canonical_namespace: kr.co.dreamlabs.daycare.landing
repo_slug: kr-co-dreamlabs-daycare-landing
working_path: C:\dreamlabs\github\kr-co-dreamlabs-daycare-landing

[CONFIRMED]
- 어린이집명: 꿈초롱 어린이집
- 주소: 서울 강서구 가양아파트 9단지 912동 106호
- 유형: 가정어린이집
- 정원: 13명
- 최근 보수공사 완료 후 신규 원아 모집
- 실제 내부 사진 반영
- build 없는 정적 사이트 구조

[VERIFICATION_REQUIRED]
- 전화번호
- 상담 가능 시간
- 상담 채널
- 모집 대상 연령
- 운영시간 / 연장보육 여부
- GitHub remote URL
- DNS 관리 콘솔 권한(docker2)
- DreamLabs Notion 표준 문서 접근 상태

[DEPLOYMENT-BASELINE]
- landing-only: GitHub 배포 + GitHub custom domain + docker2 DNS
- app 배포: Vercel 배포 + Vercel custom domain + docker2 DNS
- 본 프로젝트는 landing-only 기준을 사용한다.

[TASK]
다음 순서대로 작업한다.

1. working_path 파일 구조를 점검한다.
2. index.html / styles.css / app.js / images/* 정상 여부를 확인한다.
3. 로컬 정적 서버로 프리뷰를 검증한다.
4. 미확정 값은 placeholder 유지 상태로 보고한다.
5. Git 저장소가 없으면 init 한다.
6. 사용자가 remote URL을 제공한 경우에만 remote 연결/push를 수행한다.
7. GitHub Pages custom domain 설정 여부를 확인한다.
8. docker2 DNS 반영은 권한/접근이 있을 때만 수행하고, 없으면 required record만 보고한다.
9. 최종 보고에서 `domain_added`, `dns_configured`, `domain_live`를 분리한다.

[REPORT_FORMAT]
- local preview: success / failed
- git init: success / skipped / failed
- github remote: connected / missing / failed
- push: success / skipped / failed
- deployment_configured: yes / no
- domain_added: yes / no
- dns_configured: yes / no
- domain_live: yes / no
- dns required record: ...
- blockers: ...
- next action: ...

[IMPORTANT_RULES]
- 미확정 사항을 확정처럼 쓰지 않는다.
- domain add와 domain live를 혼동하지 않는다.
- DNS 미반영 상태를 live로 표기하지 않는다.
- destructive action은 명시 요청 없이 진행하지 않는다.
