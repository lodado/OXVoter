import { useCallback } from "react";
import { create } from "zustand";

import { useSocketPublisher, useSocketSubScriber } from "@/entities/Socket/hooks";

import { useGameInformation } from "../hooks";
import { GAME_STATUS, GAME_STATUS_TYPE, GameInformation } from "./GAME_STATUS";

interface GameState {
  gameStatus: GAME_STATUS_TYPE;
  userInformation: GameInformation;

  userId: string | null;

  setGameStatus: (status: GAME_STATUS_TYPE) => void;

  setUserInformation: (gameInformation: GameInformation) => void;

  setUserId: (userId: string) => void;
}

export const useGameStatusStore = create<GameState>((set) => ({
  // 초기 상태를 WAITING으로 설정합니다.
  gameStatus: GAME_STATUS.WAIT,
  userId: null,

  userInformation: {
    userId: "",
    userName: "",
    isHost: false,
    state: GAME_STATUS.WAIT,
  },
  setGameStatus: (status) => set({ gameStatus: status }),

  setUserId: (userId: string) => set({ userId }),

  setUserInformation: (gameInformation: GameInformation) => set({ userInformation: gameInformation }),
}));

export const useGameStatusSocketRegister = ({ userName, roomId }: { userName: string; roomId: string }) => {
  const { setGameStatus } = useGameStatusStore();

  const statusSubscriber = useSocketSubScriber({
    messageType: `/sub/room/${roomId}/status`,
    callback: (payload) => {
      const statusMessage = JSON.parse(payload.body);

      console.log("set GameStatus", statusMessage);
      setGameStatus(statusMessage.state);
    },
  });

  const subscriber = useCallback(() => {
    statusSubscriber();
  }, [statusSubscriber]);

  return { subscriber };
};

export const useUpdateGameStatus = () => {
  const { id: roomId, username, userId } = useGameInformation();

  const { sendSocketMessage: sendGameStatusChangeMessage } = useSocketPublisher({
    messageType: `/pub/room/${roomId}/status`,
  });

  const handleGameStatusChange = (status: GAME_STATUS_TYPE) => {
    console.log({
      roomId: roomId,
      sender: userId,
      state: status,
    });

    sendGameStatusChangeMessage({
      roomId: roomId,
      sender: userId,
      state: status,
    });
  };

  return { handleGameStatusChange };
};
