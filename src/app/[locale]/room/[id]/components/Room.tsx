"use client";
 
import { isEmpty } from "lodash-es";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef } from "react";

import {
  GAME_STATUS,
  GameInformation,
  useGameInformation,
  useGameStatusFunnel,
  useGameStatusStore,
  useSocketOrchestrator,
} from "@/features/GameStatus";
import { ROOM_OPTIONS } from "@/shared";
import { SocketConnectionError } from "@/shared/constants/error/socketError";
import { InfoPage, WithErrorBoundary } from "@/shared/ui";
import { FallbackMapping } from "@/shared/ui/ErrorBoundary/ui/ErrorBoundary";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";
import GameHeader from "@/widgets/Settings/ui/GameHeader";

import { VOTE_TIME_LIMIT } from "../constants";
import DestroyGameRoom from "./funnels/DestroyGameRoom";
import GameLobby from "./funnels/game-lobby";
import GameRoom from "./funnels/game-room";
import VoteResults from "./funnels/vote-results";
import VotingPhase from "./funnels/voting-phase";
import GameRoomHeader from "./GameRoomHeader";

// 역할 정의
const ROLES = {
  CITIZEN: "시민",
  MAFIA: "마피아",
  DOCTOR: "의사",
  POLICE: "경찰",
};

const fallbackMappings: FallbackMapping[] = [
  {
    condition: (error: Error) => error instanceof SocketConnectionError,
    component: (props) => (
      <InfoPage {...props} title="서버 연결 오류" description="서버와 연결할 수 없습니다 잠시 후 시도해주세요." />
    ),
  },
];

const RoomPage = WithErrorBoundary(({ gameInformation }: { gameInformation: GameInformation }) => {
  const params = useParams();
  const router = useRouter();
  const tInfo = useTranslations("infoPage");

  const funnel = useGameStatusFunnel();

  const { username } = useGameInformation();
  const { isSocketTryingToConnect } = useSocketOrchestrator();

  if (isEmpty(username)) {
    router.push(`/join-room?roomName=${gameInformation.roomName}`);
  }

  if (isSocketTryingToConnect) {
    return <InfoPage title={tInfo("loading-title")} description={tInfo("loading-description")} />;
  }

  return (
    <ReactiveLayout
      className="md:w-[1000px] p-4 min-h-[calc(100*var(--vh)-1.25rem)]"
      outerClassName="relative"
      outerPreviousChildren={funnel.step === GAME_STATUS.WAIT && <GameHeader />}
    >
      <div className="mx-auto w-full mt-6">
        <GameRoomHeader />

        <main>
          <funnel.Render
            WAIT={({ history }) => {
              return <GameLobby />;
            }}
            PLAY={({ history }) => {
              return <GameRoom />;
            }}
            VOTE={({ history }) => {
              return <VotingPhase options={ROOM_OPTIONS} timeLimit={VOTE_TIME_LIMIT} />;
            }}
            // TODO:  직업 및 특별 투표 구현 예정
            specialVoting={({ history }) => {
              return <div>Special Voting</div>;
            }}
            DONE={({ history }) => {
              return <VoteResults />;
            }}
            DESTROY={({ history }) => {
              return <DestroyGameRoom />;
            }}
          />
        </main>
      </div>
    </ReactiveLayout>
  );
}, fallbackMappings);

export default RoomPage;
