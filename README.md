## Minesweeper
지뢰찾기 게임(http://freeminesweeper.org/minecore.html)을 구현해 본 프로젝트이다. React, Redux, Typescript 기반으로 작성되었다.


### Install & Execute
```
git clone https://github.com/tykim5931/Minesweepr.git
or download zip
```
```
cd Minesweepr-main
npm install
npm start
```

### Program Overview

<img src="https://user-images.githubusercontent.com/67325264/188520162-20958289-374b-42cb-a631-fa1691f6e264.png"/>

```
- 기존의 지뢰찾기 룰과 동일한 룰을 갖는다.
- 게임 상태는 보드 상단 중앙의 아이콘으로 표시된다. 게임 중일 시😶, 게임 실패 시😓, 게임 성공 시😄로 표시된다.
- 게임 상태 아이콘을 클릭하면 재시작이 가능하다.
- 첫 번째 선택에서는 지뢰를 만나지 않는다.
- Beginner (8X8, 10), Intermediate (16X16, 40), Expert (32X16, 99) 세 가지 난이도를 선택할 수 있다.
- 칸을 우클릭하면 깃발로 표시할 수 있다. 깃발 클릭은 게임 시작 후(첫 번째 칸을 연 후)에만 가능하다.
- 게임보드 상단 우측의 타이머는 게임 플레이 시간을 보여준다.
```

### Tech Stack

[![TypeScript Badge](https://img.shields.io/badge/Typescript-235A97?style=flat-square&logo=Typescript&logoColor=white)]()
[![React Badge](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white)]()
[![Redux Badge](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white)]()

### Dependencies

```
"@reduxjs/toolkit": "^1.8.5",
"@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^13.3.0",
"@testing-library/user-event": "^14.4.3",
"@types/jest": "^27.5.2",
"@types/node": "^17.0.45",
"@types/react": "^18.0.18",
"@types/react-dom": "^18.0.6",
"moment": "^2.29.4",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-redux": "^8.0.2",
"react-scripts": "5.0.1",
"react-use": "^17.4.0",
"styled-components": "^5.3.5",
"typescript": "^4.8.2",
"web-vitals": "^2.1.4"
"@types/styled-components": "^5.1.26"
```

### Coding Convention

```
[Feat] : 새로운 기능 추가
[Chore] : 버그 수정, 중요도 낮은 기능의 수정 등
[Docs] : 문서 추가 및 변경
[Style] : 코드 포맷팅, 로직의 변화는 없이 띄어쓰기나 탭 문자 등의 사소한 변화
[UI] : 기능상의 변경 없이 UI 요소 수정
```
