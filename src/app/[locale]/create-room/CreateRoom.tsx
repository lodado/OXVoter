"use client";

import { method } from "lodash-es";
import { ArrowBigLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";

import GameHeader from "@/features/Settings/ui/GameHeader";
import { request, ROOM_OPTIONS } from "@/shared";
import { Button, Card, Form, Input, Switch } from "@/shared/ui";
import SpinControl from "@/shared/ui/Input/SpinControl";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";
import { useToastStore } from "@/shared/ui/Toast/stores";

import { AbilityProvider } from "./components/RoleSettingTabs/AbilityProvider";
import { RoleProvider } from "./components/RoleSettingTabs/RoleProvider";
import RoleSettingsDialog from "./components/RoleSettingTabs/RoleSettingDialog";
import { RoleType } from "./components/type";
import { FactionProvider } from "./components/VoteSettingTabs/FactionProvider";
import { VoteProvider } from "./components/VoteSettingTabs/VoteProvider";
import VoteSettingDialog from "./components/VoteSettingTabs/VoteSettingDialog";

export default function CreateRoom() {
  const t = useTranslations("createRoom");

  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [randomRoles, setRandomRoles] = useState(true);
  const [anonymousVoting, setAnonymousVoting] = useState(true);
  const [specialVoting, setSpecialVoting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToastStore();

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const roomData = {
        name: roomName,
        hostName: username,
        maxPlayerCount: maxPlayers,
        options: ROOM_OPTIONS.map(({ id }) => id),
      };

      const data = await request<{
        roomId: string;
      }>({
        method: "POST",
        url: "/rooms",
        body: JSON.stringify(roomData),
      });

      const roomId = data.roomId;
      router.push(`/room/${roomId}?username=${encodeURIComponent(username)}&isHost=true`);
    } catch (error) {
      console.error("방 생성 오류:", error);
      setIsLoading(false);

      addToast({
        title: "error",
        description: "error has occurred",
        type: "error",
      });
    }
  };

  // 직업 및 특수 투표 설정

  return (
    <AbilityProvider>
      <RoleProvider>
        <VoteProvider>
          <FactionProvider>
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

                    <div className="w-full h-[1px] my-2 bg-slate-700" />

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
                        <Switch
                          id="specialVoting"
                          checked={specialVoting}
                          onCheckedChange={setSpecialVoting}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="w-full h-[1px] my-2 bg-slate-700" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{t("advanced-settings")} (not implemented yet)</h3>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-slate-300">{t("vote-setting")}</p>
                          <VoteSettingDialog />
                        </div>

                        <div className="flex justify-between items-center">
                          <p className="text-sm text-slate-300">{t("role-setting")}</p>
                          <RoleSettingsDialog />
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
          </FactionProvider>
        </VoteProvider>
      </RoleProvider>
    </AbilityProvider>
  );
}
