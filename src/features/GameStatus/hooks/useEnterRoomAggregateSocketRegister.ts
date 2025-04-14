"use client";
import { useCallback } from "react";

import { useSocketPublisher, useSocketSubScriber } from "@/entities/Socket/hooks";
import { useCleanUp } from "@/shared/hooks";
import { useToastStore } from "@/shared/ui/Toast/stores";

import { UserInformation } from "../constants";
import { useGameStatusStore } from "../stores/useGameStatusStore";
import { useUserListStore } from "../stores/useUserListStore";

export const useEnterRoomAggregateSocketRegister = ({ userName, roomId }: { userName: string; roomId: string }) => {
  const { setUserList, clearUserList } = useUserListStore();
  const { addToast } = useToastStore();
  const { setUserInformation, setRoomInformation } = useGameStatusStore();
  const { setGameStatus } = useGameStatusStore();

  const initRoomSub = useSocketSubScriber({
    messageType: `/sub/room/${roomId}/users`,
    callback: (payload) => {
      const GameStatusMessage = JSON.parse(payload.body);

      console.log(GameStatusMessage, "GameStatusMessage");

      const message = GameStatusMessage.message?.[0];

      const user = message?.users.find((user: UserInformation) => user.userName === userName);

      const roomId = message?.roomId;
      const roomState = message?.roomState;
      const roomName = message?.roomName;

      setUserList(message?.users);
      setUserInformation(user);
      setRoomInformation({
        roomId: roomId,
        roomName: roomName,
        roomState: roomState,
      });
      setGameStatus(roomState);
    },
  });

  const enterSub = useSocketSubScriber({
    messageType: `/sub/room/${roomId}/enter`,
    callback: (payload) => {
      const toastMessage = JSON.parse(payload.body);
      const message = toastMessage.message?.[0].text;

      addToast({
        title: "New Player!",
        description: `${message} has been joined`,
        type: "success",
      });
    },
  });

  const { sendSocketMessage: sendJoinRoomMessage } = useSocketPublisher({
    messageType: `/pub/room/${roomId}/join`,
  });

  const handleJoinRoomMessage = () => {
    sendJoinRoomMessage({
      roomId: roomId,
      sender: userName,
      message: [],
    });
  };

  const subscriber = useCallback(() => {
    initRoomSub();
    enterSub();
  }, [enterSub, initRoomSub]);

  useCleanUp(() => {
    clearUserList();
  });

  return { subscriber, handleJoinRoomMessage };
};
