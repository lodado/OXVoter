"use client";
 
import type { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";

import { createZustandContext } from "@/shared/libs/zustand/createZustandContext";

// 1) 스토어 상태 & 액션 인터페이스 정의
export interface GameSetting {
  optionMap: Record<string, string>;
  maxPlayerCount: number;
}

export interface GameAction {
  setMaxPlayerCount: (maxPlayerCount: number) => void;
}

// 2) 스토어 생성 함수 (초기 state 옵션 지원)
function createGameSettingStore(
  initialState?: Partial<GameSetting>
): UseBoundStore<StoreApi<GameSetting & GameAction>> {
  return create<GameSetting & GameAction>((set) => ({
    maxPlayerCount: initialState?.maxPlayerCount ?? 0,
    optionMap: initialState?.optionMap ?? {},

    setMaxPlayerCount: (maxPlayerCount) => {
      set({ maxPlayerCount });
    },
  }));
}

export const { Provider: GameSettingProvider, useStore: useGameSettingContext } =
  createZustandContext(createGameSettingStore);

