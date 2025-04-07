"use client";

import { useSocketRegister } from "@/entities/Socket/hooks";

import { useGameStatusSocketRegister } from "../stores/useGameStatusStore";
import { useUserSocketRegister } from "../stores/useUserListStore";
import useGameInformation from "./useGameInformation";

const useSocketOrchestrator = () => {
  const { id, username } = useGameInformation();
  const { handleJoinRoomMessage } = useUserSocketRegister({ userName: username, roomId: id });
  useGameStatusSocketRegister({ roomId: id, userName: username });

  const { isSocketTryingToConnect } = useSocketRegister(() => {
    handleJoinRoomMessage();
  });

  return { isSocketTryingToConnect };
};

export default useSocketOrchestrator;
