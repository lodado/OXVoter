"use client";

import { useParams } from "next/navigation";

import { useGameStatusStore } from "../stores";

export const useGameInformation = () => {
  const params = useParams();
  const { userInformation, roomId, roomName, roomState } = useGameStatusStore();

  const { userName } = userInformation;

  return {
    id: params.id as string,
    username: userName,
    roomState,
    roomId,
    roomName,
    userId: userInformation.userId,
    isHost: userInformation.isHost,
  };
};
