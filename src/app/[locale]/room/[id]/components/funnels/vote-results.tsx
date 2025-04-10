"use client";

import { BarChart } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { useUpdateGameStatus } from "@/features";
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
export default function VoteResults({ results, players, anonymousVoting }: VoteResultsProps) {
  const t = useTranslations("voteResults");
  const { handleGameStatusChange } = useUpdateGameStatus();
  const params = useParams();

  // 최대 득표수 계산
  const maxVotes = Math.max(...results.map((r) => r.votes), 1);

  // 플레이어 ID로 이름 찾기
  const getPlayerName = (id: string) => {
    const player = players.find((p) => p.id === id);
    return player ? player.username : t("unknown-player");
  };

  const query = useVoteResultQuery({ roomId: params.id as string });

  console.log(query);

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
            {results.map((result) => (
              <div key={result.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{result.text}</div>
                  <Badge variant="primary">{t("votes", { count: result.votes })}</Badge>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                  <div className="h-full bg-blue-600" style={{ width: `${(result.votes / maxVotes) * 100}%` }} />
                </div>

                {!anonymousVoting && result.voters && result.voters.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {result.voters.map((voterId) => (
                      <Badge key={voterId} variant="isSelected">
                        {getPlayerName(voterId)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card.Content>
        <Card.Footer className="flex justify-center">
          {
            <Button
              onClick={() => {
                handleGameStatusChange("PLAY");
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
