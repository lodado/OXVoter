"use client";

import { useCallback } from "react";
import { create } from "zustand";

import { useSocketPublisher, useSocketSubScriber } from "@/entities/Socket/hooks";
import { LocalStorageStrategy, StorageController } from "@/shared";
import { useCleanUp } from "@/shared/hooks";

import { GAME_STATUS, GAME_STATUS_TYPE, GameInformation, UserInformation } from "../constants/GAME_STATUS";
import { useGameInformation } from "../hooks";

interface GameState {
  gameStatus: GAME_STATUS_TYPE;
  userInformation: UserInformation;

  userId: string | null;

  roomId: string | null;
  roomName: string | null;
  roomState: string | null;
}

interface GameAction {
  setGameStatus: (status: GAME_STATUS_TYPE) => void;

  setRoomInformation: (params: { roomId: string; roomName: string; roomState: string }) => void;

  setUserInformation: (gameInformation: UserInformation) => void;

  setUserId: (userId: string) => void;

  cleanGameStatus: () => void;

  updateLocalStorage: (id: string) => void;
}

const generateGameStatusKey = () => {
  if (typeof window === "undefined") return "dummy";
  const url = new URL(window.location.href);

  return `gameStatus-${url.pathname.split("/").slice(-1)[0]}`;
};

export const useGameStatusStore = create<GameState & GameAction>((set) => ({
  // 초기 상태를 WAITING으로 설정합니다.
  ...((new StorageController(new LocalStorageStrategy(generateGameStatusKey())).read() as GameState) ?? {
    gameStatus: GAME_STATUS.WAIT,
    userId: null,

    roomId: null,
    roomName: null,
    roomState: null,

    userInformation: {
      userId: "",
      userName: "",
      isHost: false,
      state: GAME_STATUS.WAIT,
    },
  }),

  updateLocalStorage(id: string) {
    const { roomId, roomName, roomState, gameStatus, userId, userInformation } = useGameStatusStore.getState();

    const gameStatusController = new StorageController(new LocalStorageStrategy(generateGameStatusKey()));
    gameStatusController.create({
      gameStatus: gameStatus,
      userId: userId,
      roomId,
      roomName,
      roomState,
      userInformation: {
        ...userInformation,
      },
    });
  },

  setGameStatus: (status) => set({ gameStatus: status }),

  setUserId: (userId: string) => set({ userId }),

  setRoomInformation: ({ roomId, roomName, roomState }: { roomId: string; roomName: string; roomState: string }) => {
    set({ roomId, roomName, roomState });
  },

  setUserInformation: (gameInformation: UserInformation) => {
    set({ userInformation: gameInformation });
  },

  cleanGameStatus: () => {
    set({
      gameStatus: GAME_STATUS.WAIT,
      userId: null,
      userInformation: { userId: "", userName: "", isHost: false, state: GAME_STATUS.WAIT },
      roomId: null,
      roomName: null,
      roomState: null,
    });
  },
}));

export const useGameStatusSocketRegister = ({ userName, roomId }: { userName: string; roomId: string }) => {
  const { setGameStatus, cleanGameStatus } = useGameStatusStore();

  const statusSubscriber = useSocketSubScriber({
    messageType: `/sub/room/${roomId}/status`,
    callback: (payload) => {
      const statusMessage = JSON.parse(payload.body);

      setGameStatus(statusMessage.state);
    },
  });

  const subscriber = useCallback(() => {
    statusSubscriber();
  }, [statusSubscriber]);

  useCleanUp(() => {
    cleanGameStatus();
  });

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
