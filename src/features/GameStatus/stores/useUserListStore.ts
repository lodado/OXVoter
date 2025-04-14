"use client";

import { create } from "zustand";

import { GAME_STATUS_TYPE, UserInformation } from "./GAME_STATUS";

type User = UserInformation;

type UserStore = {
  userList: User[];
  setUserList: (userMap: User[]) => void;
  updateUser: (user: User) => void;
  removeUser: (id: string) => void;
  clearUserList: () => void;
};

export const useUserListStore = create<UserStore>((set) => ({
  userList: [],
  setUserList: (userList) => set({ userList: userList }),
  updateUser: (user) => {
    set((state) => {
      const updatedUserList = state.userList.map((u) => (u.userId === user.userId ? user : u));
      return { userList: updatedUserList };
    });
  },

  removeUser: (id) => {
    set((state) => {
      const updatedUserList = state.userList.filter((user) => user.userId !== id);
      return { userList: updatedUserList };
    });
  },
  clearUserList: () => set({ userList: [] }),
}));

