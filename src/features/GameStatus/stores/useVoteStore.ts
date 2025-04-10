"use client";

import { useCallback, useEffect } from "react";
import { create } from "zustand";

import { useSocketPublisher, useSocketSubScriber } from "@/entities/Socket/hooks";
import { useGameInformation } from "@/features";
import { useCleanUp } from "@/shared/hooks";

export const useVoteStore = () => {
  const { id: roomId, username, userId } = useGameInformation();

  const { sendSocketMessage: sendGameVoteMessage } = useSocketPublisher({
    messageType: `/pub/room/${roomId}/vote`,
  });

  const submitGameVote = (option: string) => {
    sendGameVoteMessage({
      roomId: roomId,
      sender: userId,
      vote: option,
    });
  };

  return { submitGameVote };
};

interface VoteCount {
  voteCount: number;
  voteTimeout: number;
  setVoteCount: (voteCount: number) => void;
  cleanVoteCount: () => void;

  setVoteTimeout: (voteTimeout: number) => void;
}

export const useVoteCountStore = create<VoteCount>((set) => ({
  voteCount: 0,
  voteTimeout: Date.now(),

  setVoteCount: (voteCount) => set({ voteCount }),

  cleanVoteCount: () => set({ voteCount: 0 }),

  setVoteTimeout: (voteTimeout) => set({ voteTimeout }),
}));

export const useVoteCountSocketRegister = ({ userName, roomId }: { userName: string; roomId: string }) => {
  const { setVoteCount, cleanVoteCount } = useVoteCountStore();

  const voteCountSubscriber = useSocketSubScriber({
    messageType: `/sub/room/${roomId}/vote`,
    callback: (payload) => {
      const voteCountMessage = JSON.parse(payload.body);
      setVoteCount(voteCountMessage.voted);

      console.log(voteCountMessage, "voteCountMessage");
    },
  });

  const voteTimeoutSubscriber = useSocketSubScriber({
    messageType: `/sub/room/${roomId}/time`,
    callback: (payload) => {
      const voteTimeoutMessage = JSON.parse(payload.body);

      console.log(voteTimeoutMessage, "voteTimeoutMessage");

      setVoteCount(Number(voteTimeoutMessage.endTime));
    },
  });

  const subscriber = useCallback(() => {
    voteCountSubscriber();
    voteTimeoutSubscriber();
  }, [voteCountSubscriber, voteTimeoutSubscriber]);

  useCleanUp(() => {
    cleanVoteCount();
  });

  return { subscriber };
};
