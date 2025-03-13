"use client";

import { AlertCircle, Crown, UserCircle2 } from "lucide-react";

import { Badge, Button, Card } from "@/shared/ui";

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
  onStartVote?: () => void;
}

export default function GameRoom({ players, isHost, onStartVote }: GameRoomProps) {
  const alivePlayers = players.filter((p) => p.isAlive);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="flex items-center justify-between">
            <span>게임 진행 중</span>
            <Badge className="border-green-500 text-green-400">
              생존자: {alivePlayers.length}/{players.length}
            </Badge>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {players.map((player) => (
              <div
                key={player.id}
                className={`flex items-center rounded-lg p-3 ${
                  player.isAlive ? "bg-slate-700/50" : "bg-red-900/20 text-slate-400 line-through"
                }`}
              >
                <UserCircle2 className="mr-2 h-5 w-5 text-slate-300" />
                <span className="flex-1">{player.username}</span>
                {player.isHost && <Crown className="h-4 w-4 text-amber-400" />}
                {!player.isAlive && <AlertCircle className="h-4 w-4 text-red-400" />}
              </div>
            ))}
          </div>
        </Card.Content>
        <Card.Footer className="flex justify-center">
          {isHost && onStartVote && (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={onStartVote}>
              투표 시작하기
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
