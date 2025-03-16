"use client";

import { PropsWithChildren, useState } from "react";

import { contextBuildHelper } from "@/shared";

interface VoteOption {
  id: string;
  text: string;
  description: string;
}

export const VOTE_OPTIONS = [
  { id: "town", text: "찬반 투표", description: "어느 사안에 대해 단순히 찬성/반대할지 투표합니다." },
  { id: "mafia", text: "마피아식 처형", description: "다수결로 한 플레이어를 처형합니다." },
  // { id: "mafia2", text: "인민 재판", description: "다수결로 한 플레이어의 정체를 밝혀냅니다." },
];

export const [RawVoteProvider, useVoteContext] = contextBuildHelper<{
  options: typeof VOTE_OPTIONS;
  selectedOptions: VoteOption;

  setSelectedOptions: (selectedOptions: VoteOption) => void;
}>({
  id: "VoteProvider",
  option: {
    contextThrowNeed: false,
  },
});

export const VoteProvider = ({ children }: PropsWithChildren) => {
  const [selectedOptions, setSelectedOptions] = useState<VoteOption>(VOTE_OPTIONS[0]);

  return (
    <RawVoteProvider options={VOTE_OPTIONS} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}>
      {children}
    </RawVoteProvider>
  );
};
