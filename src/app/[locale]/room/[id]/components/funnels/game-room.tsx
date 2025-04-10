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
import { useTranslations } from "next-intl";

import { useUpdateGameStatus } from "@/features";

import { useVoteStore } from "../stores/useVoteStore";

export default function GameRoom({ players, isHost, onStartVote, onEndGame }: GameRoomProps) {
  const t = useTranslations("gameRoom");
  const alivePlayers = players.filter((p) => p.isAlive);

  const { handleGameStatusChange } = useUpdateGameStatus();

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur ">
        <Card.Header>
          <Card.Title className="flex items-center justify-between">
            <span>{t("title")}</span>
            <Badge variant="success" className="w-max px-2 bg-transparent subhead-2 ">
              {t("alive-players", { alive: alivePlayers.length, total: players.length })}
            </Badge>
          </Card.Title>
        </Card.Header>
        <Card.Content className="mb-2">
          <GamePlayerList players={players} />
        </Card.Content>
        <Card.Footer className="flex flex-row justify-center gap-3">
          {isHost && (
            <Button
              onClick={() => {
                handleGameStatusChange("VOTE");
              }}
              variant="primarySolid"
              className="w-[30%] min-w-[125px] max-w-[150px]"
            >
              {t("start-vote")}
            </Button>
          )}
          {isHost && (
            <Button
              variant="errorSolid"
              className="w-[30%] min-w-[120px] max-w-[150px]"
              onClick={() => {
                handleGameStatusChange("WAIT");
              }}
            >
              {t("end-game")}
            </Button>
          )}
        </Card.Footer>
      </Card>

      <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title>{t("status-title")}</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2 text-sm">
            <p className="text-slate-300">{t("status-started")}</p>
            <p className="text-slate-300">{t("status-vote")}</p>
            {isHost && <p className="mt-4 text-amber-400">{t("status-host-note")}</p>}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
