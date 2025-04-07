"use client";

import { useSearchParams } from "next/navigation";

import { useSocketRegister } from "@/entities/Socket/hooks";

import { useGameStatusSocketRegister } from "../stores/useGameStatus";
import { useUserSocketRegister } from "../stores/useUserListStore";

const useSocketOrchestrator = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";

  const { handleJoinRoomMessage } = useUserSocketRegister({ roomId: id });
  const { handleGameStatusChange } = useGameStatusSocketRegister({ roomId: id, userName: username });

  const { isSocketTryingToConnect } = useSocketRegister(() => {
    handleJoinRoomMessage(username);
  });

  return { isSocketTryingToConnect };
};

export default useSocketOrchestrator;
