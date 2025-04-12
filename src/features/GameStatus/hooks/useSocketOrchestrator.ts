"use client";

import { useSocketRegister } from "@/entities/Socket/hooks";

import { useGameStatusSocketRegister } from "../stores/useGameStatusStore";
import { useVoteCountSocketRegister } from "../stores/useVoteStore";
import { useEnterRoomSocketRegister } from "./useEnterRoomSocketRegister";
import { useGameInformation } from "./useGameInformation";

const useSocketOrchestrator = () => {
  const { id, username } = useGameInformation();
  const { handleJoinRoomMessage, subscriber: enterRoomSubscriber } = useEnterRoomSocketRegister({
    userName: username,
    roomId: id,
  });
  const { subscriber: gameStatusSubscriber } = useGameStatusSocketRegister({ roomId: id, userName: username });

  const { subscriber: voteCountSubscriber } = useVoteCountSocketRegister({
    userName: username,
    roomId: id,
  });

  const { isSocketTryingToConnect } = useSocketRegister(() => {
    enterRoomSubscriber();
    gameStatusSubscriber();
    voteCountSubscriber();

    handleJoinRoomMessage();
  });

  return { isSocketTryingToConnect };
};

export default useSocketOrchestrator;
