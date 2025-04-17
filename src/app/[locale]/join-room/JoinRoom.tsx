"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";

import { request } from "@/shared";
import { Button, Card, FireworkCanvas, Input } from "@/shared/ui";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";
import { ToastViewPort, useErrorToastMapper } from "@/shared/ui/Toast";
import { useToastStore } from "@/shared/ui/Toast/stores";
import GameHeader from "@/widgets/Settings/ui/GameHeader";

export default function JoinRoomPage() {
  const TJoinRoom = useTranslations("joinRoom");

  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleErrorToastByCode = useErrorToastMapper();

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { roomId } = await request<{
        roomId: string;
      }>({
        method: "GET",
        url: `/rooms`,
        params: { name: roomName },
      });
      router.push(`/room/${roomId}?username=${encodeURIComponent(username)}`);
    } catch (error) {
      handleErrorToastByCode({
        ROOM_NOT_FOUND: {
          title: "GET_ROOM_ERROR_NOT_FOUND.title",
          description: "GET_ROOM_ERROR_NOT_FOUND.description",
        },
        ROOM_ALREADY_FULL: {
          title: "GET_ROOM_ERROR_ROOM_EMPTY.title",
          description: "GET_ROOM_ERROR_ROOM_EMPTY.description",
        },
        DUPLICATED_NAME: {
          title: "GET_ROOM_SAME_USER_NAME.title",
          description: "GET_ROOM_SAME_USER_NAME.description",
        },
      })(error);
      setIsLoading(false);
    }
  };

  return (
    <ReactiveLayout
      className="flex w-full h-full flex-col min-h-[calc(100*var(--vh)-1.25rem)] justify-center items-center"
      outerClassName="relative"
      outerPreviousChildren={<GameHeader />}
    >
      <FireworkCanvas />

      <Card className="w-full max-w-md bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="text-2xl">{TJoinRoom("title")}</Card.Title>
          <Card.Description className="text-slate-300">{TJoinRoom("description")}</Card.Description>
        </Card.Header>
        <form onSubmit={handleJoinRoom}>
          <Card.Content className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="roomId" className="body-2">
                {TJoinRoom("roomNameLabel")}
              </label>
              <Input
                id="roomId"
                placeholder={TJoinRoom("roomNamePlaceholder")}
                value={roomName}
                setValue={(id: string) => setRoomName(id)}
                required
                className="border-slate-700 bg-slate-900/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="body-2">
                {TJoinRoom("usernameLabel")}
              </label>
              <Input
                id="username"
                placeholder={TJoinRoom("usernamePlaceholder")}
                value={username}
                setValue={(newUserName) => setUsername(newUserName)}
                required
                className="border-slate-700 bg-slate-900/50 text-white"
              />
            </div>
          </Card.Content>
          <Card.Footer>
            <Button variant="primarySolid" type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? TJoinRoom("joining") : TJoinRoom("joinButton")}
            </Button>
          </Card.Footer>
        </form>
      </Card>

      <ToastViewPort key="viewPort" className="bottom-[3rem]" />
    </ReactiveLayout>
  );
}
