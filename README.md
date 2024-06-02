---

# NOTE APP 

## 소개


비동기 데이터 처리 기능을 포함한 TodoList 형태의 노트 앱입니다. 대표적인 기능으로는 글 작성과, 필터링기능이 있습니다. 

기존 `Redux-thunk` 기반에서 보일러플레이트에 대한 불편을 해소하고, 컴포넌트별 상태관리를 하기위해 `Recoil`로 리팩토링을 진행하였습니다.

<br>

- 배포페이지 : [LINK](http://ec2-3-37-151-71.ap-northeast-2.compute.amazonaws.com:3100/)

 

<br>

## 사용된 스택과 라이브러리
React, Recoil, ExpressJS, TypeScript <br>
Vite, Styled-Components, React-Quill, React-Select, React-Toastify

<br>

![noteapp-ezgif com-speed](https://github.com/hyubbb/react-note-recoil-app/assets/32926006/6539fe22-a68d-4a10-9b3a-6a308c42fbf8)

<br>

## 설명

 

- Atom과 Selector를 이용한 상태 관리 방식과 `TypeScript`와의 통합을 통해 사용성을 경험할 수 있습니다.
- 컴포넌트 구조를 체계적으로 적용하여 코드의 유지보수성과 가독성을 향상시켰습니다.

## 기능
 

- `Recoil` 상태관리 라이브러리를 이용하여 애플리케이션 내 데이터 관리.
    - 보일러 플레이트 코드 감소 및 Props의 복잡도를 개선.
- `ExpressJS`를 이용한 백엔드 서버 구축 및 CRUD 기능 구현.
- `Styled-Components`를 사용한 반응형 디자인 구현, 모바일 환경 최적화.
- 필터 기능을 이용하여 데이터 정렬
    - 노트의 우선순위 및 날짜 별 정렬 및 pin 기능 가능.
- 노트 작성, 삭제, 수정, 아카이빙 기능.
- `CloudType` 에 서버 배포, `MariaDB` 를 사용한 데이터베이스 구축.
