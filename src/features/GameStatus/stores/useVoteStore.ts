"use client";

import { useCallback, useEffect } from "react";
import { create } from "zustand";

import { useSocketPublisher, useSocketSubScriber } from "@/entities/Socket/hooks";
import { useGameInformation } from "@/features";
import { useCleanUp } from "@/shared/hooks";

interface VoteCount {
  voteCount: number;
  voteTimeout: number;
  totalUserCount: number;

  setTotalUserCount: (totalUserCount: number) => void;
  setVoteCount: (voteCount: number) => void;
  cleanVoteCount: () => void;

  setVoteTimeout: (voteTimeout: number) => void;
}

export const useVoteStateStore = create<VoteCount>((set) => ({
  voteCount: 0,
  totalUserCount: 0,

  voteTimeout: Date.now(),

  setVoteCount: (voteCount) => set({ voteCount }),
  setTotalUserCount: (totalUserCount) => set({ totalUserCount }),

  cleanVoteCount: () => set({ voteCount: 0 }),

  setVoteTimeout: (voteTimeout) => set({ voteTimeout }),
}));

export const useVoteCountSocketRegister = ({ userName, roomId }: { userName: string; roomId: string }) => {
  const { setVoteCount, setTotalUserCount, cleanVoteCount } = useVoteStateStore();

  const voteCountSubscriber = useSocketSubScriber({
    messageType: `/sub/room/${roomId}/vote`,
    callback: (payload) => {
      const voteCountMessage = JSON.parse(payload.body);
      setVoteCount(voteCountMessage.voted);
      setTotalUserCount(voteCountMessage.voted + voteCountMessage.remain);

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

export const useSubmitVotePublisher = () => {
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
