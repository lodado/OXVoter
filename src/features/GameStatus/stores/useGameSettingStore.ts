"use client";

import { create } from "zustand";

interface GameSetting {

  // 아직 안쓰는중
  optionMap: { [key: string]: string };
  
  maxPlayerCount: number;
}

interface GameAction {
  setMaxPlayerCount: (maxPlayerCount: number) => void;
}


export const useGameSettingStore = create<GameSetting & GameAction>((set) => ({
  maxPlayerCount: 0,
  optionMap: {},

  setMaxPlayerCount: (maxPlayerCount) => {
    set({ maxPlayerCount });
  },
  
}))
