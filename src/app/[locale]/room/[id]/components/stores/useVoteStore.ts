"use client";

import { useSocketPublisher } from "@/entities/Socket/hooks";
import { useGameInformation } from "@/features";

export const useVoteStore = () => {
  const { id: roomId, username } = useGameInformation();

  const { sendSocketMessage: sendGameVoteMessage } = useSocketPublisher({
    messageType: `/pub/room/${roomId}/vote`,
  });

  const submitGameVote = (option: string) => {
    sendGameVoteMessage({
      roomId: roomId,
      sender: username,
      message: [{ option }],
    });
  };

  return { submitGameVote };
};
