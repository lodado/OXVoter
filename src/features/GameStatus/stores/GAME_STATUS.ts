export const GAME_STATUS = {
  WAIT: "WAIT",
  PLAY: "PLAY",
  VOTE: "VOTE",
  DONE: "DONE",
} as const;

export type GAME_STATUS_TYPE = keyof typeof GAME_STATUS;

export interface GameInformation  {
  userId: string;
  userName: string;
  isHost: boolean;
  state: string;
};