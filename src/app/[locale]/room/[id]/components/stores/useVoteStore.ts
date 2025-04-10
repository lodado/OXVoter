"use client";

import { useSocketPublisher } from "@/entities/Socket/hooks";
import { useGameInformation } from "@/features";

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
