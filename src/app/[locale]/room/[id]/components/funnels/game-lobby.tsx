"use client";

import { CheckCircle, Copy, Crown, UserCircle2 } from "lucide-react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import { Badge, BadgeButton, Button, Card, Switch } from "@/shared/ui";
import { ToastViewPort } from "@/shared/ui/Toast";
import { useToastStore } from "@/shared/ui/Toast/stores";

type Player = {
  id: string;
  username: string;
  isHost: boolean;
  isAlive: boolean;
};

type GameSettings = {
  roomName: string;
  maxPlayers: number;
  randomRoles: boolean;
  anonymousVoting: boolean;
  specialVoting: boolean;
};

interface GameLobbyProps {
  players: Player[];
  settings: GameSettings;
  isHost: boolean;
  onStartGame: () => void;
}

export default function GameLobby({ players, settings, isHost, onStartGame }: GameLobbyProps) {
  const [copied, setCopied] = useState(false);

  const [randomRoles, setRandomRoles] = useState(false);
  const [anonymousVoting, setAnonymousVoting] = useState(true);
  const [specialVoting, setSpecialVoting] = useState(false);

  const { addToast } = useToastStore();

  const handleCopyLink = () => {
    setCopied(true);
    addToast({
      type: "success",
      title: "링크 복사됨",
      description: "게임 초대 링크가 복사되었습니다.",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur min-h-[40vh]">
          <Card.Header>
            <Card.Title className="flex items-center justify-between">
              <span>
                참가자 ({players.length}/{settings.maxPlayers})
              </span>

              <CopyToClipboard
                text={typeof window !== "undefined" ? window.location.href : ""}
                onCopy={() => handleCopyLink()}
              >
                <Button
                  variant="primaryLine"
                  className="border-slate-600 rounded-md h-10 text-slate-200 hover:bg-slate-700"
                >
                  {copied ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  초대 링크 복사
                </Button>
              </CopyToClipboard>
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <ul className="space-y-2">
              {players.map((player) => (
                <li key={player.id} className="flex items-center rounded-lg bg-slate-700/50 p-3">
                  <UserCircle2 className="mr-2 h-5 w-5 text-slate-300" />
                  <span className="flex-1">{player.username}</span>
                  {player.isHost && (
                    <Badge variant={"success"} className="flex items-center gap-1">
                      <Crown className="h-3 w-3 text-warning" />
                      방장
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </Card.Content>
        </Card>

        <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
          <Card.Header>
            <Card.Title>게임 설정</Card.Title>
          </Card.Header>
          <Card.Content>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-slate-300">최대 인원</span>
                <span>{settings.maxPlayers}명</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-300">랜덤 직업 부여</span>

                <Switch id="randomRoles" checked={randomRoles} onCheckedChange={setRandomRoles} disabled />
              </li>
              <li className="flex justify-between">
                <span className="text-slate-300">익명 투표</span>
                <Switch id="anonymousVoting" checked={anonymousVoting} onCheckedChange={setAnonymousVoting} />
              </li>
              <li className="flex justify-between">
                <span className="text-slate-300">특수 투표</span>
                <Switch id="specialVoting" checked={specialVoting} onCheckedChange={setSpecialVoting} disabled />
              </li>
            </ul>
          </Card.Content>
          <Card.Footer>
            {isHost ? (
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={onStartGame}>
                게임 시작
              </Button>
            ) : (
              <p className="text-center text-sm text-slate-400 w-full">방장이 게임을 시작하기를 기다리는 중...</p>
            )}
          </Card.Footer>
        </Card>

        <ToastViewPort key="viewPort" className="bottom-[3rem]" />
      </div>
    </>
  );
}
