"use client";

import { Badge, Button, Card } from "@/shared/ui";

import GamePlayerList from "../GamePlayerList";

type Player = {
  id: string;
  username: string;
  role?: string;
  isHost: boolean;
  isAlive: boolean;
};

interface GameRoomProps {
  players: Player[];
  isHost: boolean;
  onStartVote: () => void;
  onEndGame: () => void;
}

export default function GameRoom({ players, isHost, onStartVote, onEndGame }: GameRoomProps) {
  const alivePlayers = players.filter((p) => p.isAlive);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="flex items-center justify-between">
            <span>게임 진행 중</span>
            <Badge variant="success" className="w-max px-2 bg-transparent subhead-2 ">
              생존자: {alivePlayers.length}/{players.length}
            </Badge>
          </Card.Title>
        </Card.Header>
        <Card.Content className="mb-2">
          <GamePlayerList players={players} />
        </Card.Content>
        <Card.Footer className="flex flex-row justify-center gap-3">
          {isHost && (
            <Button variant="primaryLine" className="w-[30%] max-w-[200px]" onClick={onStartVote}>
              투표 시작하기
            </Button>
          )}
          {isHost && (
            <Button variant="errorLine" className="w-[30%] max-w-[200px]" onClick={onEndGame}>
              게임 종료
            </Button>
          )}
        </Card.Footer>
      </Card>

      <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title>게임 진행 상황</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2 text-sm">
            <p className="text-slate-300">게임이 시작되었습니다. 각 플레이어는 자신의 역할에 맞게 행동해야 합니다.</p>
            <p className="text-slate-300">방장이 투표를 시작하면 모든 플레이어가 투표에 참여할 수 있습니다.</p>
            {isHost && <p className="mt-4 text-amber-400">방장은 언제든지 투표를 시작할 수 있습니다.</p>}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
