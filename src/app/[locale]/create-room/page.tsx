"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button, Card, Input, Switch } from "@/shared/ui";

export default function CreateRoomPage() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [randomRoles, setRandomRoles] = useState(true);
  const [anonymousVoting, setAnonymousVoting] = useState(false);
  const [specialVoting, setSpecialVoting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 실제 서버 통신 대신 로컬에서 UUID 생성
      const roomId = uuidv4();

      // 방 설정을 로컬 스토리지에 저장
      const roomData = {
        id: roomId,
        name: roomName,
        maxPlayers,
        settings: {
          randomRoles,
          anonymousVoting,
          specialVoting,
        },
        players: [
          {
            id: uuidv4(),
            username,
            isHost: true,
            isAlive: true,
          },
        ],
        gameState: "lobby",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(`room_${roomId}`, JSON.stringify(roomData));

      // 1초 후 방으로 이동 (로딩 시뮬레이션)
      setTimeout(() => {
        router.push(`/room/${roomId}?username=${encodeURIComponent(username)}&isHost=true`);
      }, 1000);
    } catch (error) {
      console.error("방 생성 오류:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="text-2xl">새 게임방 만들기</Card.Title>
          <Card.Description className="text-slate-300">게임 설정을 구성하고 친구들을 초대하세요</Card.Description>
        </Card.Header>
        <form onSubmit={handleCreateRoom}>
          <Card.Content className="p-2 px-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="roomName">방 이름</label>
              <Input
                id="roomName"
                placeholder="게임방 이름을 입력하세요"
                value={roomName}
                setValue={(value) => setRoomName(value)}
                required
                className=" bg-slate-900/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username">닉네임</label>
              <Input
                id="username"
                placeholder="게임에서 사용할 닉네임"
                value={username}
                setValue={(newUserName) => setUsername(newUserName)}
                required
                className=" bg-slate-900/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="maxPlayers">최대 인원</label>
              <Input
                id="maxPlayers"
                min={2}
                max={20}
                value={String(maxPlayers ?? 0)}
                setValue={(value) => setMaxPlayers(Number.parseInt(value))}
                resetValue="8"
                required
                className=" bg-slate-900/50 text-white"
              />
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-medium">게임 설정</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="randomRoles">랜덤 직업 부여</label>
                  <p className="text-xs text-slate-400">마피아, 의사 등 특수 역할 랜덤 배정</p>
                </div>
                <Switch id="randomRoles" checked={randomRoles} onCheckedChange={setRandomRoles} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="anonymousVoting">익명 투표</label>
                  <p className="text-xs text-slate-400">투표 결과에서 개인별 선택 숨김</p>
                </div>
                <Switch id="anonymousVoting" checked={anonymousVoting} onCheckedChange={setAnonymousVoting} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="specialVoting">특수 투표 활성화</label>
                  <p className="text-xs text-slate-400">역할별 특수 투표 단계 추가</p>
                </div>
                <Switch id="specialVoting" checked={specialVoting} onCheckedChange={setSpecialVoting} />
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "생성 중..." : "방 만들기"}
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </div>
  );
}
