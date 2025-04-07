export const GAME_STATUS = {
  WAITING: "WAITING",
  PLAY: "PLAY",
  VOTED: "VOTED",
  DONE: "DONE",
} as const;

export type GAME_STATUS_TYPE = keyof typeof GAME_STATUS;
