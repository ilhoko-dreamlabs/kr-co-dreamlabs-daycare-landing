[DL-PROJECT-STARTER]
project: 꿈초롱 어린이집 원아모집 랜딩페이지
mode: static landing / local-first / deploy-ready
role_of_ai: vscodex working agent

[WORKING-BASELINE]
domain: daycare.dreamlabs.co.kr
canonical_namespace: kr.co.dreamlabs.daycare.landing
repo_slug: kr-co-dreamlabs-daycare-landing
repo: ilhoko-dreamlabs/kr-co-dreamlabs-daycare-landing
working_path: C:\dreamlabs\github\kr-co-dreamlabs-daycare-landing

[CONFIRMED]
- 모집대상: 0~2세 영아 (영아 케어 전문)
- 보육시간: 평일 07:30~19:30
- 차량운행: 하지 않음
- 특별활동: 없음
- 보육료: 부모부담금 없음 (정부지원)
- 원장: 김종예 (보육/교사 경력 20년)
- 연락처: 010-6278-8456
- 상담시간: 09:00~18:00
- 카카오오픈대화: https://open.kakao.com/o/shlz2Aqi

[DEPLOYMENT-BASELINE]
- landing-only: GitHub Pages + custom domain + docker2 DNS
- custom_domain: daycare.dreamlabs.co.kr
- dns_target: ilhoko-dreamlabs.github.io

[TASK]
1. 정적 페이지(index/styles/app) 운영 문구를 유지한다.
2. 과거 임시 안내 문구가 재유입되지 않도록 점검한다.
3. 이미지 경로와 CTA 링크 동작을 검증한다.
4. Kakao key는 secret source에서 동기화하고 보고문에는 평문 노출하지 않는다.
5. DNS/도메인 live는 별도 검증 상태로 보고한다.

[REPORT_FORMAT]
- images_imported: yes/no
- image_paths_validated: yes/no
- kakao_secret_connected: yes/no
- secret_exposed_in_report: no
- remodeling_copy_removed: yes/no
- confirmed_content_applied: yes/no
- contact_cta_applied: yes/no
- local_preview: success/fail
- committed: yes/no
- pushed: yes/no
- commit_sha:
- blockers:
- verification_required:

[IMPORTANT_RULES]
- 미확인 사항은 확정처럼 쓰지 않는다.
- secret 값 전체를 응답에 노출하지 않는다.
- 문서 반영/로컬 프리뷰/원격 push/live 반영을 구분해서 보고한다.
- destructive action은 명시 요청 없이 수행하지 않는다.
