"use client";

import { BarChart } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { GAME_STATUS, useUpdateGameStatus } from "@/features";
import { Badge, Button, Card } from "@/shared/ui";

import useVoteResultQuery from "../../hooks/useVoteResultQuery";
import GamePlayerList from "../GamePlayerList";

type Player = {
  id: string;
  username: string;
  isHost: boolean;
  isAlive: boolean;
};

type VoteResult = {
  id: string;
  text: string;

  votes: number;
  voters?: string[];
};

interface VoteResultsProps {
  results: VoteResult[];
  players: Player[];
  anonymousVoting: boolean;
  onContinue?: () => void;
}
export default function VoteResults() {
  const t = useTranslations("voteResults");
  const { handleGameStatusChange } = useUpdateGameStatus();
  const params = useParams();

  const { query } = useVoteResultQuery({ roomId: params.id as string });
  const optionMap = query.data ?? {};

  const maxVotes = Math.max(
    ...Object.entries(optionMap).map(([votingOption, voteResultCount]) => {
      return voteResultCount;
    }),
    1
  );

  return (
    <>
      <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            {t("title")}
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-6">
            {Object.entries(optionMap).map(([votingOption, voteResultCount]) => {
              return (
                <div key={votingOption} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{votingOption}</div>
                    <Badge variant="primary">{t("votes", { count: voteResultCount })}</Badge>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                    <div className="h-full bg-blue-600" style={{ width: `${(voteResultCount / maxVotes) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card.Content>
        <Card.Footer className="flex justify-center">
          {
            <Button
              onClick={() => {
                handleGameStatusChange(GAME_STATUS.PLAY);
              }}
              variant="primarySolid"
              className="max-w-[150px] w-[30%] min-w-[120px]"
            >
              {t("next-step")}
            </Button>
          }
        </Card.Footer>
      </Card>
    </>
  );
}
