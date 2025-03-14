"use client";

import { AlertTriangle, Timer } from "lucide-react";
import { useEffect, useState } from "react";

import { Button, Card, ProgressBar, RadioGroup } from "@/shared/ui";

import GamePlayerList from "../GamePlayerList";
import { Player } from "../type";

type VoteOption = {
  id: string;
  text: string;
};

interface VotingPhaseProps {
  title: string;
  isHost?: boolean;
  options: VoteOption[];
  players: Player[];

  timeLimit?: number;
  onSubmitVote: (optionId: string) => void;
  onForceEnd?: () => void;
  hasVoted?: boolean;
}

export default function VotingPhase({
  title,
  isHost,
  players,
  options,
  timeLimit,
  onSubmitVote,
  onForceEnd,
  hasVoted = false,
}: VotingPhaseProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [localHasVoted, setLocalHasVoted] = useState(hasVoted);
  const [timeLeft, setTimeLeft] = useState(timeLimit || 0);

  // hasVoted prop이 변경되면 로컬 상태도 업데이트
  useEffect(() => {
    setLocalHasVoted(hasVoted);
  }, [hasVoted]);

  useEffect(() => {
    if (!timeLimit) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimit]);

  const handleVote = () => {
    if (selectedOption) {
      onSubmitVote(selectedOption);
      setLocalHasVoted(true);
    }
  };

  return (
    <>
      <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="flex items-center justify-between mb-2">
            <span>{title}</span>
            {timeLimit && (
              <div className="flex items-center gap-2 text-sm">
                <Timer className="h-4 w-4" />
                <span>{timeLeft}초 남음</span>
              </div>
            )}
          </Card.Title>
          {timeLimit && <ProgressBar value={(timeLeft / timeLimit) * 100} className="h-2 bg-slate-700" />}
        </Card.Header>
        <Card.Content>
          {localHasVoted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 rounded-full bg-green-600/20 p-3">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">투표 완료!</h3>
              <p className="mt-2 text-slate-300">다른 플레이어들의 투표를 기다리는 중...</p>
            </div>
          ) : (
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
              <div className="space-y-3">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 rounded-lg border border-slate-700 p-3 hover:bg-slate-700/30"
                  >
                    <RadioGroup.Label htmlFor={option.id} className="flex flex-row flex-1 gap-2 cursor-pointer">
                      <RadioGroup.Item id={option.id} value={option.id} className=" border-slate-500" />
                      {option.text}
                    </RadioGroup.Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
        </Card.Content>
        <Card.Footer className="flex justify-center gap-3">
          {!localHasVoted && (
            <Button
              variant="primarySolid"
              className="max-w-[150px] w-[30%] min-w-[120px]  "
              onClick={handleVote}
              disabled={!selectedOption}
            >
              투표하기
            </Button>
          )}

          {isHost && (
            <Button
              variant="errorSolid"
              className="flex flex-row max-w-[150px] w-[30%] min-w-[120px] gap-2"
              onClick={onForceEnd}
            >
              <AlertTriangle className="h-4 w-4" />
              강제 개표
            </Button>
          )}
        </Card.Footer>
      </Card>

      <br />

      <Card className="bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header className="headline">플레이어 리스트</Card.Header>
        <Card.Content>
          <GamePlayerList players={players} />
        </Card.Content>
      </Card>
    </>
  );
}
