# BoardGame-Helper(가명)

아발론, 마피아등 여러 보드게임의 오프라인, 온라인에서 쉽게 플레이 가능하도록
투표 관련 기능을 제공하는 웹앱 사이드 프로젝트

## 구조 설명

### Feature-Sliced Design (FSD)

Feature-Sliced Design은 비즈니스 로직을 명확히 분리하고, 각 기능을 독립적으로 구성할 수 있도록 돕는 설계 방식이다. 기술 레이어 중심이 아닌 "기능 중심"으로 코드를 관리함으로써, 유지보수성과 확장성을 높이는 것이 목적이다.

```
App: 앱의 초기 설정 및 전역 설정 담당
Pages: 화면 단위, 여러 기능과 엔티티를 조합해 구성
Widgets: feature/entity/shared 레이어의 구성 요소 2개 이상을 조합한 상위 UI
Features: 독립적인 비즈니스 기능 단위
Entities: 도메인 모델과 관련 로직 정의
Shared: 공통 유틸리티, 컴포넌트, 스타일 등
```

#### 도입 배경

1. 의존성 관리가 어려웠고, 이를 구조적으로 해결할 수 있는 파일 구조가 필요했다.

2. 순환 의존성을 제거하고, 각 레이어 간 관계를 명확히 드러내고 싶었다.

#### 커스텀 룰

Widgets는 features/entities/shared 레이어의 컴포넌트 2개 이상을 조합할 때만 생성한다. widget과 feature의 경계가 모호해지는 것을 방지하기 위함이다.

대부분의 페이지는 하나의 feature만 사용하는 경우가 많다.
따라서 해당 페이지 전용 feature는 pages 폴더 내부에 위치시키며, GNB처럼 여러 페이지에서 사용하는 공통 feature만 features/widgets에 둔다.

## 소켓 데이터 핸들링 방식

소켓 핸들링에는 Publisher-Subscriber 패턴을 적용했다. 클라이언트에서 특정 이벤트를 발행(publish)하고, 서버를 거쳐 전역 상태가 구독(subscribe)된 방식으로 갱신된다. 이 구조는 백엔드의 Event Driven 패턴과 유사하게 구성되어 있다.

Publisher (Command): 클라이언트에서 소켓을 통해 서버로 명령을 전송한다. 예: `handleJoinRoomMessage()`

Subscriber (View): 서버에서 수신한 메시지는 전역 상태 스토어에서 구독하여 처리한다. 예: `useUserSocketRegister, useGameStatusSocketRegister`

전역 상태 업데이트: 구독된 데이터를 기반으로 상태를 업데이트하며 UI가 변경된다.

```
클라이언트 -> publisher -> 서버 -> subscriber -> 전역 상태 갱신
```

features/GameStatus의 useSocketOrchestrator 훅은 이러한 흐름을 통합하는 역할을 한다. 소켓 연결, 방 입장 처리, 사용자 및 게임 상태의 구독 등록 등을 하나의 흐름으로 구성하여, 컴포넌트에서는 최소한의 로직만 필요하도록 구성했다.

### 게임 상태 관리

state pattern을 활용해
각 게임의 page를 하나의 상태(페이지)로 보고,
각 페이지에서 알맞은 이벤트를 처리하도록 구현했다.
