"use client";

import { ArrowBigLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import GameHeader from "@/features/Settings/ui/GameHeader";
import { Button, Card, Form, Input, Switch } from "@/shared/ui";
import SpinControl from "@/shared/ui/Input/SpinControl";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";

import RoleSettingsDialog from "./components/role-settings-dialog";
import { RoleType } from "./components/type";

export default function CreateRoom() {
  const t = useTranslations("createRoom");

  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [randomRoles, setRandomRoles] = useState(false);
  const [anonymousVoting, setAnonymousVoting] = useState(true);
  const [specialVoting, setSpecialVoting] = useState(false);
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

  // 직업 및 특수 투표 설정
  const [customRoles, setCustomRoles] = useState<RoleType[]>([
    {
      id: "citizen",
      name: "시민",
      description: "평범한 시민입니다. 마피아를 찾아내세요.",
      color: "#10b981",
      specialAbility: "없음",
      isEvil: false,
    },
    {
      id: "mafia",
      name: "마피아",
      description: "밤에 시민을 죽일 수 있습니다.",
      color: "#ef4444",
      specialAbility: "밤에 한 명을 죽일 수 있습니다.",
      isEvil: true,
    },
    {
      id: "doctor",
      name: "의사",
      description: "밤에 한 명을 살릴 수 있습니다.",
      color: "#3b82f6",
      specialAbility: "밤에 한 명을 마피아의 공격으로부터 보호할 수 있습니다.",
      isEvil: false,
    },
    {
      id: "police",
      name: "경찰",
      description: "밤에 한 명의 직업을 알 수 있습니다.",
      color: "#f59e0b",
      specialAbility: "밤에 한 명의 직업이 마피아인지 확인할 수 있습니다.",
      isEvil: false,
    },
  ]);

  return (
    <ReactiveLayout
      className="flex flex-col justify-center min-h-[calc(100*var(--vh)-1.25rem)] items-center py-10 relative"
      outerClassName="relative"
      outerPreviousChildren={<GameHeader />}
    >
      <Card className="w-full max-w-md bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="text-2xl">{t("Title_CreateGameRoom")}</Card.Title>
          <Card.Description className="text-slate-300">{t("Description_GamecreateRoom")}</Card.Description>
        </Card.Header>
        <Form onSubmit={handleCreateRoom}>
          <Card.Content className="relative p-0 px-6 flex flex-col gap-2">
            <Form.Field name="roomName" className="">
              <Form.Label htmlFor="roomName">{t("Label_RoomName")}</Form.Label>
              <Form.Control asChild>
                <Input
                  id="roomName"
                  placeholder={t("Placeholder_RoomName")}
                  value={roomName}
                  setValue={(value) => setRoomName(value)}
                  required
                  className=" bg-slate-900/50 text-white"
                />
              </Form.Control>
              <Form.MessageContainer>
                <Form.Message className="FormMessage" match="valueMissing">
                  {t("Placeholder_RoomName")}
                </Form.Message>
              </Form.MessageContainer>
            </Form.Field>

            <Form.Field name="username" className="">
              <Form.Label htmlFor="username">{t("Label_Username")}</Form.Label>
              <Form.Control asChild>
                <Input
                  id="username"
                  placeholder={t("Placeholder_Username")}
                  value={username}
                  setValue={(newUserName) => setUsername(newUserName)}
                  required
                  className=" bg-slate-900/50 text-white"
                />
              </Form.Control>

              <Form.MessageContainer>
                <Form.Message className="FormMessage" match="valueMissing">
                  {t("Placeholder_Username")}
                </Form.Message>
              </Form.MessageContainer>
            </Form.Field>

            <Form.Field name="maxPlayers" className="">
              <Form.Label htmlFor="maxPlayers">{t("Label_MaxPlayers")}</Form.Label>
              <Form.Control asChild>
                <SpinControl
                  id="maxPlayers"
                  min={2}
                  max={20}
                  value={maxPlayers ?? 0}
                  required
                  onChange={(e) => setMaxPlayers(Number(e.target.value))}
                  className=" bg-slate-900/50 text-white"
                  increment={() => setMaxPlayers((prev) => Math.min(prev + 1, 20))}
                  decrement={() => {
                    setMaxPlayers((prev) => Math.max(prev - 1, 2));
                  }}
                />
              </Form.Control>
              <div>
                <Form.MessageContainer>
                  <Form.Message match={"rangeUnderflow"}>{t("Message_MinPlayers")}</Form.Message>
                  <Form.Message match={"rangeOverflow"}>{t("Message_MaxPlayers")}</Form.Message>
                </Form.MessageContainer>
              </div>
            </Form.Field>

            <div className="space-y-4 pb-2">
              <h3 className="">{t("Title_GamecreateRoom")}</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="randomRoles">{t("Label_RandomRoles")}</label>
                  <p className="text-xs text-slate-400">{t("Description_RandomRoles")}</p>
                </div>
                <Switch id="randomRoles" checked={randomRoles} onCheckedChange={setRandomRoles} disabled />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="anonymousVoting">{t("Label_AnonymousVoting")}</label>
                  <p className="text-xs text-slate-400">{t("Description_AnonymousVoting")}</p>
                </div>
                <Switch id="anonymousVoting" checked={anonymousVoting} onCheckedChange={setAnonymousVoting} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="specialVoting">{t("specialVoting")}</label>
                  <p className="text-xs text-slate-400">{t("specialVoting-description")}</p>
                </div>
                <Switch id="specialVoting" checked={specialVoting} onCheckedChange={setSpecialVoting} disabled />
              </div>
            </div>

            <div className="w-full h-[1px] my-2 bg-slate-700" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">고급 설정</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-300">직업 및 특수 능력을 직접 설정하세요</p>
                  <RoleSettingsDialog roles={customRoles} onRolesChange={setCustomRoles} />
                </div>
              </div>
            </div>
          </Card.Content>
          <Card.Footer className="sticky bottom-0">
            <Form.Submit asChild disabled={isLoading}>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("Button_Creating")}
                  </>
                ) : (
                  t("Button_CreateRoom")
                )}
              </Button>
            </Form.Submit>
          </Card.Footer>
        </Form>
      </Card>
    </ReactiveLayout>
  );
}
