# 가족신문: chatGPT로 인터뷰


---

## 프로젝트 소개

이 프로젝트는 OpenAI의 Assistants API를 사용하여 사용자가 채팅으로 인터뷰를 진행하면 대화 내용을 바탕으로 뉴스 기사를 작성해주도록 만들었습니다. 작성된 기사는 공개된 홈 화면에 공유되어 누구나 뉴스 기사를 볼 수 있습니다.

---

## 주요 기능

### chatGPT와 채팅으로 인터뷰하면 뉴스 기사 자동 생성

### 홈화면의 뉴스페이지에서 공개열람

<img src="src\assets\1홈화면.PNG" width="200px"/>1. 홈 화면에서 인터뷰 시작하기 버튼 클릭

<img src="src\assets\2채팅화면 시작.PNG" width="200px" />2. 인터뷰 시작 버튼 클릭하여 채팅 시작

<img src="src\assets\3채팅화면 대화 중.PNG" width="200px" />3. 인터뷰 진행

<img src="src\assets\4채팅화면 사진첨부.PNG" width="200px" />대화 도중 원할 때 인터뷰 종료 버튼 클릭

<img src="src\assets\5채팅화면 뉴스 생성.PNG" width="200px" />4. 생성된 기사 확인 후 게시하기 버튼 클릭

<img src="src\assets\6홈화면움직임.gif" width="200px" />5. 홈 화면에 추가 됨

---

## 기술

Frontend: `React`, `Redux`, `Redux-toolkit`, `MUI`

Backend: `AWS`(`EC2`, `RDS`, `S3`), OpenAI `Assistants API`

Deploy: `AWS`(`S3`, `Route53`, `CloudFront`), `GitHub Actions`

---

Redux, Redux-toolkit

- 전역 상태 관리
  - 뉴스 목록 데이터를 전역 상태로 효과적으로 관리하고 이 상태의 변경을 한 곳에서 일관성 있게 관리합니다.
  - 데이터의 일관성을 유지하면서 확장성을 고려하여 뉴스 목록 데이터가 추가로 필요한 경우에도 사용 가능합니다.
- 비동기 작업 관리
  - RDS에 데이터를 추가하고 추가된 데이터를 홈화면에서 렌더링하는 작업은 비동기 작업입니다.
  - redux-toolkit을 활용하여 Thunk를 통해 비동기 작업을 처리하고 상태에 따른 로직을 실행합니다.

MUI

- 일관된 디자인 컨셉
  - MUI는 일관된 디자인 컨셉으로 디자인된 다양한 컴포넌트를 제공합니다. 이를 통해 프로젝트 내에서 일관된 디자인 스타일을 유지할 수 있습니다.
- 반응형 디자인 활용
  - 다양한 화면 크기와 디바이스에 맞게 컴포넌트를 조정하기가 수월합니다.

AWS

- 프로젝트의 백엔드 로직이 간단하여 Firebase를 통해 서버리스 아키텍처를 구현하는 것이 편리하지만 업계에서 널리 사용되는 기술과 환경에 대한 실제 경험을 쌓기 위해 AWS를 선택하였습니다.
- EC2로 서버를 배포하고, RDS로 데이터베이스를 구축, 서버와 데이터베이스의 동작을 경험했습니다.
- Route 53, Certificate Manager를 사용하여 도메인을 설정하고 HTTPS를 적용했습니다.
- S3로 정적 자산을 저장하고 Cloudfront로 HTTPS 리다이렉션을 적용했습니다.

Assistants API

- chatGPT Assistants에게 역할, 질문과 답변의 형식, 특정한 단어에 특정한 동작을 수행하도록 구성하여 특정한 기능을 수행하는 chatGPT를 프로젝트에 추가하였습니다.

---

## 배경 및 동기

- 유행하는 chatGPT를 사용하여 프론트엔드와 백엔드를 포함한 간략한 기능 만들고자 함
- 이전 업무 경험 중 소식지 연재 업무를 부서에서 담당, 팀의 상황에 따라 **퀄리티가 일정하지 않은 문제**를 경험, 또한 **글쓰기에 큰 부담**을 느낀다는 피드백 받음
- GPT를 이용하여 컨텐츠 생산의 용이성, 퀄리티 유지, 소재 제안의 편리함 및 재미 제공에 대한 기대

---

## 문제 해결 경험

> 채팅 화면의 버튼이 많아서 사용성이 안 좋은 문제

- 원인
  - assistant api는 설정해둔 명령어로 동작함
  - 명령어를 사용자에게 학습 시키는 것보다 버튼으로 입력을 실행하는 방법으로 만들었으나 버튼이 많아지는 문제가 발생
- 해결
  - 상태 값인 messageList의 변화에 따라 상호작용 해야 할 버튼만 노출
  1. messageList.length === 0 → 채팅 초기화면
     - 일반 인터뷰 시작 버튼
     - 테스트 인터뷰 시작 버튼
     - 메세지 input은 disabled 적용
  2. messageList.length !== 0 → 채팅 중
     - 인터뷰 종료 버튼 → 상태값(end)을 true로 변경
  3. end === true → 뉴스 생성된 상태
     - 뉴스 게시하기 버튼

> 여러 컴포넌트로 흩어진 CRUD 기능으로 복잡해진 상태 관리

- 원인
  - 뉴스 카드의 구성 컴포넌트가 많아짐
  - 각 컴포넌트에서 발생한 상태 변화를 전달하는 과정이 복잡해짐
- 해결
  - redux-toolkit을 사용하여 newsSlice.js에서 모든 상태 관리 로직 통합
  - 기술 선택 이유: redux를 간편하게 사용할 수 있으며 로직을 한 곳에 모아서 볼 수 있는 장점을 활용하고자 함
    - `createSlice` 를 사용하여 전역 상태 초기화
    - `createAsyncThunk`에서 비동기 작업을 실행하고 이후`extraReducers` 에서 작업 상태를 감지하여 fulfilled 상태가 되면 클라이언트의 전역 상태 변경하여 화면에 반영

> 홈 화면 로딩 지연

- 원인
  - 데이터 볼륨 증가: 뉴스 데이터의 양이 증가함에 따라 모든 데이터를 불러오는 시간이 늘어남
- 해결
  - 무한 스크롤 기능을 도입하여 데이터를 점진적으로 로드
  - 도구 선택: react-infinite-scroll-component 라이브러리
    - 구현의 용이성
    - 상태 데이터와 함수만 속성에 넣어주면 동작함
  - 상태 관리: ‘newsSlice.js’에서 모든 관련 상태 값과 로직을 관리

---

## 배운 점

- 간단한 Fake API와 다른 **복잡한 API 문서를 학습하며 적용**한 경험
- **사용자가 조작해야하는 버튼을 제공하는 방식에 대해 고민**한 결과, 진행 단계에 따라 필요한 버튼만을 보여주는 방식 사용
- AWS 서비스를 적용하면서 각 서비스의 기본적인 개념을 학습
- 몇몇 지인에게 피드백을 받아본 결과 사용자가 **AI를 사용하는 이유는 최종 결과물까지 편하게** 맞춤형으로 만들어줘야 한다는 피드백을 받음

---
