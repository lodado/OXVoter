import { create } from "zustand";

// 타입 상태 정의
interface LoadingState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

// Zustand 상태 정의
export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
