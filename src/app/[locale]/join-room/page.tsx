"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button, Card, Input } from "@/shared/ui";
import { ToastViewPort } from "@/shared/ui/Toast";
import { useToastStore } from "@/shared/ui/Toast/stores";

export default function JoinRoomPage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToastStore();

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 로컬 스토리지에서 방 정보 확인
      const roomData = localStorage.getItem(`room_${roomId}`);

      if (!roomData) {
        addToast({
          title: "방을 찾을 수 없습니다",
          description: "올바른 방 코드를 입력했는지 확인하세요",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      const room = JSON.parse(roomData);

      // 방이 가득 찼는지 확인
      if (room.players.length >= room.maxPlayers) {
        addToast({
          title: "방이 가득 찼습니다",
          description: "다른 방에 참가하거나 새 방을 만드세요",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      // 플레이어 추가
      const newPlayer = {
        id: uuidv4(),
        username,
        isHost: false,
        isAlive: true,
      };

      room.players.push(newPlayer);

      // 업데이트된 방 정보 저장
      localStorage.setItem(`room_${roomId}`, JSON.stringify(room));

      // 1초 후 방으로 이동 (로딩 시뮬레이션)
      setTimeout(() => {
        router.push(`/room/${roomId}?username=${encodeURIComponent(username)}`);
      }, 1000);
    } catch (error) {
      console.error("방 참가 오류:", error);
      addToast({
        title: "오류가 발생했습니다",
        description: "다시 시도해주세요",
        type: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="text-2xl">게임방 참가하기</Card.Title>
          <Card.Description className="text-slate-300">방 코드와 닉네임을 입력하여 게임에 참가하세요</Card.Description>
        </Card.Header>
        <form onSubmit={handleJoinRoom}>
          <Card.Content className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="roomId">방 코드</label>
              <Input
                id="roomId"
                placeholder="초대받은 방 코드를 입력하세요"
                value={roomId}
                setValue={(id: string) => setRoomId(id)}
                required
                className="border-slate-700 bg-slate-900/50 text-white"
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
                className="border-slate-700 bg-slate-900/50 text-white"
              />
            </div>
          </Card.Content>
          <Card.Footer>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "참가 중..." : "방 참가하기"}
            </Button>
          </Card.Footer>
        </form>
      </Card>

      <ToastViewPort key="viewPort" className="bottom-[6.25rem]" />
    </div>
  );
}
