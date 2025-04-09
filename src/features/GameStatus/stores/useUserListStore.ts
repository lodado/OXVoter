"use client";

import { useCallback } from "react";
import { create } from "zustand";

import { useSocketPublisher, useSocketSubScriber } from "@/entities/Socket/hooks";
import { useToastStore } from "@/shared/ui/Toast/stores";

import { GAME_STATUS_TYPE } from "./GAME_STATUS";

type User = {
  id: string;
  name: string;
  isHost: boolean;
  state: GAME_STATUS_TYPE;
};

type UserStore = {
  userList: Record<string, User>;
  setUserList: (userMap: Record<string, User>) => void;
  updateUser: (user: User) => void;
  removeUser: (id: string) => void;
  clearUserList: () => void;
};

export const useUserListStore = create<UserStore>((set) => ({
  userList: {},
  setUserList: (userMap) => set({ userList: userMap }),
  updateUser: (user) =>
    set((state) => ({
      userList: {
        ...state.userList,
        [user.id]: user,
      },
    })),
  removeUser: (id) =>
    set((state) => {
      const updated = { ...state.userList };
      delete updated[id];
      return { userList: updated };
    }),
  clearUserList: () => set({ userList: {} }),
}));

/**
 * 
 * 
 * 
 this.client?.subscribe(`/sub/room/${roomId}/users`, (message: IMessage) => {
            console.log(JSON.parse(message.body), "123214214");
          });

          this.client?.subscribe(`/sub/room/${roomId}/enter`, (message: IMessage) => {
            console.log(JSON.parse(message.body));
          });

          this.client!.subscribe("/sub/chat/room/e76033eb-49ba-4917-9c6b-e8080f6933a7", (message: IMessage) => {
            // console.log(receiveData);
          });

          this.client?.publish({
            destination: `/pub/room/${roomId}/join`,
            body: JSON.stringify({
              roomId: roomId,
              sender: userName,
              message: [],
            }),
          });
 */

export const useUserSocketRegister = ({ userName, roomId }: { userName: string; roomId: string }) => {
  const { setUserList } = useUserListStore();
  const { addToast } = useToastStore();

  const { sendSocketMessage: sendJoinRoomMessage } = useSocketPublisher({
    messageType: `/pub/room/${roomId}/join`,
  });

  const userSub = useSocketSubScriber({
    messageType: `/sub/room/${roomId}/users`,
    callback: (payload) => {
      const userList = JSON.parse(payload.body);

      setUserList(userList);
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

  const handleJoinRoomMessage = () => {
    sendJoinRoomMessage({
      roomId: roomId,
      sender: userName,
      message: [],
    });
  };

  const subscriber = useCallback(()=> {
    userSub();
    enterSub();
  }, [enterSub, userSub])

  return { subscriber, handleJoinRoomMessage };
};
