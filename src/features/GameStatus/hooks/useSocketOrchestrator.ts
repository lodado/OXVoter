"use client";

import { isEmpty } from "lodash-es";

import { useSocketRegister } from "@/entities/Socket/hooks";

import { useGameStatusSocketRegister } from "../stores/useGameStatusStore";
import { useVoteCountSocketRegister } from "../stores/useVoteStore";
import { useEnterRoomAggregateSocketRegister } from "./useEnterRoomAggregateSocketRegister";
import { useGameInformation } from "./useGameInformation";

const useSocketOrchestrator = () => {
  const { id, roomName, username, userId } = useGameInformation();

  const { subscriber: gameStatusSubscriber } = useGameStatusSocketRegister({ roomId: id });

  const { subscriber: voteCountSubscriber } = useVoteCountSocketRegister({
    userName: username,
    roomId: id,
  });

  
  const { handleJoinRoomMessage, subscriber: enterRoomSubscriber } = useEnterRoomAggregateSocketRegister({
    userName: username,
    userId,
    roomId: id,
  });

  const { isSocketTryingToConnect } = useSocketRegister(() => {
    if (!isEmpty(userId) && !isEmpty(username)) {
      enterRoomSubscriber();
      gameStatusSubscriber();
      voteCountSubscriber();

      handleJoinRoomMessage();
    }
  });

  return { isSocketTryingToConnect };
};

export default useSocketOrchestrator;
