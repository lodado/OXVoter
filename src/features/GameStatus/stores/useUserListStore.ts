"use client";

import { create } from "zustand";

import { GAME_STATUS_TYPE } from "./GAME_STATUS";

type User = {
  userId: string;
  userName: string;
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
        [user.userId]: user,
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

