# FE_Client

<div style="text-align: center;">
  <img src="https://github.com/FastCampus-Mini5/BE_server/assets/86757234/55cceba1-9349-4336-9439-8fd86e195f24"/>
</div>

<div align=center><h1> 🐻‍❄ 프로젝트 소개</h1></div>

> **개발 기간** : 2023. 07. 24 ~ 2023. 08. 10<br /> > **배포 주소** : [당연하지](https://group5ofcourse.netlify.app/ 'https://group5ofcourseadmin.netlify.app/')<br /> > **유저 레포지토리** : [유저](https://github.com/FastCampus-Mini5/FE-Of-course)<br /> > **관리자 레포지토리** : [관리자](https://github.com/FastCampus-Mini5/FE-Of-course-admin)<br /> > **백엔드 레포지토리** : [백엔드](https://github.com/FastCampus-Mini5/BE_server)
> <br />

<div align=center><h1>📚 STACKS</h1></div>

Config  
<img src="https://img.shields.io/badge/Npm-CB3837?style=flat&logo=npm&CB3837&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white"/>

Development  
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/StyledComponents-DB7093?style=flat&logo=styledcomponents&logoColor=white"/>

Deployment  
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white"/>

  <div align=center><h1>💬 Communication</h1></div>
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white">
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=Zoom&logoColor=white">
  <br>

  <div align=center><h1>👨‍👩‍👧‍👦 팀원 역할</h1></div>
  
| <a href="https://github.com/hookor"><img src="https://avatars.githubusercontent.com/u/115582699?v=4" width=200px alt="안중후" /></a> | <a href="https://github.com/fronttemp"><img src="https://avatars.githubusercontent.com/u/128144054?v=4" width=200px alt="이정환" /></a> | <a href="https://github.com/hahahaday12"><img src="https://avatars.githubusercontent.com/u/101441685?v=4" width=200px alt="김하은" /></a> | 
| :----------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | 
|                                                 [안중후](https://github.com/hookor)                                                  |                                                 [이정환](https://github.com/fronttemp)                                                  |                                                 [김하은](https://github.com/DevYBecca)
|                                                          GitHub 팀장<br /> 초기 개발 세팅<br /> 메인 페이지<br /> 로그인, 회원가입, 로그아웃<br /> Header                                                       |                                                        관리자 페이지<br /> (사원 관리, 연차 관리, 당직 관리)                                                          |                                                            마이 페이지<br /> (연차 조회, 당직 조회, 비밀번호 수정)

  <div align=center><h1>🖥 기능 소개</h1></div>

**1️⃣ 유저/관리자 로그인 페이지**

- localStorage토큰값을 통해 로그인 유저 판별 / 비로그인 유저 로그인 유저용 페이지 진입 차단 / 로그인 유저 로그인,회원가입,비밀번호 재설정 등 비로그인 유저용 페이지 분리
- 관리자가 승인을 했을 경우에만 회원가입한 아이디 사용가능

**2️⃣ 회원가입 페이지**

- 이메일 중복체크 API를 통해 이메일 중복체크 후 회원가입 가능
- 비밀번호(영어 대문자, 영어 소문자, 숫자, 특수문자를 모두 포함 (8글자 이상)) && 비밀번호 확인을 통해 유효한 정보 입력시 회원가입 처리

**3️⃣ 비밀번호 재설정 페이지**

- 이메일 입력시 이메일을 통해 임시 비밀번호 발급

**4️⃣ 전체 홈페이지**

- fullCalendar 연동후 모든 , 연차 당직 데이터 조회
- 신청 분류에 따른 이벤트 색 표시
- 내가 신청한 연차 신청 현황 데이터 조회
- 내가 신청한 당직 신청 현황 데이터 조회
- 연차 신청 상태 값에 따른 상태값 표시
- 당직 신청 상태 값에 따른 상태값 표시
- 연차 신청 취소 클릭시 연차 취소후 fullCalendar 업데이트
- 당직 신청 취소 클릭시 당직 취소후 fullCalendar 업데이트
- 엑셀로 다운받기 클릭시 분류(연차, 당직)에 따라 엑셀 다운로드
- 연차/ 당직 버튼 클릭시 페이지 이동
- 로드 아이콘 클릭시 화면 리로드

**5️⃣ 프로필 수정 페이지**

- 프로필 이미지 수정/삭제
- 비밀번호 변경(영어 대문자, 영어 소문자, 숫자, 특수문자를 모두 포함 (8글자 이상)) && 비밀번호 확인

**6️⃣ 내 일정보기 페이지**

- 현재 신청한 연차, 당직 데이터 조회

**7️⃣ 연차/당직 신청 페이지**

- 연차 신청, 당직 신청 버튼에 따라 데이터 다르게 조회
- 연차신청 날짜 클릭시 연차 신청 모달 생성
- 당직신청 날짜 클릭시 당직 모달 생성
- 날짜 선택시 현재 로컬 날짜 기준 이전 날짜는 선택 불가
- 모달창에서 날짜 선택후 등록시 조건값에 따라 이미 신청된 날짜 등록 불가.

**8️⃣ 관리자 - 전체 유저 / 회원가입 요청 리스트 페이지**

- 어드민 계정을 입력하지않고 다른 페이지로 이동할 경우 토큰 값이 없으면 로그인페이지로 이동
- 사용자 측 회원가입 요청 리스트로 출력
- 사용자 측 회원가입시 관리자 승인 기능

- 전체 가입된 유저 리스트 출력
  - 유저 리스트 : 성명, 아이디, 입사일, 잔여 연차
  - 리스트는 입사일 기준으로 내림차순 정렬

**9️⃣ 관리자 - 연차/당직 승인 페이지**

- 연차

  - 연차 리스트 : 성명, 아이디 , 사유, 신청일, 시작일, 종료일
  - 리스트는 시작일 기준으로 내림차순 정렬
  - 추가적으로 신청일, 시작일, 종료일 기준으로 정렬 기능 추가

- 당직

  - 당직 리스트 : 성명, 아이디, 신청일, 당직일
  - 리스트는 당직일 기준으로 내림차순 정렬
  - 추적으로 신청일, 당직일 기준으로 정렬 기능 추가

- 검색 기능
  - 전체 리스트 검색
  - 사용자 성명을 통한 검색
  - 년, 월을 통한검색

**🔟 관리자 - 연차/당직 리스트 페이지**

- 연차

  - 요청 리스트 : 성명, 아이디, 신청일, 시작일, 종료일, 승인여부
  - 리스트는 사용자들이 신청한 기준으로 정렬
  - 승인여부에 승인 기능과 거절 기능

- 당직

  - 요청 리스트 : 성명, 아이디, 신청일, 당직일, 승인여부

- 공통
  - 승인시 사용자측에서 승인 확인 가능
  - 거절시 사용자측에서 거절확인 가능
