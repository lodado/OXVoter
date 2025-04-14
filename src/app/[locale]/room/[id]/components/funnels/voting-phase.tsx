"use client";

import { AlertTriangle, Timer } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import {
  GAME_STATUS,
  useGameInformation,
  useSubmitVotePublisher,
  useUpdateGameStatus,
  useUserListStore,
  useVoteStateStore,
} from "@/features";
import { useCleanUp } from "@/shared/hooks";
import { Button, Card, ProgressBar, RadioGroup } from "@/shared/ui";

import GamePlayerList from "../GamePlayerList";

type VoteOption = {
  id: string;
  text: string;
};

interface VotingPhaseProps {
  options: VoteOption[];

  timeLimit?: number;
}
export default function VotingPhase({ options, timeLimit }: VotingPhaseProps) {
  const t = useTranslations("votingPhase");

  const { isHost } = useGameInformation();
  const { userList } = useUserListStore();

  const { voteTimeout, voteCount, totalUserCount } = useVoteStateStore();
  const [currentTime, setCurrentTime] = useState(Date.now());

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [localHasVoted, setLocalHasVoted] = useState(false);

  const { submitGameVote, cleanVoteCount } = useSubmitVotePublisher();
  const { handleGameStatusChange } = useUpdateGameStatus();

  const handleVoteSubmit = () => {
    if (selectedOption) {
      setLocalHasVoted(true);

      submitGameVote(selectedOption);
    }
  };

  useEffect(() => {
    if (!timeLimit) return;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        return Date.now();
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLimit]);

  const timeLeftInSeconds = Math.max(0, Math.round((voteTimeout - currentTime) / 1000));

  useCleanUp(() => {
    cleanVoteCount();
  });

  return (
    <>
      <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="flex items-center justify-between mb-2">
            <div className="flex flex-row gap-2">
              <span>{t("title")}</span>

              <span>
                ({voteCount} / {userList.length})
              </span>
            </div>

            {timeLimit && (
              <div className="flex items-center gap-2 text-sm">
                <Timer className="h-4 w-4" />
                <span>{t("time-left", { time: timeLeftInSeconds })}</span>
              </div>
            )}
          </Card.Title>
          {timeLimit && <ProgressBar value={(timeLeftInSeconds / timeLimit) * 100} className="h-2 bg-slate-700" />}
        </Card.Header>
        <Card.Content>
          {localHasVoted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 rounded-full bg-green-600/20 p-3">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">{t("vote-completed")}</h3>
              <p className="mt-2 text-slate-300">{t("waiting-for-others")}</p>
            </div>
          ) : (
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
              <div className="flex flex-col gap-3">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="flex h-full items-center px-2 rounded-lg border border-slate-700 p-3 hover:bg-slate-700/30"
                  >
                    <RadioGroup.Label htmlFor={option.id} className="flex flex-row flex-1 gap-2 cursor-pointer">
                      <RadioGroup.Item id={option.id} value={option.id} className=" h-full border-slate-500" />
                      {option.text}
                    </RadioGroup.Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
        </Card.Content>
        <Card.Footer className="flex justify-center gap-3">
          {!localHasVoted ? (
            <Button
              variant="primarySolid"
              className="max-w-[150px] w-[30%] min-w-[120px]"
              onClick={handleVoteSubmit}
              disabled={!selectedOption}
            >
              {t("submit-vote")}
            </Button>
          ) : (
            <Button
              variant="primarySolid"
              className="max-w-[150px] w-[30%] min-w-[120px]"
              onClick={() => {
                setLocalHasVoted(false);
                setSelectedOption(null);
              }}
              disabled={!selectedOption}
            >
              {t("re-vote")}
            </Button>
          )}

          {isHost && (
            <Button
              variant="errorSolid"
              className="flex flex-row max-w-[150px] w-[30%] min-w-[120px] gap-2"
              onClick={() => {
                handleGameStatusChange(GAME_STATUS.DONE);
              }}
            >
              <AlertTriangle className="h-4 w-4" />
              {t("force-end")}
            </Button>
          )}
        </Card.Footer>
      </Card>

      <br />

      <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header className="headline">{t("player-list")}</Card.Header>
        <Card.Content>
          <GamePlayerList />
        </Card.Content>
      </Card>
    </>
  );
}
