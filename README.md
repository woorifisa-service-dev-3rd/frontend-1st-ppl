![image](https://github.com/woorifisa-service-dev-3rd/frontend-1st-ppl/assets/52206904/59471e07-e4e9-4952-b9b2-9ef6f7a40d92)

# 서비스 소개
저희 박박이 팀은 항상 점심시간에 무엇을 먹을지 고민하는 불편함을 해소하고자 상암 IT타워에 있는 음식점, 카페 등을 추천해주는 웹사이트를 개발하였습니다.

![ppl](https://github.com/woorifisa-service-dev-3rd/frontend-1st-ppl/assets/52206904/de03feae-a387-465f-b946-e1e4d3eb2e45)


# 이용 방법
> 저희 웹사이트는 다음과 같은 기능을 포함하고 있습니다.
1. 카테고리 별 음식점 보기
2. 좋아요 버튼을 눌러서 찜 목록에 추가 (JS 추가 시 구현)
3. 모달로 찜 목록 보기 및 목록 삭제 기능 (JS 추가 시 구현)
4. 찜 목록을 기반으로 랜덤으로 하나 골라서 추천해주기 (JS 추가 시 구현)

# UI 스타일 가이드라인
<img width="580" alt="UI" src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-ppl/assets/68735700/67c04e46-2eb7-47fe-899c-d6dd7c041213">
<img width="454" alt="image" src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-ppl/assets/52206904/e1717af0-6c2f-4967-8591-e6e177fc8f62">

# Lighthouse 접근성 개선 과정
- 기존에는 접근성이 62점으로 낮은 점수였습니다.
<img width="411" alt="image" src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-ppl/assets/52206904/983450b2-301c-4b8c-882f-fed8239efb10">

- img의 alt와 button의 title a태그의 aria-label 등을 추가하여 웹 접근성을 높였습니다.
- meta태그를 추가하여 seo를 최적화 하였습니다.
<img width="423" alt="image" src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-ppl/assets/52206904/f8a7c3fa-044f-4b96-a63e-650b599461c2">


# commit convention

| 커밋 유형 | 의미 |
| --- | --- |
| Feat | 새로운 기능 추가 |
| Fix | 버그 수정 |
| Docs | 문서 수정 |
| Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| Refactor | 코드 리팩토링 |
| Test | 테스트 코드, 리팩토링 테스트 코드 추가 |
| Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
| Design | CSS 등 사용자 UI 디자인 변경 |
| Comment | 필요한 주석 추가 및 변경 |
| Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
| Remove | 파일을 삭제하는 작업만 수행한 경우 |
| !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |

> [예시] Feat: 로그인 화면 개발
