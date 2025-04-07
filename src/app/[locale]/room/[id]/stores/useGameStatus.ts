import { create } from "zustand";

import { useSocketPublisher, useSocketSubScriber } from "@/entities/Socket/hooks";

import { GAME_STATUS, GAME_STATUS_TYPE } from "./GAME_STATUS";

interface GameState {
  gameStatus: GAME_STATUS_TYPE;
  setGameStatus: (status: GAME_STATUS_TYPE) => void;
}

export const useGameStatusStore = create<GameState>((set) => ({
  // 초기 상태를 WAITING으로 설정합니다.
  gameStatus: GAME_STATUS.WAITING,
  setGameStatus: (status) => set({ gameStatus: status }),
}));

export const useGameStatusSocketRegister = ({ userName, roomId }: { userName: string; roomId: string }) => {
  const { setGameStatus } = useGameStatusStore();

  const { sendSocketMessage: sendGameStatusChangeMessage } = useSocketPublisher({
    messageType: `/pub/room/${roomId}/status`,
  });

  useSocketSubScriber({
    messageType: `/sub/room/${roomId}/status`,
    callback: (payload) => {
      const statusMessage = JSON.parse(payload.body);

      console.log("set GameStatus", statusMessage);
      /**setGameStatus  */
    },
  });

  const handleGameStatusChangeMessage = (status: GAME_STATUS_TYPE) => {
    sendGameStatusChangeMessage({
      roomId: roomId,
      sender: userName,
      message: [status],
    });
  };

  return { handleGameStatusChangeMessage };
};
