"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { GAME_STATUS, useGameInformation, useGameStatusFunnel, useSocketOrchestrator } from "@/features/GameStatus";
import GameHeader from "@/features/Settings/ui/GameHeader";
import { SocketConnectionError } from "@/shared/constants/error/socketError";
import { Card, InfoPage, WithErrorBoundary } from "@/shared/ui";
import { FallbackMapping } from "@/shared/ui/ErrorBoundary/ui/ErrorBoundary";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";

import GameLobby from "./funnels/game-lobby";
import GameRoom from "./funnels/game-room";
import VoteResults from "./funnels/vote-results";
import VotingPhase from "./funnels/voting-phase";

/** 
  WAITING: "WAITING",
  PLAY: "PLAY",
  VOTED: "VOTED",
  DONE: "DONE",
 */

type GameState = {
  [GAME_STATUS.WAITING]: {};
  [GAME_STATUS.PLAY]: {};
  [GAME_STATUS.VOTED]: {};
  specialVoting: {};
  [GAME_STATUS.DONE]: {};
};

type Player = {
  id: string;
  username: string;
  role?: string;
  isHost: boolean;
  isAlive: boolean;
};

type VoteOption = {
  id: string;
  text: string;
};

type VoteResult = {
  optionId: string;
  votes: number;
  voters?: string[];
};

type RoomData = {
  id: string;
  name: string;
  maxPlayers: number;
  settings: {
    randomRoles: boolean;
    anonymousVoting: boolean;
    specialVoting: boolean;
  };
  players: Player[];
  gameState: GameState;
  votes?: Map<string, string>;
  specialVotes?: Map<string, string>;
  voteResults?: VoteResult[];
  currentVote?: {
    title: string;
    options: VoteOption[];
    timeLimit?: number;
  };
};

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

  const [playerId, setPlayerId] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [myRole, setMyRole] = useState<string | null>(null);
  const [roomSettings, setRoomSettings] = useState({
    roomName: "게임방",
    maxPlayers: 8,
    randomRoles: true,
    anonymousVoting: false,
    specialVoting: true,
  });

  const [currentVote, setCurrentVote] = useState<{
    title: string;
    options: VoteOption[];
    timeLimit?: number;
  } | null>(null);

  const [voteResults, setVoteResults] = useState<VoteResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);

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
      outerPreviousChildren={funnel.step === GAME_STATUS.WAITING && <GameHeader />}
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

        <funnel.Render
          WAITING={({ history }) => {
            return (
              <GameLobby
                players={players}
                settings={roomSettings}
                isHost={false}
                onStartGame={() => {
                  // history.push("game", {});
                }}
              />
            );
          }}
          PLAY={({ history }) => {
            return (
              <GameRoom
                players={players}
                isHost={true}
                onStartVote={() => {
                  //  history.push("voting", {});
                }}
                onEndGame={() => {
                  // history.push("lobby", {});
                }}
              />
            );
          }}
          VOTED={({ history }) => {
            return (
              <VotingPhase
                title={"투표하기"}
                players={players}
                isHost={true}
                options={[
                  { id: "yes", text: "찬성" },
                  { id: "no", text: "반대" },
                  { id: "abstain", text: "기권" },
                ]}
                onSubmitVote={(optionId: string) => {
                  // history.push("results", {});
                }}
                timeLimit={60}
              />
            );
          }}
          specialVoting={({ history }) => {
            return <div>Special Voting</div>;
          }}
          DONE={({ history }) => {
            return (
              <VoteResults
                results={[
                  {
                    id: "yes",
                    text: "찬성",
                    votes: 1,
                    voters: [playerId],
                  },
                  {
                    id: "no",
                    text: "반대",
                    votes: 2,
                    voters: [playerId],
                  },

                  {
                    id: "abstain",
                    text: "기권",
                    votes: 3,
                    voters: [playerId],
                  },
                ]}
                players={players}
                anonymousVoting={false}
                onContinue={() => {
                  // history.push("game", {});
                }}
              />
            );
          }}
        />
      </div>
    </ReactiveLayout>
  );
}, fallbackMappings);

export default RoomPage;
