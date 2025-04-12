"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { GAME_STATUS, useGameInformation, useGameStatusFunnel, useSocketOrchestrator } from "@/features/GameStatus";
import GameHeader from "@/features/Settings/ui/GameHeader";
import { ROOM_OPTIONS } from "@/shared";
import { SocketConnectionError } from "@/shared/constants/error/socketError";
import { Card, InfoPage, WithErrorBoundary } from "@/shared/ui";
import { FallbackMapping } from "@/shared/ui/ErrorBoundary/ui/ErrorBoundary";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";

import { VOTE_TIME_LIMIT } from "../constants";
import GameLobby from "./funnels/game-lobby";
import GameRoom from "./funnels/game-room";
import VoteResults from "./funnels/vote-results";
import VotingPhase from "./funnels/voting-phase";
 
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

const RoomPage = WithErrorBoundary(({ params }: { params: { id: string } }) => {
  const { isSocketTryingToConnect } = useSocketOrchestrator();
  const { username } = useGameInformation();

  /** TO DO - 목킹한 이 값들은 곧 api 값으로 대체됨 */
  const [playerId, setPlayerId] = useState<string>("");
  const [myRole, setMyRole] = useState<string | null>(null);
  const [roomSettings, setRoomSettings] = useState({
    roomName: "게임방",
    maxPlayers: 8,
    randomRoles: true,
    anonymousVoting: false,
    specialVoting: true,
  });

  const funnel = useGameStatusFunnel();

  const tInfo = useTranslations("infoPage");
  const tRoom = useTranslations("Room");

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
        <header className="mb-7 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{tRoom("roomName", { roomName: roomSettings.roomName })}</h1>
            <p className="text-sm text-slate-300">{tRoom("roomId", { id: params.id })}</p>
          </div>
          <div className="flex items-center gap-2 w-[50%] flex-row justify-end flex-wrap">
            {myRole && (
              <div className="rounded-full bg-slate-700 px-3 py-1 text-sm">{tRoom("role", { role: myRole })}</div>
            )}
            <div className="rounded-full bg-blue-600 px-3 py-1 text-sm">{tRoom("username", { username })}</div>
          </div>
        </header>

        <main>
          <funnel.Render
            WAIT={({ history }) => {
              return <GameLobby settings={roomSettings} />;
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
          />
        </main>
      </div>
    </ReactiveLayout>
  );
}, fallbackMappings);

export default RoomPage;
