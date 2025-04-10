"use client";

import { useSocketRegister } from "@/entities/Socket/hooks";

import { useGameStatusSocketRegister } from "../stores/useGameStatusStore";
import { useUserSocketRegister } from "../stores/useUserListStore";
import { useVoteCountSocketRegister } from "../stores/useVoteStore";
import { useGameInformation } from "./useGameInformation";

const useSocketOrchestrator = () => {
  const { id, username } = useGameInformation();
  const { handleJoinRoomMessage, subscriber: userSubscriber } = useUserSocketRegister({
    userName: username,
    roomId: id,
  });
  const { subscriber: gameStatusSubscriber } = useGameStatusSocketRegister({ roomId: id, userName: username });

  const { subscriber: voteCountSubscriber } = useVoteCountSocketRegister({
    userName: username,
    roomId: id,
  });

  const { isSocketTryingToConnect } = useSocketRegister(() => {
    userSubscriber();
    gameStatusSubscriber();
    voteCountSubscriber();

    handleJoinRoomMessage();
  });

  return { isSocketTryingToConnect };
};

export default useSocketOrchestrator;
