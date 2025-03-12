"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Card } from "@/shared/ui";
import { useToastStore } from "@/shared/ui/Toast/stores";

import GameLobby from "./components/game-lobby";

type GameState = "lobby" | "role-reveal" | "game" | "voting" | "special-voting" | "results";

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

export default function RoomPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "게스트";
  const isHost = searchParams.get("isHost") === "true";
  const router = useRouter();
  const { addToast } = useToastStore();

  const [playerId, setPlayerId] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>("lobby");
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
        setGameState(room.gameState);
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

      // 게임 상태 변경
      room.gameState = "role-reveal";

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

      // 상태 업데이트
      setGameState("role-reveal");
      setPlayers(room.players);
    } catch (error) {
      console.error("게임 시작 오류:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4 text-white">
        <Card className="p-8 text-center bg-slate-800/80 shadow-xl backdrop-blur">
          <h2 className="text-xl font-semibold">방 정보 로드 중...</h2>
          <p className="mt-2 text-slate-300">잠시만 기다려주세요</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 flex justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4 text-white">
      <div className="mx-auto w-full max-w-[1200px]">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{roomSettings.roomName}</h1>
            <p className="text-sm text-slate-300">방 코드: {params.id}</p>
          </div>
          <div className="flex items-center gap-2">
            {myRole && <div className="rounded-full bg-slate-700 px-3 py-1 text-sm">역할: {myRole}</div>}
            <div className="rounded-full bg-blue-600 px-3 py-1 text-sm">{username}</div>
          </div>
        </header>

        {gameState === "lobby" && (
          <GameLobby players={players} settings={roomSettings} isHost={isHost} onStartGame={startGame} />
        )}

        {/*

        {gameState === "role-reveal" && (
          <RoleReveal role={myRole || "시민"} onContinue={isHost ? nextPhase : undefined} />
        )}

        {gameState === "game" && (
          <GameRoom players={players} isHost={isHost} onStartVote={isHost ? nextPhase : undefined} />
        )}

        {gameState === "voting" && currentVote && (
          <VotingPhase
            title={currentVote.title}
            options={currentVote.options}
            timeLimit={currentVote.timeLimit}
            onSubmitVote={submitVote}
            onForceEnd={isHost ? forceEndVoting : undefined}
            hasVoted={hasVoted}
          />
        )}

        {gameState === "special-voting" && currentVote && myRole && (
          <SpecialVoting
            title={currentVote.title}
            options={currentVote.options}
            role={myRole}
            onSubmitVote={submitVote}
            onForceEnd={isHost ? forceEndVoting : undefined}
            hasVoted={hasVoted}
          />
        )}

        {gameState === "results" && (
          <VoteResults
            results={voteResults}
            players={players}
            anonymousVoting={roomSettings.anonymousVoting}
            onContinue={isHost ? nextPhase : undefined}
          />
        )}

        */}
      </div>
    </div>
  );
}
