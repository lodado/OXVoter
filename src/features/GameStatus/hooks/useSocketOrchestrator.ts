"use client";

import { useSocketRegister } from "@/entities/Socket/hooks";

import { useGameStatusSocketRegister } from "../stores/useGameStatusStore";
import { useVoteCountSocketRegister } from "../stores/useVoteStore";
import { useEnterRoomAggregateSocketRegister } from "./useEnterRoomAggregateSocketRegister";
import { useGameInformation } from "./useGameInformation";

const useSocketOrchestrator = () => {
  const { id, username } = useGameInformation();

  const { subscriber: gameStatusSubscriber } = useGameStatusSocketRegister({ roomId: id, userName: username });

  const { subscriber: voteCountSubscriber } = useVoteCountSocketRegister({
    userName: username,
    roomId: id,
  });

  const { handleJoinRoomMessage, subscriber: enterRoomSubscriber } = useEnterRoomAggregateSocketRegister({
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
