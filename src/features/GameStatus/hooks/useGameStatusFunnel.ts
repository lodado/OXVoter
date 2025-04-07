"use client";

import { UseFunnelOptions } from "@use-funnel/core";
import { useEffect } from "react";

import { useFunnelWithoutHistory } from "@/shared";

import { GAME_STATUS } from "../stores/GAME_STATUS";
import { useGameStatusStore } from "../stores/useGameStatusStore";

export type GameState = {
  [GAME_STATUS.WAITING]: {};
  [GAME_STATUS.PLAY]: {};
  [GAME_STATUS.VOTED]: {};
  specialVoting: {};
  [GAME_STATUS.DONE]: {};
};

export const useGameStatusFunnel = () => {
  const { gameStatus } = useGameStatusStore();

  const funnel = useFunnelWithoutHistory<GameState>({
    id: "game-page",
    initial: {
      step: gameStatus,
      context: {},
    },
  } satisfies UseFunnelOptions<GameState>);

  useEffect(() => {
    // gameStatus가 변경될 때마다 funnel 상태를 업데이트합니다.
    funnel.history.replace(gameStatus);
  }, [gameStatus, funnel]);

  return funnel;
};
