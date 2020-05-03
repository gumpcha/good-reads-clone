# good-reads-clone

Nomad Coders Online Hackerthon 과제

# good-reads-clone

> Nomad Coders Online Hackerthon 과제

## 앱 기능

- [ ] Log In/Sign Up
  - 회원가입. 기본 로그인 기능 및 소셜 로그인
- [ ] List
  - 전체 책 리스트를 작은 썸네일 이미지와 함께 보여줌
- [ ] Search
  - 책 이름. 저자 이름. 키워드 등으로 검색 가능
- [ ] Detail
  - 책 세부 소개 페이지. 책 이미지. 이름. 저자명. 요약 및 평점 등
- [ ] Add New
  - 책 이미지. 이름. 저자명. 요약 등을 유저가 새롭게 추가 가능
- [ ] Rate or Review회원가입. 기본 로그인 기능 및 소셜 로그인ㅍ
  - 유저들이 책에 대한 5점 평점 혹은 후기를 남길 수 있음
- [ ] Wanted to Read
  - 유저들이 읽고 싶은 책을 따로 골라서 별도 리스트를 생성하여 보관할 수 있음
- [ ] Profile Page
  - 개별 프로필 페이지 업로드한 책. 작성한 후기등을 볼 수 있음

## Front-End

> **Vue**의 기능(혹은 플러그인) 중 중점적으로 사용하지 않았던 기능 활용, 클라이언트가 완성이 되면 **React**로 변환

### 적용 기술

- [Vuex](https://vuex.vuejs.org/kr/)
  - 기존 프로젝트에서 부모-자식 간의 데이터 넘김이나 형제 컴포넌트간의 무분별한 이벤트 버스 남용으로 인해 코드가 장황해지는 것을 방지하기 위해 중앙저장소 개념의 **Vuex** 활용
  - 새로고침시 데이터가 저장되지 않는 부분에 대한 생각 필요
- [Firebase SDK](https://firebase.google.com/docs/auth/web/google-signin?hl=ko)
  - 일반 유저와 어드민 유저의 분리, 다른 UI 필요
- [Firebase 클라우드 메시징](https://firebase.google.com/docs/cloud-messaging)
  - 사이트를 구독중인 유저의 브라우저에 푸시 알림

### 구현

- 📂 api
  - 서버와의 모든 통신을 관리
  - axios
  - rxjs 연결?
    - 모든 이벤트(서버통신 포함)를 미리 연결하여 구독?
- 📂 store
  - 뷰에서의 발생되는 이벤트 관리
  - api 모듈과 연결
- rxjs
  - axios로 통신하여 데이터스트림을 store에 전달(변경, 필터링)
