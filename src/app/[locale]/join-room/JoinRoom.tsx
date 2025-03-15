"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { SettingDialog } from "@/features";
import GameHeader from "@/features/Settings/ui/GameHeader";
import { Button, Card, Input } from "@/shared/ui";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";
import { ToastViewPort } from "@/shared/ui/Toast";
import { useToastStore } from "@/shared/ui/Toast/stores";

export default function JoinRoomPage() {
  const t = useTranslations("joinRoom");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToastStore();

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 로컬 스토리지에서 방 정보 확인
      const roomData = localStorage.getItem(`room_${roomName}`);

      if (!roomData) {
        addToast({
          title: t("roomNotFoundTitle"),
          description: t("roomNotFoundDescription"),
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      const room = JSON.parse(roomData);

      // 방이 가득 찼는지 확인
      if (room.players.length >= room.maxPlayers) {
        addToast({
          title: t("roomFullTitle"),
          description: t("roomFullDescription"),
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
      localStorage.setItem(`room_${roomName}`, JSON.stringify(room));

      // 1초 후 방으로 이동 (로딩 시뮬레이션)
      setTimeout(() => {
        router.push(`/room/${roomName}?username=${encodeURIComponent(username)}`);
      }, 1000);
    } catch (error) {
      console.error("방 참가 오류:", error);
      addToast({
        title: t("generalTitle"),
        description: t("generalDescription"),
        type: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <ReactiveLayout
      className="flex w-full h-full flex-col justify-center items-center"
      outerClassName="relative"
      outerPreviousChildren={<GameHeader />}
    >
      <Card className="w-full max-w-md bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="text-2xl">{t("title")}</Card.Title>
          <Card.Description className="text-slate-300">{t("description")}</Card.Description>
        </Card.Header>
        <form onSubmit={handleJoinRoom}>
          <Card.Content className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="roomId" className="body-2">
                {t("roomNameLabel")}
              </label>
              <Input
                id="roomId"
                placeholder={t("roomNamePlaceholder")}
                value={roomName}
                setValue={(id: string) => setRoomName(id)}
                required
                className="border-slate-700 bg-slate-900/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="body-2">
                {t("usernameLabel")}
              </label>
              <Input
                id="username"
                placeholder={t("usernamePlaceholder")}
                value={username}
                setValue={(newUserName) => setUsername(newUserName)}
                required
                className="border-slate-700 bg-slate-900/50 text-white"
              />
            </div>
          </Card.Content>
          <Card.Footer>
            <Button variant="primarySolid" type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("joining") : t("joinButton")}
            </Button>
          </Card.Footer>
        </form>
      </Card>

      <ToastViewPort key="viewPort" className="bottom-[3rem]" />
    </ReactiveLayout>
  );
}
