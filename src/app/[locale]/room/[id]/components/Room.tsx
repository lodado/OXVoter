"use client";
 
import { UseFunnelOptions } from "@use-funnel/browser";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useSocketRegister } from "@/entities/Socket/hooks";
import GameHeader from "@/features/Settings/ui/GameHeader";
import { useFunnelWithoutHistory } from "@/shared";
import { SocketConnectionError } from "@/shared/constants/error/socketError";
import { Card, InfoPage, WithErrorBoundary } from "@/shared/ui";
import { FallbackMapping } from "@/shared/ui/ErrorBoundary/ui/ErrorBoundary";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";
import { useToastStore } from "@/shared/ui/Toast/stores";

import GameLobby from "./funnels/game-lobby";
import GameRoom from "./funnels/game-room";
import VoteResults from "./funnels/vote-results";
import VotingPhase from "./funnels/voting-phase";

type GameState = {
  lobby: {};
  game: {};
  voting: {};
  specialVoting: {};
  results: {};
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
  const searchParams = useSearchParams();
  const router = useRouter();

  const { addToast } = useToastStore();
  const { isSocketTryingToConnect } = useSocketRegister();

  const username = searchParams.get("username") || "게스트";
  const isHost = searchParams.get("isHost") === "true";

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

  const funnel = useFunnelWithoutHistory<GameState>({
    id: "game-page",
    initial: {
      step: "lobby",
      context: {},
    },
  } satisfies UseFunnelOptions<GameState>);

  // 방 데이터 로드
  useEffect(() => {
    const loadRoomData = () => {
      try {
        const roomData = localStorage.getItem(`room_${params.id}`);

        if (!roomData) {
          addToast({
            title: "방을 찾을 수 없습니다",
            description: "존재하지 않는 방입니다",
            type: "error",
          });
          router.push("/");
          return;
        }

        const room = JSON.parse(roomData) as RoomData;

        // 플레이어 ID 설정 (이미 있는 경우 찾기, 없으면 새로 생성)
        const existingPlayer = room.players.find((p) => p.username === username);
        const newPlayerId = existingPlayer?.id || uuidv4();
        setPlayerId(newPlayerId);

        // 플레이어가 없으면 추가
        if (!existingPlayer) {
          const newPlayer = {
            id: newPlayerId,
            username,
            isHost,
            isAlive: true,
          };
          room.players.push(newPlayer);
          localStorage.setItem(`room_${params.id}`, JSON.stringify(room));
        }

        // 방 데이터 설정
        setPlayers(room.players);
        setRoomSettings({
          roomName: room.name,
          maxPlayers: room.maxPlayers,
          ...room.settings,
        });

        // 현재 투표 및 결과 설정
        if (room.currentVote) {
          setCurrentVote(room.currentVote);
        }

        if (room.voteResults) {
          setVoteResults(room.voteResults);
        }

        // 내 역할 설정
        const myPlayerData = room.players.find((p) => p.id === newPlayerId);
        if (myPlayerData && myPlayerData.role) {
          setMyRole(myPlayerData.role);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("방 데이터 로드 오류:", error);
        addToast({
          title: "오류가 발생했습니다",
          description: "방 데이터를 불러오는 중 오류가 발생했습니다",
          type: "error",
        });
        router.push("/");
      }
    };

    loadRoomData();

    // 주기적으로 방 데이터 업데이트 (실시간 통신 모킹)
    const interval = setInterval(loadRoomData, 2000);

    return () => clearInterval(interval);
  }, [params.id, username, isHost, router]);

  // 게임 시작
  const startGame = () => {
    if (!isHost) return;

    try {
      const roomData = localStorage.getItem(`room_${params.id}`);

      if (!roomData) {
        return;
      }

      const room = JSON.parse(roomData) as RoomData;

      room.players.forEach((player) => {
        player.role = ROLES.CITIZEN;
      });

      // 내 역할 설정
      const myPlayerData = room.players.find((p) => p.id === playerId);
      if (myPlayerData && myPlayerData.role) {
        setMyRole(myPlayerData.role);
      }

      // 방 데이터 저장
      localStorage.setItem(`room_${params.id}`, JSON.stringify(room));

      setPlayers(room.players);
    } catch (error) {
      console.error("게임 시작 오류:", error);
    }
  };

  const tInfo = useTranslations("infoPage");

  if (isSocketTryingToConnect || isLoading) {
    return <InfoPage title={tInfo("loading-title")} description={tInfo("loading-description")} />;
  }

  return (
    <ReactiveLayout
      className="md:w-[1000px] p-4 min-h-[calc(100*var(--vh)-1.25rem)]"
      outerClassName="relative"
      outerPreviousChildren={<>{funnel.step === "lobby" && <GameHeader />}</>}
    >
      <div className="mx-auto w-full mt-6">
        <header className="mb-7 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{roomSettings.roomName}</h1>
            <p className="text-sm text-slate-300">방 ID: {params.id}</p>
          </div>
          <div className="flex items-center gap-2 w-[50%] flex-row justify-end flex-wrap">
            {myRole && <div className="rounded-full bg-slate-700 px-3 py-1 text-sm">역할: {myRole}</div>}
            <div className="rounded-full bg-blue-600 px-3 py-1 text-sm">{username}</div>
          </div>
        </header>

        <funnel.Render
          lobby={({ history }) => {
            return (
              <GameLobby
                players={players}
                settings={roomSettings}
                isHost={isHost}
                onStartGame={() => {
                  startGame();
                  history.push("game", {});
                }}
              />
            );
          }}
          game={({ history }) => {
            return (
              <GameRoom
                players={players}
                isHost={true}
                onStartVote={() => {
                  history.push("voting", {});
                }}
                onEndGame={() => {
                  history.push("lobby", {});
                }}
              />
            );
          }}
          voting={({ history }) => {
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
                  history.push("results", {});
                }}
                timeLimit={60}
              />
            );
          }}
          specialVoting={({ history }) => {
            return <div>Special Voting</div>;
          }}
          results={({ history }) => {
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
                  history.push("game", {});
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
