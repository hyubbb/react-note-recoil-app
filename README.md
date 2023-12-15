# React + TypeScript + Vite

`react`, `recoil`, `typescript` 사용

react-note-app 의 리팩토링 버전

redux를 recoil로 변경

# todo

추가한태그들을 navbar하단으로 위치시켜 해쉬태그처럼 누르면 그 노트만보이게 하기
노트누르기전 수정할수있었던 ui를 메인에서는 글과 택스트만 표시하고, 눌럿을떄 수정할수잇는 버튼보이게 하기
현재 content 를 눌러야만 클릭이 작동 하게 되어있는데 isPinned때문에 title영역은 클릭을 제한해둔것 같다. 전체영역을 클릭영역으로 변경하기 위해서, Pinned를 부모div로 뺴낸다음 fixed로 설정하기
태그기능 mainNotes에만 걸리는거 archive 별도로 걸리게 type으로 구분해주기

atoms 파일 복잡하니까 파일나누기
express.js와 react-query를 추가할 예정

jsonplaseholder api를 일단 사용
