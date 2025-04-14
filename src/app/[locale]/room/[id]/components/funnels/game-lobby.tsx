"use client";

import { Crown, UserCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { GAME_STATUS, useGameInformation, useUpdateGameStatus, useUserListStore } from "@/features";
import { Badge, Button, Card, CopyButton, Switch } from "@/shared/ui";
import { ToastViewPort } from "@/shared/ui/Toast";

export default function GameLobby() {
  const t = useTranslations();

  const [randomRoles, setRandomRoles] = useState(true);
  const [anonymousVoting, setAnonymousVoting] = useState(true);
  const [specialVoting, setSpecialVoting] = useState(false);

  const { userList } = useUserListStore();
  const { isHost } = useGameInformation();

  const { handleGameStatusChange } = useUpdateGameStatus();

  const [settings, setRoomSettings] = useState({
    roomName: "게임방",
    maxPlayers: 8,
    randomRoles: true,
    anonymousVoting: false,
    specialVoting: true,
  });

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur min-h-[40vh]">
          <Card.Header>
            <Card.Title className="flex items-center justify-between gap-2 flex-row flex-wrap">
              <span className="flex flex-row gap-1">
                {t("roomWaitCard.participants-label")}
                <span>
                  ({userList.length}/{settings.maxPlayers})
                </span>
              </span>

              <CopyButton>
                <span className="hidden sm:block ">{t("roomWaitCard.copy-invite-link")}</span>
              </CopyButton>
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <ul className="space-y-2">
              {userList.map((user) => (
                <li key={user.userId} className="flex items-center rounded-lg bg-slate-700/50 p-3">
                  <UserCircle2 className="mr-2 h-5 w-5 text-slate-300" />
                  <span className="flex-1">{user.userName}</span>
                  {user.isHost && (
                    <Badge variant={"success"} className="flex items-center gap-1">
                      <Crown className="h-3 w-3 text-warning" />
                      {t("roomWaitCard.host-badge")}
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </Card.Content>
        </Card>

        <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
          <Card.Header>
            <Card.Title>{t("gameLobby.settings-title")}</Card.Title>
          </Card.Header>
          <Card.Content>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-slate-300">{t("gameLobby.max-players")}</span>
                <span>{settings.maxPlayers}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-300">{t("gameLobby.random-roles")}</span>

                <Switch id="randomRoles" checked={randomRoles} onCheckedChange={setRandomRoles} disabled />
              </li>
              <li className="flex justify-between">
                <span className="text-slate-300">{t("gameLobby.anonymous-voting")}</span>
                <Switch id="anonymousVoting" checked={anonymousVoting} onCheckedChange={setAnonymousVoting} disabled />
              </li>
              <li className="flex justify-between">
                <span className="text-slate-300">{t("gameLobby.special-voting")}</span>
                <Switch id="specialVoting" checked={specialVoting} onCheckedChange={setSpecialVoting} disabled />
              </li>
            </ul>
          </Card.Content>
          <Card.Footer>
            {isHost ? (
              <Button
                onClick={() => {
                  handleGameStatusChange(GAME_STATUS.PLAY);
                }}
                variant="primarySolid"
                className="w-full"
              >
                {t("gameLobby.start-game")}
              </Button>
            ) : (
              <p className="text-center text-sm text-slate-400 w-full">{t("gameLobby.waiting-for-host")}</p>
            )}
          </Card.Footer>
        </Card>

        <ToastViewPort key="viewPort" className="bottom-[3rem]" />
      </div>
    </>
  );
}
