import { create } from "zustand";

import { NextAuthSessionResponse } from "@/entities/Auth/server/type";

type AuthState = {
  session: NextAuthSessionResponse | null;

  setSession: (session: NextAuthSessionResponse) => void;

  clearSession: () => void;

  isLogin: boolean;

  setIsLogin: (isLogin: boolean) => void;

  isLoginFormDialogVisible: boolean;

  setLoginFormDialogVisible: (visible: boolean) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null, // 초기 상태는 null

  isLoginFormDialogVisible: false,

  isLogin: false,

  setIsLogin: (isLogin: boolean) => set(() => ({ isLogin })),

  setSession: (session) =>
    set(() => {
      return { session, isLogin: session != null };
    }),

  clearSession: () => set(() => ({ session: null, isLogin: false })),

  setLoginFormDialogVisible: (visible: boolean) => set(() => ({ isLoginFormDialogVisible: visible })),
}));
